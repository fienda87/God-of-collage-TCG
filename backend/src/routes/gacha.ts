import { Router } from 'express';
import { pullGacha } from '../controllers/gachaController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/pull', authenticate, pullGacha);

export default router;
