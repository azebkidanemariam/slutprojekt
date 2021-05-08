const db = require("../Database/connection")

const {DataTypes} = require("sequelize")
const Message = require("../Models/messageModel")
const { hasOne } = require("./userModel")

const Task = db.define("Task", {
    done: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    pic: {
        type: DataTypes.STRING,
        allowNull: true, 
    }

})

module.exports = Task