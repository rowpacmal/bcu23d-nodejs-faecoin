import { httpClient } from '../utils/httpClient';

export const addTransaction = async (token, data) => {
  return await httpClient({
    method: 'post',
    endpoint: '/transactions/add',
    token,
    data,
  });
};

export const getTransactions = async (token) => {
  return await httpClient({ method: 'get', endpoint: '/transactions', token });
};

export const getWallet = async (token) => {
  return await httpClient({
    method: 'get',
    endpoint: '/transactions/wallet',
    token,
  });
};

export const mineTransactions = async (token) => {
  return await httpClient({
    method: 'get',
    endpoint: '/transactions/mine',
    token,
  });
};
