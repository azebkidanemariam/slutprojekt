const { Router } = require("express");
const userController = require("../Controllers/userController");
const taskController = require("../Controllers/taskController");
const messageController = require("../Controllers/messageController");
const router = new Router();
const Auth = require("../Middlewares/auth");

//Generella endpoints
router.post("/authenticate", userController.login); //Added
router.get("/me", Auth.user, userController.me); //Added me, with working auth(send token in header at req)
router.patch("/me", Auth.user, userController.updateUserProfile);
router.get("/users", Auth.user, userController.getUserByName); //http://localhost:5000/users?name=kaj Dabrowski
router.get("/users/:id", Auth.user, userController.getOneUser);
//Admin endpoints
router.post("/users",Auth.admin, userController.register);
router.patch("/users/:id", Auth.admin, userController.updateUser);
router.delete("/users/:id", Auth.admin, userController.deleteUser);
router.delete("/tasks/:id", Auth.admin, taskController.deleteTaskById);

//Worker endpoints
router.post("/tasks", Auth.worker, taskController.createTask);
router.get("/tasks", Auth.worker, taskController.getTaskById); //(http://localhost:5000/tasks?reciverId=5() Hämtar ett ärende
router.post("/tasks/:id/messages", Auth.user, messageController.createMessage);//specify auth user role
// router.post("/tasks/:id/messages", Auth.all_users, messageController.createMessage);//new experment
router.patch("/tasks/:id", Auth.worker, taskController.updateTaskById);
// router.get("/temptasks/:taskID/messages/:page", Auth.worker, messageController.getWorkerMessages);
router.get("/tasks/:taskID/messages/:page", Auth.user, messageController.getMessage);


//client endpoints
router.delete("/messages/:id", Auth.user, messageController.deleteMessageById); //this can be improved with user role
// router.get("/temptasks/:page", Auth.client, taskController.getClientTasks); 
// router.get("/tasks/:taskID/messages", Auth.client, messageController.getClientMessages)
router.post("/tasks/:id/image", Auth.worker,taskController.uploadImage)

module.exports = router;

