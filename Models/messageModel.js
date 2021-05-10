const db = require("../Database/connection");

const { DataTypes } = require("sequelize");

const Task = require("../Models/taskModel");
const User = require("../Models/userModel");
const { models } = require("../Database/connection");

const Message = db.define("Message", {
  Message_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Task_id: {
    type: DataTypes.INTEGER,
    primaryKey: false,
    references: {
      model: "Tasks",// s added
      key: "Task_id",
    },
    onDelete: "cascade",
    onUpdate: "cascade",
    unique: "unique-task-per-user",
  },
});
Message.associate = (models) => {
  Message.belongsTo(Task, {
    foreignKey: "Task_id",
    targetKey: "Task_id",
    as: "Task",
  });

  Message.belongsToMany(User, {
    as: "User",
    through: Task,
    foreignKey: "Message_id",
  });
};
module.exports = Message;
