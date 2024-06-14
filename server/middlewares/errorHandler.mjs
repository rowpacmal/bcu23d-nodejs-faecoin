const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json(err.message);
};

export default errorHandler;
