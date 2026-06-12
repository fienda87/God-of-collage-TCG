import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { getEnergyStatus } from '../services/energyService';

export async function getEnergy(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const energyStatus = await getEnergyStatus(userId);
    res.json(energyStatus);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
