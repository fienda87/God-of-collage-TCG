type SoundKey = 'cardFlip' | 'buttonClick' | 'packOpen' | 'rareChime' | 'ultraChime';

const SOUNDS: Record<SoundKey, string> = {
  cardFlip:    '/sounds/card-flip.mp3',
  buttonClick: '/sounds/button-click.mp3',
  packOpen:    '/sounds/pack-open.mp3',
  rareChime:   '/sounds/rare-chime.mp3',
  ultraChime:  '/sounds/ultra-chime.mp3',
};

export function useSound() {
  const play = (key: SoundKey) => {
    try {
      const audio = new Audio(SOUNDS[key]);
      audio.volume = 0.4;
      audio.play().catch(() => {
        // Silently catch autoplay policy errors as per brief
      });
    } catch (e) {
      // Ignore
    }
  };
  return { play };
}
