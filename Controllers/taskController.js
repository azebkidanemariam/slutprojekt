const Task = require("../Models/taskModel");
const Message = require("../Models/messageModel");
const User = require("../Models/userModel");

const { InvalidBody, UserNotFound } = require("../Errors");

module.exports = {
  async createTask(req, res, next) {
    try {
      const { done, title } = req.body;
      if (!done || !title) {
        throw new InvalidBody(["done", "title"]);
      }
      const UserId = req.user.id;
      // const MessageId = req.user.id;
      await Task.create({
        done,
        title,
        UserId,
      });
      res.json({ message: "Task registered" });
    } catch (error) {
      next(error);
    }
  },
};
