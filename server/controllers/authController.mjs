import jwt from 'jsonwebtoken';

import asyncHandler from '../middlewares/asyncHandler.mjs';
import User from '../models/User.mjs';
import DataResponse from '../models/DataResponse.mjs';
import ErrorResponse from '../models/ErrorResponse.mjs';

export const registerAccount = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  generateAndSendToken(user, res, 'Successfully created an account', 201);
});

export const loginToAccount = asyncHandler(async (req, res, next) => {
  const errorRes = new ErrorResponse('Invalid login', 401);
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Email and/or password is missing', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(errorRes);
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return next(errorRes);
  }

  generateAndSendToken(user, res, 'Successfully signed in', 201);
});

export const getMyAccount = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json(
    new DataResponse({
      message: `Welcome ${req.user.name} to your account!`,
      statusCode: 200,
      data: user,
    })
  );
});

export const updateAccountDetails = asyncHandler(async (req, res, next) => {
  const { name, email, role } = req.body;

  await User.findByIdAndUpdate(
    req.user.id,
    { name, email, role },
    {
      runValidators: true,
    }
  );

  res.status(204).send();
});

export const updateAccountPassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.validatePassword(currentPassword))) {
    return next(new ErrorResponse('Invalid password', 401));
  }

  user.password = newPassword;

  await user.save();

  generateAndSendToken(user, res, 'Successfully updated the password', 201);
});

export const validAccountToken = asyncHandler(async (req, res, next) => {
  const decodedToken = jwt.verify(req.params.token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decodedToken.id);

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  res.status(200).json(
    new DataResponse({
      message: 'Valid token, access approved',
      statusCode: 200,
    })
  );
});

const generateAndSendToken = (user, res, message, statusCode) => {
  const token = user.createToken();

  res
    .status(statusCode)
    .json(new DataResponse({ message, statusCode, data: token }));
};
