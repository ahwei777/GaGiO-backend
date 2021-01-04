const db = require('../models');
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_KEY || 'test_key';
const { User, Course, Paid_course, Teacher, Unit } = db;

const setToken = (userId) => {
  const token = jwt.sign({ userId: userId.toString() }, jwtSecretKey, {
    expiresIn: '1 day',
  });
  return token;
};

const checkToken = (req) => {
  if (!req.header('Authorization')) return;
  const token = req.header('Authorization').replace('Bearer ', '');
  return jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) return;
    return decoded.userId;
  });
};

// 一般會員 1, 管理員 3,（開課者 2）
const checkAuth = (identity) => {
  return (req, res, next) => {
    const userId = checkToken(req) || '';
    if (!userId)
      return res.status(400).json({
        ok: 0,
        errorMessage: 'cannot find token !',
      });
    User.findByPk(userId, {
      include: [
        { model: Teacher, attributes: ['id'] },
        //{ model: Paid_course, attributes: ['CourseId'] },
      ],
    }).then((user) => {
      console.log('user', user);
      if (!user)
        return res.status(400).json({
          ok: 0,
          errorMessage: 'cannot find user !',
        });
      // req 內設置 id 便於後續取得使用者身分進行操作
      req.userId = user.id;
      req.AuthTypeId = user.AuthTypeId;
      switch (identity) {
        case 'admin':
          if (user.AuthTypeId !== 3)
            return res.status(401).json({
              ok: 0,
              errorMessage: 'permission denied',
            });
          return next();
        case 'teacher':
          // 尚未成為 Teacher
          if (!user.Teacher)
            return res.status(401).json({
              ok: 0,
              errorMessage: 'You are not teacher yet',
            });
          req.TeacherId = user.Teacher.id;
          return next();
        default:
          return next();
      }
    });
  };
};

const checkTeacher = (courseId, userId) => {
  return Course.findOne({
    where: { id: courseId, deletedAt: null },
    attributes: ['id', 'TeacherId'],
    include: [{ model: Teacher, attributes: ['UserId'] }],
  }).then((course) => {
    if (!course)
      return res.status(404).json({
        ok: 0,
        errorMessage: 'Cannot find course',
      });
    if (course.Teacher.UserId !== userId)
      return res.status(401).json({
        ok: 0,
        errorMessage: 'UnAuthorized',
      });
    res.locals.teacherId = course.TeacherId;
  });
};
const checkTeacherAuth = (controller) => {
  return (req, res, next) => {
    const userId = Number(checkToken(req));
    let courseId;
    switch (controller) {
      case 'course':
        courseId = req.params.id || req.body.courseId;
        if (!courseId)
          return res.status(400).json({
            ok: 0,
            errorMessage: 'course id is required',
          });
        checkTeacher(courseId, userId);
        next();
        break;
      case 'unit':
        const unitListId = req.params.id;
        Unit.findOne({
          where: { id: unitListId },
          attributes: ['CourseId'],
        }).then((result) => {
          courseId = result.CourseId;
        });
        checkTeacher(courseId, userId);
        next();
        break;
    }
  };
};

const getAuth = () => {
  return (req, res, next) => {
    const userId = checkToken(req) || '';
    if (!userId) return next();
    User.findByPk(userId).then((user) => {
      // req 內設置 AuthTypeId 便於後續取得使用者身分進行操作
      req.userId = user.id;
      req.AuthTypeId = user.dataValues.AuthTypeId;
      console.log(user);
      return next();
    });
  };
};

// 判斷該課程是否已購買
checkCourseAuth = () => {
  return (req, res, next) => {
    const UserId = req.userId;
    const CourseId = req.params.id;
    if (!UserId) {
      req.isCourseBought = false;
      return next();
    }
    Paid_course.findOne({ where: { CourseId, UserId } }).then((result) => {
      console.log('check', result);
      if (!result) {
        req.isCourseBought = false;
        return next();
      }
      req.isCourseBought = true;
      return next();
    });
  };
};


module.exports = {
  setToken,
  checkToken,
  checkAuth,
  checkTeacherAuth,
  getAuth,
  checkCourseAuth,
};
