const express = require('express');
const { checkAuth } = require('../middleware/auth');
const router = express.Router();

const userController = require('../controllers/user');
const courseController = require('../controllers/course');
const cartController = require('../controllers/cart');
const teacherController = require('../controllers/teacher');

// user
router.post('/user', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/user', checkAuth(3), userController.getAllUser);
router.get('/user/:id', checkAuth(3), userController.getUser);
router.patch('/user/:id', userController.updateUserAuth);
router.get('/me', userController.getMe);

// course
router.get('/courses', courseController.getCourseList);
router.get('/courses/:id', courseController.getCourse);
router.post('/courses', courseController.addCourse);
router.delete('/courses/:id', courseController.deleteCourse);
router.patch('/courses/:id', courseController.updateCourse);

// cart
router.get('/cartList', cartController.getCartList);
router.post('/cart-item/:id', cartController.addCartItem);
router.delete('/cart-item/:id', cartController.deleteCartItem);

// teacher
router.get('/teachers', teacherController.getTeacherList);
router.get('/teachers/:id', teacherController.getTeacher);
//router.post("/teachers", teacherController.addTeacher);
//router.delete("/teachers/:id", teacherController.deleteTeacher);
//router.patch("/teachers/:id", teacherController.updateTeacher);

module.exports = router;
