const db = require("../Database/connection");

const { DataTypes } = require("sequelize");
const Message = require("../Models/messageModel");
const User = require("../Models/userModel");
const { models } = require("../Database/connection");

const Task = db.define("Task", {
  //!vi lägger till ett id som primary key då blir de andra tabellerna foreign keys.
  Task_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    defaultValue: "Untitled task",
  },
  User_id: {
    type: DataTypes.INTEGER,
    primaryKey: false,
    references: {
      model: "Users",//s added
      key: "User_id",
    },
    onDelete: "cascade",
    onUpdate: "cascade",
    unique: "unique-user-per-message",
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
Task.associate = (models) => {
  Task.belongsTo(User, {
    foreignKey: "User_id",
    targetKey: "User_id",
    as: "User",
  });
};

module.exports = Task;
