const router = require('express').Router();
const cardsControllers = require('../controllers/cardsController');
const auth = require('../middlewares/authMiddleware');

router.get('/cards', auth.checkToken, cardsControllers.getCards);
router.post('/cards', auth.checkToken, cardsControllers.createCard);
router.delete('/cards/:cardId', auth.checkToken, cardsControllers.deleteCard);
router.put('/cards/:cardId/likes', auth.checkToken, cardsControllers.putLikeCard);
router.delete('/cards/:cardId/likes', auth.checkToken, cardsControllers.deleteLikeCard);

module.exports = router;
