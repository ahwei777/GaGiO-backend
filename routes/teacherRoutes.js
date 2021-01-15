const express = require('express');
const { getAuth } = require('../middleware/auth');
const teacherRouter = express.Router();
const teacherController = require('../controllers/teacher');

// teacher
teacherRouter.get('/teachers', getAuth(), teacherController.getTeacherList);
teacherRouter.get('/teachers/:id', getAuth(), teacherController.getTeacher);
//teacherRouter.post("/teachers", teacherController.addTeacher);
//teacherRouter.delete("/teachers/:id", teacherController.deleteTeacher);
//teacherRouter.patch("/teachers/:id", teacherController.updateTeacher);

module.exports = teacherRouter;
