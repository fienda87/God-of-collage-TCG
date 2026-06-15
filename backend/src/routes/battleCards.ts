import { Router } from 'express';
import { BATTLE_CARDS } from '../battle/cardDatabase';

const router = Router();

router.get('/', (req, res) => {
  res.json(Object.values(BATTLE_CARDS));
});

export default router;
