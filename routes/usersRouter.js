const router = require('express').Router();
const usersControllers = require('../controllers/usersController');

router.get('/users', usersControllers.getUsers);

router.get('/users/:userId', usersControllers.getUserById);

router.post('/users', usersControllers.createUser);

router.patch('/users/me', usersControllers.updateUser);

router.patch('/users/me/avatar', usersControllers.updateAvatar);

module.exports = router;
