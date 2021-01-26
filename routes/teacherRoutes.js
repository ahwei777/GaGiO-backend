const express = require('express');
const { getAuth, checkAuth } = require('../middleware/auth');
const teacherRouter = express.Router();
const teacherController = require('../controllers/teacher');

// teacher
teacherRouter.get('/', getAuth(), teacherController.getTeacherList);
teacherRouter.get('/:id', getAuth(), teacherController.getTeacher);
teacherRouter.post('/', checkAuth(), teacherController.addTeacher);
teacherRouter.patch('/', checkAuth('teacher'), teacherController.updateTeacherInfo);
//teacherRouter.post("/teachers", teacherController.addTeacher);
//teacherRouter.delete("/teachers/:id", teacherController.deleteTeacher);
//teacherRouter.patch("/teachers/:id", teacherController.updateTeacher);

module.exports = teacherRouter;
