const card = require('../models/cardModel');
const { INTERNAL_SERVER, BAD_REQUEST, NOT_FOUND } = require('../utils/constants');

const getCards = (req, res) => {
  card.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      res
        .status(INTERNAL_SERVER.code)
        .send(INTERNAL_SERVER.body);
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
          .send(BAD_REQUEST.body);
      } else {
        res
          .status(INTERNAL_SERVER.code)
          .send(INTERNAL_SERVER.body);
      }
    });
};

const deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params.cardId)
    .then((c) => {
      if (!c) {
        res.status(NOT_FOUND.code).send(NOT_FOUND.body);
      } else {
        res.send(c);
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

const putLikeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((c) => {
      if (!c) {
        res.status(NOT_FOUND.code).send(NOT_FOUND.body);
      } else {
        res.send(c);
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

const deleteLikeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((c) => {
      if (!c) {
        res.status(NOT_FOUND.code).send(NOT_FOUND.body);
      } else {
        res.send(c);
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

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
};
