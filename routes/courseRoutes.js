const express = require('express');
const { checkAuth, getAuth, checkCourseAuth, checkTeacherAuth } = require('../middleware/auth');
const courseRouter = express.Router();
const courseController = require('../controllers/course');
const unitController = require('../controllers/unit');

// /courses

courseRouter.get('/', getAuth(), courseController.getAllCourses);
courseRouter.get('/:courseId', getAuth(), courseController.getCourse);
courseRouter.post('/', checkAuth('teacher'), courseController.addCourse);
// 避免影響已購買使用者，暫不提供刪除課程
//courseRouter.delete("/courses/:courseId", checkAuth('teacher'), courseController.deleteCourse);
courseRouter.patch(
  '/:courseId',
  checkAuth('teacher'),
  courseController.updateCourse
);

// 移到 users/me
// boughtCourse

courseRouter.get(
  '/boughtCourses',
  checkAuth('admin'),
  courseController.getBoughtCourse
);

// unit
courseRouter.get(
  "/:courseId/units",
  checkAuth(),
  checkCourseAuth(),
  unitController.getAllUnitsByCourseId
);
courseRouter.get("/:courseId/units/:unitId", checkAuth(), unitController.getUnitByUnitId);
//ourseRouter.post("/unit", checkTeacherAuth("course"), unitController.addUnit);
courseRouter.patch("/:courseId/units", checkTeacherAuth("unit"), unitController.updateUnit);
courseRouter.delete("/unit/:id", checkTeacherAuth("unit"), unitController.deleteUnit);

module.exports = courseRouter;
