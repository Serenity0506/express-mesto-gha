const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersControllers = require('../controllers/usersController');
const auth = require('../middlewares/authMiddleware');

router.get('/users', auth.checkToken, usersControllers.getUsers);

router.get('/users/:userId', auth.checkToken, usersControllers.getUserByIdRouteParam);

router.get('/users/me', auth.checkToken, usersControllers.getUserByIdAuth);
router.patch('/users/me', auth.checkToken, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2),
  }),
}), usersControllers.updateUser);

router.patch('/users/me/avatar', auth.checkToken, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri({
      scheme: [
        'https',
      ],
    }),
  }),
}), usersControllers.updateAvatar);

module.exports = router;
