const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { UnauthenticatedError } = require('../errors/http/UnauthenticatedError');
const { BadRequestError } = require('../errors/http/BadRequestError');

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
    email, password,
  } = req.body;

  if (!email || !password) { throw new BadRequestError(); }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
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
