const errorHandler = (err, req, res, next) => {
	res.status(err.statusCode).json(err.message);
};

export default errorHandler;
