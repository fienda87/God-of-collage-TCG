import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { performGachaPull } from '../services/gachaService';

export async function pullGacha(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const ipAddress = req.ip;
    const userAgent = req.headers['user-agent'];

    const result = await performGachaPull(userId, ipAddress, userAgent);
    res.json(result);
  } catch (error: any) {
    if (error.message === 'INSUFFICIENT_ENERGY') {
      res.status(400).json({ error: 'Not enough energy' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
