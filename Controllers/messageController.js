const { InvalidBody, UserNotFound, MessageNotFound } = require("../Errors");
const { client } = require("../Middlewares/auth");
const Message = require("../Models/messageModel");
const Task = require("../Models/taskModel");
const User = require("../Models/userModel");

module.exports = {
  async createMessage(req, res, next) {
    try {
      const authorID = req.user.id;
      const taskID = req.params.id;
      const task = await Task.findOne({ where: { id: authorID } });

      const { title, content } = req.body;
      if (!title || !content) {
        throw new InvalidBody(["title", "content"]);
      }
      const user = await User.findOne({ where: { id: authorID } });
      await Message.create({ title, content, authorID, taskID });
      res.json({ message: "Message created" });
    } catch (error) {
      next(error);
    }
  },

  //Error handler with string temp lit doesn't work?
  async deleteMessageById(req, res, next) {
    try {
      const { id } = req.params;
      const authorID = req.user.id;

      const message = await Message.findOne({ where: { id } });
      if (!message) {
        throw new MessageNotFound();
      }
      await message.destroy();
      res.json({ message: `Message with id ${id} wasted!` });
    } catch (error) {
      next(error);
    }
  },

  async getClientMessages(req, res, next) {
    try {
      const taskID = req.params;
      const authorID = req.user.id
      console.log(taskID)
      const messages = await Message.findAll({
        where: { taskID: req.params.taskID },
      });
      res.json({ messages });
    } catch (error) {
      next(error);
    }
  },

  async getWorkerMessages(req, res, next) {
    try {
      const page = +req.params.page || 0;
      const taskID = req.params;
      const authorID = req.user.id;
      const messages = await Message.findAll({
        order: [["createdAt", "DESC"]],
        limit: 5,
        offset: (page - 1) * 5,
        where: { taskID: req.params.taskID },
      });
      res.json({ messages });
    } catch (error) {
      next(error);
    }
  },
};
