const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors/http/UnauthenticatedError');

const extractBearerToken = (header) => header.replace('Bearer ', '');
const unauthenticatedError = new UnauthenticatedError();

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(unauthenticatedError.statusCode);
    res.send({ message: unauthenticatedError.message });
    return;
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    res.status(unauthenticatedError.statusCode);
    res.send({ message: unauthenticatedError.message });
    return;
  }

  req.user = payload;
  next();
};

module.exports = { checkToken };
