const card = require('../models/cardModel');
const { INTERNAL_SERVER, BAD_REQUEST, NOT_FOUND } = require('../utils/constants');

const getCards = (req, res) => {
  card.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      res
        .status(INTERNAL_SERVER.code)
        .send({ message: INTERNAL_SERVER.msg });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  card.create({ name, link, owner: req.user._id })
    .then((c) => res.status(201).send(c))
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

const deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params.cardId)
    .then((c) => {
      if (!c) {
        res.status(NOT_FOUND.code).send(NOT_FOUND.msg);
      } else {
        res.send(c);
      }
    });
};

const putLikeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((c) => {
      if (!c) {
        res.status(NOT_FOUND.code).send(NOT_FOUND.msg);
      } else {
        res.send(c);
      }
    })
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

const deleteLikeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((c) => {
      if (!c) {
        res.status(NOT_FOUND.code).send(NOT_FOUND.msg);
      } else {
        res.send(c);
      }
    })
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

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
};
