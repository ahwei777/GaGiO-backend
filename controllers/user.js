const db = require("../models");
const bcrypt = require("bcrypt");
const { User } = db;

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
    const { email, password, passwordComfirm, nickname } = req.body;
    if (!email || !password || !passwordComfirm || !nickname)
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
    if (password !== passwordComfirm)
      return res.status(400).json({
        ok: 0,
        errorMessage: "Password isn't equal to comfirm password",
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
      })
        .then((newUser) =>
          res.status(201).json({
            ok: 1,
            data: {
              user: {
                email: newUser.email,
                nickname: newUser.nickname,
                auth_type: newUser.AuthTypeId,
              },
            },
          })
        )
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
    console.log(email, password);
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
          return res.status(200).json({
            ok: 1,
            data: {
              user: {
                email: user.email,
                nickname: user.nickname,
                auth_type: user.AuthTypeId,
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
    const userId = req.session.userId;
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
              email: user.email,
              nickname: user.nickname,
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
    const userId = req.session.userId;
    if (!userId)
      return res.status(400).json({
        ok: 0,
        errorMessage: "Didn't login",
      });
    User.findByPk(userId)
      .then((user) => {
        if (user.AuthTypeId !== 3)
          return res.status(401).json({
            ok: 0,
            errorMessage: "Unauthorized",
          });
        return User.findAll()
          .then((users) => {
            return res.status(200).json(users);
          })
          .catch((error) => {
            return res.status(400).json({
              ok: 0,
              errorMessage: error.toString(),
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
  getUser: (req, res) => {
    const userSessionId = req.session.userId;
    const userId = req.params.id;
    if (!userSessionId)
      return res.status(400).json({
        ok: 0,
        errorMessage: "Didn't login",
      });
    User.findByPk(userSessionId)
      .then((requestUser) => {
        if (requestUser.AuthTypeId !== 3)
          return res.status(401).json({
            ok: 0,
            errorMessage: "Unauthorized",
          });
        User.findByPk(userId)
          .then((user) => {
            if (!user)
              return res.status(404).json({
                ok: 0,
                errorMessage: "Cannot find user",
              });
            return res.status(200).json({
              ok: 1,
              data: {
                user: {
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
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
  updateUserAuth: (req, res) => {
    const userSessionId = req.session.userId;
    const userId = req.params.id;
    const { AuthTypeId } = req.body;
    if (!userSessionId)
      return res.status(400).json({
        ok: 0,
        errorMessage: "Didn't login",
      });
    User.findByPk(userSessionId)
      .then((requestUser) => {
        if (requestUser.AuthTypeId !== 3)
          return res.status(401).json({
            ok: 0,
            errorMessage: "Unauthorized",
          });
        User.update(
          {
            AuthTypeId,
          },
          { where: { id: userId } }
        )
          .then((updatedUser) => {
            return res.status(200).json({
              ok: 1,
              data: {
                user: {
                  email: updatedUser.email,
                  nickname: updatedUser.nickname,
                  auth_type: updatedUser.AuthTypeId,
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
