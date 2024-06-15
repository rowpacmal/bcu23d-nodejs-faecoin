import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.mjs';

import User from '../models/User.mjs';
import ErrorResponse from '../models/ErrorResponse.mjs';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) next(new ErrorResponse('Behörighet saknas', 401));

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedToken.id);

  if (!req.user) next(new ErrorResponse('Behörighet saknas', 401));

  next();
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: `Rollen ${req.user.role} har inte behörighet`,
      });
    }

    next();
  };
};
