'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, Gem, Music, Rocket, Star, Timer, Users, Volume2, VolumeX } from 'lucide-react';
import GamePageIntro from '@/components/game/GamePageIntro';
import { useDiveAudio } from '@/hooks/useDiveAudio';
import packData from '@/data/cosmillion/classic-1.json';
import {
  RARE_STREAK_NEED,
  STREAK_BONUS,
  botSelect,
  huntMultiplier,
  scoreHuntSelections,
  scoreSelections,
  survivedRound,
} from '@/lib/cosmillion/scoring';
import type {
  CosmillionMode,
  CosmillionPack,
  CosmillionPrompt,
  PlayerChip,
} from '@/lib/cosmillion/types';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';
import { cn } from '@/lib/utils';

const PACK = packData as CosmillionPack;
const FIELD = 8;
const TOTAL_PROMPTS = 10;
const BOT_NAMES = ['Nova', 'Orbit', 'Quasar', 'Comet', 'Pulsar', 'Nebula', 'Astro'];
const BOT_COLORS = ['#a78bfa', '#22d3ee', '#f472b6', '#fbbf24', '#34d399', '#60a5fa', '#fb923c'];

const MODES: {
  id: CosmillionMode;
  title: string;
  blurb: string;
}[] = [
  {
    id: 'classic',
    title: 'Classic Moonshot',
    blurb: 'Answer 10 prompts. Highest score wins.',
  },
  {
    id: 'survival',
    title: 'Space Survival',
    blurb: 'Wrong picks destroy your platform. Last astronaut standing wins.',
  },
  {
    id: 'hunt',
    title: 'Rare Answer Hunt',
    blurb: 'Bank cosmic crystals from rare corrects and grow your multiplier.',
  },
];

type Phase = 'lobby' | 'prompt' | 'reveal' | 'results';

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function renderPromptText(prompt: CosmillionPrompt) {
  if (!prompt.highlight || !prompt.prompt.includes(prompt.highlight)) {
    return prompt.prompt;
  }
  const parts = prompt.prompt.split(prompt.highlight);
  return (
    <>
      {parts[0]}
      <span className="text-amber-300">{prompt.highlight}</span>
      {parts.slice(1).join(prompt.highlight)}
    </>
  );
}

function makePlayers(): PlayerChip[] {
  return [
    { id: 'you', name: 'You', color: '#67e8f9', isYou: true, score: 0, alive: true, crystals: 0 },
    ...BOT_NAMES.map((name, i) => ({
      id: `bot-${i}`,
      name,
      color: BOT_COLORS[i % BOT_COLORS.length],
      isYou: false,
      score: 0,
      alive: true,
      crystals: 0,
    })),
  ];
}

export default function CosmillionGame() {
  const audio = useDiveAudio();
  const [mode, setMode] = useState<CosmillionMode>('classic');
  const [phase, setPhase] = useState<Phase>('lobby');
  const [promptIndex, setPromptIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [players, setPlayers] = useState<PlayerChip[]>(() => makePlayers());
  const [pickCounts, setPickCounts] = useState<Record<string, number>>({});
  const [roundPoints, setRoundPoints] = useState(0);
  const [rareStreak, setRareStreak] = useState(0);
  const [bestRareStreak, setBestRareStreak] = useState(0);
  const [lastRoundRareHits, setLastRoundRareHits] = useState(0);
  const [streakBonusAwarded, setStreakBonusAwarded] = useState(0);
  const [crystalsGainedRound, setCrystalsGainedRound] = useState(0);
  const [youFellThisRound, setYouFellThisRound] = useState(false);
  const [endReason, setEndReason] = useState('');
  const lockedRef = useRef(false);
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const prompts = useMemo(() => PACK.prompts.slice(0, TOTAL_PROMPTS), []);
  const current = prompts[promptIndex];
  const you = players.find((p) => p.isYou);
  const youScore = you?.score ?? 0;
  const youCrystals = you?.crystals ?? 0;
  const aliveCount = players.filter((p) => p.alive).length;
  const starsFilled = Math.min(
    5,
    Math.ceil(((promptIndex + (phase === 'results' ? 1 : 0)) / TOTAL_PROMPTS) * 5)
  );
  const modeMeta = MODES.find((m) => m.id === mode)!;

  const beginMoonshot = async () => {
    await audio.unlock();
    audio.sfxDive();
    void audio.startMusic();
    setPlayers(makePlayers());
    setPromptIndex(0);
    setSelected([]);
    setPickCounts({});
    setRoundPoints(0);
    setRareStreak(0);
    setBestRareStreak(0);
    setLastRoundRareHits(0);
    setStreakBonusAwarded(0);
    setCrystalsGainedRound(0);
    setYouFellThisRound(false);
    setEndReason('');
    lockedRef.current = false;
    const first = prompts[0];
    setSecondsLeft(first?.seconds ?? 16);
    setPhase('prompt');
  };

  const toggleOption = (id: string) => {
    if (phase !== 'prompt' || lockedRef.current) return;
    if (modeRef.current === 'survival' && you && !you.alive) return;
    audio.sfxClick();
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const resolveRound = useCallback(() => {
    if (!current || lockedRef.current) return;
    lockedRef.current = true;
    const activeMode = modeRef.current;

    const selections: Record<string, string[]> = { you: [...selected] };
    for (let i = 0; i < BOT_NAMES.length; i++) {
      selections[`bot-${i}`] = botSelect(current.options);
    }

    const counts: Record<string, number> = {};
    for (const opt of current.options) counts[opt.id] = 0;
    for (const ids of Object.values(selections)) {
      for (const id of ids) counts[id] = (counts[id] ?? 0) + 1;
    }
    setPickCounts(counts);

    setPlayers((prev) => {
      let youPoints = 0;
      let youRareHits = 0;
      let crystalsGain = 0;
      let youSurvived = true;

      const next = prev.map((p) => {
        if (!p.alive && activeMode === 'survival') return p;
        const ids = selections[p.id] ?? [];

        if (activeMode === 'survival') {
          const ok = survivedRound(ids, current.options);
          const scored = scoreSelections(ids, current.options, counts, FIELD);
          if (p.isYou) {
            youPoints = ok ? scored.points : 0;
            youRareHits = ok ? scored.rareHits : 0;
            youSurvived = ok;
          }
          return {
            ...p,
            alive: ok,
            score: p.score + (ok ? scored.points : 0),
          };
        }

        if (activeMode === 'hunt') {
          const hunt = scoreHuntSelections(ids, current.options, counts, FIELD, p.crystals);
          if (p.isYou) {
            youPoints = hunt.points;
            youRareHits = hunt.rareHits;
            crystalsGain = hunt.crystalsGained;
          }
          return {
            ...p,
            crystals: p.crystals + hunt.crystalsGained,
            score: p.score + hunt.points,
          };
        }

        const scored = scoreSelections(ids, current.options, counts, FIELD);
        if (p.isYou) {
          youPoints = scored.points;
          youRareHits = scored.rareHits;
        }
        return { ...p, score: p.score + scored.points };
      });

      let bonus = 0;
      let nextStreak = rareStreak;
      const streakEligible =
        activeMode === 'classic' || (activeMode === 'survival' && youSurvived) || activeMode === 'hunt';

      if (streakEligible) {
        if (youRareHits > 0) {
          nextStreak = rareStreak + youRareHits;
          if (activeMode !== 'hunt' && nextStreak >= RARE_STREAK_NEED) {
            bonus = STREAK_BONUS;
            nextStreak = 0;
          }
        } else if (youPoints === 0) {
          nextStreak = 0;
        }
      }

      queueMicrotask(() => {
        setRareStreak(nextStreak);
        setBestRareStreak((b) => Math.max(b, rareStreak + youRareHits));
        setLastRoundRareHits(youRareHits);
        setStreakBonusAwarded(bonus);
        setRoundPoints(youPoints + bonus);
        setCrystalsGainedRound(crystalsGain);
        setYouFellThisRound(activeMode === 'survival' && !youSurvived);
        if (activeMode === 'survival' && !youSurvived) audio.sfxMiss();
        else if (youPoints > 0) audio.sfxHit();
        else audio.sfxMiss();
      });

      if (bonus > 0) {
        return next.map((p) => (p.isYou ? { ...p, score: p.score + bonus } : p));
      }
      return next;
    });

    setPhase('reveal');
  }, [current, selected, rareStreak, audio]);

  useEffect(() => {
    if (phase !== 'prompt') return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase, promptIndex]);

  useEffect(() => {
    if (phase === 'prompt' && secondsLeft === 0 && !lockedRef.current) {
      resolveRound();
    }
  }, [phase, secondsLeft, resolveRound]);

  const continueAfterReveal = () => {
    audio.sfxClick();
    const aliveNow = players.filter((p) => p.alive);

    if (mode === 'survival') {
      if (!you?.alive) {
        setEndReason('Your platform shattered.');
        setPhase('results');
        return;
      }
      if (aliveNow.length <= 1) {
        setEndReason(aliveNow[0]?.isYou ? 'Last astronaut standing!' : 'Crew wiped — you held longest.');
        setPhase('results');
        return;
      }
    }

    const next = promptIndex + 1;
    if (next >= prompts.length) {
      if (mode === 'survival') setEndReason('Survived all Moonshot prompts!');
      else if (mode === 'hunt') setEndReason('Crystal hunt complete!');
      else setEndReason('Moonshot complete!');
      setPhase('results');
      return;
    }

    lockedRef.current = false;
    setPromptIndex(next);
    setSelected([]);
    setPickCounts({});
    setRoundPoints(0);
    setCrystalsGainedRound(0);
    setYouFellThisRound(false);
    setSecondsLeft(prompts[next].seconds);
    setPhase('prompt');
  };

  const timerPct = current ? Math.max(0, Math.min(100, (secondsLeft / current.seconds) * 100)) : 0;
  const ranked = [...players].sort((a, b) => {
    if (mode === 'survival') {
      if (a.alive !== b.alive) return a.alive ? -1 : 1;
    }
    return b.score - a.score;
  });
  const yourRank = ranked.findIndex((p) => p.isYou) + 1;

  const MuteControls = ({ className }: { className?: string }) => (
    <div className={cn('flex items-center gap-1.5', className)}>
      <button
        type="button"
        aria-label={audio.soundOn ? 'Mute sound' : 'Unmute sound'}
        onClick={() => {
          audio.setSoundOn(!audio.soundOn);
          audio.sfxClick();
        }}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-indigo-950/80 text-white"
      >
        {audio.soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
      </button>
      <button
        type="button"
        aria-label={audio.musicOn ? 'Mute music' : 'Unmute music'}
        onClick={() => audio.setMusicEnabled(!audio.musicOn)}
        className={cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-indigo-950/80',
          audio.musicOn ? 'text-amber-200' : 'text-slate-400'
        )}
      >
        <Music className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-[#050816] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(124,58,237,0.35),transparent_50%),radial-gradient(ellipse_at_80%_10%,rgba(34,211,238,0.2),transparent_45%),radial-gradient(ellipse_at_50%_100%,rgba(15,23,42,0.9),#020617)]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 60% 70%, white, transparent), radial-gradient(1px 1px at 80% 20%, white, transparent), radial-gradient(1px 1px at 40% 80%, white, transparent)',
            backgroundSize: '120px 120px',
          }}
        />
      </div>

      <div className="relative z-10">
        <GamePageIntro
          tone="ocean"
          activeId="cosmillion"
          title="Cosmillion / Moonshot"
          description="Play space trivia online — timed multi-fit prompts, rare-answer scoring, and three modes. Jump In below."
        />

        <div id="cosmillion-play" className="mx-auto w-full max-w-5xl scroll-mt-24 px-4 pb-12 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[1.75rem] border-2 border-cyan-300/35 bg-[#0b1028]/90 shadow-[0_0_48px_rgba(124,58,237,0.25)]">
            <div className="grid grid-cols-1 gap-3 border-b border-white/10 px-4 py-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:px-5">
              <div>
                <p className={`${displayFont.className} text-lg font-bold tracking-tight text-white sm:text-xl`}>
                  Cosmillion <span className="text-violet-300">MOONSHOT</span>
                </p>
                <p className={`${pixelFont.className} mt-1 text-[7px] tracking-wide text-cyan-200`}>
                  Dive for Rare Answers!
                </p>
              </div>
              <div className="justify-self-center rounded-2xl border border-amber-300/40 bg-black/45 px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Timer className="h-4 w-4 text-amber-300" />
                  <p className={`${bodyFont.className} text-xl font-bold tabular-nums text-white`}>
                    {phase === 'lobby' ? '00:00' : formatTime(secondsLeft)}
                  </p>
                </div>
                <div className="mt-1.5 h-1.5 w-36 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-300 to-yellow-400 transition-[width] duration-1000 linear"
                    style={{
                      width: phase === 'prompt' ? `${timerPct}%` : phase === 'lobby' ? '0%' : '100%',
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start gap-1.5 sm:items-end">
                <p
                  className={`${bodyFont.className} inline-flex items-center gap-1.5 rounded-full border border-violet-300/40 bg-violet-950/60 px-3 py-1 text-xs font-semibold text-violet-100`}
                >
                  <Users className="h-3.5 w-3.5" />
                  {mode === 'survival' && phase !== 'lobby'
                    ? `Alive ${aliveCount}/${FIELD}`
                    : `Players ${FIELD}/${FIELD}`}
                </p>
                <p className={`${bodyFont.className} text-sm font-bold tabular-nums text-amber-200`}>
                  {youScore} pts
                  {mode === 'hunt' && phase !== 'lobby' ? ` · ${youCrystals}✧` : ''}
                </p>
                {phase !== 'lobby' && <MuteControls />}
              </div>
            </div>

            <div className="relative min-h-[480px] px-4 py-6 sm:min-h-[540px] sm:px-6">
              {phase === 'lobby' && (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-cyan-300/40 bg-gradient-to-b from-indigo-500/40 to-slate-900/80 shadow-[0_0_40px_rgba(34,211,238,0.35)]">
                    <Rocket className="h-11 w-11 text-cyan-200" />
                  </div>
                  <p className={`${pixelFont.className} text-[8px] tracking-[0.18em] text-violet-200`}>
                    CHOOSE MODE
                  </p>
                  <h2 className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}>
                    Cosmillion
                  </h2>

                  <div className="mt-6 grid w-full max-w-2xl gap-3 sm:grid-cols-3">
                    {MODES.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setMode(m.id);
                          audio.sfxClick();
                        }}
                        className={cn(
                          'rounded-2xl border-2 px-3 py-4 text-left transition',
                          mode === m.id
                            ? 'border-cyan-300 bg-cyan-500/20 shadow-[0_0_24px_rgba(34,211,238,0.25)]'
                            : 'border-white/15 bg-black/35 hover:border-violet-300/40'
                        )}
                      >
                        <p className={`${bodyFont.className} text-sm font-bold text-white`}>{m.title}</p>
                        <p className={`${bodyFont.className} mt-1.5 text-xs leading-snug text-slate-300`}>
                          {m.blurb}
                        </p>
                        {m.id === 'classic' && (
                          <p className={`${pixelFont.className} mt-2 text-[6px] text-amber-200`}>
                            RECOMMENDED
                          </p>
                        )}
                      </button>
                    ))}
                  </div>

                  <p className={`${bodyFont.className} mt-4 max-w-md text-sm text-slate-300`}>
                    {modeMeta.blurb} Bots fill the 8-player crew.
                  </p>
                  <button
                    type="button"
                    onClick={() => void beginMoonshot()}
                    className={`${bodyFont.className} mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-white/80 bg-gradient-to-r from-violet-600 to-fuchsia-600 px-10 py-3 text-base font-bold text-white shadow-[0_0_32px_rgba(168,85,247,0.55)]`}
                  >
                    <Rocket className="h-5 w-5" />
                    Jump In!
                  </button>
                  <MuteControls className="mt-4 justify-center" />
                </div>
              )}

              {(phase === 'prompt' || phase === 'reveal') && current && (
                <div className="mx-auto grid max-w-4xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative overflow-hidden rounded-3xl border border-cyan-300/25 bg-gradient-to-b from-[#1e1b4b]/80 to-[#0f172a]/90 p-4">
                    <p className={`${pixelFont.className} text-[7px] text-cyan-200`}>
                      {modeMeta.title.toUpperCase()} · PROMPT {promptIndex + 1} / {prompts.length}
                    </p>
                    <div className="relative mt-6 flex flex-col items-center">
                      <div
                        className={cn(
                          'flex h-24 w-24 items-center justify-center rounded-full border-2 text-4xl shadow-lg',
                          mode === 'survival' && youFellThisRound
                            ? 'border-rose-400/60 bg-rose-500/20'
                            : 'border-cyan-200/50 bg-sky-500/30'
                        )}
                      >
                        {mode === 'survival' && youFellThisRound ? '💥' : '🧑‍🚀'}
                      </div>
                      <p className={`${bodyFont.className} mt-3 text-center text-xs text-slate-300`}>
                        {mode === 'survival'
                          ? 'Only correct picks — any wrong chip shatters your platform'
                          : mode === 'hunt'
                            ? 'Chase rare & ultra fits for crystals + multiplier'
                            : 'Select all that fit before time runs out'}
                      </p>
                      {mode === 'hunt' && (
                        <p
                          className={`${bodyFont.className} mt-2 inline-flex items-center gap-1 rounded-full border border-fuchsia-300/40 bg-fuchsia-950/40 px-3 py-1 text-xs text-fuchsia-100`}
                        >
                          <Gem className="h-3.5 w-3.5" />
                          ×{huntMultiplier(youCrystals).toFixed(1)} mult · {youCrystals} crystals
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="rounded-3xl border-2 border-cyan-300/50 bg-[#0a1228]/85 px-5 py-5 shadow-[0_0_28px_rgba(34,211,238,0.2)] backdrop-blur-md">
                      <p className={`${bodyFont.className} text-lg font-semibold leading-snug text-white sm:text-xl`}>
                        {renderPromptText(current)}
                      </p>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {current.options.map((opt) => {
                        const isOn = selected.includes(opt.id);
                        const count = pickCounts[opt.id] ?? 0;
                        const share = FIELD > 0 ? count / FIELD : 0;
                        const showReveal = phase === 'reveal';
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            disabled={phase !== 'prompt' || (mode === 'survival' && !!you && !you.alive)}
                            onClick={() => toggleOption(opt.id)}
                            className={cn(
                              bodyFont.className,
                              'relative flex min-h-12 items-center justify-between gap-2 rounded-2xl border-2 px-3 py-2.5 text-left text-sm font-semibold transition',
                              !showReveal && isOn && 'border-emerald-400 bg-emerald-500/20 text-white',
                              !showReveal &&
                                !isOn &&
                                'border-violet-300/35 bg-indigo-950/70 text-slate-100 hover:border-cyan-300/50',
                              showReveal && opt.correct && 'border-emerald-400/80 bg-emerald-500/15 text-white',
                              showReveal &&
                                !opt.correct &&
                                isOn &&
                                'border-rose-400/70 bg-rose-500/10 text-rose-100',
                              showReveal &&
                                !opt.correct &&
                                !isOn &&
                                'border-white/10 bg-black/30 text-slate-400'
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/40 text-[10px] uppercase text-cyan-200">
                                {opt.id}
                              </span>
                              {opt.label}
                            </span>
                            {isOn && !showReveal && <Check className="h-4 w-4 text-emerald-300" />}
                            {showReveal && (
                              <span className="text-[11px] font-bold tabular-nums text-amber-200">
                                {Math.round(share * 100)}%
                                {opt.correct && isOn
                                  ? share <= 0.25
                                    ? ' · ultra'
                                    : share <= 0.5
                                      ? ' · rare'
                                      : ' · popular'
                                  : ''}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {phase === 'prompt' && (
                      <button
                        type="button"
                        onClick={resolveRound}
                        className={`${bodyFont.className} mt-4 w-full rounded-full border border-cyan-200/50 bg-cyan-500/20 py-2.5 text-sm font-bold text-cyan-50 hover:bg-cyan-500/30`}
                      >
                        Lock answers
                      </button>
                    )}

                    {phase === 'reveal' && (
                      <div className="mt-4 rounded-2xl border border-amber-300/30 bg-black/40 px-4 py-3 text-center">
                        {youFellThisRound ? (
                          <p className={`${bodyFont.className} text-sm font-semibold text-rose-200`}>
                            Platform destroyed — wrong pick or empty lock
                          </p>
                        ) : (
                          <p className={`${bodyFont.className} text-sm text-slate-200`}>
                            Round score{' '}
                            <span className="font-bold text-amber-200">+{roundPoints}</span>
                            {streakBonusAwarded > 0 ? ` (includes +${STREAK_BONUS} streak)` : ''}
                            {crystalsGainedRound > 0
                              ? ` · +${crystalsGainedRound} crystal${crystalsGainedRound === 1 ? '' : 's'}`
                              : ''}
                            {lastRoundRareHits > 0 ? ` · ${lastRoundRareHits} rare hit(s)` : ''}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={continueAfterReveal}
                          className={`${bodyFont.className} mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-2.5 text-sm font-bold text-white`}
                        >
                          <Rocket className="h-4 w-4" />
                          {mode === 'survival' && (!you?.alive || aliveCount <= 1)
                            ? 'See results'
                            : promptIndex + 1 >= prompts.length
                              ? 'See results'
                              : 'Next prompt'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {phase === 'results' && (
                <div className="mx-auto flex max-w-lg flex-col items-center py-8 text-center">
                  <p className={`${pixelFont.className} text-[8px] tracking-[0.16em] text-violet-200`}>
                    {modeMeta.title.toUpperCase()}
                  </p>
                  <p className={`${displayFont.className} mt-3 text-3xl font-bold text-white`}>
                    {mode === 'survival' && you?.alive && aliveCount === 1
                      ? 'You led the crew!'
                      : mode === 'survival' && !you?.alive
                        ? 'You fell!'
                        : yourRank === 1
                          ? 'You led the crew!'
                          : `You placed #${yourRank}`}
                  </p>
                  {endReason && (
                    <p className={`${bodyFont.className} mt-1 text-sm text-slate-300`}>{endReason}</p>
                  )}
                  <p className={`${bodyFont.className} mt-2 text-3xl font-bold tabular-nums text-amber-200`}>
                    {youScore} pts
                  </p>
                  {mode === 'hunt' && (
                    <p className={`${bodyFont.className} mt-1 text-sm text-fuchsia-200`}>
                      {youCrystals} cosmic crystals · ×{huntMultiplier(youCrystals).toFixed(1)} mult
                    </p>
                  )}
                  <p className={`${bodyFont.className} mt-1 text-sm text-slate-300`}>
                    Best rare streak chain: {Math.max(bestRareStreak, rareStreak)}
                  </p>
                  <ul className={`${bodyFont.className} mt-6 w-full space-y-2 text-left text-sm`}>
                    {ranked.map((p, i) => (
                      <li
                        key={p.id}
                        className={cn(
                          'flex items-center justify-between rounded-xl border px-3 py-2',
                          p.isYou
                            ? 'border-cyan-300/50 bg-cyan-500/15'
                            : 'border-white/10 bg-black/30',
                          mode === 'survival' && !p.alive && 'opacity-50'
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className="inline-block h-3 w-3 rounded-full"
                            style={{ background: p.color }}
                          />
                          #{i + 1} {p.name}
                          {mode === 'survival' && !p.alive ? ' · out' : ''}
                          {mode === 'hunt' && p.crystals > 0 ? ` · ${p.crystals}✧` : ''}
                        </span>
                        <span className="font-bold tabular-nums text-amber-100">{p.score}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => {
                      setPhase('lobby');
                      lockedRef.current = false;
                    }}
                    className={`${bodyFont.className} mt-6 rounded-full border border-white/30 bg-black/40 px-6 py-2.5 text-sm font-bold text-white`}
                  >
                    Change mode
                  </button>
                  <button
                    type="button"
                    onClick={() => void beginMoonshot()}
                    className={`${bodyFont.className} mt-3 rounded-full bg-violet-600 px-8 py-2.5 text-sm font-bold text-white`}
                  >
                    Play again
                  </button>
                  <Link
                    href="/daily-challenge"
                    className={`${bodyFont.className} mt-3 text-sm text-cyan-200 hover:underline`}
                  >
                    Or try Daily Dive trivia →
                  </Link>
                </div>
              )}

              {phase !== 'lobby' && (
                <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p
                      className={`${bodyFont.className} inline-flex items-center gap-1.5 rounded-full border border-violet-300/40 bg-violet-950/50 px-3 py-1.5 text-xs font-semibold text-violet-100`}
                    >
                      <Star className="h-3.5 w-3.5 text-amber-300" />
                      Rare Answer Streak: {rareStreak}
                    </p>
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'h-5 w-5',
                            i < starsFilled ? 'fill-amber-300 text-amber-300' : 'text-slate-600'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {players.map((p) => (
                      <div
                        key={p.id}
                        className={cn(
                          'flex min-w-[4.5rem] flex-col items-center rounded-xl border px-2 py-1.5',
                          p.isYou ? 'border-cyan-300/50 bg-cyan-500/10' : 'border-white/10 bg-black/30',
                          mode === 'survival' && !p.alive && 'opacity-40 grayscale'
                        )}
                      >
                        <span
                          className="mb-1 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-slate-900"
                          style={{ background: p.color }}
                        >
                          {mode === 'survival' && !p.alive ? '×' : p.name.slice(0, 1)}
                        </span>
                        <span className={`${bodyFont.className} text-[10px] text-slate-200`}>
                          {p.name}
                        </span>
                        <span className={`${bodyFont.className} text-[10px] font-bold tabular-nums text-amber-100`}>
                          {String(p.score).padStart(4, '0')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
