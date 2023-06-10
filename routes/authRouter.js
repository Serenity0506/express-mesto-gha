const router = require('express').Router();
const authControllers = require('../controllers/authController');

router.post('/signin', authControllers.login);
router.post('/signup', authControllers.createUser);

module.exports = router;
