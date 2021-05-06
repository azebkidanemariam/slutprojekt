const { InvalidBody } = require("../Errors");
const User = require("../Models/userModel");

module.exports = {
  async register(req, res, next) {
    try {
      const { email, name, password, role } = req.body;
      if (!email || !name || !password || !role) {
        throw new InvalidBody(["email", "name", "password", "role"]);
      }
      const user = await User.create({ email, name, password, role });
      res.json({ message: "User registered" });
    } catch (error) {
      next(error);
    }
  },
};
