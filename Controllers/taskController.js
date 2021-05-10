const Task = require("../Models/taskModel");

const { InvalidBody, UserNotFound } = require("../Errors");

module.exports = {
  async createTask(req, res, next) {
    try {
      const { done } = req.body;
      if (!done) {
        throw new InvalidBody(["done"]);
      }
      await Task.create({ done });
      res.json({ message: "Task registered" });
    } catch (error) {
      next(error);
    }
  },
};
