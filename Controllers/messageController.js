const { InvalidBody, UserNotFound } = require("../Errors");
const Message = require("../Models/messageModel");

module.exports = {
  async createMessage(req, res, next) {
    try {
      const workerID = req.user.id;
      const taskID = req.user.id

      const { title, content } = req.body;
      if (!title || !content) {
        throw new InvalidBody(["title", "content"]);
      }
      await Message.create({ title, content, workerID, taskID });
      res.json({ message: "Message registered" });
    } catch (error) {
      next(error);
    }
  },
};
