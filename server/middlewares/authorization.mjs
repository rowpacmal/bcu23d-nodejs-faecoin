import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.mjs';

import User from '../models/User.mjs';
import ErrorResponse from '../models/ErrorResponse.mjs';

export const authorizedAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `${req.user.role.toUpperCase()}s are unauthorized, access denied`,
          403
        )
      );
    }

    next();
  };
};

export const protectedAccess = asyncHandler(async (req, res, next) => {
  const errorRes = new ErrorResponse('Unauthorized, access denied', 401);
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    next(errorRes);
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decodedToken.id);

  if (!req.user) {
    next(errorRes);
  }

  next();
});
