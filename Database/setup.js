const db = require("./connection")

const User = require("../Models/userModel")
const Task = require("../Models/taskModel")
const Message = require("../Models/messageModel")

db.sync()