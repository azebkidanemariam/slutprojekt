const Task = require("../Models/taskModel");
const Message = require("../Models/messageModel");
const User = require("../Models/userModel");
const path = require("path");
const { v4: uuid } = require("uuid");
const fileupload = require("express-fileupload");
const { InvalidBody, UserNotFound, TaskNotFound } = require("../Errors");
const { user, client } = require("../Middlewares/auth");

module.exports = {
  //Admin
  async deleteTaskById(req, res, next) {
    try {
      const { id } = req.params;

      const task = await Task.findByPk(id);
      if (!task) {
        throw new TaskNotFound(id);
      }
      await task.destroy();
      res.json({
        message: `Task deleted succesfully by ${req.user.role.toUpperCase()}`,
      });
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
      res.json({
        message: `Task created succesfully by ${req.user.role.toUpperCase()}`,
      });
    } catch (error) {
      next(error);
    }
  },

  async getTaskById(req, res, next) {
    try {
      const { id } = req.params;

      const task = await Task.findByPk(id);
      if (!task) {
        throw new TaskNotFound(id);
      }

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
        throw new TaskNotFound(id);
      }
      await Task.update(fields, { where: { id } });
      res.json({
        message: `Task updated succesfully by ${req.user.role.toUpperCase()}`,
      });
    } catch (error) {
      next(error);
    }
  },

  async uploadImage(req, res, next) {
    try {
      const id = req.params.id;
      const task = await Task.findByPk(id);
      if (!task) {
        throw new TaskNotFound(id);
      }
      const file = req.files.pic;

      const extension = path.extname(file.name);
      const newFileName = uuid() + extension;
      const outputPath = path.join("uploads", newFileName);
      file.mv(outputPath);

      if (task.pic) {
        path.join("uploads", task.pic);
      }
      task.pic = newFileName;
      await task.save();
      res.json({
        message: `Picture uploaded succesfully by ${req.user.role.toUpperCase()}`,
      });
    } catch (error) {
      next(error);
    }
  },
  async getTasks(req, res, next) {
    switch (req.user.role) {
      case "client":
        getClientTasks(req, res, next);
        break;
      case "worker":
        getWorkerTasks(req, res, next);
        break;
    }
  },
};
const getClientTasks = async (req, res, next) => {
  try {
    const page = +req.params.page || 0;
    const clientID = req.user.id;

    const task = await Task.findAll({
      limit: 5,
      offset: (page - 1) * 5,
      where: { clientID },
    });
    res.json({ task });
  } catch (error) {
    next(error);
  }
};
//Worker
const getWorkerTasks = async (req, res, next) => {
  try {
    const page = +req.params.page || 0;
    const workerID = req.user.id;

    const task = await Task.findAll({
      limit: 5,
      offset: (page - 1) * 5,
      where: { workerID },
    });
    res.json({ task });
  } catch (error) {
    next(error);
  }
};
