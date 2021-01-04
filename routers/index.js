const express = require("express");
const { checkAuth, checkTeacherAuth, getAuth } = require("../middleware/auth");
const router = express.Router();

const userController = require("../controllers/user");
const courseController = require("../controllers/course");
const cartController = require("../controllers/cart");
const teacherController = require("../controllers/teacher");
const unitController = require("../controllers/unit");
const orderController = require('../controllers/order');

// user
router.post("/user", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/user", checkAuth('admin'), userController.getAllUser);
router.get("/user/:id", checkAuth('admin'), userController.getUser);
router.patch("/user/:id", userController.updateUserInfo);
router.patch("/user/password/:id", userController.updateUserPassword);
router.get("/me", userController.getMe);

// course
router.get("/courses", getAuth(), courseController.getCourseList);
router.get("/courses/:id", getAuth(), courseController.getCourse);
router.post("/courses", checkAuth('teacher'), courseController.addCourse);
// 避免影響已購買使用者，暫不提供刪除課程
//router.delete("/courses/:id", checkAuth('teacher'), courseController.deleteCourse);
router.patch("/courses/:id", checkAuth('teacher'), courseController.updateCourse);

// myCourse
router.get('/myCourses', checkAuth(), courseController.getMyCourseList);

// cart
router.get("/cartList", checkAuth(), cartController.getCartList);
router.post("/cart-item/:id", checkAuth(), cartController.addCartItem);
router.delete("/cart-item/:id", checkAuth(), cartController.deleteCartItem);

// order
router.get('/orders', checkAuth('admin'), orderController.getOrderList);
router.get('/orders/:id', checkAuth(), orderController.getOrder);
router.post('/orders/new', checkAuth(), orderController.receiveOrder);

// teacher
router.get("/teachers", getAuth(), teacherController.getTeacherList);
router.get("/teachers/:id", getAuth(), teacherController.getTeacher);
//router.post("/teachers", teacherController.addTeacher);
//router.delete("/teachers/:id", teacherController.deleteTeacher);
//router.patch("/teachers/:id", teacherController.updateTeacher);

// unit
router.get("/unit", checkAuth(), unitController.getUnitByCourseId);
router.get("/unit/:id", checkAuth(), unitController.getUnitById);
router.post("/unit", checkTeacherAuth("course"), unitController.addUnit);
router.patch("/unit/:id", checkTeacherAuth("unit"), unitController.updateUnit);
router.delete("/unit/:id", checkTeacherAuth("unit"), unitController.deleteUnit);
module.exports = router;
