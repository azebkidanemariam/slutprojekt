const { Router } = require("express");
const router = new Router();

const UserController = require("../Controllers/userController");
const Auth = require("../Middlewares/auth");

router.post("/users",  UserController.register);

module.exports = router;
