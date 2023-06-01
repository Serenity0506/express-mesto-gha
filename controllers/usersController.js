const { request } = require('express');
const User = require('../models/userModel');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER } = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res
        .status(INTERNAL_SERVER.code)
        .send({ message: INTERNAL_SERVER.msg });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND.code).send(NOT_FOUND.msg);
      } else {
        res.send(user);
      }
    })
    .catch(() => {
      res
        .status(INTERNAL_SERVER.code)
        .send({ message: INTERNAL_SERVER.msg });
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
          .send({ message: BAD_REQUEST.msg });
      } else {
        res
          .status(INTERNAL_SERVER.code)
          .send({ message: INTERNAL_SERVER.msg });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    res.status(BAD_REQUEST.code).send(BAD_REQUEST.msg);
    return;
  }

  User.findByIdAndUpdate(
    request.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND.code).send(NOT_FOUND.msg);
      } else {
        res.send(user);
      }
    })
    .catch(() => {
      res
        .status(INTERNAL_SERVER.code)
        .send({ message: INTERNAL_SERVER.msg });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    res.status(BAD_REQUEST.code).send(BAD_REQUEST.msg);
    return;
  }

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND.code).send(NOT_FOUND.msg);
      } else {
        res.send(user);
      }
    })
    .catch(() => {
      res
        .status(INTERNAL_SERVER.code)
        .send({ message: INTERNAL_SERVER.msg });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
