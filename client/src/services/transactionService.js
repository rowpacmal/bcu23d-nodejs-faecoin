import { httpClient } from '../utils/httpClient';

export const addTransaction = async (token, data) => {
  const response = await httpClient({
    method: 'post',
    endpoint: '/transactions/add',
    token,
    data,
  });

  return response?.data;
};

export const getTransactions = async (token) => {
  const response = await httpClient({
    method: 'get',
    endpoint: '/transactions',
    token,
  });

  return response?.data;
};

export const mineTransactions = async (token) => {
  const response = await httpClient({
    method: 'get',
    endpoint: '/transactions/mine',
    token,
  });

  return response?.data;
};
