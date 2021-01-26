const db = require('../models');
const bcrypt = require('bcrypt');
const { User, Teacher, Course, Order, Order_item } = db;
const { setToken, checkAuth, checkToken } = require('../middleware/auth');

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
    /* 
    #swagger.tags = ['Users']
    #swagger.summary = '使用者註冊（JWT）'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: '註冊資料',
      required: true,
      type: 'object',
      schema: {
        $email: 'example@mail.com',
        $password: 'Aa123456',
        $nickname: 'example',
      }
    }
    */
    const { email, password, nickname } = req.body;
    if (!email || !password || !nickname) {
      return res.status(400).json({
        ok: 0,
        errorMessage: 'Please enter all necessary fields',
      });
    }
    if (!isEmail(email)) {
      return res.status(400).json({
        ok: 0,
        errorMessage: `${email} is not an email`,
      });
    }
    if (!isGoodPassword(password)) {
      return res.status(400).json({
        ok: 0,
        errorMessage: 'Please follow the rule for password',
      });
    }
    User.findOne({ where: { email } }).then((user) => {
      if (user)
        return res.status(400).json({
          ok: 0,
          errorMessage: 'email already exist',
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
            token,
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
    /* 
    #swagger.tags = ['Users']
    #swagger.summary = '使用者登入（JWT）'
    #swagger.parameters['obj'] = {
      in: 'body',
      description: '登入資料',
      required: true,
      type: 'object',
      schema: {
        $email: 'user@gmail.com',
        $password: 'Aa123456',
      }
    }
    */
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        ok: 0,
        errorMessage: 'Please enter all necessary fields',
      });
    }
    User.findOne({
      where: { email },
    })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            ok: 0,
            errorMessage: 'Cannot find user',
          });
        }
        bcrypt.compare(password, user.password).then((result) => {
          if (!result) {
            return res.status(400).json({
              ok: 0,
              errorMessage: 'wrong password',
            });
          }
          const token = setToken(user.id);
          return res.status(200).json({
            ok: 1,
            token,
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
  getMe: (req, res) => {
    /* 
    #swagger.tags = ['Users']
    #swagger.summary = '取得自己的使用者資料'
    #swagger.security = [{
      "Bearer": []
    }] 
    */
    const userId = checkToken(req);
    if (!userId)
      return res.status(400).json({
        ok: 0,
        errorMessage: "Didn't login",
      });
    User.findByPk(userId, { include: [Teacher] })
      .then((user) => {
        if (!user)
          return res.status(404).json({
            ok: 0,
            errorMessage: 'Cannot find User',
          });
        // 老師一併回傳 teacherId, 用於之後新增課程及追蹤身分使用
        if (user.AuthTypeId == 2) {
          return res.status(200).json({
            ok: 1,
            data: {
              id: user.id,
              email: user.email,
              nickname: user.nickname,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
              authTypeId: user.AuthTypeId,
              Teacher: {
                id: user.Teacher.id,
                name: user.Teacher.name,
                description: user.Teacher.description,
                avatarUrl: user.Teacher.avatarUrl,
                createdAt: user.Teacher.createdAt,
                updatedAt: user.Teacher.updatedAt,
              },
            },
          });
        }
        return res.status(200).json({
          ok: 1,
          data: {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            authTypeId: user.AuthTypeId,
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
    /* 
    #swagger.tags = ['Users']
    #swagger.summary = '取得所有用戶資料（admin only）'
    #swagger.security = [{
      "Bearer": []
    }] 
    #swagger.parameters['_page'] = {
      in: 'query',
      description: '分頁(預設每頁五筆)',
      type: 'number',
    }
    #swagger.parameters['_limit'] = {
      in: 'query',
      description: '搭配分頁參數可調整每頁資料數目',
      type: 'number',
    }
    #swagger.parameters['_sort'] = {
      in: 'query',
      description: '排序依據(預設 id)',
      type: 'array',
      items: {
        type: 'string',
        enum: [
          'id',
          'createdAt'
        ],
        default: 'id'
      }
    }
    #swagger.parameters['_order'] = {
      in: 'query',
      description: '排序方式(預設遞增)',
      type: 'array',
      items: {
        type: 'string',
        enum: [
          'ASC',
          'DESC'
        ],
        default: 'ASC'
      }
    }
    */
   const { _page, _limit, _sort, _order } = req.query;
   let CoursesPerPage = Number(_limit) || 5;
   let sort = _sort || 'id';
   let order = _order || 'ASC';
    User.findAll({
      limit: _page ? CoursesPerPage : null,
      order: [[sort, order]],
    })
      .then((users) => {
        console.log(users);
        return res.status(200).json({
          ok: 1,
          data: users.map((user) => {
            return {
              id: user.id,
              email: user.email,
              nickname: user.nickname,
              authTypeId: user.AuthTypeId,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            };
          }),
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
    /* 
    #swagger.tags = ['Users']
    #swagger.summary = '取得指定用戶資料（admin only）'
    #swagger.security = [{
      "Bearer": []
    }] 
    */
    const userId = req.params.id;
    User.findByPk(userId, {
      include: {
        model: Order,
        attributes: [['id', 'OrderId']],
        include: {
          model: Order_item,
          attributes: ['CourseId'],
          include: { model: Course, attributes: [['title', 'CourseTitle']] },
        },
      },
    })
      .then((user) => {
        console.log(user);
        if (!user)
          return res.status(404).json({
            ok: 0,
            errorMessage: 'Cannot find user',
          });
        let courseList = [];
        user.Orders.forEach((order) =>
          order.Order_items.forEach((course) => courseList.push(course))
        );
        return res.status(200).json({
          ok: 1,
          data: {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            authTypeId: user.AuthTypeId,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            courseList,
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
  updateUserAuth: (req, res) => {
    /* 
    #swagger.tags = ['Users']
    #swagger.summary = '更新指定用戶權限（admin only）'
    #swagger.security = [{
      "Bearer": []
    }] 
    */
    User.update(
      {
        AuthTypeId: req.body.AuthTypeId,
      },
      { where: { id: req.params.id } }
    )
      .then((result) => {
        if (result[0] !== 1) {
          return res.status(404).json({
            ok: 0,
            errorMessage: 'Cannot find user',
          });
        }
        return res.status(200).json({
          ok: 1,
          message: 'success',
        });
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
  updateMyInfo: (req, res) => {
    /* 
    #swagger.tags = ['Users']
    #swagger.summary = '更新自己的個人資料'
    #swagger.security = [{
      "Bearer": []
    }] 
    */
    console.log('get', req.body.nickname);
    // 可擴充
    User.update(
      {
        nickname: req.body.nickname,
      },
      { where: { id: req.userId } }
    )
      .then((result) => {
        if (result[0] !== 1) {
          return res.status(404).json({
            ok: 0,
            errorMessage: 'Cannot find user',
          });
        }
        return res.status(200).json({
          ok: 1,
          message: 'success',
        });
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
  updateMyPassword: async (req, res) => {
    /* 
    #swagger.tags = ['Users']
    #swagger.summary = '更新自己的密碼'
    #swagger.security = [{
      "Bearer": []
    }] 
    */
    const { oldPassword, newPassword } = req.body;
    console.log(oldPassword, newPassword);
    if (!isGoodPassword(newPassword)) {
      return res.status(400).json({
        ok: 0,
        errorMessage: 'Please follow the rule for password',
      });
    }
    try {
      const userData = await User.findOne({
        where: { id: req.userId },
      });
      if (!userData) {
        return res.status(400).json({
          ok: 0,
          errorMessage: 'Cannot find user',
        });
      }
      const checkIsCorrect = await bcrypt.compare(
        oldPassword,
        userData.password
      );
      if (!checkIsCorrect) {
        return res.status(400).json({
          ok: 0,
          errorMessage: 'wrong password',
        });
      }
      await User.update(
        {
          password: bcrypt.hashSync(newPassword, 10),
        },
        { where: { id: req.userId } }
      );
      return res.status(200).json({
        ok: 1,
        message: 'success',
      });
    } catch (error) {
      return res.status(400).json({
        ok: 0,
        errorMessage: error.toString(),
      });
    }
  },
};

module.exports = userController;
