const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const courseController = require("../controllers/course");
const cartController = require("../controllers/cart");

router.post("/user", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/user", userController.getAllUser);
router.get("/user/:id", userController.getUser);
router.patch("/user/:id", userController.updateUserAuth);
router.get("/me", userController.getMe);

router.get("/courses", courseController.getCourseList);
router.get("/courses/:id", courseController.getCourse);
router.post("/courses", courseController.addCourse);
router.delete("/courses/:id", courseController.deleteCourse);
router.patch("/courses/:id", courseController.updateCourse);

router.get("/cartList", cartController.getCartList);
router.post("/cart-item/:id", cartController.addCartItem);
router.delete("/cart-item/:id", cartController.deleteCartItem);

module.exports = router;
