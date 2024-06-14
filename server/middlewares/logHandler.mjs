import FileHandler from '../models/FileHandler.mjs';

const logHandler = (req, res, next) => {
  const data = `${req.protocol.toUpperCase()}${req.ip} ${req.method} ${
    req.originalUrl
  }\n\n`;

  new FileHandler('logs', 'server.log').append(data);

  next();
};

export default logHandler;
