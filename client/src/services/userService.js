import { httpClient } from '../utils/httpClient';

export const editUserDetails = async (token, data) => {
  return httpClient({
    method: 'put',
    endpoint: '/auth/edit/details',
    token,
    data,
  });
};

export const editUserPassword = async (token, data) => {
  return httpClient({
    method: 'put',
    endpoint: '/auth/edit/password',
    token,
    data,
  });
};

export const getUserAccount = async (token) => {
  return httpClient({ method: 'get', endpoint: '/auth/me', token });
};

export const userSignIn = async (data) => {
  return httpClient({ method: 'post', endpoint: '/auth/login', data });
};

export const userSignUp = async (data) => {
  return httpClient({ method: 'post', endpoint: '/auth/register', data });
};
