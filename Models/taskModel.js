const db = require("../Database/connection")

const {DataTypes} = require("sequelize")
const Message = require("../Models/messageModel")
const { hasOne } = require("./userModel")
const User = require("../Models/userModel")

const Task = db.define("Task", { //!vi lägger till ett id som primary key då blir de andra tabellerna foreign keys.
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    done: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    pic: {
        type: DataTypes.STRING,
        allowNull: true, 
    }

})
// User.hasMany(Task) 
// Task.belongsTo(User)
module.exports = Task
