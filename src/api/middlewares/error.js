import httpStatus from 'http-status';
import expressValidation from 'express-validation';
import APIError from '../utils/APIError';
import { env } from '../../configs/vars';

export const handler = (err, req, res, next) => {
  const { status, message, errors, stack } = err;
  const response = {
    errors,
    stack,
    message: message || httpStatus[status],
    code: status,
  };

  if (env !== 'development') {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
};

export const converter = (err, req, res, next) => {
  let convertedError = err;
  if (err instanceof expressValidation.ValidationError) {
    convertedError = new APIError({
      message: 'Validation Error',
      errors: err.errors,
      status: err.status,
      stack: err.stack,
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });

    return handler(convertedError, req, res);
  }
};

export const notFound = (req, res, next) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });

  return handler(err, req, res);
};
