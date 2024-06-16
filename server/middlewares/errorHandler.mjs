import DataResponse from '../models/DataResponse.mjs';
import FileHandler from '../models/FileHandler.mjs';

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  new FileHandler('logs', 'error.log').append(`${err.message}\n\n`);

  res
    .status(err.statusCode || 500)
    .json(new DataResponse({ error: err.message, statusCode }));
};

export default errorHandler;
