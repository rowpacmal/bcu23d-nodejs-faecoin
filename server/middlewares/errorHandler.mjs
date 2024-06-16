import DataResponse from '../models/DataResponse.mjs';
import ErrorResponse from '../models/ErrorResponse.mjs';
import FileHandler from '../models/FileHandler.mjs';

const errorHandler = (err, req, res, next) => {
  let error = { ...err, message: err.message };

  if (error.code === 11000)
    error = new ErrorResponse('Resource already exists', 400);

  if (err.name === 'JsonWebTokenError')
    error = new ErrorResponse('Invalid token, access denied', 401);

  if (err.name === 'ValidationError') {
    const validation = Object.values(err.errors)
      .map((value) => value.message)
      .join(', ');

    error = new ErrorResponse(`Invalid request, ${validation}`, 400);
  }

  const statusCode = error.statusCode || 500;
  new FileHandler('logs', 'error.log').append(`${error.message}\n\n`);

  res
    .status(statusCode)
    .json(new DataResponse({ error: error.message, statusCode }));
};

export default errorHandler;
