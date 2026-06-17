c:\Users\acerr\Pictures\Screenshots\Screenshot 2026-06-15 235428.pngimport type { Server, Socket } from 'socket.io';
import {
  advanceTurn,
  addBattleLog,
  applyKO,
  checkKO,
  checkWin,
  countFilledBenchSlots,
  createActiveCard,
  drawCardForPlayer,
  getBoardCard,
  getNgulangPointsSnapshot,
  getOpponentId,
  getPlayer,
  hasAnyBenchCard,
  promoteBenchToActive,
  removeCardFromHand,
  resetTurnFlags,
  resolveAttack,
  setBoardCard,
  setupPlayerDecks,
  initiateCoinFlip,
  initialDraw,
  type BenchTarget,
} from './gameLogic';
import { TURN_TIME_LIMIT } from './types';
import { getGameState, updateGameState } from './gameState';
import {
  cleanupRoom,
  createRoom,
  disconnectPlayer,
  getPlayerCount,
  getRoom,
  getRoomForPlayer,
  joinRoom,
  RoomError,
} from './roomManager';
import type { GameState } from './types';

type RoomMeta = {
  readyPlayers: Set<string>;
  preGameReady: Set<string>;
  pendingChooseActive: string | null;
  hasDrawnThisTurn: boolean;
  playerDecks: Record<string, any[]>;
  firstPlayerId: string | null;
  turnTimerInterval: NodeJS.Timeout | null;
};

const roomMeta = new Map<string, RoomMeta>();

function getMeta(roomId: string): RoomMeta {
  let meta = roomMeta.get(roomId);
  if (!meta) {
    meta = {
      readyPlayers: new Set<string>(),
      preGameReady: new Set<string>(),
      pendingChooseActive: null,
      hasDrawnThisTurn: false,
      playerDecks: {},
      firstPlayerId: null,
      turnTimerInterval: null,
    };
    roomMeta.set(roomId, meta);
  }
  return meta;
}

function deleteMeta(roomId: string): void {
  roomMeta.delete(roomId);
}

function emitError(socket: Socket, message: string): void {
  socket.emit('error', { message });
}

function broadcastState(io: Server, roomId: string, gameState: GameState): void {
  io.to(roomId).emit('state_update', { gameState });
}

function finishGame(
  io: Server,
  roomId: string,
  winnerId: string,
  reason: string
): void {
  const meta = getMeta(roomId);
  if (meta.turnTimerInterval) {
    clearInterval(meta.turnTimerInterval);
    meta.turnTimerInterval = null;
  }

  updateGameState(roomId, (state) => {
    state.phase = 'ended';
    state.winnerId = winnerId;

    addBattleLog(state, {
      type: 'game_over',
      winnerId,
      reason,
      timestamp: Date.now(),
    });
  });

  const gameState = getGameState(roomId);
  if (gameState) {
    io.to(roomId).emit('game_over', { winnerId, reason });
    broadcastState(io, roomId, gameState);
  }

  cleanupRoom(roomId);
  deleteMeta(roomId);
}

function requireRoom(socket: Socket): { roomId: string; gameState: GameState } | null {
  const room = getRoomForPlayer(socket.id);
  if (!room) {
    emitError(socket, 'Kamu belum ada di room');
    return null;
  }

  const gameState = getGameState(room.roomId);
  if (!gameState) {
    emitError(socket, 'Game state tidak ditemukan');
    return null;
  }

  return { roomId: room.roomId, gameState };
}

function requireCurrentTurn(socket: Socket, gameState: GameState): boolean {
  if (gameState.currentTurnPlayerId !== socket.id) {
    emitError(socket, 'Bukan giliranmu');
    return false;
  }
  return true;
}

function requireBattlePhase(gameState: GameState): boolean {
  return gameState.phase === 'battle';
}

function blockIfPendingChooseActive(
  socket: Socket,
  roomId: string,
  actionName: string
): boolean {
  const meta = getMeta(roomId);
  if (meta.pendingChooseActive) {
    emitError(socket, `Tunggu lawan pilih active dulu sebelum ${actionName}`);
    return true;
  }
  return false;
}

function prepareDecks(io: Server, roomId: string): void {
  const meta = getMeta(roomId);
  updateGameState(roomId, (state) => {
    state.phase = 'waiting'; // wait for ready
    setupPlayerDecks(state, meta.playerDecks); // build the deck arrays
  });
  
  const gameState = getGameState(roomId);
  if (gameState) {
    io.to(roomId).emit('game_state_sync', gameState);
  }
}

function startTurnTimer(io: Server, roomId: string): void {
  const meta = getMeta(roomId);
  
  if (meta.turnTimerInterval) {
    clearInterval(meta.turnTimerInterval);
  }

  meta.turnTimerInterval = setInterval(() => {
    const gameState = getGameState(roomId);
    if (!gameState || gameState.phase !== 'battle') {
      if (meta.turnTimerInterval) {
        clearInterval(meta.turnTimerInterval);
        meta.turnTimerInterval = null;
      }
      return;
    }

    updateGameState(roomId, (state) => {
      if (state.turnTimeLeft > 0) {
        state.turnTimeLeft -= 1;
      }
      
      if (state.turnTimeLeft <= 0) {
        if (meta.turnTimerInterval) {
          clearInterval(meta.turnTimerInterval);
          meta.turnTimerInterval = null;
        }
        state.turnTimeLeft = 0;
      }
    });

    const updatedState = getGameState(roomId);
    if (updatedState) {
      io.to(roomId).emit('turn_timer_update', { turnTimeLeft: updatedState.turnTimeLeft });
      
      if (updatedState.turnTimeLeft <= 0) {
        advanceTurn(updatedState);
        io.to(roomId).emit('turn_changed', { currentTurnPlayerId: updatedState.currentTurnPlayerId });
        broadcastState(io, roomId, updatedState);
        startTurnTimer(io, roomId);
      }
    }
  }, 1000);
}

function startBattle(io: Server, roomId: string): void {
  const meta = getMeta(roomId);

  updateGameState(roomId, (state) => {
    state.phase = 'battle';
    state.currentTurnPlayerId = meta.firstPlayerId || state.currentTurnPlayerId;
    state.turnNumber = 1;
    state.turnTimeLeft = TURN_TIME_LIMIT;
    state.turnStartTime = Date.now();
    resetTurnFlags(getPlayer(state, state.currentTurnPlayerId));
  });

  meta.readyPlayers.clear();
  meta.preGameReady.clear();
  meta.hasDrawnThisTurn = false;
  meta.pendingChooseActive = null;
  meta.firstPlayerId = null;

  const gameState = getGameState(roomId);
  if (!gameState) return;

  io.to(roomId).emit('game_start', { gameState });
  broadcastState(io, roomId, gameState);
  io.to(roomId).emit('turn_changed', { currentTurnPlayerId: gameState.currentTurnPlayerId });
  startTurnTimer(io, roomId);
}

function parseBenchTarget(target: BenchTarget | number | string): BenchTarget | null {
  if (target === 'active') return 'active';
  const index = Number(target);
  if (index === 0 || index === 1 || index === 2) return index;
  return null;
}

export function registerBattleHandlers(io: Server): void {
  io.on('connection', (socket: Socket) => {
    socket.on('create_room', ({ deck }: { deck?: any[] } = {}) => {
      try {
        if (getRoomForPlayer(socket.id)) {
          emitError(socket, 'Kamu sudah ada di room');
          return;
        }

        const { room, gameState } = createRoom(socket.id);
        const meta = getMeta(room.roomId);
        console.log(`[create_room] Player ${socket.id} created room ${room.roomCode}. Deck provided? ${!!deck}`);
        if (deck) {
          console.log(`[create_room] Deck cards length: ${deck.length}`);
          meta.playerDecks[socket.id] = deck;
        }
        socket.join(room.roomId);
        socket.emit('room_created', { roomCode: room.roomCode });
        socket.emit('game_state_sync', gameState);
      } catch (error) {
        emitError(
          socket,
          error instanceof RoomError ? error.message : 'Gagal membuat room'
        );
      }
    });

    socket.on('request_game_state', () => {
      const room = getRoomForPlayer(socket.id);
      if (room) {
        const state = getGameState(room.roomId);
        if (state) {
          socket.emit('game_state_sync', state);
        }
      } else {
        socket.emit('room_closed');
      }
    });

    socket.on('ping', (callback: (response: { t: number }) => void) => {
      callback({ t: Date.now() });
    });

    socket.on('pre_game_ready', () => {
      const room = getRoomForPlayer(socket.id);
      if (!room) return;

      const meta = getMeta(room.roomId);
      const gameState = getGameState(room.roomId);
      if (!gameState || gameState.phase !== 'waiting') return;

      if (meta.preGameReady.has(socket.id)) return;

      meta.preGameReady.add(socket.id);
      io.to(room.roomId).emit('state_update', { gameState });

      if (meta.preGameReady.size >= 2 && room.guestId) {
        setTimeout(() => {
          initiateCoinFlip(io, room.roomId, (firstPlayerId) => {
            meta.firstPlayerId = firstPlayerId;
          });
        }, 500);
      }
    });

    socket.on('join_room', ({ roomCode, deck }: { roomCode?: string; deck?: any[] }) => {
      try {
        if (!roomCode?.trim()) {
          emitError(socket, 'Room code wajib diisi');
          return;
        }

        if (getRoomForPlayer(socket.id)) {
          emitError(socket, 'Kamu sudah ada di room');
          return;
        }

        const { room } = joinRoom(roomCode, socket.id);
        const meta = getMeta(room.roomId);
        if (deck) {
          meta.playerDecks[socket.id] = deck;
        }
        socket.join(room.roomId);
        io.to(room.roomId).emit('player_joined', {
          playerId: socket.id,
          playerCount: 2,
        });

        const gameState = getGameState(room.roomId);
        if (gameState) {
          gameState.phase = 'waiting';
        }
        
        prepareDecks(io, room.roomId);
      } catch (error) {
        emitError(
          socket,
          error instanceof RoomError ? error.message : 'Gagal join room'
        );
      }
    });

    socket.on(
      'player_ready',
      ({
        activeCardId,
        benchCardIds,
      }: {
        activeCardId?: string;
        benchCardIds?: string[];
      }) => {
        const ctx = requireRoom(socket);
        if (!ctx) return;

        const { roomId, gameState } = ctx;
        if (gameState.phase !== 'setup') {
          emitError(socket, 'Bukan fase setup');
          return;
        }


        if (!activeCardId) {
          emitError(socket, 'Active card wajib dipilih');
          return;
        }

        const benchIds = benchCardIds ?? [];
        if (benchIds.length > 3) {
          emitError(socket, 'Bench maksimal 3 kartu di fase setup');
          return;
        }

        // Removed uniqueIds check because players can have multiple copies of the same card in their hand.

        const meta = getMeta(roomId);
        if (meta.readyPlayers.has(socket.id)) {
          emitError(socket, 'Kamu sudah ready');
          return;
        }

        try {
          updateGameState(roomId, (state) => {
            const player = getPlayer(state, socket.id);

            if (player.active || countFilledBenchSlots(player) > 0) {
              throw new Error('Setup sudah pernah dilakukan');
            }

            const activeCard = removeCardFromHand(player, activeCardId);
            if (activeCard.stage !== 0) {
              throw new Error('Hanya Stage 0 (MABA) yang bisa dipasang di Active');
            }
            player.active = createActiveCard(activeCard);

            addBattleLog(state, {
              type: 'play_card',
              playerId: socket.id,
              cardName: activeCard.name,
              target: 'active',
              timestamp: Date.now(),
            });

            benchIds.forEach((cardId, index) => {
              if (player.bench[index]) {
                throw new Error(`Slot bench ${index} sudah terisi`);
              }
              const benchCard = removeCardFromHand(player, cardId);
              if (benchCard.stage !== 0) {
                throw new Error('Hanya Stage 0 (MABA) yang bisa dipasang di Bench');
              }
              player.bench[index] = createActiveCard(benchCard);

              addBattleLog(state, {
                type: 'play_card',
                playerId: socket.id,
                cardName: benchCard.name,
                target: 'bench',
                timestamp: Date.now(),
              });
            });
          });
        } catch (error) {
          emitError(
            socket,
            error instanceof Error ? error.message : 'Setup gagal'
          );
          return;
        }

        meta.readyPlayers.add(socket.id);
        const updatedState = getGameState(roomId);
        if (updatedState) {
          broadcastState(io, roomId, updatedState);
        }

        const room = getRoom(roomId);
        if (!room?.guestId) return;

        const hostReady = meta.readyPlayers.has(room.hostId);
        const guestReady = meta.readyPlayers.has(room.guestId);
        if (hostReady && guestReady) {
          startBattle(io, roomId);
        }
      }
    );

    socket.on('draw_card', () => {
      const ctx = requireRoom(socket);
      if (!ctx) return;

      const { roomId, gameState } = ctx;
      if (!requireBattlePhase(gameState)) {
        emitError(socket, 'Game belum dimulai');
        return;
      }
      if (blockIfPendingChooseActive(socket, roomId, 'draw')) return;
      if (!requireCurrentTurn(socket, gameState)) return;

      const meta = getMeta(roomId);
      if (meta.hasDrawnThisTurn) {
        emitError(socket, 'Sudah draw kartu giliran ini');
        return;
      }

      let drawnCard = null;
      let newDeckSize = 0;

      try {
        updateGameState(roomId, (state) => {
          const player = getPlayer(state, socket.id);
          if (player.deck.length === 0) {
            throw new Error('Deck habis! Tidak ada kartu untuk didraw.');
          }
          resetTurnFlags(player);
          drawnCard = drawCardForPlayer(player);
          newDeckSize = player.deck.length;
          
          if (drawnCard) {
            addBattleLog(state, {
              type: 'draw_card',
              playerId: socket.id,
              cardName: drawnCard.name,
              timestamp: Date.now(),
            });
          }
        });
      } catch (error) {
        emitError(
          socket,
          error instanceof Error ? error.message : 'Gagal draw kartu'
        );
        return;
      }

      meta.hasDrawnThisTurn = true;

      const updatedState = getGameState(roomId);
      if (updatedState) {
        broadcastState(io, roomId, updatedState);
      }

      if (drawnCard) {
        socket.emit('card_drawn', { card: drawnCard, newDeckSize });
      }
    });

    socket.on(
      'play_to_bench',
      ({ cardId, slotIndex }: { cardId?: string; slotIndex?: number }) => {
        const ctx = requireRoom(socket);
        if (!ctx) return;

        const { roomId, gameState } = ctx;
        if (!requireBattlePhase(gameState)) return;
        if (blockIfPendingChooseActive(socket, roomId, 'play to bench')) return;
        if (!requireCurrentTurn(socket, gameState)) return;

        const meta = getMeta(roomId);
        if (!meta.hasDrawnThisTurn) {
          emitError(socket, 'Draw kartu dulu di awal giliran');
          return;
        }

        if (!cardId || slotIndex === undefined) {
          emitError(socket, 'cardId dan slotIndex wajib diisi');
          return;
        }

        if (slotIndex < 0 || slotIndex > 2) {
          emitError(socket, 'Slot bench tidak valid');
          return;
        }

        try {
          updateGameState(roomId, (state) => {
            const player = getPlayer(state, socket.id);
            if (player.bench[slotIndex]) {
              throw new Error('Slot bench sudah terisi');
            }
            if (countFilledBenchSlots(player) >= 3) {
              throw new Error('Bench sudah penuh');
            }
            const card = removeCardFromHand(player, cardId);
            if (card.stage !== 0) {
              throw new Error('Hanya kartu Stage 0 (MABA) yang bisa ditaruh di Bench');
            }
            player.bench[slotIndex] = createActiveCard(card);

            addBattleLog(state, {
              type: 'play_card',
              playerId: socket.id,
              cardName: card.name,
              target: 'bench',
              timestamp: Date.now(),
            });
          });
        } catch (error) {
          emitError(
            socket,
            error instanceof Error ? error.message : 'Gagal play to bench'
          );
          return;
        }

        const updatedState = getGameState(roomId);
        if (updatedState) {
          broadcastState(io, roomId, updatedState);
        }
      }
    );

    socket.on(
      'evolve_card',
      ({
        cardId,
        targetPosition,
      }: {
        cardId?: string;
        targetPosition?: BenchTarget | number | string;
      }) => {
        const ctx = requireRoom(socket);
        if (!ctx) return;

        const { roomId, gameState } = ctx;
        if (!requireBattlePhase(gameState)) return;
        if (blockIfPendingChooseActive(socket, roomId, 'evolve')) return;
        if (!requireCurrentTurn(socket, gameState)) return;

        const meta = getMeta(roomId);
        if (!meta.hasDrawnThisTurn) {
          emitError(socket, 'Draw kartu dulu di awal giliran');
          return;
        }

        const target = parseBenchTarget(targetPosition ?? '');
        if (!cardId || target === null) {
          emitError(socket, 'cardId dan targetPosition tidak valid');
          return;
        }

        try {
          updateGameState(roomId, (state) => {
            const player = getPlayer(state, socket.id);
            const evolutionCard = removeCardFromHand(player, cardId);
            const targetCard = getBoardCard(player, target);

            if (!targetCard) {
              throw new Error('Target kartu tidak ada di board');
            }

            if (evolutionCard.stage !== targetCard.cardData.stage + 1) {
              throw new Error('Stage evolusi tidak cocok');
            }

            const checkEvolutionMatch = (evolvesFrom: string | undefined, targetId: string, targetName: string) => {
              if (!evolvesFrom) return false;
              if (evolvesFrom === targetId) return true;
              const baseName = evolvesFrom.split('-')[0].toLowerCase();
              return targetName.toLowerCase().includes(baseName);
            };

            if (!checkEvolutionMatch(evolutionCard.evolvesFrom, targetCard.cardData.id, targetCard.cardData.name)) {
              throw new Error('Kartu tidak dapat berevolusi dari kartu ini');
            }

            const fromCardName = targetCard.cardData.name;
            const toCardName = evolutionCard.name;

            const evolvedCard = createActiveCard(evolutionCard);
            evolvedCard.currentHP = targetCard.currentHP;
            evolvedCard.attachedSKS = targetCard.attachedSKS;
            evolvedCard.evolvedThisTurn = true;
            setBoardCard(player, target, evolvedCard);

            addBattleLog(state, {
              type: 'evolve_card',
              playerId: socket.id,
              fromCard: fromCardName,
              toCard: toCardName,
              timestamp: Date.now(),
            });
          });
        } catch (error) {
          emitError(
            socket,
            error instanceof Error ? error.message : 'Gagal evolve'
          );
          return;
        }

        const updatedState = getGameState(roomId);
        if (updatedState) {
          broadcastState(io, roomId, updatedState);
        }
      }
    );

    socket.on(
      'attach_sks',
      ({ target }: { target?: BenchTarget | number | string }) => {
        const ctx = requireRoom(socket);
        if (!ctx) return;

        const { roomId, gameState } = ctx;
        if (!requireBattlePhase(gameState)) return;
        if (blockIfPendingChooseActive(socket, roomId, 'attach SKS')) return;
        if (!requireCurrentTurn(socket, gameState)) return;

        const meta = getMeta(roomId);
        if (!meta.hasDrawnThisTurn) {
          emitError(socket, 'Draw kartu dulu di awal giliran');
          return;
        }

        const parsedTarget = parseBenchTarget(target ?? '');
        if (parsedTarget === null) {
          emitError(socket, 'Target attach SKS tidak valid');
          return;
        }

        try {
          updateGameState(roomId, (state) => {
            const player = getPlayer(state, socket.id);
            if (player.hasAttachedSKSThisTurn) {
              throw new Error('Sudah attach SKS giliran ini');
            }

            const boardCard = getBoardCard(player, parsedTarget);
            if (!boardCard) {
              throw new Error('Target kartu tidak ada');
            }

            boardCard.attachedSKS += 1;
            player.hasAttachedSKSThisTurn = true;

            const targetName = parsedTarget === 'active' ? 'Active' : `Bench ${parsedTarget}`;
            addBattleLog(state, {
              type: 'attach_sks',
              playerId: socket.id,
              target: `${targetName} (${boardCard.cardData.name})`,
              timestamp: Date.now(),
            });
          });
        } catch (error) {
          emitError(
            socket,
            error instanceof Error ? error.message : 'Gagal attach SKS'
          );
          return;
        }

        const updatedState = getGameState(roomId);
        if (updatedState) {
          broadcastState(io, roomId, updatedState);
        }
      }
    );

    socket.on('retreat', ({ benchIndex }: { benchIndex?: number }) => {
      const ctx = requireRoom(socket);
      if (!ctx) return;

      const { roomId, gameState } = ctx;
      if (!requireBattlePhase(gameState)) return;
      if (blockIfPendingChooseActive(socket, roomId, 'retreat')) return;
      if (!requireCurrentTurn(socket, gameState)) return;

      const meta = getMeta(roomId);
      if (!meta.hasDrawnThisTurn) {
        emitError(socket, 'Draw kartu dulu di awal giliran');
        return;
      }

      if (benchIndex === undefined || benchIndex < 0 || benchIndex > 2) {
        emitError(socket, 'Bench index tidak valid');
        return;
      }

      try {
        updateGameState(roomId, (state) => {
          const player = getPlayer(state, socket.id);
          if (player.hasRetreatedThisTurn) {
            throw new Error('Sudah retreat giliran ini');
          }

          const active = player.active;
          const benchCard = player.bench[benchIndex];
          if (!active) {
            throw new Error('Tidak ada kartu active');
          }
          if (!benchCard) {
            throw new Error('Slot bench kosong');
          }
          if (active.attachedSKS < active.cardData.retreatCost) {
            throw new Error('SKS tidak cukup untuk bolos');
          }

          const fromCardName = active.cardData.name;
          const toCardName = benchCard.cardData.name;

          active.attachedSKS -= active.cardData.retreatCost;
          player.active = benchCard;
          player.bench[benchIndex] = active;
          player.hasRetreatedThisTurn = true;

          addBattleLog(state, {
            type: 'retreat',
            playerId: socket.id,
            fromCard: fromCardName,
            toCard: toCardName,
            timestamp: Date.now(),
          });
        });
      } catch (error) {
        emitError(
          socket,
          error instanceof Error ? error.message : 'Gagal retreat'
        );
        return;
      }

      const updatedState = getGameState(roomId);
      if (updatedState) {
        broadcastState(io, roomId, updatedState);
      }
    });

    socket.on('use_skill', ({ skillIndex }: { skillIndex?: number }) => {
      const ctx = requireRoom(socket);
      if (!ctx) return;

      const { roomId, gameState } = ctx;
      if (!requireBattlePhase(gameState)) return;
      if (blockIfPendingChooseActive(socket, roomId, 'attack')) return;
      if (!requireCurrentTurn(socket, gameState)) return;

      const meta = getMeta(roomId);
      if (!meta.hasDrawnThisTurn) {
        emitError(socket, 'Draw kartu dulu di awal giliran');
        return;
      }

      if (skillIndex === undefined || skillIndex < 0) {
        emitError(socket, 'Skill index tidak valid');
        return;
      }

      let attackPayload: {
        damage: number;
        isWeakness: boolean;
        defenderHP: number;
        koOccurred: boolean;
        pointsAwarded: number;
        ngulangPoints: Record<string, number>;
      } | null = null;

      try {
        updateGameState(roomId, (state) => {
          const attackerPlayer = getPlayer(state, socket.id);
          const defenderPlayerId = getOpponentId(state, socket.id);
          const defenderPlayer = getPlayer(state, defenderPlayerId);

          const attacker = attackerPlayer.active;
          const defender = defenderPlayer.active;

          if (!attacker) {
            throw new Error('Tidak ada kartu active');
          }
          if (!defender) {
            throw new Error('Lawan tidak punya kartu active');
          }

          const skill = attacker.cardData.skills[skillIndex];
          const skillName = skill?.name ?? 'Unknown Skill';

          const result = resolveAttack(attacker, defender, skillIndex);
          const koOccurred = checkKO(defender);
          let pointsAwarded = 0;

          if (koOccurred) {
            const koResult = applyKO(state, defenderPlayerId, defender);
            pointsAwarded = koResult.pointsAwarded;

            addBattleLog(state, {
              type: 'ko',
              playerId: socket.id,
              cardName: defender.cardData.name,
              points: pointsAwarded,
              timestamp: Date.now(),
            });
          }

          addBattleLog(state, {
            type: 'attack',
            playerId: socket.id,
            skillName,
            damage: result.damage,
            isWeakness: result.isWeakness,
            timestamp: Date.now(),
          });

          attackPayload = {
            damage: result.damage,
            isWeakness: result.isWeakness,
            defenderHP: result.newHP,
            koOccurred,
            pointsAwarded,
            ngulangPoints: getNgulangPointsSnapshot(state),
          };
        });
      } catch (error) {
        emitError(
          socket,
          error instanceof Error ? error.message : 'Gagal attack'
        );
        return;
      }

      const updatedState = getGameState(roomId);
      if (!updatedState || !attackPayload) return;

      io.to(roomId).emit('attack_result', attackPayload);
      broadcastState(io, roomId, updatedState);

      if (attackPayload.koOccurred) {
        const winner = checkWin(updatedState);
        if (winner) {
          finishGame(io, roomId, winner, '3 Ngulang Matkul Points');
          return;
        }

        const defeatedPlayerId = getOpponentId(updatedState, socket.id);
        const defeatedPlayer = getPlayer(updatedState, defeatedPlayerId);

        if (!hasAnyBenchCard(defeatedPlayer)) {
          finishGame(io, roomId, socket.id, 'Lawan tidak punya kartu bench');
          return;
        }

        meta.pendingChooseActive = defeatedPlayerId;
        io.to(roomId).emit('must_choose_active', { playerId: defeatedPlayerId });
        return;
      }

      advanceTurn(updatedState);
      meta.hasDrawnThisTurn = false;
      meta.pendingChooseActive = null;

      const afterTurn = getGameState(roomId);
      if (afterTurn) {
        broadcastState(io, roomId, afterTurn);
        io.to(roomId).emit('turn_changed', {
          currentTurnPlayerId: afterTurn.currentTurnPlayerId,
        });
        startTurnTimer(io, roomId);
      }
    });

    socket.on('end_turn', () => {
      const ctx = requireRoom(socket);
      if (!ctx) return;

      const { roomId, gameState } = ctx;
      if (!requireBattlePhase(gameState)) return;
      if (blockIfPendingChooseActive(socket, roomId, 'end turn')) return;
      if (!requireCurrentTurn(socket, gameState)) return;

      const meta = getMeta(roomId);
      if (!meta.hasDrawnThisTurn) {
        emitError(socket, 'Draw kartu dulu di awal giliran');
        return;
      }

      updateGameState(roomId, (state) => {
        addBattleLog(state, {
          type: 'end_turn',
          playerId: socket.id,
          timestamp: Date.now(),
        });
      });

      advanceTurn(gameState);
      meta.hasDrawnThisTurn = false;

      const updatedState = getGameState(roomId);
      if (updatedState) {
        broadcastState(io, roomId, updatedState);
        io.to(roomId).emit('turn_changed', {
          currentTurnPlayerId: updatedState.currentTurnPlayerId,
        });
        startTurnTimer(io, roomId);
      }
    });

    socket.on('choose_active', ({ benchIndex }: { benchIndex?: number }) => {
      const ctx = requireRoom(socket);
      if (!ctx) return;

      const { roomId, gameState } = ctx;
      if (!requireBattlePhase(gameState)) return;

      const meta = getMeta(roomId);
      if (meta.pendingChooseActive !== socket.id) {
        emitError(socket, 'Kamu tidak perlu pilih active sekarang');
        return;
      }

      if (benchIndex === undefined || benchIndex < 0 || benchIndex > 2) {
        emitError(socket, 'Bench index tidak valid');
        return;
      }

      try {
        updateGameState(roomId, (state) => {
          const player = getPlayer(state, socket.id);
          if (!hasAnyBenchCard(player)) {
            throw new Error('Bench kosong');
          }
          const newActive = promoteBenchToActive(player, benchIndex);

          addBattleLog(state, {
            type: 'play_card',
            playerId: socket.id,
            cardName: newActive.cardData.name,
            target: 'active',
            timestamp: Date.now(),
          });
        });
      } catch (error) {
        const player = getGameState(roomId)?.players[socket.id];
        if (!player || !hasAnyBenchCard(player)) {
          const opponentId = gameState.playerOrder.find((id) => id !== socket.id);
          if (opponentId) {
            finishGame(io, roomId, opponentId, 'Tidak ada kartu bench tersisa');
          }
          return;
        }

        emitError(
          socket,
          error instanceof Error ? error.message : 'Gagal pilih active'
        );
        return;
      }

      meta.pendingChooseActive = null;

      const updatedState = getGameState(roomId);
      if (!updatedState) return;

      broadcastState(io, roomId, updatedState);

      const winner = checkWin(updatedState);
      if (winner) {
        finishGame(io, roomId, winner, '3 Ngulang Matkul Points');
        return;
      }

      advanceTurn(updatedState);
      meta.hasDrawnThisTurn = false;

      const afterTurn = getGameState(roomId);
      if (afterTurn) {
        broadcastState(io, roomId, afterTurn);
        io.to(roomId).emit('turn_changed', {
          currentTurnPlayerId: afterTurn.currentTurnPlayerId,
        });
        startTurnTimer(io, roomId);
      }
    });

    socket.on('disconnect', () => {
      const room = getRoomForPlayer(socket.id);
      if (!room) return;

      const meta = getMeta(room.roomId);
      if (meta.turnTimerInterval) {
        clearInterval(meta.turnTimerInterval);
        meta.turnTimerInterval = null;
      }

      const gameState = getGameState(room.roomId);
      const opponentId =
        room.hostId === socket.id ? room.guestId : room.hostId;

      if (
        gameState &&
        gameState.phase !== 'ended' &&
        gameState.phase !== 'waiting' &&
        opponentId
      ) {
        io.to(room.roomId).emit('game_over', {
          winnerId: opponentId,
          reason: 'Lawan disconnect',
        });
      }

      const result = disconnectPlayer(socket.id);
      if (result.cleanedUp) {
        deleteMeta(room.roomId);
      }
    });
  });
}
