import settings from '../config/settings';

export const httpClient = async ({ method, endpoint, data, token }) => {
  const options = {
    method: method.toUpperCase(),
    headers: {},
  };

  if (method === 'post' || method === 'put') {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data || {});
  }

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${settings.baseUrl}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) throw new Error(result.error);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
