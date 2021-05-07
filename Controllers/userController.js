const { InvalidBody, UserNotFound } = require("../Errors");
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

  //added login
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await User.authenticate(email, password);
      res.json({ token, email });
    } catch (error) {
      next(error);
    }
  },

  //added update user name and email, can be updated further with password change
  async updateUser(req, res, next) {
    try {
      const id = req.user.id
      const { name, email } = req.body
      const fields = {}
      if (name) fields.name = name
      if (email) fields.email = email

      const user = await User.findOne({ where: { id } })
      console.log(user);

      await User.update(fields, { where: { id } })
      res.json({ message: "User info updated" })
    } catch (error) {
      next(error)
    }
  },

  //Added me
  me(req, res, next) {
    const user = req.user
    res.json({ user })
  },

  //added get one user
  async getOneUser(req, res, next) {
    // const { id } = req.params;
    const id = req.body.id//Fixed
    console.log(id);
    const user = await User.findOne({ where: { id } });
    console.log(user);
    if (!user) {
      throw new UserNotFound()
    }
    res.json({ user })
  },

  //Admin functions
  async registerUser(req, res, next) {
    try {
      const { email, name, password } = req.body;
      console.log(req.body);

      if (!email || !name || !password) {
        throw new InvalidBody(["email", "name", "password"]);
      }

      const user = await User.create({ email, name, password });
      res.json({ message: "User registered" })
    } catch (error) {
      next(error)
    }
  }



};
