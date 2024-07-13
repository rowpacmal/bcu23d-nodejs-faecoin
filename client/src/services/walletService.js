import { httpClient } from '../utils/httpClient';

export const getWalletBalance = async (token) => {
  const response = await httpClient({
    method: 'get',
    endpoint: '/wallet',
    token,
  });

  return response?.data;
};
