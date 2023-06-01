const router = require('express').Router();
const cardsControllers = require('../controllers/cardsController');

router.get('/cards', cardsControllers.getCards);
router.post('/cards', cardsControllers.createCard);
router.delete('/cards/:cardId', cardsControllers.deleteCard);
router.put('/cards/:cardId/likes', cardsControllers.putLikeCard);
router.delete('/cards/:cardId/likes', cardsControllers.deleteLikeCard);

module.exports = router;
