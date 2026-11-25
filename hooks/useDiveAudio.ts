'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** CC0 underwater game theme (Cleyton Kauffman / OpenGameArt). */
const DIVE_MUSIC_SRC = '/audio/dive-music.mp3';

/**
 * Web Audio SFX + looping game music file.
 * Music starts after a user gesture (e.g. Begin Descent) when musicOn=true,
 * and keeps looping until the user mutes it via setMusicEnabled(false).
 */
export function useDiveAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const [soundOn, setSoundOn] = useState(true);
  const [musicOn, setMusicOn] = useState(true);
  const soundOnRef = useRef(soundOn);
  const musicOnRef = useRef(musicOn);

  useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);
  useEffect(() => {
    musicOnRef.current = musicOn;
  }, [musicOn]);

  const ensureCtx = useCallback(async () => {
    if (typeof window === 'undefined') return null;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    if (!ctxRef.current) ctxRef.current = new AC();
    if (ctxRef.current.state === 'suspended') {
      try {
        await ctxRef.current.resume();
      } catch {
        /* ignore */
      }
    }
    return ctxRef.current;
  }, []);

  const ensureMusicEl = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!musicRef.current) {
      const el = new Audio(DIVE_MUSIC_SRC);
      el.loop = true;
      el.preload = 'auto';
      el.volume = 0.45;
      musicRef.current = el;
    }
    return musicRef.current;
  }, []);

  const stopMusic = useCallback(() => {
    const el = musicRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  }, []);

  const startMusic = useCallback(async () => {
    if (!musicOnRef.current) return;
    await ensureCtx();
    const el = ensureMusicEl();
    if (!el) return;
    if (!el.paused && !el.ended) return;
    try {
      el.volume = 0.45;
      await el.play();
    } catch {
      /* autoplay blocked until another gesture */
    }
  }, [ensureCtx, ensureMusicEl]);

  const playTone = useCallback(
    async (freq: number, duration = 0.12, type: OscillatorType = 'square', volume = 0.06) => {
      if (!soundOnRef.current) return;
      const ctx = await ensureCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = volume;
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.start(now);
      osc.stop(now + duration + 0.02);
    },
    [ensureCtx]
  );

  const sfxClick = useCallback(() => void playTone(520, 0.06, 'square', 0.04), [playTone]);
  const sfxDive = useCallback(() => void playTone(180, 0.18, 'sawtooth', 0.05), [playTone]);
  const sfxHit = useCallback(() => void playTone(660, 0.15, 'triangle', 0.07), [playTone]);
  const sfxMiss = useCallback(() => void playTone(140, 0.2, 'square', 0.05), [playTone]);

  useEffect(() => {
    return () => {
      stopMusic();
      if (musicRef.current) {
        musicRef.current.src = '';
        musicRef.current = null;
      }
      void ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, [stopMusic]);

  const setMusicEnabled = useCallback(
    (on: boolean) => {
      setMusicOn(on);
      musicOnRef.current = on;
      if (!on) stopMusic();
      else void startMusic();
    },
    [startMusic, stopMusic]
  );

  return {
    soundOn,
    musicOn,
    setSoundOn,
    setMusicEnabled,
    startMusic,
    stopMusic,
    sfxClick,
    sfxDive,
    sfxHit,
    sfxMiss,
    unlock: ensureCtx,
  } as const;
}
