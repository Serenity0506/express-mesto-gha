const router = require('express').Router();
const usersRouter = require('./usersRouter');
const cardsRouter = require('./cardsRouter');
const authRouter = require('./authRouter');

router.use(usersRouter);
router.use(cardsRouter);
router.use(authRouter);

module.exports = router;
