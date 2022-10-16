const { StatusCodes } = require('http-status-codes');

class AccessDeniedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = AccessDeniedError;
