import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { pool } from '../db/pool';

export async function getInventory(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const [rows]: any = await pool.query(
      `SELECT c.*, i.quantity, i.first_obtained_at 
       FROM inventories i 
       JOIN cards c ON i.card_id = c.id 
       WHERE i.user_id = ?`,
      [userId]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
