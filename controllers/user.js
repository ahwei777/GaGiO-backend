const db = require("../models");
const bcrypt = require("bcrypt");
const { User, Course, Order, Order_item } = db;
const { setToken, checkAuth, checkToken } = require("../middleware/auth");
const courseController = require("./course");
const order_item = require("../models/order_item");

const emailRegExp = /^([\w\.\-]){1,64}\@([\w\.\-]){1,64}$/;
const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
const isEmail = (email) => {
  return emailRegExp.test(email.toString());
};
const isGoodPassword = (password) => {
  return passwordRegExp.test(password.toString());
};

const userController = {
  register: (req, res) => {
    const { email, password, confirm, nickname } = req.body;
    if (!email || !password || !confirm || !nickname)
      return res
        .status(400)
        .json({ ok: 0, errorMessage: "Please enter all necessary fields" });
    if (!isEmail(email))
      return res.status(400).json({
        ok: 0,
        errorMessage: `${email} is not an email`,
      });
    if (!isGoodPassword(password))
      return res.status(400).json({
        ok: 0,
        errorMessage: "Please follow the rule for password",
      });
    if (password !== confirm)
      return res.status(400).json({
        ok: 0,
        errorMessage: "Password isn't equal to confirm password",
      });
    User.findOne({ where: { email } }).then((user) => {
      if (user)
        return res.status(400).json({
          ok: 0,
          errorMessage: "email already exist",
        });
      User.create({
        email,
        password: bcrypt.hashSync(password, 10),
        nickname,
        // 預設註冊一般會員
        AuthTypeId: 1,
      })
        .then((newUser) => {
          const token = setToken(newUser.id);
          res.status(201).json({
            ok: 1,
            data: {
              user: {
                id: newUser.id,
                email: newUser.email,
                nickname: newUser.nickname,
                auth_type: newUser.AuthTypeId,
                token,
              },
            },
          });
        })
        .catch((error) =>
          res.status(400).json({
            ok: 0,
            errorMessage: error.toString(),
          })
        );
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        ok: 0,
        errorMessage: "Please enter all necessary fields",
      });
    User.findOne({
      where: {
        email,
      },
    })
      .then((user) => {
        if (!user)
          return res
            .status(400)
            .json({ ok: 0, errorMessage: "Cannot find user" });
        bcrypt.compare(password, user.password).then((result) => {
          if (!result)
            return res.status(400).json({
              ok: 0,
              errorMessage: "wrong password",
            });
          req.session.userId = user.id;
          const token = setToken(user.id);
          return res.status(200).json({
            ok: 1,
            data: {
              user: {
                id: user.id,
                email: user.email,
                nickname: user.nickname,
                auth_type: user.AuthTypeId,
                token,
              },
            },
          });
        });
      })
      .catch((error) =>
        res.status(400).json({
          ok: 0,
          errorMessage: error,
        })
      );
  },
  logout: (req, res) => {
    if (!req.session.userId)
      return res.status(400).json({
        ok: 0,
        errorMessage: "Didn't login",
      });
    req.session.destroy();
    return res.status(200).json({
      ok: 1,
      data: "logout success",
    });
  },
  getMe: (req, res) => {
    const userId = checkToken(req);
    if (!userId)
      return res.status(400).json({
        ok: 0,
        errorMessage: "Didn't login",
      });
    User.findByPk(userId)
      .then((user) => {
        if (!user)
          return res.status(404).json({
            ok: 0,
            errorMessage: "Cannot find User",
          });
        return res.status(200).json({
          ok: 1,
          data: {
            user: {
              id: user.id,
              email: user.email,
              nickname: user.nickname,
              auth_type: user.AuthTypeId,
            },
          },
        });
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
  getAllUser: (req, res) => {
    User.findAll()
      .then((users) => {
        return res.status(200).json({
          ok: 1,
          data: {
            users: users.map((user) => {
              return {
                id: user.id,
                email: user.email,
                nickname: user.nickname,
                auth_type: user.AuthTypeId,
                updated_at: user.updatedAt,
              };
            }),
          },
        });
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
  getUser: (req, res) => {
    const userId = req.params.id;
    User.findByPk(userId, {
      include: {
        model: Order,
        attributes: [["id", "OrderId"]],
        where: { UserId: userId },
        include: {
          model: Order_item,
          attributes: ["CourseId"],
          include: { model: Course, attributes: [["title", "CourseTitle"]] },
        },
      },
    })
      .then((user) => {
        let courseList = [];
        user.Orders.forEach((order) =>
          order.Order_items.forEach((course) => courseList.push(course))
        );
        if (!user)
          return res.status(404).json({
            ok: 0,
            errorMessage: "Cannot find user",
          });
        return res.status(200).json({
          ok: 1,
          data: {
            user: {
              id: user.id,
              email: user.email,
              nickname: user.nickname,
              updated_at: user.updatedAt,
              courseList,
            },
          },
        });
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
  updateUserInfo: (req, res) => {
    const userId = Number(req.params.id);
    const token = Number(checkToken(req));
    if (token !== userId)
      return res.status(401).json({ ok: 0, errorMessage: "Unauthorized" });
    const { nickname, email, AuthTypeId } = req.body;
    User.findByPk(userId)
      .then((user) => {
        const newNickname = nickname || user.nickname;
        const newEmail = email || user.email;
        const newAuthTypeId = AuthTypeId || user.AuthTypeId;
        User.update(
          {
            email: newEmail,
            nickname: newNickname,
            AuthTypeId: newAuthTypeId,
          },
          { where: { id: userId } }
        ).then((updatedUser) => {
          return res.status(200).json({
            ok: 1,
            data: {
              user: {
                id: userId,
                email: newEmail,
                nickname: newNickname,
                AuthTypeId: newAuthTypeId,
              },
            },
          });
        });
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
  updateUserPassword: (req, res) => {
    const userId = req.params.id;
    const token = checkToken(req);
    if (token !== userId)
      return res.status(401).json({ ok: 0, errorMessage: "Unauthorized" });
    const { password } = req.body;
    const newPassword = bcrypt.hashSync(password, 10);
    console.log("newPassword", newPassword);
    User.update(
      {
        password: newPassword,
      },
      { where: { id: userId } }
    )
      .then((updatedUser) => {
        const newToken = setToken(userId);
        return res.status(200).json({
          ok: 1,
          data: {
            user: {
              id: userId,
              token: newToken,
            },
          },
        });
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
};

module.exports = userController;
