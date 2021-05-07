const { Router } = require("express");
const userController = require("../Controllers/userController");
const router = new Router();

const UserController = require("../Controllers/userController");
const Auth = require("../Middlewares/auth");

//Generella endpoints
router.post("/users",  UserController.register)
router.post("/authenticate", UserController.login)//Added
router.get("/me", Auth.user, UserController.me)//Added me, with working auth(send token in header at req)
router.patch("/me", Auth.user, UserController.updateUser)
router.get("/users/:id", Auth.user, userController.getOneUser)
//Admin endpoints
router.post("/users", Auth.admin, UserController.registerUser)


module.exports = router;
