import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth';
import gachaRoutes from './routes/gacha';
import energyRoutes from './routes/energy';
import binderRoutes from './routes/binders';
import battleCardsRoutes from './routes/battleCards';
import inventoryRoutes from './routes/inventory';
import cardsRoutes from './routes/cards';
import { registerBattleHandlers } from './battle/socketHandlers';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(helmet());
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/gacha', gachaRoutes);
app.use('/api/energy', energyRoutes);
app.use('/api/binders', binderRoutes);
app.use('/api/battle/cards', battleCardsRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/cards', cardsRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

registerBattleHandlers(io);

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
