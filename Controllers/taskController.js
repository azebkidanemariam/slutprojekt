const Task = require("../Models/taskModel");
const Message = require("../Models/messageModel");
const User = require("../Models/userModel");

const { InvalidBody, UserNotFound } = require("../Errors");

module.exports = {
  async createTask(req, res, next) {
    try {
      const workerID = req.user.id;
      const { done, title, email } = req.body;
      if (!done || !title || !email) {
        throw new InvalidBody(["done", "title"]);
      }
      const client = await User.findOne({ where: { email: email } });
      if (!client) {
        throw new UserNotFound("Customer");
      }
      await Task.create({
        done,
        title,
        workerID,
        clientID: client.id,
      });
      res.json({ message: "Task registered" });
    } catch (error) {
      next(error);
    }
  },
  async getTaskByReciverId(req, res, next) {
    try {
      const { reciverId } = req.query;
      if (!reciverId) {
        throw new InvalidBody(["reciverId"]);
      }

      const task = await Task.findAll({
        where: { reciverId: reciverId },
        // attributes: { exclude: ["password", "id", "createdAt", "updatedAt"] },
      });
      res.json({ task });
    } catch (error) {
      next(error);
    }
  },
};
