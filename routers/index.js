const express = require("express");
const { checkAuth, checkTeacherAuth, getAuth } = require("../middleware/auth");
const router = express.Router();

const userController = require("../controllers/user");
const courseController = require("../controllers/course");
const cartController = require("../controllers/cart");
const teacherController = require("../controllers/teacher");
const unitController = require("../controllers/unit");

// user
router.post("/user", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/user", checkAuth(3), userController.getAllUser);
router.get("/user/:id", checkAuth(3), userController.getUser);
router.patch("/user/:id", userController.updateUserInfo);
router.patch("/user/password/:id", userController.updateUserPassword);
router.get("/me", userController.getMe);

// course
router.get("/courses", getAuth(), courseController.getCourseList);
router.get("/courses/:id", getAuth(), courseController.getCourse);
router.post("/courses", checkAuth(3), courseController.addCourse);
router.delete(
  "/courses/:id",
  checkTeacherAuth(course),
  courseController.deleteCourse
);
router.patch(
  "/courses/:id",
  checkTeacherAuth("course"),
  courseController.updateCourse
);

// cart
router.get("/cartList", checkAuth(1), cartController.getCartList);
router.post("/cart-item/:id", checkAuth(1), cartController.addCartItem);
router.delete("/cart-item/:id", checkAuth(1), cartController.deleteCartItem);

// teacher
router.get("/teachers", getAuth(), teacherController.getTeacherList);
router.get("/teachers/:id", getAuth(), teacherController.getTeacher);
//router.post("/teachers", teacherController.addTeacher);
//router.delete("/teachers/:id", teacherController.deleteTeacher);
//router.patch("/teachers/:id", teacherController.updateTeacher);

// unit
router.get("/unit", checkAuth(1), unitController.getUnitByCourseId);
router.get("/unit/:id", checkAuth(1), unitController.getUnitById);
router.post("/unit", checkTeacherAuth("course"), unitController.addUnit);
router.patch("/unit/:id", checkTeacherAuth("unit"), unitController.updateUnit);
router.delete("/unit/:id", checkTeacherAuth("unit"), unitController.deleteUnit);
module.exports = router;
