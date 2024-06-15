import asyncHandler from '../middlewares/asyncHandler.mjs';
import User from '../models/User.mjs';
import DataResponse from '../models/DataResponse.mjs';

export const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res
    .status(201)
    .json(new DataResponse('Successfully created an user', 201, user));
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(204).send();
});

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');

  res
    .status(200)
    .json(new DataResponse('Successfully find an user', 200, user));
});

export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select('-password');

  res
    .status(200)
    .json(new DataResponse('Successfully find all user', 200, users));
});

export const updateUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });

  res.status(204).send();
});
