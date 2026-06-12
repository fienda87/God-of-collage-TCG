import { pool } from '../db/pool';

const ENERGY_REGEN_MS = 60 * 60 * 1000;  // 1 hour in milliseconds
const MAX_ENERGY = 2;

export async function getEnergyStatus(userId: string) {
  const [rows]: any = await pool.query(
    'SELECT current_energy, last_energy_update FROM users WHERE id = ?',
    [userId]
  );
  
  if (rows.length === 0) {
    throw new Error('User not found');
  }

  const user = rows[0];
  const now = Date.now();
  const lastUpdate = new Date(user.last_energy_update).getTime();
  const elapsedMs = now - lastUpdate;
  
  // Calculate how much energy has regenerated since last update
  const energyGained = Math.floor(elapsedMs / ENERGY_REGEN_MS);
  
  if (energyGained > 0 && user.current_energy < MAX_ENERGY) {
    // Calculate leftover ms after last full energy gain
    const leftoverMs = elapsedMs % ENERGY_REGEN_MS;
    const newEnergy = Math.min(user.current_energy + energyGained, MAX_ENERGY);
    
    // Update database with new energy and adjusted timestamp
    // If full, we just set timestamp to now because energy doesn't regen past max
    const newLastUpdate = newEnergy >= MAX_ENERGY ? new Date(now) : new Date(now - leftoverMs);
    
    await pool.query(
      'UPDATE users SET current_energy = ?, last_energy_update = ? WHERE id = ?',
      [newEnergy, newLastUpdate, userId]
    );
    
    user.current_energy = newEnergy;
    user.last_energy_update = newLastUpdate;
  }
  
  // Calculate next refill time
  const lastUpdateMs = new Date(user.last_energy_update).getTime();
  const nextRefillAt = lastUpdateMs + ENERGY_REGEN_MS;
  const secondsUntilRefill = user.current_energy >= MAX_ENERGY 
    ? 0 
    : Math.max(0, Math.ceil((nextRefillAt - now) / 1000));
  
  return {
    currentEnergy: user.current_energy,
    maxEnergy: MAX_ENERGY,
    nextRefillAt: new Date(nextRefillAt).toISOString(),
    secondsUntilRefill,
    isFull: user.current_energy >= MAX_ENERGY,
  };
}
