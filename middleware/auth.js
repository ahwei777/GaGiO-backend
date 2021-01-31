const db = require('../models');
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;
const { User, Course, Teacher, Unit, Order, Order_item } = db;

const setToken = (userId) => {
  const token = jwt.sign({ userId: userId.toString() }, SECRET, {
    expiresIn: '1 day',
  });
  return token;
};

const checkToken = (req) => {
  if (!req.header('Authorization')) return;
  const token = req.header('Authorization').replace('Bearer ', '');
  return jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return;
    return decoded.userId;
  });
};

const getAuth = () => {
  return (req, res, next) => {
    const userId = checkToken(req) || '';
    if (!userId) return next();
    User.findOne({
      where: { id: userId },
      include: [Teacher]
    }).then((user) => {
      // 非 teacher 時 user.Teacher = null
      if (user.Teacher) {
        req.teacherId = user.Teacher.id;
      }
      // req 內設置 userId, AuthTypeId 便於後續取得使用者身分進行操作
      req.userId = user.id;
      req.authTypeId = user.AuthTypeId;
      return next();
    });
  };
};

const checkAuth = (identity) => {
  return async (req, res, next) => {
    // check Token
    const userId = checkToken(req) || '';
    if (!userId)
      return res.status(400).json({
        ok: 0,
        errorMessage: 'cannot find token!',
      });
    // req 內設置 id 便於後續取得使用者身分進行操作
    req.userId = userId;
    switch (identity) {
      case 'admin':
        const admin = await User.findByPk(userId);
        if (!admin || admin.AuthTypeId !== 3) {
          return res.status(403).json({
            ok: 0,
            errorMessage: 'permission denied',
          });
        }
        req.authTypeId = admin.AuthTypeId;
        return next();
      case 'teacher':
        const teacher = await User.findByPk(userId, {
          include: [{ model: Teacher, attributes: ['id'] }],
        });
        // Teacher
        if (teacher.AuthTypeId === 2) {
          // req 內設置 id 便於後續取得使用者身分進行操作
          req.teacherId = teacher.Teacher.id;
          return next();
        }
        return res.status(403).json({
          ok: 0,
          errorMessage: 'permission denied',
        });
      case 'ownCourse':
        const user = await User.findOne({
          where: { id: userId },
          include: [
            Teacher,
            {
              model: Order,
              include: {
                model: Order_item,
                where: { CourseId: req.params.courseId },
              },
            },
          ],
        });
        // no user
        if (!user) {
          return res.status(404).json({
            ok: 0,
            errorMessage: 'no user',
          });
        }
        // 有購買或是 Admin
        if (user.Orders.length > 0 || user.AuthTypeId === 3) {
          return next();
        }
        // 不是老師 > 無權限
        if (!user.Teacher) {
          return res.status(403).json({
            ok: 0,
            errorMessage: 'permission denied',
          });
        }
        // check if Teacher own this course
        const course = await Course.findOne({
          where: {
            id: req.params.courseId,
            TeacherId: user.Teacher.id,
          },
        });
        // 沒購買也不是自己開的課程 > 無權限
        if (!course) {
          return res.status(403).json({
            ok: 0,
            errorMessage: 'permission denied',
          });
        }
        return next();
      case 'updateCourse':
        const findUser = await User.findOne({
          where: { id: userId },
          include: [Teacher],
        });
        // no user
        if (!findUser) {
          return res.status(404).json({
            ok: 0,
            errorMessage: 'no user',
          });
        }
        // Admin
        if (findUser.AuthTypeId === 3) {
          return next();
        }
        // 不是老師 > 無權限
        if (!findUser.Teacher) {
          return res.status(403).json({
            ok: 0,
            errorMessage: 'permission denied',
          });
        }
        // check if Teacher own this course
        const findCourse = await Course.findOne({
          id: req.params.courseId,
          where: {
            TeacherId: findUser.Teacher.id,
          },
        });
        if (!findCourse) {
          return res.status(403).json({
            ok: 0,
            errorMessage: 'permission denied',
          });
        }
        return next();
      default:
        return next();
    }
  };
};

module.exports = {
  setToken,
  checkToken,
  getAuth,
  checkAuth,
};
