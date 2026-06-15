import { useCallback, useRef } from 'react';

type SoundType =
  | 'cardPlay'
  | 'cardHit'
  | 'weakness'
  | 'ko'
  | 'sksAttach'
  | 'turnStart'
  | 'coinFlip'
  | 'victory'
  | 'defeat'
  | 'buttonClick'
  | 'draw'
  | 'hover';

const audioCtxRef = { current: null as AudioContext | null };

function getCtx(): AudioContext {
  if (!audioCtxRef.current) {
    audioCtxRef.current = new AudioContext();
  }
  return audioCtxRef.current;
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.15) {
  try {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

function playNoise(duration: number, volume = 0.08) {
  try {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    source.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  } catch {}
}

const SOUNDS: Record<SoundType, () => void> = {
  cardPlay: () => {
    playNoise(0.12, 0.1);
    playTone(440, 0.15, 'sine', 0.08);
    setTimeout(() => playTone(660, 0.1, 'sine', 0.06), 50);
  },
  cardHit: () => {
    playNoise(0.08, 0.12);
    playTone(200, 0.15, 'square', 0.1);
    setTimeout(() => playTone(150, 0.1, 'square', 0.08), 40);
  },
  weakness: () => {
    playTone(880, 0.15, 'sine', 0.12);
    setTimeout(() => playTone(1100, 0.1, 'sine', 0.1), 80);
    setTimeout(() => playTone(1320, 0.15, 'sine', 0.08), 160);
  },
  ko: () => {
    playNoise(0.3, 0.15);
    playTone(300, 0.2, 'sawtooth', 0.1);
    setTimeout(() => playTone(200, 0.3, 'sawtooth', 0.08), 100);
    setTimeout(() => playTone(100, 0.4, 'sawtooth', 0.06), 200);
  },
  sksAttach: () => {
    playTone(523, 0.1, 'sine', 0.1);
    setTimeout(() => playTone(784, 0.15, 'sine', 0.08), 60);
  },
  turnStart: () => {
    playTone(660, 0.1, 'sine', 0.08);
    setTimeout(() => playTone(880, 0.15, 'sine', 0.1), 80);
  },
  coinFlip: () => {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => playTone(i % 2 === 0 ? 800 : 600, 0.08, 'sine', 0.06), i * 80);
    }
  },
  victory: () => {
    const notes = [523, 659, 784, 1047];
    notes.forEach((n, i) => setTimeout(() => playTone(n, 0.25, 'sine', 0.1), i * 150));
  },
  defeat: () => {
    const notes = [400, 350, 300, 200];
    notes.forEach((n, i) => setTimeout(() => playTone(n, 0.3, 'sawtooth', 0.08), i * 200));
  },
  buttonClick: () => {
    playTone(600, 0.06, 'sine', 0.06);
  },
  draw: () => {
    playNoise(0.06, 0.06);
    playTone(500, 0.08, 'sine', 0.05);
  },
  hover: () => {
    playTone(800, 0.04, 'sine', 0.03);
  },
};

let sfxEnabled = true;

export function setSfxEnabled(enabled: boolean) {
  sfxEnabled = enabled;
}

export function isSfxEnabled() {
  return sfxEnabled;
}

export function useGameSounds() {
  const playRef = useRef<Record<SoundType, () => void>>(SOUNDS);

  const play = useCallback((type: SoundType) => {
    if (!sfxEnabled) return;
    playRef.current[type]?.();
  }, []);

  return play;
}
