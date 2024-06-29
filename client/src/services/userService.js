import { httpClient } from '../utils/httpClient';

export const editUserDetails = async (token, data) => {
  const response = await httpClient({
    method: 'put',
    endpoint: '/auth/edit/details',
    token,
    data,
  });

  return response?.data;
};

export const editUserPassword = async (token, data) => {
  const response = await httpClient({
    method: 'put',
    endpoint: '/auth/edit/password',
    token,
    data,
  });

  return response?.data;
};

export const getUserAccount = async (token) => {
  const response = await httpClient({
    method: 'get',
    endpoint: '/auth/me',
    token,
  });

  return response?.data;
};

export const userSignIn = async (data) => {
  const response = await httpClient({
    method: 'post',
    endpoint: '/auth/login',
    data,
  });

  return response?.data;
};

export const userSignUp = async (data) => {
  const response = await httpClient({
    method: 'post',
    endpoint: '/auth/register',
    data,
  });

  return response?.data;
};

export const validateToken = async (token) => {
  const response = await httpClient({
    method: 'get',
    endpoint: `/auth/token/${token}`,
  });

  return response?.success;
};
