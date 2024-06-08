import ErrorResponse from '../models/ErrorResponse.mjs';

const resourceNotFound = (req, res, next) => {
	next(new ErrorResponse('Endpoint Not Found'));
};

export default resourceNotFound;
