import { v4 as uuidv4 } from 'uuid';
import {
  addPlayerToGameState,
  createGameState,
  deleteGameState,
  getGameState,
} from './gameState';
import type { GameState } from './types';

export class RoomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RoomError';
  }
}

export type Room = {
  roomId: string;
  roomCode: string;
  hostId: string;
  guestId: string | null;
};

const rooms = new Map<string, Room>();
const roomCodeToId = new Map<string, string>();
const playerToRoomId = new Map<string, string>();

function generateRoomCode(): string {
  let attempts = 0;

  while (attempts < 100) {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    if (!roomCodeToId.has(code)) {
      return code;
    }
    attempts++;
  }

  throw new RoomError('Gagal generate room code');
}

function registerPlayer(playerId: string, roomId: string): void {
  if (playerToRoomId.has(playerId)) {
    throw new RoomError('Player sudah ada di room lain');
  }
  playerToRoomId.set(playerId, roomId);
}

function unregisterPlayer(playerId: string): void {
  playerToRoomId.delete(playerId);
}

export function createRoom(hostId: string): { room: Room; gameState: GameState } {
  if (playerToRoomId.has(hostId)) {
    throw new RoomError('Player sudah ada di room lain');
  }

  const roomId = uuidv4();
  const roomCode = generateRoomCode();
  const gameState = createGameState(roomId, hostId);

  const room: Room = {
    roomId,
    roomCode,
    hostId,
    guestId: null,
  };

  rooms.set(roomId, room);
  roomCodeToId.set(roomCode, roomId);
  registerPlayer(hostId, roomId);

  return { room, gameState };
}

export function joinRoom(
  roomCode: string,
  guestId: string
): { room: Room; gameState: GameState } {
  if (playerToRoomId.has(guestId)) {
    throw new RoomError('Player sudah ada di room lain');
  }

  const normalizedCode = roomCode.trim();
  const roomId = roomCodeToId.get(normalizedCode);
  if (!roomId) {
    throw new RoomError('Room tidak ditemukan');
  }

  const room = rooms.get(roomId);
  if (!room) {
    throw new RoomError('Room tidak ditemukan');
  }

  if (room.guestId !== null) {
    throw new RoomError('Room sudah penuh');
  }

  if (room.hostId === guestId) {
    throw new RoomError('Tidak bisa join room sendiri');
  }

  const gameState = getGameState(roomId);
  if (!gameState || gameState.phase !== 'waiting') {
    throw new RoomError('Room tidak tersedia');
  }

  room.guestId = guestId;
  registerPlayer(guestId, roomId);

  const updatedState = addPlayerToGameState(roomId, guestId);
  if (!updatedState) {
    room.guestId = null;
    unregisterPlayer(guestId);
    throw new RoomError('Gagal join room');
  }

  return { room, gameState: updatedState };
}

export function getRoom(roomId: string): Room | undefined {
  return rooms.get(roomId);
}

export function getRoomByCode(roomCode: string): Room | undefined {
  const roomId = roomCodeToId.get(roomCode.trim());
  if (!roomId) return undefined;
  return rooms.get(roomId);
}

export function getRoomForPlayer(playerId: string): Room | undefined {
  const roomId = playerToRoomId.get(playerId);
  if (!roomId) return undefined;
  return rooms.get(roomId);
}

export function getPlayerCount(room: Room): number {
  return room.guestId ? 2 : 1;
}

export function cleanupRoom(roomId: string): void {
  const room = rooms.get(roomId);
  if (!room) return;

  unregisterPlayer(room.hostId);
  if (room.guestId) {
    unregisterPlayer(room.guestId);
  }

  roomCodeToId.delete(room.roomCode);
  rooms.delete(roomId);
  deleteGameState(roomId);
}

export function disconnectPlayer(playerId: string): {
  room: Room | null;
  cleanedUp: boolean;
} {
  const roomId = playerToRoomId.get(playerId);
  if (!roomId) {
    return { room: null, cleanedUp: false };
  }

  const room = rooms.get(roomId);
  unregisterPlayer(playerId);

  if (!room) {
    return { room: null, cleanedUp: false };
  }

  const hostConnected = playerToRoomId.has(room.hostId);
  const guestConnected = room.guestId ? playerToRoomId.has(room.guestId) : false;

  if (!hostConnected && !guestConnected) {
    cleanupRoom(roomId);
    return { room: null, cleanedUp: true };
  }

  return { room, cleanedUp: false };
}

export function getRoomCount(): number {
  return rooms.size;
}
