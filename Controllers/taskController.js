const Task = require("../Models/taskModel");
const Message = require("../Models/messageModel");
const User = require("../Models/userModel");

const { InvalidBody, UserNotFound, TaskNotFound } = require("../Errors");
const { user, client } = require("../Middlewares/auth");

module.exports = {
  //Admin
  async deleteTaskById(req, res, next) {
    try {
      const { id } = req.params;

      const task = await Task.findByPk(id);
      if (!task) {
        throw new TaskNotFound();
      }
      await task.destroy();
      res.json({ message: "Task wasted!" });
    } catch (error) {
      next(error);
    }
  },

  //Worker
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

  async updateTaskById(req, res, next) {
    try {
      const { id } = req.params;
      const { title, pic, done } = req.body;
      const fields = {};
      if (title) fields.title = title;
      if (pic) fields.pic = pic;
      if (done) fields.done = done;

      const task = await Task.findByPk(id);
      if (!task) {
        throw new TaskNotFound();
      }
      await Task.update(fields, { where: { id } });
      res.json({ message: "Task updated!" });
    } catch (error) {
      next(error);
    }
  },

  //Client
  async getClientTasks(req, res, next) {
    try {
      const page = +req.params.page || 0;
      const clientID = req.user.id;
      console.log(req.user);
      const task = await Task.findAll({
        limit: 2,
        offset: (page - 1) * 2,
        where: { clientID },
      });
      res.json({ task });
    } catch (error) {
      next(error);
    }
  },
};
