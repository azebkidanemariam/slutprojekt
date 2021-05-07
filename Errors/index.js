class BasicError extends Error {}

class InvalidBody extends BasicError {
  constructor(fields) {
    super();
    this.message = 'Invalid Body, required fields: ${this.fields.join(", ")} ';
    this.errorCode = 400;
  }
}

class NotValid extends BasicError {
  constructor() {
    super();
    this.message = "Not Valid";
    this.errorCode = 403;
  }
}

class NotAuthorized extends BasicError {
  constructor() {
    super();
    this.message = "Not Authorized";
    this.errorCode = 401;
  }
}

class TokenExpired extends BasicError {
  constructor() {
    super();
    this.message = "Token expired , please try again later";
    this.errorCode = 401;
  }
}

class UserNotFound extends BasicError {
  constructor() {
    super();
    this.message = `User with id ${id} not found`;
    this.errorCode = 404;
  }
}

module.exports = {
  BasicError,
  InvalidBody,
  NotValid,
  NotAuthorized,
  TokenExpired,
  UserNotFound,
};
