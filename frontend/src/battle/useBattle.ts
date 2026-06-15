import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import type {
  AttackResult,
  BenchTarget,
  GameState,
} from './types';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface BattleStore {
  socket: Socket | null;
  connected: boolean;
  roomCode: string | null;
  playerCount: number;
  gameState: GameState | null;
  myPlayerId: string | null;
  hasDrawnThisTurn: boolean;
  mustChooseActive: boolean;
  lastAttackResult: AttackResult | null;
  logs: string[];
  error: string | null;
  gameOverReason: string | null;
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
  reconnectAttempts: number;
  maxReconnectAttempts: number;
  
  isCoinFlipping: boolean;
  coinFlipResult: { firstPlayerId: string, message: string } | null;
  isPreGameReady: boolean;
  ping: number;

  connect: () => void;
  disconnect: () => void;
  clearError: () => void;
  createRoom: (deckCards: any[]) => void;
  joinRoom: (roomCode: string, deckCards: any[]) => void;
  preGameReady: () => void;
  playerReady: (activeCardId: string, benchCardIds: string[]) => void;
  drawCard: () => void;
  playToBench: (cardId: string, slotIndex: number) => void;
  evolveCard: (cardId: string, targetPosition: BenchTarget) => void;
  attachSks: (target: BenchTarget) => void;
  retreat: (benchIndex: number) => void;
  useSkill: (skillIndex: number) => void;
  endTurn: () => void;
  chooseActive: (benchIndex: number) => void;
  addLog: (message: string) => void;
}

let socketInstance: Socket | null = null;

export const useBattleStore = create<BattleStore>((set, get) => ({
  socket: null,
  connected: false,
  roomCode: null,
  playerCount: 0,
  gameState: null,
  myPlayerId: null,
  hasDrawnThisTurn: false,
  mustChooseActive: false,
  lastAttackResult: null,
  logs: [],
  error: null,
  gameOverReason: null,
  connectionStatus: 'disconnected',
  reconnectAttempts: 0,
  maxReconnectAttempts: 5,
  
  isCoinFlipping: false,
  coinFlipResult: null,
  isPreGameReady: false,
  ping: 0,

  connect: () => {
    if (socketInstance?.connected) {
      set({ socket: socketInstance, connected: true, connectionStatus: 'connected' });
      return;
    }

    const socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    socketInstance = socket;

    socket.on('connect', () => {
      set({
        socket,
        connected: true,
        connectionStatus: 'connected',
        reconnectAttempts: 0,
        myPlayerId: socket.id,
        error: null,
      });
      if (get().roomCode) {
        socket.emit('request_game_state', { roomCode: get().roomCode });
      }
      get().addLog('Terhubung ke server battle');
      
      // Start ping measurement
      const pingInterval = setInterval(() => {
        if (!socket.connected) return;
        const start = Date.now();
        socket.emit('ping', (_response: { t: number }) => {
          const latency = Date.now() - start;
          set({ ping: latency });
        });
      }, 5000);
      
      // Store interval ID for cleanup
      (socket as any).pingInterval = pingInterval;
    });

    socket.on('disconnect', () => {
      const interval = (socket as any).pingInterval;
      if (interval) clearInterval(interval);
      set({ connected: false, connectionStatus: 'disconnected', ping: 0 });
      get().addLog('Terputus dari server');
    });

    socket.io.on('reconnect_attempt', (attempt) => {
      set({ connectionStatus: 'reconnecting', reconnectAttempts: attempt });
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    socket.on('game_state_sync', (gameState: GameState) => {
      set({ gameState });
      get().addLog('Battle state tersinkronisasi kembali');
    });

    socket.on('room_closed', () => {
      set({ gameOverReason: 'Room ditutup', connectionStatus: 'disconnected' });
      get().addLog('Room ditutup');
    });

    socket.on('room_created', ({ roomCode }: { roomCode: string }) => {
      set({ roomCode, playerCount: 1, error: null });
      get().addLog(`Room dibuat — kode: ${roomCode}`);
    });

    socket.on(
      'player_joined',
      ({ playerCount }: { playerId: string; playerCount: number }) => {
        set({ playerCount, error: null });
        get().addLog('Lawan bergabung — fase setup dimulai');
      }
    );

    socket.on('coin_flip_start', () => {
      set({ isCoinFlipping: true, coinFlipResult: null });
      get().addLog('Koin sedang dilempar...');
    });

    socket.on('coin_flip_result', (result: { firstPlayerId: string, message: string }) => {
      set({ coinFlipResult: result });
      get().addLog(result.message);
      
      setTimeout(() => {
        set({ isCoinFlipping: false, coinFlipResult: null });
      }, 3000);

    });

    socket.on('game_start', ({ gameState }: { gameState: GameState }) => {
      set({
        gameState,
        hasDrawnThisTurn: false,
        mustChooseActive: false,
        error: null,
      });
      get().addLog('Battle dimulai!');
    });

    socket.on('state_update', ({ gameState }: { gameState: GameState }) => {
      set({ gameState });
    });

    socket.on('turn_timer_update', ({ turnTimeLeft }: { turnTimeLeft: number }) => {
      set((state) => ({
        gameState: state.gameState
          ? { ...state.gameState, turnTimeLeft }
          : state.gameState,
      }));
    });

    socket.on('card_drawn', ({ card }: { card: unknown; newDeckSize: number }) => {
      set({ hasDrawnThisTurn: true, error: null });
      const cardData = card as { name?: string };
      get().addLog(`Draw: ${cardData.name ?? 'kartu'}`);
    });

    socket.on('attack_result', (result: AttackResult) => {
      set({ lastAttackResult: result, error: null });
      const weakText = result.isWeakness ? ' (weakness +20!)' : '';
      get().addLog(`Serangan ${result.damage} dmg${weakText}`);
      if (result.koOccurred) {
        get().addLog(`KO! +${result.pointsAwarded} Ngulang Matkul Point`);
      }
    });

    socket.on('must_choose_active', ({ playerId }: { playerId: string }) => {
      const myId = get().myPlayerId;
      set({ mustChooseActive: myId === playerId });
      if (myId === playerId) {
        get().addLog('Pilih kartu bench untuk jadi active');
      } else {
        get().addLog('Lawan sedang pilih active baru');
      }
    });

    socket.on(
      'turn_changed',
      ({ currentTurnPlayerId }: { currentTurnPlayerId: string }) => {
        const myId = get().myPlayerId;
        set({
          hasDrawnThisTurn: false,
          mustChooseActive: false,
          lastAttackResult: null,
        });
        if (myId === currentTurnPlayerId) {
          get().addLog('Giliranmu — draw kartu dulu');
        } else {
          get().addLog('Giliran lawan');
        }
      }
    );

    socket.on(
      'game_over',
      ({ winnerId, reason }: { winnerId: string; reason: string }) => {
        const myId = get().myPlayerId;
        const won = myId === winnerId;
        set((state) => ({
          gameOverReason: reason,
          mustChooseActive: false,
          gameState: state.gameState
            ? { ...state.gameState, phase: 'ended', winnerId }
            : state.gameState,
        }));
        get().addLog(won ? `Menang! (${reason})` : `Kalah. (${reason})`);
      }
    );

    socket.on('error', ({ message }: { message: string }) => {
      set((state) => ({
        error: message,
        roomCode: state.gameState ? state.roomCode : null,
      }));
    });

    set({ socket });
  },

  disconnect: () => {
    socketInstance?.disconnect();
    socketInstance = null;
    set({
      socket: null,
      connected: false,
      roomCode: null,
      playerCount: 0,
      gameState: null,
      hasDrawnThisTurn: false,
      mustChooseActive: false,
      lastAttackResult: null,
      logs: [],
      error: null,
      gameOverReason: null,
      connectionStatus: 'disconnected',
      reconnectAttempts: 0,
      isCoinFlipping: false,
      coinFlipResult: null,
      isPreGameReady: false,
    });
  },

  clearError: () => set({ error: null }),

  createRoom: (deckCards: any[]) => {
    get().socket?.emit('create_room', { deck: deckCards });
  },

  joinRoom: (roomCode: string, deckCards: any[]) => {
    const trimmed = roomCode.trim();
    set({ roomCode: trimmed, error: null });
    get().socket?.emit('join_room', { roomCode: trimmed, deck: deckCards });
  },

  preGameReady: () => {
    get().socket?.emit('pre_game_ready');
    set({ isPreGameReady: true });
  },

  playerReady: (activeCardId: string, benchCardIds: string[]) => {
    get().socket?.emit('player_ready', { activeCardId, benchCardIds });
    get().addLog('Kamu siap battle');
  },

  drawCard: () => {
    get().socket?.emit('draw_card');
  },

  playToBench: (cardId: string, slotIndex: number) => {
    get().socket?.emit('play_to_bench', { cardId, slotIndex });
  },

  evolveCard: (cardId: string, targetPosition: BenchTarget) => {
    get().socket?.emit('evolve_card', { cardId, targetPosition });
  },

  attachSks: (target: BenchTarget) => {
    get().socket?.emit('attach_sks', { target });
  },

  retreat: (benchIndex: number) => {
    get().socket?.emit('retreat', { benchIndex });
  },

  useSkill: (skillIndex: number) => {
    get().socket?.emit('use_skill', { skillIndex });
  },

  endTurn: () => {
    get().socket?.emit('end_turn');
  },

  chooseActive: (benchIndex: number) => {
    get().socket?.emit('choose_active', { benchIndex });
    set({ mustChooseActive: false });
  },

  addLog: (message: string) => {
    set((state) => ({
      logs: [...state.logs.slice(-49), message],
    }));
  },
}));
