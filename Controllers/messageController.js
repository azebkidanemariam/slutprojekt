const {
  InvalidBody,
  UserNotFound,
  MessageNotFound,
  NotAuthorized,
} = require("../Errors");
const { client, worker } = require("../Middlewares/auth");
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
      res.json({
        message: `Message created succesfully by ${req.user.role.toUpperCase()}`,
      });
    } catch (error) {
      next(error);
    }
  },
  // async createMessage(req, res, next) {
  //   try {
  //     const authorID = req.user.id;
  //     const taskID = req.params.id;
  //     const task = await Task.findOne({ where: { id: authorID } });

  //     const { title, content } = req.body;
  //     if (!title || !content) {
  //       throw new InvalidBody(["title", "content"]);
  //     }
  //     const user = await User.findOne({ where: { id: authorID } });
  //     if (req.user.role !== "worker" || req.user.role !== "client") {
  //       throw new NotAuthorized();
  //     }
  //     await Message.create({ title, content, authorID, taskID });
  //     res.json({ message: "Message created" });
  //   } catch (error) {
  //     next(error);
  //   }
  // },

  //Error handler with string temp lit doesn't work?
  async deleteMessageById(req, res, next) {
    try {
      const { id } = req.params;
      const authorID = req.user.id;

      const message = await Message.findOne({ where: { id } });

      if (!message) {
        throw new MessageNotFound();
      }
      if (req.user.role !== "admin" && req.user.role !== "client") {
        //?? en till för worker?
        throw new NotAuthorized();
      } else {
        await message.destroy();
        res.json({
          message: `Message with id ${id} deleted by ${req.user.role.toUpperCase()}`,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async getMessage(req, res, next) {
    try {
      switch (req.user.role) {
        case "admin":
        case "worker":
          await getWorkerMessages(req, res, next);
          break;

        case "client":
          await getClientMessages(req, res, next);
          break;

        default:
          console.log("Message Not Found!!");
      }
    } catch (error) {
      console.log(error);
    }
  },
};

const getClientMessages = async (req, res, next) => {
  try {
    const taskID = req.params;
    const authorID = req.user.id;
    const messages = await Message.findAll({
      where: { taskID: req.params.taskID },
    });
    res.json({ messages });
  } catch (error) {
    next(error);
  }
};

const getWorkerMessages = async (req, res, next) => {
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
};
