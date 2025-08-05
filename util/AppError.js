// AppError.js
// Custom error class for handling application errors
// This class extends the built-in Error class to provide additional properties
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    //* this means that this error is expected and i can manage it
    this.isOperational = true;
  }
}
module.exports = AppError;
