import { blockchain } from '../startup.mjs';

import DataResponse from '../models/DataResponse.mjs';
import ErrorResponse from '../models/ErrorResponse.mjs';

export const getAllBlocks = (req, res, next) => {
  res.status(200).json(
    new DataResponse({
      message: 'Successfully fetched the chain',
      statusCode: 200,
      data: blockchain.chain,
    })
  );
};

export const getBlockByIndex = (req, res, next) => {
  const { index } = req.params;
  const block = blockchain.chain.find((block) => block.index === +index);

  if (!block) {
    return next(
      new ErrorResponse(`Unable to find a block with index: ${index}`, 404)
    );
  }

  res.status(200).json(
    new DataResponse({
      message: 'Successfully fetched a block',
      statusCode: 200,
      data: block,
    })
  );
};

export const getLatestBlock = (req, res, next) => {
  res.status(200).json(
    new DataResponse({
      message: 'Successfully fetched the latest block',
      statusCode: 200,
      data: blockchain.chain.at(-1),
    })
  );
};
