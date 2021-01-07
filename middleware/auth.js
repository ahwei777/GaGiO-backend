const db = require("../models");
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_KEY || "test_key";
const { User, Course, Teacher, Unit } = db;

const setToken = (userId) => {
  const token = jwt.sign({ userId: userId.toString() }, jwtSecretKey, {
    expiresIn: "1 day",
  });
  return token;
};

const checkToken = (req) => {
  if (!req.header("Authorization")) return;
  const token = req.header("Authorization").replace("Bearer ", "");
  return jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) return;
    return decoded.userId;
  });
};

const getAuth = () => {
  return (req, res, next) => {
    const userId = checkToken(req) || "";
    if (!userId) return next();
    User.findByPk(userId).then((user) => {
      // req 內設置 userId, AuthTypeId 便於後續取得使用者身分進行操作
      req.userId = user.id;
      req.authTypeId = user.AuthTypeId;
      return next();
    });
  };
};

const checkAuth = (identity) => {
  return (req, res, next) => {
    const userId = checkToken(req) || "";
    if (!userId)
      return res.status(400).json({
        ok: 0,
        errorMessage: "cannot find token!",
      });
    User.findByPk(userId, {
      include: [{ model: Teacher, attributes: ["id"] }],
    }).then((user) => {
      console.log("user", user);
      if (!user)
        return res.status(404).json({
          ok: 0,
          errorMessage: "cannot find user !",
        });
      // req 內設置 id 便於後續取得使用者身分進行操作
      req.userId = user.id;
      req.authTypeId = user.AuthTypeId;
      switch (identity) {
        case "admin":
          if (user.AuthTypeId !== 3)
            return res.status(403).json({
              ok: 0,
              errorMessage: "permission denied",
            });
          return next();
        case "teacher":
          // 尚未成為 Teacher
          if (!user.Teacher)
            return res.status(403).json({
              ok: 0,
              errorMessage: "permission denied",
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
    attributes: ["id", "TeacherId"],
    include: [{ model: Teacher, attributes: ["UserId"] }],
  })
    .then((course) => {
      if (!course) return 404;
      if (course.Teacher.UserId !== userId) return 401;
      return 200;
    })
    .catch((error) => console.log(error));
};
const checkTeacherAuth = (controller) => {
  return async (req, res, next) => {
    const userId = Number(checkToken(req));
    let courseId;
    let authStatus;
    switch (controller) {
      case "course":
        courseId = req.params.id || req.body.courseId;
        if (!courseId)
          return res.status(400).json({
            ok: 0,
            errorMessage: "course id is required",
          });
        authStatus = await checkTeacher(courseId, userId);
        switch (authStatus) {
          case 404:
            return res.status(404).json({
              ok: 0,
              errorMessage: "Cannot find course",
            });
          case 401:
            return res.status(401).json({
              ok: 0,
              errorMessage: "Unauthorized",
            });
          case 200:
            next();
            break;
        }
        break;
      case "unit":
        const unitListId = req.params.id;
        Unit.findOne({
          where: { id: unitListId },
          attributes: ["CourseId"],
        }).then(async (result) => {
          courseId = result.CourseId;
          authStatus = await checkTeacher(courseId, userId);
          switch (authStatus) {
            case 404:
              return res.status(404).json({
                ok: 0,
                errorMessage: "Cannot find course",
              });
            case 401:
              return res.status(401).json({
                ok: 0,
                errorMessage: "Unauthorized",
              });
            case 200:
              next();
              break;
          }
        });
        break;
    }
  };
};

module.exports = {
  setToken,
  checkToken,
  checkAuth,
  checkTeacherAuth,
  getAuth,
};
