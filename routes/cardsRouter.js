const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cardsControllers = require('../controllers/cardsController');
const auth = require('../middlewares/authMiddleware');

router.get('/cards', auth.checkToken, cardsControllers.getCards);
// router.post('/cards', auth.checkToken, cardsControllers.createCard);

router.post('/cards', auth.checkToken, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri({
      scheme: [
        'https',
      ],
    }),
  }),
}), cardsControllers.createCard);

router.delete('/cards/:cardId', auth.checkToken, celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24),
  }),
}), cardsControllers.deleteCard);

router.put('/cards/:cardId/likes', auth.checkToken, celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24),
  }),
}), cardsControllers.putLikeCard);

router.delete('/cards/:cardId/likes', auth.checkToken, celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24),
  }),
}), cardsControllers.deleteLikeCard);

module.exports = router;
