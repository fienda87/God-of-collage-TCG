import { Router } from 'express';
import { getInventory } from '../controllers/inventoryController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, getInventory);

export default router;
