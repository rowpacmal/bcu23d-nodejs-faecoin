import { httpClient } from '../utils/httpClient';

export const getAllBlocks = async () => {
  return httpClient({ method: 'get', endpoint: '/blockchain' });
};

export const getBlockByIndex = async (index) => {
  return httpClient({ method: 'get', endpoint: `/blockchain/blocks/${index}` });
};

export const getLatestBlock = async () => {
  return httpClient({ method: 'get', endpoint: '/blockchain/blocks/latest' });
};
