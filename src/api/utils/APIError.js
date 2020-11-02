import httpStatus from 'http-status';

class ExtendableError extends Error {
  constructor({ message, errors, status, isPublic, stack, details }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true;
    this.stack = stack;
    this.details = details;
  }
}

class APIError extends ExtendableError {
  constructor({
    message,
    errors,
    stack,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
    details,
  }) {
    super({
      message,
      errors,
      status,
      isPublic,
      stack,
      details,
    });
  }
}

export default APIError;
