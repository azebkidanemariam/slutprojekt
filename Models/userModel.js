const db = require("../Database/connection");

const { DataTypes } = require("sequelize");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { NotValid } = require("../Errors");
const { NotAuthorized } = require("../Errors");
const Message = require("./messageModel");
const Task = require("./taskModel");

const User = db.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Email already exists",
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    enum: ["admin", "worker", "client"],
    defaultValue: "worker",
  },
});

User.beforeCreate((user, options) => {
  user.password = bcrypt.hashSync(user.password, 10);
});

User.validateToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, { expiresIn: "1w" });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TokenExpired();
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new NotAuthorized();
    }
  }
};

//Added authenticate
User.authenticate = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotValid();
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (passwordMatch) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }; //Added user role
    return jwt.sign(payload, process.env.JWT_SECRET);
  } else {
    throw new NotValid();
  }
};
User.hasMany(Task, { foreignKey: "clientID" }); 
User.hasMany(Task, { foreignKey: "workerID" }); 
Task.hasMany(Message, { foreignKey: "taskID" }); 
User.hasMany(Message, { foreignKey: "authorID" });

module.exports = User;
