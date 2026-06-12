import { Request, Response } from 'express';
import { pool } from '../db/pool';

export async function getCards(req: Request, res: Response) {
  try {
    const { element, stage } = req.query;
    let query = 'SELECT * FROM cards WHERE is_active = true';
    const values: any[] = [];
    
    if (element) {
      query += ` AND element = ?`;
      values.push(element);
    }
    
    if (stage !== undefined) {
      query += ` AND stage = ?`;
      values.push(stage);
    }
    
    query += ' ORDER BY name ASC';
    
    const [rows]: any = await pool.query(query, values);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getCardById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const [rows]: any = await pool.query('SELECT * FROM cards WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      res.status(404).json({ error: 'Card not found' });
      return;
    }
    
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
