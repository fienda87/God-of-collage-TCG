import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { pool } from '../db/pool';

export async function register(req: Request, res: Response) {
  try {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();

    await pool.query(
      'INSERT INTO users (id, email, password_hash, username) VALUES (?, ?, ?, ?)',
      [userId, email, hashedPassword, username]
    );

    const token = jwt.sign({ id: userId, email }, process.env.ACCESS_TOKEN_SECRET || 'secret');

    res.json({ token, user: { id: userId, email, username } });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET || 'secret');

    res.json({ token, user: { id: user.id, email: user.email, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
