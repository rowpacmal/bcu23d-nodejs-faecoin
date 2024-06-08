const resourceNotFound = (req, res, next) => {
	next(new Error('Not Found'));
};

export default resourceNotFound;
