'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Music, Volume2, VolumeX } from 'lucide-react';
import GamePageIntro from '@/components/game/GamePageIntro';
import DailyDiveAtmosphere from '@/components/dive/DailyDiveAtmosphere';
import { useDiveAudio } from '@/hooks/useDiveAudio';
import { bodyFont, pixelFont } from '@/lib/fonts';
import { applyResult, createEmptyRun, formatDepth } from '@/lib/dive/engine';
import {
  OIK_CONFIG,
  rareAnswerBonus,
  rarityRankForRun,
  streakBonus,
} from '@/lib/dive/one-in-a-krillion';
import { zoneForDepth } from '@/lib/game-pages';
import type { DivePhase, DiveRun, PromptResult, PublicDivePack } from '@/lib/dive/types';
import { cn } from '@/lib/utils';

type BonusBreakdown = {
  base: number;
  rareBonus: number;
  streakBonus: number;
  streakLength: number;
};

function TimerRing({ seconds, max }: { seconds: number; max: number }) {
  const pct = Math.max(0, Math.min(1, seconds / max));
  const r = 18;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct);
  const urgent = seconds <= 5;

  return (
    <div className="relative h-12 w-12 shrink-0" aria-hidden="true">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(148,163,184,0.25)" strokeWidth="3" />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke={urgent ? '#f472b6' : '#67e8f9'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-200"
        />
      </svg>
      <span
        className={`${pixelFont.className} absolute inset-0 flex items-center justify-center text-[10px] ${
          urgent ? 'text-pink-300' : 'text-cyan-200'
        }`}
      >
        {String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}

export default function OneInAKrillionGame() {
  const [publicPack, setPublicPack] = useState<PublicDivePack | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [phase, setPhase] = useState<DivePhase>('lobby');
  const [run, setRun] = useState<DiveRun>({
    packId: '',
    diveNumber: 1,
    results: [],
    score: 0,
    depthMeters: 0,
  });
  const [promptIndex, setPromptIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [secondsLeft, setSecondsLeft] = useState<number>(OIK_CONFIG.promptSeconds);
  const [lastResult, setLastResult] = useState<PromptResult | null>(null);
  const [lastBonus, setLastBonus] = useState<BonusBreakdown | null>(null);
  const [hitStreak, setHitStreak] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lockedRef = useRef(false);

  const audio = useDiveAudio();
  const playing = phase === 'prompt' || phase === 'result' || phase === 'summary';

  const prompts = publicPack?.prompts ?? [];
  const total = prompts.length || OIK_CONFIG.promptsPerDive;
  const currentPrompt = prompts[promptIndex];
  const promptSeconds = publicPack?.promptSeconds ?? OIK_CONFIG.promptSeconds;
  const zone = zoneForDepth(phase === 'lobby' ? 0 : run.depthMeters);
  const finalRank = rarityRankForRun(run.score, total);

  const loadPack = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch('/api/dive/one-in-a-krillion');
      if (!res.ok) throw new Error('load failed');
      const data = (await res.json()) as { pack: PublicDivePack };
      setPublicPack(data.pack);
      setRun(
        createEmptyRun({
          id: data.pack.id,
          title: data.pack.title,
          diveNumber: data.pack.diveNumber,
          prompts: [],
        })
      );
      setPhase('lobby');
      setPromptIndex(0);
      setAnswer('');
      setLastResult(null);
      setLastBonus(null);
      setHitStreak(0);
      setConfirmQuit(false);
      lockedRef.current = false;
    } catch {
      setLoadError('Could not load One in a Krillion. Try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPack();
  }, [loadPack]);

  const beginDescent = async () => {
    if (!publicPack) return;
    await audio.unlock();
    audio.sfxDive();
    void audio.startMusic();
    setRun(
      createEmptyRun({
        id: publicPack.id,
        title: publicPack.title,
        diveNumber: publicPack.diveNumber,
        prompts: [],
      })
    );
    setPromptIndex(0);
    setAnswer('');
    setLastResult(null);
    setLastBonus(null);
    setHitStreak(0);
    setConfirmQuit(false);
    lockedRef.current = false;
    setSecondsLeft(promptSeconds);
    setPhase('prompt');
  };

  const startPrompt = useCallback(
    (index: number) => {
      setPromptIndex(index);
      setAnswer('');
      setSecondsLeft(promptSeconds);
      setProcessing(false);
      lockedRef.current = false;
      setLastResult(null);
      setLastBonus(null);
      setConfirmQuit(false);
      setPhase('prompt');
    },
    [promptSeconds]
  );

  const resolvePrompt = useCallback(
    async (submitted: string | null, timedOut: boolean, passed = false) => {
      if (lockedRef.current || !publicPack) return;
      lockedRef.current = true;
      setProcessing(true);
      audio.sfxClick();

      const prompt = publicPack.prompts[promptIndex];
      let baseResult: PromptResult;

      if (passed) {
        baseResult = {
          promptId: prompt.id,
          prompt: prompt.prompt,
          submitted: null,
          acceptedLabel: null,
          tier: null,
          tierLabel: null,
          points: 0,
          timedOut: false,
        };
      } else {
        try {
          const res = await fetch('/api/dive/judge', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              packId: publicPack.id,
              promptId: prompt.id,
              answer: submitted,
              timedOut,
            }),
          });
          if (!res.ok) throw new Error('judge failed');
          const data = (await res.json()) as { result: PromptResult };
          baseResult = data.result;
        } catch {
          baseResult = {
            promptId: prompt.id,
            prompt: prompt.prompt,
            submitted: submitted?.trim() || null,
            acceptedLabel: null,
            tier: null,
            tierLabel: null,
            points: 0,
            timedOut,
          };
        }
      }

      const base = baseResult.points;
      let nextStreak = 0;
      let sBonus = 0;
      let rBonus = 0;

      if (base > 0) {
        nextStreak = hitStreak + 1;
        sBonus = streakBonus(nextStreak);
        rBonus = rareAnswerBonus(base);
      } else {
        nextStreak = 0;
      }

      const totalPoints = base + rBonus + sBonus;
      const result: PromptResult = { ...baseResult, points: totalPoints };
      const breakdown: BonusBreakdown = {
        base,
        rareBonus: rBonus,
        streakBonus: sBonus,
        streakLength: nextStreak,
      };

      if (totalPoints > 0) audio.sfxHit();
      else audio.sfxMiss();

      window.setTimeout(() => {
        setHitStreak(nextStreak);
        setLastBonus(breakdown);
        setLastResult(result);
        setRun((prev) => applyResult(prev, result));
        setProcessing(false);
        setPhase('result');
      }, 350);
    },
    [publicPack, promptIndex, audio, hitStreak]
  );

  const onSubmit = () => {
    if (!answer.trim() || processing || phase !== 'prompt') return;
    void resolvePrompt(answer, false);
  };

  const onPass = () => {
    if (processing || phase !== 'prompt') return;
    void resolvePrompt(null, false, true);
  };

  const onContinue = () => {
    audio.sfxClick();
    if (run.results.length >= total) {
      setPhase('summary');
      return;
    }
    startPrompt(run.results.length);
  };

  const quitToLobby = () => {
    audio.sfxClick();
    setConfirmQuit(false);
    setPhase('lobby');
    setAnswer('');
    setLastResult(null);
    setLastBonus(null);
    lockedRef.current = false;
  };

  const playAgain = () => {
    audio.sfxClick();
    void beginDescent();
  };

  useEffect(() => {
    if (phase !== 'prompt' || processing) return;
    if (secondsLeft <= 0) {
      void resolvePrompt(answer, true);
      return;
    }
    const id = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [phase, secondsLeft, processing, resolvePrompt, answer]);

  useEffect(() => {
    if (phase === 'prompt') {
      const t = window.setTimeout(() => inputRef.current?.focus(), 80);
      return () => window.clearTimeout(t);
    }
  }, [phase, promptIndex]);

  if (loading) {
    return (
      <div className="relative flex min-h-[40vh] items-center justify-center bg-[#040816] py-20">
        <DailyDiveAtmosphere variant="page" priority />
        <p className={`${pixelFont.className} relative z-10 text-[10px] tracking-wider text-cyan-200`}>
          loading one in a krillion…
        </p>
      </div>
    );
  }

  if (loadError || !publicPack) {
    return (
      <div className="relative flex min-h-[40vh] flex-col items-center justify-center gap-4 bg-[#040816] px-4 py-20">
        <DailyDiveAtmosphere variant="page" />
        <p className={`${bodyFont.className} relative z-10 text-slate-300`}>
          {loadError ?? 'One in a Krillion unavailable.'}
        </p>
        <button
          type="button"
          onClick={() => void loadPack()}
          className={`${bodyFont.className} relative z-10 rounded-xl border border-cyan-400/40 px-4 py-2 text-cyan-100`}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div id="oik-play" className="relative isolate scroll-mt-20 bg-[#040816] text-white">
      <DailyDiveAtmosphere variant="page" priority />

      <div className="relative z-10">
        <GamePageIntro
          tone="ocean"
          activeId="one-in-a-krillion"
          title="Play One in a Krillion"
          description="Think differently. Answer uniquely. Become one in a Krillion. Seven rounds, twenty-five seconds each — unusual accepted answers earn bigger rewards, streaks deepen the dive, and your rarity rank closes the run."
        />

        <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border-2 border-cyan-400/35 bg-[#07122b]/88 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
            <DailyDiveAtmosphere variant="viewport" />

            {playing && (
              <div className="relative z-20 flex items-start justify-between gap-3 p-3 sm:p-4">
                <div className="space-y-2">
                  <div className="rounded-lg border border-white/15 bg-black/55 px-3 py-2 backdrop-blur-sm">
                    <p className={`${pixelFont.className} text-[7px] tracking-wider text-slate-400`}>
                      DEPTH
                    </p>
                    <p className={`${pixelFont.className} mt-1 text-[11px] text-cyan-200`}>
                      {formatDepth(run.depthMeters)}
                    </p>
                  </div>
                  <div className="max-w-[11rem] rounded-lg border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-sm">
                    <p className={`${pixelFont.className} text-[7px] leading-relaxed text-fuchsia-200`}>
                      {zone.title}
                    </p>
                    <p className={`${bodyFont.className} mt-1 text-[11px] leading-snug text-slate-400`}>
                      {zone.blurb}
                    </p>
                  </div>
                  {hitStreak > 1 && phase === 'prompt' ? (
                    <div className="rounded-lg border border-fuchsia-400/40 bg-fuchsia-500/15 px-3 py-1.5">
                      <p className={`${pixelFont.className} text-[7px] text-fuchsia-200`}>
                        STREAK ×{hitStreak}
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col items-center">
                  <p className={`${pixelFont.className} text-[7px] tracking-wider text-slate-300`}>
                    SIGNAL {Math.min(promptIndex + 1, total)} OF {total}
                  </p>
                  <div className="mt-1.5 flex gap-1">
                    {Array.from({ length: total }).map((_, i) => {
                      const done = i < run.results.length;
                      const active = i === promptIndex && phase === 'prompt';
                      const pts = done ? run.results[i]?.points ?? 0 : 0;
                      return (
                        <span
                          key={i}
                          title={String(i + 1)}
                          className={cn(
                            'flex h-6 w-6 items-center justify-center rounded border text-[9px]',
                            pixelFont.className,
                            done && pts > 0
                              ? 'border-cyan-300 bg-cyan-500/40 text-cyan-100'
                              : done
                                ? 'border-slate-500 bg-slate-700 text-slate-400'
                                : active
                                  ? 'border-fuchsia-300 bg-fuchsia-500/30 text-fuchsia-100'
                                  : 'border-slate-600 bg-slate-900 text-slate-500'
                          )}
                        >
                          {i + 1}
                        </span>
                      );
                    })}
                  </div>
                  <p className={`${bodyFont.className} mt-2 text-xs font-bold text-fuchsia-200`}>
                    {run.score} pts
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label={audio.soundOn ? 'Mute sound' : 'Unmute sound'}
                    onClick={() => {
                      audio.setSoundOn(!audio.soundOn);
                      audio.sfxClick();
                    }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/50 text-white hover:border-cyan-300/50"
                  >
                    {audio.soundOn ? (
                      <Volume2 className="h-4 w-4" />
                    ) : (
                      <VolumeX className="h-4 w-4 text-slate-400" />
                    )}
                  </button>
                  <button
                    type="button"
                    aria-label={audio.musicOn ? 'Mute music' : 'Unmute music'}
                    onClick={() => audio.setMusicEnabled(!audio.musicOn)}
                    className={cn(
                      'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/50 hover:border-cyan-300/50',
                      audio.musicOn ? 'text-cyan-200' : 'text-slate-400'
                    )}
                  >
                    <Music className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!confirmQuit) {
                        setConfirmQuit(true);
                        audio.sfxClick();
                        return;
                      }
                      quitToLobby();
                    }}
                    className={`${pixelFont.className} inline-flex h-9 items-center rounded-lg border border-white/15 bg-black/50 px-2.5 text-[7px] text-white hover:border-rose-300/50`}
                  >
                    {confirmQuit ? 'SURE?' : 'QUIT'}
                  </button>
                </div>
              </div>
            )}

            <div className="relative z-10 flex min-h-[28rem] flex-col px-4 pb-4 sm:min-h-[32rem] sm:px-6">
              {phase === 'lobby' && (
                <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
                  <p className={`${pixelFont.className} text-[8px] tracking-[0.18em] text-cyan-300`}>
                    ONE IN A KRILLION
                  </p>
                  <h2
                    className={`${pixelFont.className} mt-3 text-[clamp(1.1rem,3.8vw,1.85rem)] leading-tight text-white [text-shadow:4px_0_0_#7c3aed,-3px_0_0_#22d3ee,0_0_28px_rgba(167,139,250,0.35)]`}
                  >
                    THINK DIFFERENTLY. ANSWER UNIQUELY.
                  </h2>
                  <p className={`${bodyFont.className} mt-4 max-w-lg text-sm leading-relaxed text-slate-300`}>
                    Become one in a Krillion. Seven open-water questions. Twenty-five seconds per signal. Familiar
                    answers keep you near the surface; rare answers — plus streaks — pull you into the abyss.
                  </p>
                  <dl className="mx-auto mt-6 grid max-w-md grid-cols-3 gap-2">
                    {[
                      { label: 'Signals', value: String(OIK_CONFIG.promptsPerDive) },
                      { label: 'Seconds', value: String(OIK_CONFIG.promptSeconds) },
                      { label: 'Max depth', value: `${(OIK_CONFIG.maxDepthMeters / 1000).toFixed(0)}k m` },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-cyan-400/25 bg-black/40 px-2 py-3"
                      >
                        <dt className={`${bodyFont.className} text-[10px] uppercase text-slate-400`}>
                          {stat.label}
                        </dt>
                        <dd className={`${pixelFont.className} mt-1 text-sm text-cyan-200`}>{stat.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <button
                    type="button"
                    onClick={() => void beginDescent()}
                    className={`${bodyFont.className} mt-8 inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-[#e9d5ff] bg-gradient-to-r from-[#6d28d9] via-[#3730a3] to-[#0e7490] px-9 py-3.5 text-base font-bold text-white shadow-[0_0_32px_rgba(192,132,252,0.35)]`}
                  >
                    BEGIN DESCENT
                  </button>
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      aria-label="Toggle sound"
                      onClick={() => audio.setSoundOn(!audio.soundOn)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/40"
                    >
                      {audio.soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      aria-label="Toggle music"
                      onClick={() => audio.setMusicEnabled(!audio.musicOn)}
                      className={cn(
                        'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/40',
                        audio.musicOn ? 'text-cyan-200' : 'text-slate-400'
                      )}
                    >
                      <Music className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {phase === 'prompt' && currentPrompt && (
                <div className="flex flex-1 flex-col">
                  <div className="flex flex-1 flex-col items-center justify-center py-4">
                    <div className="w-full max-w-xl rounded-2xl border-2 border-cyan-400/40 bg-black/55 px-5 py-7 text-center backdrop-blur-md sm:px-8">
                      <p className={`${pixelFont.className} text-[8px] tracking-wider text-cyan-300`}>
                        SIGNAL {promptIndex + 1} OF {total}
                      </p>
                      <h2
                        className={`${pixelFont.className} mt-4 text-[clamp(1rem,3.5vw,1.45rem)] leading-snug text-white`}
                      >
                        {currentPrompt.prompt}
                      </h2>
                      <p className={`${bodyFont.className} mt-4 text-xs text-slate-400`}>
                        ▼ type an answer almost nobody else would ▼
                      </p>
                    </div>
                  </div>

                  <form
                    className="flex items-center gap-2 border-t border-white/10 bg-black/45 py-3 backdrop-blur-md sm:gap-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      onSubmit();
                    }}
                  >
                    <TimerRing seconds={secondsLeft} max={promptSeconds} />
                    <input
                      ref={inputRef}
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      disabled={processing}
                      placeholder="type one rare answer…"
                      aria-label="Your answer"
                      autoComplete="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      className={`${bodyFont.className} min-h-11 flex-1 rounded-xl border border-cyan-400/35 bg-[#07122b]/95 px-3 text-base text-white outline-none placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/25`}
                    />
                    <button
                      type="button"
                      onClick={onPass}
                      disabled={processing}
                      className={`${bodyFont.className} min-h-11 rounded-xl border border-white/15 bg-white/5 px-3 text-xs font-bold uppercase tracking-wide text-slate-200 disabled:opacity-40 sm:px-4`}
                    >
                      Pass
                    </button>
                    <button
                      type="submit"
                      disabled={!answer.trim() || processing}
                      className={`${pixelFont.className} min-h-11 rounded-xl border-2 border-cyan-300/80 bg-gradient-to-b from-cyan-400 to-teal-700 px-4 text-[10px] text-[#041018] disabled:opacity-40 sm:min-w-[5.5rem]`}
                    >
                      {processing ? '…' : 'DIVE'}
                    </button>
                  </form>
                </div>
              )}

              {phase === 'result' && lastResult && (
                <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                  {lastResult.points > 0 ? (
                    <>
                      <p className={`${pixelFont.className} text-[8px] tracking-wider text-cyan-300`}>
                        {lastResult.tierLabel}
                      </p>
                      <h2
                        className={`${pixelFont.className} mt-3 text-[clamp(1.2rem,4vw,1.85rem)] text-white`}
                      >
                        {lastResult.acceptedLabel}
                      </h2>
                      <p className={`${bodyFont.className} mt-3 text-xl font-bold text-cyan-300`}>
                        +{lastResult.points} PTS
                      </p>
                      {lastBonus && (lastBonus.rareBonus > 0 || lastBonus.streakBonus > 0) ? (
                        <p className={`${bodyFont.className} mt-2 text-xs text-slate-400`}>
                          base {lastBonus.base}
                          {lastBonus.rareBonus > 0 ? ` · rare +${lastBonus.rareBonus}` : ''}
                          {lastBonus.streakBonus > 0
                            ? ` · streak ×${lastBonus.streakLength} +${lastBonus.streakBonus}`
                            : ''}
                        </p>
                      ) : null}
                      <p className={`${bodyFont.className} mt-2 text-sm text-slate-400`}>
                        depth {formatDepth(run.depthMeters)}
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className={`${pixelFont.className} text-[clamp(1.1rem,3.5vw,1.6rem)] text-slate-200`}>
                        NOTHING LANDED
                      </h2>
                      <p className={`${bodyFont.className} mt-3 text-lg font-bold text-slate-400`}>+0 PTS</p>
                      <p className={`${bodyFont.className} mt-2 text-sm text-slate-500`}>
                        {lastResult.timedOut
                          ? 'the clock beat you to it. streak reset.'
                          : 'that answer did not catch. streak reset.'}
                      </p>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={onContinue}
                    className={`${bodyFont.className} mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-cyan-300/60 bg-[#07122b]/90 px-8 py-3 text-base font-bold text-white`}
                  >
                    {run.results.length >= total ? 'SURFACE' : 'DESCEND'}
                    <span aria-hidden="true">▼</span>
                  </button>
                </div>
              )}

              {phase === 'summary' && (
                <div className="flex flex-1 flex-col py-6">
                  <div className="text-center">
                    <p className={`${pixelFont.className} text-[8px] tracking-[0.18em] text-cyan-300`}>
                      DIVE COMPLETE
                    </p>
                    <h2
                      className={`${pixelFont.className} mt-2 text-[clamp(1.1rem,3.5vw,1.6rem)] leading-tight text-white [text-shadow:3px_0_0_#7c3aed,-2px_0_0_#22d3ee]`}
                    >
                      {finalRank.title}
                    </h2>
                    <p className={`${bodyFont.className} mt-2 text-sm text-slate-400`}>{finalRank.blurb}</p>
                    <p className={`${bodyFont.className} mt-4 text-lg text-slate-200`}>
                      <span className="font-bold text-cyan-300">{formatDepth(run.depthMeters)}</span>
                      <span className="mx-2 text-slate-500">·</span>
                      <span className="font-bold text-fuchsia-300">{run.score} pts</span>
                    </p>
                  </div>

                  <ul className="mt-6 max-h-[40vh] space-y-2 overflow-y-auto pr-1">
                    {run.results.map((r, i) => (
                      <li
                        key={`${r.promptId}-${i}`}
                        className="rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-left"
                      >
                        <p className={`${pixelFont.className} text-[7px] text-slate-500`}>SIGNAL {i + 1}</p>
                        <p className={`${bodyFont.className} mt-1 text-sm font-medium text-slate-200`}>
                          {r.prompt}
                        </p>
                        <p className={`${bodyFont.className} mt-1 text-sm text-slate-400`}>
                          {r.acceptedLabel ? (
                            <>
                              <span className="text-white">{r.acceptedLabel}</span>
                              <span className="text-slate-500"> · </span>
                              <span className="text-cyan-300">{r.tierLabel}</span>
                              <span className="text-fuchsia-300"> +{r.points}</span>
                            </>
                          ) : (
                            <span className="text-slate-500">Nothing landed · +0</span>
                          )}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col items-center gap-3 pt-6">
                    <button
                      type="button"
                      onClick={playAgain}
                      className={`${bodyFont.className} inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-[#e9d5ff] bg-gradient-to-r from-[#6d28d9] via-[#3730a3] to-[#0e7490] px-8 py-3 text-base font-bold text-white`}
                    >
                      Play again
                    </button>
                    <Link
                      href="/daily-challenge"
                      className={`${bodyFont.className} text-sm text-slate-400 hover:text-cyan-300`}
                    >
                      Daily Dive
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
