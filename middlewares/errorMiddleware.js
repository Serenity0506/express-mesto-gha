const { BadRequestError } = require('../errors/http/BadRequestError');
const { HttpError } = require('../errors/http/HttpError');
const { InternalServerError } = require('../errors/http/InternalServerError');

const handleExceptions = (err, req, res) => {
  let httpError;

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    httpError = new BadRequestError('Некорректный запрос');
  } else if (err instanceof HttpError) {
    httpError = err;
  } else {
    httpError = new InternalServerError();
  }

  res
    .status(httpError.statusCode)
    .send({ message: httpError.message });
};

module.exports = { handleExceptions };
