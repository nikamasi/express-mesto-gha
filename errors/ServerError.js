const { StatusCodes } = require('http-status-codes');

class ServerError extends Error {
  constructor() {
    super('Server error.');
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

module.exports = ServerError;
