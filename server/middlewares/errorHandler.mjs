import FileHandler from '../models/FileHandler.mjs';

const errorHandler = (err, req, res, next) => {
  new FileHandler('logs', 'error.log').append(err.message);

  res.status(err.statusCode || 500).json(err.message);
};

export default errorHandler;
