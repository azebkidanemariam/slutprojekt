const db = require("../Database/connection");

const { DataTypes } = require("sequelize");
const Message = require("../Models/messageModel");
const User = require("../Models/userModel");
const { models } = require("../Database/connection");

const Task = db.define("Task", {
  //!vi lägger till ett id som primary key då blir de andra tabellerna foreign keys.

  title: {
    type: DataTypes.STRING,
    defaultValue: "Untitled task",
  },

  pic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  done: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});

module.exports = Task;
