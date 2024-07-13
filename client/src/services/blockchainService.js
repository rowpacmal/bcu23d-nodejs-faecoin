import { httpClient } from '../utils/httpClient';

export const getAllBlocks = async () => {
  const response = await httpClient({ method: 'get', endpoint: '/blockchain' });

  return response?.data;
};

export const getBlockByIndex = async (index) => {
  const response = await httpClient({
    method: 'get',
    endpoint: `/blockchain/blocks/${index}`,
  });

  return response?.data;
};

export const getLatestBlock = async () => {
  const response = await httpClient({
    method: 'get',
    endpoint: '/blockchain/blocks/latest',
  });

  return response?.data;
};
