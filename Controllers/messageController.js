const { InvalidBody, UserNotFound } = require("../Errors");
// const Task = require("../Models/taskModel")
const Message = require("../Models/messageModel");
const Task = require("../Models/taskModel");

module.exports = {
  async createMessage(req, res, next) {
    try {
      const UserID = req.user.id;
      const taskID = req.params.id; //FEL
      const task = await Task.findOne({ where: { id: taskID } });

      const { title, content } = req.body;
      if (!title || !content) {
        throw new InvalidBody(["title", "content"]);
      }
      await Message.create({ title, content, UserID, taskID });
      res.json({ message: "Message created" });
    } catch (error) {
      next(error);
    }
  },

  async deleteMessageById(req, res, next) {
    try {
      const { msgId, id } = req.params;

      const message = await Message.findAll({ where: { taskID: id } });
      console.log(message);
     
      res.json({ message });
    } catch (error) {
      next(error);
    }
  },
};
