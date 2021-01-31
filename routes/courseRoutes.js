const express = require('express');
const { checkAuth, getAuth, checkCourseAuth } = require('../middleware/auth');
const courseRouter = express.Router();
const courseController = require('../controllers/course');

// /courses
courseRouter.get('/', getAuth(), courseController.getAllCourses);
courseRouter.get('/:courseId', getAuth(), courseController.getCourse);
courseRouter.post('/', checkAuth('teacher'), courseController.addCourse);
// 避免影響已購買使用者，暫不提供刪除課程
//courseRouter.delete("/courses/:courseId", checkAuth('teacher'), courseController.deleteCourse);
courseRouter.patch(
  '/:courseId',
  checkAuth('updateCourse'),
  courseController.updateCourse
);

// teach-course
courseRouter.get(
  '/teach-courses/me',
  checkAuth('teacher'),
  courseController.getMyTeachCourses
);
// bought-course
courseRouter.get(
  '/bought-courses/me',
  checkAuth(),
  courseController.getMyBoughtCourses
);
courseRouter.get(
  '/bought-courses',
  checkAuth('admin'),
  courseController.getBoughtCourses
);

// 有購買的學生, 該堂課老師, 管理員
courseRouter.get(
  '/detail/:courseId',
  checkAuth('ownCourse'),
  courseController.getDetailCourse
);
courseRouter.get(
  '/:courseId/units/:unitId',
  checkAuth('ownCourse'),
  courseController.getUnitByUnitId
);
// 該堂課老師或管理員
courseRouter.patch(
  '/:courseId/units/:unitId',
  checkAuth('updateCourse'),
  courseController.updateUnitByUnitId
);

// unit
/*
courseRouter.get(
  "/:courseId/units",
  checkAuth(),
  checkCourseAuth(),
  unitController.getAllUnitsByCourseId
);
courseRouter.patch("/:courseId/units", checkAuth('teacher'), unitController.updateUnitByCourseId);
ourseRouter.post("/unit", checkTeacherAuth("course"), unitController.addUnit);
courseRouter.delete("/unit/:id", checkTeacherAuth("unit"), unitController.deleteUnitByCourseId);
*/

module.exports = courseRouter;
