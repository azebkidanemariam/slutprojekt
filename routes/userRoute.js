const { Router } = require("express");
const userController = require("../Controllers/userController");
const taskController = require("../Controllers/taskController");
const messageController = require("../Controllers/messageController");
const router = new Router();
const Auth = require("../Middlewares/auth");

//Generella endpoints
router.post("/authenticate", userController.login);
router.get("/me", Auth.user, userController.me);
router.patch("/me", Auth.user, userController.updateUserProfile);
router.get("/users", userController.getUsers);
router.get("/users/:name", Auth.user, userController.getUserByName);
router.get("/users/:id", Auth.user, userController.getOneUser);
//Admin endpoints
router.post("/users", Auth.admin, userController.register);
router.patch("/users/:id", Auth.admin, userController.updateUser);
router.delete("/users/:id", Auth.admin, userController.deleteUser);
router.delete("/tasks/:id", Auth.admin, taskController.deleteTaskById);

//Worker endpoints
router.post("/tasks", Auth.worker, taskController.createTask);
router.get("/tasks/:id", Auth.worker, taskController.getTaskById);
router.post("/tasks/:id/messages", Auth.user, messageController.createMessage);
router.patch("/tasks/:id", Auth.worker, taskController.updateTaskById);
router.get(
  "/tasks/:taskID/messages/:page",
  Auth.user,
  messageController.getMessage
);
router.get(
  "/alltasks/:page",
  Auth.user,
  taskController.getTasks
);

//client endpoints
router.delete("/messages/:id", Auth.user, messageController.deleteMessageById);
router.post("/tasks/:id/image", Auth.worker, taskController.uploadImage);

module.exports = router;
