const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.post("/user", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/user", userController.getAllUser);
router.get("/user/:id", userController.getUser);
router.patch("/user/:id", userController.updateUserAuth);
router.get("/me", userController.getMe);
module.exports = router;
