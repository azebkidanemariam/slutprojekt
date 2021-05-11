const Task = require("../Models/taskModel");
const Message = require("../Models/messageModel");
const User = require("../Models/userModel");

const { InvalidBody, UserNotFound } = require("../Errors");
const { user, client } = require("../Middlewares/auth");

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
  async getTaskById(req, res, next) {
    try {
      const { id } = req.query;

      if (!id) {
        throw new NotValid(["id"]);
      }

      const task = await Task.findAll({
        where: { id: id },
      });

      res.json({ task });
    } catch (error) {
      next(error);
    }
  },

  async getClientTasks(req, res, next) {
    try {
      const page = +req.params.page || 0;
      const clientID = req.user.id;
      console.log(req.user);
      const task = await Task.findAll({
        limit: 10,
        offset: (page - 1) * 10,
        where: { clientID },
      });
      res.json({ task });
    } catch (error) {
      next(error);
    }
  },
}
