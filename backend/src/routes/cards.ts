import { Router } from 'express';
import { getCards, getCardById } from '../controllers/cardsController';

const router = Router();

router.get('/', getCards);
router.get('/:id', getCardById);

export default router;
