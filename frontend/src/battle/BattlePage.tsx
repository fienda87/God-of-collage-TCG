import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './battle.css';
import { BattleBoard } from './components/BattleBoard';
import { DamagePopup } from './components/DamagePopup';
import { LobbyScreen } from './components/LobbyScreen';
import { CardDetailModal } from './components/CardDetailModal';
import { ParticleBackground } from './components/ParticleBackground';
import { TurnBanner } from './components/TurnBanner';
import { BattleLog } from './components/BattleLog';
import { PingIndicator } from './components/PingIndicator';
import { useGameSounds, setSfxEnabled, isSfxEnabled } from './hooks/useGameSounds';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import {
  initialInteractionState,
  resetInteraction,
  type InteractionMode,
} from './hooks/useBattleInteraction';
import { useBattleStore } from './useBattle';
import type { ActiveCard, BenchTarget, CardData, PlayerState } from './types';

export const BattlePage: React.FC = () => {
  const {
    connected,
    roomCode,
    playerCount,
    gameState,
    myPlayerId,
    hasDrawnThisTurn,
    mustChooseActive,
    lastAttackResult,
    error,
    gameOverReason,
    connect,
    disconnect,
    clearError,
    createRoom,
    joinRoom,
    playerReady,
    drawCard,
    playToBench,
    evolveCard,
    attachSks,
    retreat,
    useSkill,
    endTurn,
    chooseActive,
    isPreGameReady,
    preGameReady,
    isCoinFlipping,
    coinFlipResult,
  } = useBattleStore();

  const [interaction, setInteraction] = useState(initialInteractionState);
  const [boardDetailCard, setBoardDetailCard] = useState<{
    cardData: CardData;
    activeCardState?: ActiveCard | null;
    isMyActive?: boolean;
  } | null>(null);
  const [shakeOpponent, setShakeOpponent] = useState(false);
  const [damagePopup, setDamagePopup] = useState<{
    damage: number;
    isWeakness: boolean;
    x: number;
    y: number;
  } | null>(null);

  const [drawAnim, setDrawAnim] = useState<{ x: number; y: number } | null>(null);
  const [screenShake, setScreenShake] = useState(false);
  const [setupState, setSetupState] = useState<{
    activeIndex: number | null;
    benchIndices: number[];
  }>({ activeIndex: null, benchIndices: [] });
  const [dragState, setDragState] = useState<{
    cardIndex: number;
    x: number;
    y: number;
  } | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [sfxOn, setSfxOn] = useState(isSfxEnabled());
  const [logOpen, setLogOpen] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const sfx = useGameSounds();
  const prevTurnRef = useRef<number | null>(null);

  const myPlayer = useMemo<PlayerState | null>(() => {
    if (!gameState || !myPlayerId) return null;
    return gameState.players[myPlayerId] ?? null;
  }, [gameState, myPlayerId]);

  const opponentPlayer = useMemo<PlayerState | null>(() => {
    if (!gameState || !myPlayerId) return null;
    const opponentId = gameState.playerOrder.find((id) => id !== myPlayerId);
    if (!opponentId) return null;
    return gameState.players[opponentId] ?? null;
  }, [gameState, myPlayerId]);

  const isMyTurn = gameState?.currentTurnPlayerId === myPlayerId;
  const phase = gameState?.phase;

  const setMode = useCallback((mode: InteractionMode) => {
    setInteraction((s) => ({
      ...s,
      mode,
      selectedHandIndex: null,
      selectedBenchIndex: null,
    }));
  }, []);

  useKeyboardShortcuts({
    enabled: true,
    onEndTurn: () => endTurn(),
    onToggleLog: () => setLogOpen((prev) => !prev),
    onToggleRules: () => {},
    onSetMode: setMode,
    interactionMode: interaction.mode,
    isMyTurn: !!isMyTurn,
    hasDrawnThisTurn,
    mustChooseActive,
    phase: phase ?? '',
  });

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  useEffect(() => {
    setInteraction(resetInteraction());
  }, [gameState?.currentTurnPlayerId, gameState?.turnNumber]);

  useEffect(() => {
    if (gameState?.phase === 'setup') {
      setSetupState({ activeIndex: null, benchIndices: [] });
    }
  }, [gameState?.phase]);

  useEffect(() => {
    if (!lastAttackResult) return;
    setShakeOpponent(true);
    if (lastAttackResult.damage >= 30 || lastAttackResult.isWeakness) {
      setScreenShake(true);
    }
    sfx(lastAttackResult.isWeakness ? 'weakness' : 'cardHit');
    const t = setTimeout(() => setShakeOpponent(false), 300);
    const t3 = setTimeout(() => setScreenShake(false), 400);
    setDamagePopup({
      damage: lastAttackResult.damage,
      isWeakness: lastAttackResult.isWeakness,
      x: window.innerWidth / 2 - 30,
      y: window.innerHeight * 0.22,
    });
    const t2 = setTimeout(() => setDamagePopup(null), 1200);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [lastAttackResult]);

  useEffect(() => {
    if (gameState?.turnNumber && gameState.turnNumber !== prevTurnRef.current) {
      if (prevTurnRef.current !== null) {
        sfx('turnStart');
      }
      prevTurnRef.current = gameState.turnNumber;
    }
  }, [gameState?.turnNumber]);


  const handleActiveClick = () => {
    if (mustChooseActive) return;
    if (interaction.mode === 'attach_sks') {
      attachSks('active');
      setMode('none');
      return;
    }
    if (interaction.mode === 'evolve' && interaction.selectedHandIndex !== null && myPlayer) {
      const card = myPlayer.hand[interaction.selectedHandIndex];
      if (card) {
        evolveCard(card.id, 'active');
        setMode('none');
      }
      return;
    }
    if (myPlayer?.active) {
      setBoardDetailCard({
        cardData: myPlayer.active.cardData,
        activeCardState: myPlayer.active,
        isMyActive: isMyTurn && hasDrawnThisTurn,
      });
    }
  };

  const handleBenchClick = (index: number) => {
    if (mustChooseActive) {
      sfx('cardPlay');
      chooseActive(index);
      setInteraction(resetInteraction());
      return;
    }

    if (interaction.mode === 'retreat') {
      sfx('cardPlay');
      retreat(index);
      setMode('none');
      return;
    }

    if (interaction.mode === 'attach_sks') {
      sfx('sksAttach');
      attachSks(index as BenchTarget);
      setMode('none');
      return;
    }

    if (interaction.mode === 'play_bench') {
      if (interaction.selectedHandIndex !== null && myPlayer) {
        const card = myPlayer.hand[interaction.selectedHandIndex];
        if (card) {
          sfx('cardPlay');
          playToBench(card.id, index);
          setMode('none');
        }
      } else {
        setInteraction((s) => ({ ...s, selectedBenchIndex: index }));
      }
      return;
    }

    if (interaction.mode === 'evolve' && interaction.selectedHandIndex !== null && myPlayer) {
      const card = myPlayer.hand[interaction.selectedHandIndex];
      if (card) {
        sfx('cardPlay');
        evolveCard(card.id, index as BenchTarget);
        setMode('none');
      }
      return;
    }

    if (myPlayer?.bench[index]) {
      setBoardDetailCard({
        cardData: myPlayer.bench[index]!.cardData,
        activeCardState: myPlayer.bench[index],
        isMyActive: false,
      });
    }
  };

  const handleHandClick = (index: number) => {
    if (!myPlayer) return;
    const card = myPlayer.hand[index];
    if (!card) return;

    if (card.stage === 0) {
      const emptySlotIndex = myPlayer.bench.findIndex((slot) => slot === null);
      if (emptySlotIndex !== -1) {
        sfx('cardPlay');
        playToBench(card.id, emptySlotIndex);
      } else {
        useBattleStore.getState().addLog('Bench sudah penuh!');
      }
    } else if (card.stage === 1) {
      const targets: { pos: BenchTarget; id: string }[] = [];
      if (myPlayer.active && checkEvolutionMatch(card.evolvesFrom, myPlayer.active.cardData.id, myPlayer.active.cardData.name)) {
        targets.push({ pos: 'active', id: myPlayer.active.cardData.id });
      }
      myPlayer.bench.forEach((slot, idx) => {
        if (slot && checkEvolutionMatch(card.evolvesFrom, slot.cardData.id, slot.cardData.name)) {
          targets.push({ pos: idx as BenchTarget, id: slot.cardData.id });
        }
      });

      if (targets.length === 1) {
        sfx('cardPlay');
        evolveCard(card.id, targets[0].pos);
      } else if (targets.length > 1) {
        setInteraction((s) => ({
          ...s,
          mode: 'evolve',
          selectedHandIndex: index,
        }));
        useBattleStore.getState().addLog(`Pilih kartu di field untuk di-evolusi menjadi ${card.name}`);
      } else {
        useBattleStore.getState().addLog(`Tidak ada kartu ${card.evolvesFrom} di field untuk di-evolusi`);
      }
    }
  };

  const handleOpponentActiveClick = () => {
    if (opponentPlayer?.active) {
      setBoardDetailCard({
        cardData: opponentPlayer.active.cardData,
        activeCardState: opponentPlayer.active,
        isMyActive: false,
      });
    }
  };

  const handleOpponentBenchClick = (index: number) => {
    const card = opponentPlayer?.bench[index];
    if (card) {
      setBoardDetailCard({
        cardData: card.cardData,
        activeCardState: card,
        isMyActive: false,
      });
    }
  };

  const handleAttachSks = () => {
    setMode(interaction.mode === 'attach_sks' ? 'none' : 'attach_sks');
  };

  const handleDeckClick = () => {
    if (isMyTurn && !hasDrawnThisTurn && !mustChooseActive && phase === 'battle') {
      sfx('draw');
      if (deckRef.current) {
        const rect = deckRef.current.getBoundingClientRect();
        setDrawAnim({ x: rect.left + rect.width / 2, y: rect.top });
        setTimeout(() => setDrawAnim(null), 500);
      }
      drawCard();
    }
  };

  const handleDragStart = (cardIndex: number, e: React.PointerEvent) => {
    e.preventDefault();
    setDragState({ cardIndex, x: e.clientX, y: e.clientY });
  };

  const handleDragMove = (e: React.PointerEvent) => {
    if (!dragState) return;
    setDragState((s) => s ? { ...s, x: e.clientX, y: e.clientY } : s);

    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (el) {
      const slot = el.closest('[data-drop-target]');
      setDropTarget(slot?.getAttribute('data-drop-target') ?? null);
    }
  };

  const checkEvolutionMatch = (evolvesFrom: string | undefined, targetId: string, targetName: string) => {
    if (!evolvesFrom) return false;
    if (evolvesFrom === targetId) return true;
    const baseName = evolvesFrom.split('-')[0].toLowerCase();
    return targetName.toLowerCase().includes(baseName);
  };

  const handleDragEnd = (e: React.PointerEvent) => {
    if (!dragState || !myPlayer) {
      setDragState(null);
      setDropTarget(null);
      return;
    }

    const el = document.elementFromPoint(e.clientX, e.clientY);
    const slot = el?.closest('[data-drop-target]');
    const target = slot?.getAttribute('data-drop-target');

    if (target && target.startsWith('bench-')) {
      const benchIndex = parseInt(target.replace('bench-', ''), 10);
      const card = myPlayer.hand[dragState.cardIndex];
      if (card) {
        if (myPlayer.bench[benchIndex] && checkEvolutionMatch(card.evolvesFrom, myPlayer.bench[benchIndex]!.cardData.id, myPlayer.bench[benchIndex]!.cardData.name)) {
          evolveCard(card.id, benchIndex as BenchTarget);
        } else if (!myPlayer.bench[benchIndex] && card.stage === 0) {
          playToBench(card.id, benchIndex);
        }
      }
    } else if (target === 'active') {
      const card = myPlayer.hand[dragState.cardIndex];
      if (card && myPlayer.active && checkEvolutionMatch(card.evolvesFrom, myPlayer.active.cardData.id, myPlayer.active.cardData.name)) {
        evolveCard(card.id, 'active');
      }
    }

    setDragState(null);
    setDropTarget(null);
  };

  const handleSetupReady = () => {
    if (!myPlayer || setupState.activeIndex === null) return;
    const activeCard = myPlayer.hand[setupState.activeIndex];
    if (!activeCard || activeCard.stage !== 0) return;
    const activeCardId = activeCard.id;
    const benchCardIds = setupState.benchIndices
      .map((i) => myPlayer.hand[i])
      .filter((c): c is CardData => Boolean(c) && c.stage === 0)
      .map((c) => c.id);
    playerReady(activeCardId, benchCardIds);
  };

  const canEvolve = (card: CardData): boolean => {
    if (!myPlayer || !isMyTurn || !hasDrawnThisTurn || mustChooseActive) return false;
    if (myPlayer.active && checkEvolutionMatch(card.evolvesFrom, myPlayer.active.cardData.id, myPlayer.active.cardData.name)) return true;
    return myPlayer.bench.some((b) => b && checkEvolutionMatch(card.evolvesFrom, b.cardData.id, b.cardData.name));
  };

  const renderContent = () => {
    if (!connected) {
      return (
        <div className="flex items-center justify-center h-full text-[#A0A0B8] text-sm">
          Menghubungkan...
        </div>
      );
    }

    if (phase === 'ended' || gameOverReason) {
      const won = gameState?.winnerId === myPlayerId;
      return (
        <>
          <ParticleBackground />
          <div className={`game-result-overlay ${won ? 'game-result-overlay--win' : 'game-result-overlay--lose'}`}>
            <h1 className="game-result__title">{won ? '🏆 Menang!' : '💀 Kalah'}</h1>
            <p className="game-result__subtitle">{gameOverReason ?? 'Game selesai'}</p>
            <button
              type="button"
              onClick={() => {
                sfx('buttonClick');
                disconnect();
                connect();
              }}
              className="btn-play mt-4"
            >
              Main Lagi
            </button>
          </div>
        </>
      );
    }

    if (isCoinFlipping || coinFlipResult) {
      const isMyTurnFirst = coinFlipResult?.firstPlayerId === myPlayerId;
      return (
        <div className="coin-flip-overlay">
          <div className="coin-flip-content">
            {!coinFlipResult ? (
              <>
                <div className="coin flipping" />
                <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 20, margin: 0 }}>Menentukan Giliran...</h2>
              </>
            ) : (
              <>
                <div className={`coin result ${isMyTurnFirst ? 'win' : 'lose'}`} />
                <h2 className="result-text">{coinFlipResult.message}</h2>
                <p className="subtitle">
                  {isMyTurnFirst ? 'Kamu jalan duluan!' : 'Lawan jalan duluan!'}
                </p>
              </>
            )}
          </div>
        </div>
      );
    }

    if (phase === 'setup' && myPlayer) {
      const isReady = !!myPlayer.active;
      const activeCard = isReady
        ? myPlayer.active?.cardData
        : (setupState.activeIndex !== null ? myPlayer.hand[setupState.activeIndex] : null);

      const benchCards = isReady
        ? myPlayer.bench.filter((slot): slot is ActiveCard => slot !== null).map((slot) => slot.cardData)
        : setupState.benchIndices.map((i) => myPlayer.hand[i]).filter(Boolean);

      const setupDragMove = (e: React.PointerEvent) => {
        if (isReady) return;
        if (dragState) setDragState((s) => s ? { ...s, x: e.clientX, y: e.clientY } : s);
        const el = document.elementFromPoint(e.clientX, e.clientY);
        setDropTarget(el?.closest('[data-setup-target]')?.getAttribute('data-setup-target') ?? null);
      };

      const setupDragEnd = (e: React.PointerEvent) => {
        if (isReady || !dragState || !myPlayer) { setDragState(null); setDropTarget(null); return; }
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const target = el?.closest('[data-setup-target]')?.getAttribute('data-setup-target');
        const card = myPlayer.hand[dragState.cardIndex];
        if (!card || card.stage !== 0) { setDragState(null); setDropTarget(null); return; }

        if (target === 'active') {
          const newBench = setupState.benchIndices.filter(i => i !== dragState.cardIndex);
          setSetupState({ activeIndex: dragState.cardIndex, benchIndices: newBench });
        } else if (target?.startsWith('bench-') && setupState.benchIndices.length < 3) {
          if (!setupState.benchIndices.includes(dragState.cardIndex) && dragState.cardIndex !== setupState.activeIndex) {
            setSetupState((s) => ({ ...s, benchIndices: [...s.benchIndices, dragState!.cardIndex] }));
          }
        }
        setDragState(null);
        setDropTarget(null);
      };

      const renderSetupCard = (card: CardData, w: number, h: number) => (
        <div style={{ width: w, height: h, borderRadius: 8, overflow: 'hidden', border: '1.5px solid #2a2a42', position: 'relative', flexShrink: 0 }}>
          {card.imageUrl ? (
            <img src={card.imageUrl} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} draggable={false} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#1C1C2E' }} />
          )}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', padding: '4px 6px' }}>
            <p style={{ fontSize: 9, fontWeight: 800, color: '#fff', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{card.name}</p>
            <p style={{ fontSize: 8, color: '#fbbf24', fontWeight: 700, margin: 0 }}>{card.hp} HP</p>
          </div>
        </div>
      );

      return (
        <div className="setup-overlay" onPointerMove={setupDragMove} onPointerUp={setupDragEnd}>
          <div className="setup-overlay__header">
            <h2 className="setup-overlay__title">Siapkan Deck</h2>
            <p className="setup-overlay__subtitle">
              {activeCard
                ? `✓ ${activeCard.name} → Active · Bench ${benchCards.length}/3`
                : 'Tap atau drag kartu Maba ke slot'}
            </p>
          </div>

          <div className="setup-overlay__board">
            <div className="setup-slot-row">
              <div
                className={`setup-slot setup-slot--active ${activeCard ? 'setup-slot--filled' : ''} ${
                  dropTarget === 'active' && !activeCard ? 'setup-slot--drop-hover' : ''
                }`}
                data-setup-target="active"
                style={activeCard ? { borderStyle: 'solid', padding: 0, overflow: 'hidden', cursor: isReady ? 'default' : 'pointer' } : undefined}
                onClick={
                  !isReady && activeCard
                    ? () => setSetupState((s) => ({ ...s, activeIndex: null }))
                    : undefined
                }
              >
                {activeCard ? renderSetupCard(activeCard, 80, 112) : (
                  <span className="setup-slot__label">Active</span>
                )}
              </div>
            </div>

            <div className="setup-slot-row">
              {[0, 1, 2].map((i) => {
                const card = benchCards[i];
                return (
                  <div
                    key={i}
                    className={`setup-slot ${card ? 'setup-slot--filled' : ''} ${
                      dropTarget === `bench-${i}` && !card ? 'setup-slot--drop-hover' : ''
                    }`}
                    data-setup-target={`bench-${i}`}
                    style={card ? { borderStyle: 'solid', padding: 0, overflow: 'hidden', cursor: isReady ? 'default' : 'pointer' } : undefined}
                    onClick={
                      !isReady && card
                        ? () => setSetupState((s) => {
                            const next = [...s.benchIndices];
                            next.splice(i, 1);
                            return { ...s, benchIndices: next };
                          })
                        : undefined
                    }
                  >
                    {card ? renderSetupCard(card, 64, 90) : (
                      <span className="setup-slot__label">Bench {i + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="setup-overlay__hand">
            <div className="hand-row" style={{ justifyContent: 'center' }}>
              {myPlayer.hand.map((card, index) => {
                const isStage0 = card.stage === 0;
                const isActive = setupState.activeIndex === index;
                const isBench = setupState.benchIndices.includes(index);
                const isPlaced = isActive || isBench;

                return (
                  <button
                    key={`${card.id}-${index}`}
                    type="button"
                    className={`hand-card ${isStage0 ? 'hand-card--playable' : 'hand-card--dimmed'} ${isPlaced ? 'hand-card--selected' : ''} ${dragState?.cardIndex === index ? 'hand-card--dragging' : ''}`}
                    style={{ width: 64, height: 90, opacity: isPlaced ? 0.3 : (!isStage0 ? 0.35 : 1) }}
                    onPointerDown={(e) => {
                      if (isReady || !isStage0 || isPlaced) return;
                      e.preventDefault();
                      e.stopPropagation();
                      setDragState({ cardIndex: index, x: e.clientX, y: e.clientY });
                    }}
                    onClick={() => {
                      if (isReady || !isStage0 || isPlaced) return;
                      if (setupState.activeIndex === null) {
                        setSetupState((s) => ({ ...s, activeIndex: index }));
                      } else if (setupState.benchIndices.length < 3) {
                        setSetupState((s) => ({ ...s, benchIndices: [...s.benchIndices, index] }));
                      }
                    }}
                  >
                    {card.imageUrl ? (
                      <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover object-top" draggable={false} />
                    ) : (
                      <div className="w-full h-full bg-[#1C1C2E]" />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-1 py-1">
                      <p className="text-[7px] font-bold text-white truncate">{card.name}</p>
                      {isPlaced && (
                        <p className="text-[6px] text-[#fbbf24] font-bold">
                          {isActive ? '→ Active' : '→ Bench'}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="setup-overlay__actions">
            <button
              type="button"
              disabled={isReady || setupState.activeIndex === null}
              onClick={handleSetupReady}
              className="btn-play disabled:opacity-40"
            >
              {isReady
                ? 'Menunggu lawan...'
                : activeCard
                ? 'Siap Battle!'
                : 'Pilih Active dulu'}
            </button>
          </div>

          {dragState && (
            <div
              style={{
                position: 'fixed',
                left: dragState.x - 32,
                top: dragState.y - 45,
                width: 64,
                height: 90,
                borderRadius: 8,
                border: '2px solid #7c3aed',
                boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4)',
                background: '#1c1c2e',
                zIndex: 1000,
                pointerEvents: 'none',
                opacity: 0.9,
                transform: 'scale(1.05) rotate(-2deg)',
                overflow: 'hidden',
              }}
            >
              {myPlayer.hand[dragState.cardIndex]?.imageUrl ? (
                <img
                  src={myPlayer.hand[dragState.cardIndex].imageUrl}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                  draggable={false}
                />
              ) : null}
            </div>
          )}
        </div>
      );
    }

    if (phase === 'battle' && myPlayer && opponentPlayer) {
      return (
        <>
          <BattleBoard
            opponent={opponentPlayer}
            player={myPlayer}
            isMyTurn={!!isMyTurn}
            turnNumber={gameState?.turnNumber ?? 0}
            roomCode={roomCode}
            hasDrawnThisTurn={hasDrawnThisTurn}
            mustChooseActive={mustChooseActive}
            interactionMode={interaction.mode}
            selectedBenchIndex={interaction.selectedBenchIndex}
            selectedHandIndex={interaction.selectedHandIndex}
            shakeOpponent={shakeOpponent}
            canDraw={isMyTurn && !hasDrawnThisTurn && !mustChooseActive}
            canEvolveCard={canEvolve}
            deckRef={deckRef}
            onDraw={handleDeckClick}
            onActiveClick={handleActiveClick}
            onBenchClick={handleBenchClick}
            onHandClick={handleHandClick}
            onAttachSks={handleAttachSks}
            onSetMode={setMode}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
            dragCardIndex={dragState?.cardIndex ?? null}
            dropTarget={dropTarget}
            onOpponentActiveClick={handleOpponentActiveClick}
            onOpponentBenchClick={handleOpponentBenchClick}
            turnTimeLeft={gameState?.turnTimeLeft ?? 60}
          />

          <button
            type="button"
            className={`btn-toggle-log ${logOpen ? 'btn-toggle-log--open' : ''}`}
            onClick={() => {
              sfx('buttonClick');
              setLogOpen((prev) => !prev);
            }}
            aria-label={logOpen ? 'Tutup Battle Log' : 'Buka Battle Log'}
            title={logOpen ? 'Tutup Battle Log' : 'Buka Battle Log'}
          >
            📋
          </button>

          <BattleLog
            log={gameState?.battleLog ?? []}
            isOpen={logOpen}
            onClose={() => setLogOpen(false)}
          />
        </>
      );
    }

    if (phase === 'waiting' && roomCode) {
      return (
        <div className="flex flex-col items-center justify-center h-full px-6 gap-4">
          {playerCount < 2 ? (
            <p className="text-sm text-[#A0A0B8]">Menunggu lawan bergabung...</p>
          ) : (
            <p className="text-sm text-[#22c55e]">Lawan sudah bergabung!</p>
          )}

          <div
            className="rounded-2xl border-2 px-8 py-5 text-center"
            style={{ borderColor: '#C5A028' }}
          >
            <p className="text-[10px] uppercase tracking-widest text-[#505068] mb-1">
              Kode Room
            </p>
            <p
              className="text-4xl font-black text-white tracking-[0.25em]"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              {roomCode}
            </p>
          </div>

          <p className="text-xs text-[#A0A0B8]">Pemain {playerCount}/2</p>

          {playerCount === 2 && (
            <button
              type="button"
              onClick={preGameReady}
              disabled={isPreGameReady}
              className="mt-6 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-white border border-[#7C3AED] bg-[#7C3AED40] disabled:opacity-40 active:scale-[0.97] transition-transform duration-150"
            >
              {isPreGameReady ? 'Menunggu lawan...' : 'Siap!'}
            </button>
          )}
        </div>
      );
    }

    return <LobbyScreen onCreateRoom={createRoom} onJoinRoom={joinRoom} />;
  };

  return (
    <div className={`battle-page ${screenShake ? 'battle-page--shake' : ''}`}>
      <ParticleBackground />
      <PingIndicator />

      <button
        type="button"
        className={`sfx-toggle ${!sfxOn ? 'sfx-toggle--off' : ''}`}
        onClick={() => {
          const next = !sfxOn;
          setSfxOn(next);
          setSfxEnabled(next);
          if (next) sfx('buttonClick');
        }}
        title={sfxOn ? 'Matikan suara' : 'Nyalakan suara'}
      >
        {sfxOn ? '🔊' : '🔇'}
      </button>

      {phase === 'battle' && (
        <TurnBanner isYourTurn={!!isMyTurn} turnNumber={gameState?.turnNumber ?? 0} />
      )}

      {error && (
        <div className="battle-toast flex justify-between items-center gap-2">
          <span>{error}</span>
          <button type="button" onClick={clearError} className="text-white/70 shrink-0">
            ✕
          </button>
        </div>
      )}

      {renderContent()}

      {boardDetailCard && (
        <CardDetailModal
          card={boardDetailCard.cardData}
          activeCardState={boardDetailCard.activeCardState}
          onClose={() => setBoardDetailCard(null)}
          isMyActive={boardDetailCard.isMyActive}
          hasRetreated={myPlayer?.hasRetreatedThisTurn}
          onUseSkill={(i) => {
            sfx('cardHit');
            useSkill(i);
            setBoardDetailCard(null);
          }}
          onRetreat={() => {
            sfx('cardPlay');
            setBoardDetailCard(null);
            setInteraction((s) => ({
              ...s,
              mode: 'retreat',
            }));
          }}
          onEndTurn={() => {
            sfx('turnStart');
            endTurn();
            setBoardDetailCard(null);
          }}
        />
      )}

      {interaction.mode === 'retreat' && myPlayer && (
        <div className="retreat-instruction">
          <p className="retreat-instruction__text">Pilih bench untuk bolos</p>
          <button
            type="button"
            onClick={() => setMode('none')}
            className="retreat-instruction__cancel"
          >
            Batal
          </button>
        </div>
      )}

      {interaction.mode === 'retreat' && (
        <div className="fixed inset-0 z-[270] pointer-events-none" />
      )}

      {damagePopup && (
        <DamagePopup
          damage={damagePopup.damage}
          isWeakness={damagePopup.isWeakness}
          x={damagePopup.x}
          y={damagePopup.y}
        />
      )}

      {drawAnim && (
        <div
          className="draw-ghost"
          style={{ left: drawAnim.x - 30, top: drawAnim.y }}
        />
      )}

      {dragState && (
        <div
          style={{
            position: 'fixed',
            left: dragState.x - 34,
            top: dragState.y - 48,
            width: 68,
            height: 96,
            borderRadius: 6,
            border: '2px solid #7c3aed',
            boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4)',
            background: '#1c1c2e',
            zIndex: 1000,
            pointerEvents: 'none',
            opacity: 0.9,
            transform: 'scale(1.05) rotate(-2deg)',
            transition: 'none',
          }}
        />
      )}
    </div>
  );
};
