const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const authControllers = require('../controllers/authController');

// router.post('/signin', authControllers.login);
// router.post('/signup', authControllers.createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required().min(2),
  }),
}), authControllers.login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required().min(2),
  }),
}), authControllers.createUser);

module.exports = router;
