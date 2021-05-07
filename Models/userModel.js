const db = require("../Database/connection");

const { DataTypes } = require("sequelize");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

module.exports = User;
