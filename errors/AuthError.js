const { StatusCodes } = require('http-status-codes');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = AuthError;
