import { Router } from 'express';
import { getEnergy } from '../controllers/energyController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, getEnergy);

export default router;
