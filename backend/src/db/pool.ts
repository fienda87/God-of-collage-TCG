import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
  uri: process.env.DATABASE_URL || 'mysql://root:@localhost:3306/god_of_college',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
