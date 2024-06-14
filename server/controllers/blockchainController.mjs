import { blockchain } from '../startup.mjs';
import DataResponse from '../models/DataResponse.mjs';
import ErrorResponse from '../models/ErrorResponse.mjs';

export const getAllBlocks = (req, res, next) => {
  try {
    res
      .status(200)
      .json(
        new DataResponse(
          'Successfully fetched the chain',
          200,
          blockchain.chain
        )
      );
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};
