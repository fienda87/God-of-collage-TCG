import crypto from 'crypto';
import { pool } from '../db/pool';

const SLOT_CONFIG = [
  { stage0: 70, stage1: 30, stage2: 0  },
  { stage0: 70, stage1: 30, stage2: 0  },
  { stage0: 70, stage1: 30, stage2: 0  },
  { stage0: 75, stage1: 25, stage2: 0  },
  { stage0: 25, stage1: 70, stage2: 5  },
];

function secureRandom(max: number): number {
  return crypto.randomInt(0, max);
}

function pickStage(config: { stage0: number; stage1: number; stage2: number }): number {
  const roll = secureRandom(100);
  if (roll < config.stage0) return 0;
  if (roll < config.stage0 + config.stage1) return 1;
  return 2;
}

export async function performGachaPull(userId: string, ipAddress?: string, userAgent?: string) {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // 1. Lock user row, verify energy
    const [userRows]: any = await connection.query(
      'SELECT id, current_energy FROM users WHERE id = ? FOR UPDATE',
      [userId]
    );
    const user = userRows[0];
    
    if (user.current_energy < 1) {
      throw new Error('INSUFFICIENT_ENERGY');
    }
    
    // 2. Deduct energy
    await connection.query(
      'UPDATE users SET current_energy = current_energy - 1, updated_at = NOW() WHERE id = ?',
      [userId]
    );
    
    // 3. Pull 5 cards using weighted random
    const pulledCards = [];
    for (const config of SLOT_CONFIG) {
      const stage = pickStage(config);
      
      const [cardRows]: any = await connection.query(
        'SELECT * FROM cards WHERE stage = ? AND is_active = true ORDER BY RAND() LIMIT 1',
        [stage]
      );
      pulledCards.push(cardRows[0]);
    }
    
    // 4. Update inventory
    for (const card of pulledCards) {
      const invId = crypto.randomUUID();
      await connection.query(
        `INSERT INTO inventories (id, user_id, card_id, quantity) 
         VALUES (?, ?, ?, 1)
         ON DUPLICATE KEY UPDATE quantity = quantity + 1, updated_at = NOW()`,
        [invId, userId, card.id]
      );
    }
    
    // 5. Log the pull
    const logId = crypto.randomUUID();
    const cardIds = pulledCards.map(c => c.id);
    await connection.query(
      'INSERT INTO gacha_logs (id, user_id, card_ids, energy_before, energy_after, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [logId, userId, JSON.stringify(cardIds), user.current_energy, user.current_energy - 1, ipAddress, userAgent]
    );
    
    await connection.commit();
    
    return {
      cards: pulledCards,
      newEnergy: user.current_energy - 1,
    };
    
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}
