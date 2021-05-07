const { NotAuthorized } = require("../Errors");
const User = require("../Models/userModel");

function extractToken(headers) {
  const { authorization } = headers;
  if (!authorization) {
    throw new NotAuthorized();
  }
  const token = authorization.replace("Bearer ", "");
  return token;
}
module.exports = {
  user: (req, res, next) => {
    const token = extractToken(req.headers);
    const user = User.validateToken(token);
    req.user = user;
    next();
  },
  admin: (req, res, next) => {
    const token = extractToken(req.headers);
    const user = User.validateToken(token);
    if (user.role !== "admin") {
      throw new NotAuthorized();
    }
    req.user = user;
    next();
  },
  worker: (req, res, next) => {
    const token = extractToken(req.headers);
    const user = User.validateToken(token);
    if (user.role !== "worker") {
      throw new NotAuthorized();
    }
    req.user = user;
    next();
  },
  client: (req, res, next) => {
    const token = extractToken(req.headers);
    const user = User.validateToken(token);
    if (user.role !== "client") {
      throw new NotAuthorized();
    }
    req.user = user;
    next();
  },
};
