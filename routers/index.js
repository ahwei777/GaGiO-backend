const express = require("express");
const { checkAuth } = require("../middleware/auth");
const router = express.Router();

const userController = require("../controllers/user");

router.post("/user", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/user", checkAuth(3), userController.getAllUser);
router.get("/user/:id", checkAuth(3), userController.getUser);
router.patch("/user/:id", userController.updateUserAuth);
router.get("/me", userController.getMe);
module.exports = router;
