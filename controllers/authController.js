const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { UnauthenticatedError } = require('../errors/http/UnauthenticatedError');
const { BadRequestError } = require('../errors/http/BadRequestError');
const { validateUrl } = require('../utils/validators');

const login = (req, res, next) => {
  const {
    email, password,
  } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
      });
    })
    .catch((err) => next(new UnauthenticatedError(err.message)));
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!validateUrl(avatar)) { throw new BadRequestError('У вас ссылка битая!'); }

  bcrypt.hash(password, 10)
    .than((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))

    .then((user) => res.status(201).send(user))
    .catch(next);
};

module.exports = {
  login,
  createUser,
};
