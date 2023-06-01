const router = require('express').Router();
const usersRouter = require('./usersRouter');
const cardsRouter = require('./cardsRoutrer');

router.use(usersRouter);
router.use(cardsRouter);

module.exports = router;
