const router = require('express').Router();
const usersControllers = require('../controllers/usersController');
const auth = require('../middlewares/authMiddleware');

router.get('/users', auth.checkToken, usersControllers.getUsers);

router.get('/users/:userId', auth.checkToken, usersControllers.getUserByIdRouteParam);

router.get('/users/me', auth.checkToken, usersControllers.getUserByIdAuth);
router.patch('/users/me', auth.checkToken, usersControllers.updateUser);

router.patch('/users/me/avatar', auth.checkToken, usersControllers.updateAvatar);

module.exports = router;
