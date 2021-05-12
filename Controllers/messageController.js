const { InvalidBody, UserNotFound } = require("../Errors");
const Message = require("../Models/messageModel");

module.exports = {
  async createMessage(req, res, next) {
    try {
      const UserID = req.user.id;
      const taskID = req.user.id;

      const { title, content } = req.body;
      if (!title || !content) {
        throw new InvalidBody(["title", "content"]);
      }
      await Message.create({ title, content, UserID, taskID });
      res.json({ message: "Message registered" });
    } catch (error) {
      next(error);
    }
  },

  async deleteMessageById(req, res, next) {
    try{
      const {id} = req.params

      const message = await Message.findByPk(id)
      await message.destroy()
      res.json({message: "Message wasted!"})

    } catch(error) {
      next(error);
    }
  }
};
