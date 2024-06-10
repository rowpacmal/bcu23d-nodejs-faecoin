import crypto from 'crypto';

export const createHash = (...args) => {
  return crypto
    .createHash('sha256')
    .update(
      args
        .map((arg) => JSON.stringify(arg))
        .sort()
        .join('')
    )
    .digest('hex');
};
