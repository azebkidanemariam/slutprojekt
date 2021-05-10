const db = require("../Database/connection");

const { DataTypes } = require("sequelize");

const Task = require("../Models/taskModel");
const User = require("../Models/userModel");
const { models } = require("../Database/connection");

const Message = db.define("Message", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Message;
