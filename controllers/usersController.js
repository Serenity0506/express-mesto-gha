const User = require('../models/userModel');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER } = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res
        .status(INTERNAL_SERVER.code)
        .send(INTERNAL_SERVER.body);
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND.code).send(NOT_FOUND.body);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST.code)
          .send(BAD_REQUEST.body);
      } else {
        res
          .status(INTERNAL_SERVER.code)
          .send(INTERNAL_SERVER.body);
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST.code)
          .send(BAD_REQUEST.body);
      } else {
        res
          .status(INTERNAL_SERVER.code)
          .send(INTERNAL_SERVER.body);
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    res.status(BAD_REQUEST.code).send(BAD_REQUEST.body);
    return;
  }

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND.code).send(NOT_FOUND.body);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST.code)
          .send(BAD_REQUEST.body);
      } else {
        res
          .status(INTERNAL_SERVER.code)
          .send(INTERNAL_SERVER.body);
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    res.status(BAD_REQUEST.code).send(BAD_REQUEST.body);
    return;
  }

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND.code).send(NOT_FOUND.body);
      } else {
        res.send(user);
      }
    })
    .catch(() => {
      res
        .status(INTERNAL_SERVER.code)
        .send(INTERNAL_SERVER.body);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
