'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { bodyFont, pixelFont } from '@/lib/fonts';
import OceanAtmosphere from '@/components/OceanAtmosphere';
import { DiveDepthRail, DiveHud, DiveTopBar } from '@/components/dive/DiveChrome';
import { getDivePack, getDivePackCount, getNextDivePack, listDivePacks } from '@/lib/dive/dives';
import { applyResult, createEmptyRun, formatDepth, judgeAnswer } from '@/lib/dive/engine';
import type {
  DiveMode,
  DivePack,
  DivePhase,
  DiveRun,
  PromptResult,
  PublicDivePack,
} from '@/lib/dive/types';
import { MODE_CONFIG } from '@/lib/dive/types';

const PREDIVE_SECONDS = 3;

type Props = {
  mode?: DiveMode;
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
        {seconds}
      </span>
    </div>
  );
}

function packToRunMeta(pack: { id: string; diveNumber: number }): DivePack {
  return { id: pack.id, title: '', diveNumber: pack.diveNumber, prompts: [] };
}

export default function DiveGame({ mode = 'unlimited' }: Props) {
  const isDaily = mode === 'daily';
  const config = MODE_CONFIG[mode];
  const allPacks = useMemo(() => (isDaily ? [] : listDivePacks()), [isDaily]);

  const [packId, setPackId] = useState(allPacks[0]?.id ?? 'classic-1');
  const [fullPack, setFullPack] = useState<DivePack | null>(
    isDaily ? null : getDivePack(packId)
  );
  const [publicPack, setPublicPack] = useState<PublicDivePack | null>(null);
  const [dailyDate, setDailyDate] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadingDaily, setLoadingDaily] = useState(isDaily);

  const [phase, setPhase] = useState<DivePhase>('lobby');
  const [run, setRun] = useState<DiveRun>(() =>
    createEmptyRun(isDaily ? { id: 'daily', title: 'Daily', diveNumber: 1, prompts: [] } : getDivePack(packId))
  );
  const [promptIndex, setPromptIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [secondsLeft, setSecondsLeft] = useState<number>(config.promptSeconds);
  const [prediveLeft, setPrediveLeft] = useState(PREDIVE_SECONDS);
  const [lastResult, setLastResult] = useState<PromptResult | null>(null);
  const [processing, setProcessing] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lockedRef = useRef(false);

  const playPack = isDaily ? publicPack : fullPack;
  const prompts = playPack?.prompts ?? [];
  const total = prompts.length;
  const currentPrompt = prompts[promptIndex];
  const promptSeconds = publicPack?.promptSeconds ?? config.promptSeconds;
  const charted = getDivePackCount();

  // Load today's daily (prompts only)
  useEffect(() => {
    if (!isDaily) return;
    let cancelled = false;
    (async () => {
      try {
        setLoadingDaily(true);
        const res = await fetch('/api/dive/daily');
        if (!res.ok) throw new Error('Failed to load daily');
        const data = (await res.json()) as { date: string; pack: PublicDivePack };
        if (cancelled) return;
        setDailyDate(data.date);
        setPublicPack(data.pack);
        setPackId(data.pack.id);
        setRun(createEmptyRun(packToRunMeta(data.pack)));
        setLoadError(null);
      } catch {
        if (!cancelled) setLoadError('Could not load today\'s dive. Try again.');
      } finally {
        if (!cancelled) setLoadingDaily(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isDaily]);

  // Sync unlimited pack when packId changes
  useEffect(() => {
    if (isDaily) return;
    const next = getDivePack(packId);
    setFullPack(next);
  }, [isDaily, packId]);

  const resetDive = useCallback(() => {
    if (!playPack) return;
    setRun(createEmptyRun(packToRunMeta(playPack)));
    setPromptIndex(0);
    setAnswer('');
    setSecondsLeft(promptSeconds);
    setPrediveLeft(PREDIVE_SECONDS);
    setLastResult(null);
    setProcessing(false);
    lockedRef.current = false;
    setPhase('lobby');
  }, [playPack, promptSeconds]);

  const beginDescent = () => {
    if (!playPack) return;
    setRun(createEmptyRun(packToRunMeta(playPack)));
    setPromptIndex(0);
    setAnswer('');
    setLastResult(null);
    setPrediveLeft(PREDIVE_SECONDS);
    lockedRef.current = false;
    setPhase('predive');
  };

  const playNextDive = () => {
    if (isDaily) return;
    const next = getNextDivePack(packId);
    setPackId(next.id);
    setFullPack(next);
    setRun(createEmptyRun(next));
    setPromptIndex(0);
    setAnswer('');
    setLastResult(null);
    setPrediveLeft(PREDIVE_SECONDS);
    lockedRef.current = false;
    setPhase('lobby');
  };

  const startPrompt = useCallback(
    (index: number) => {
      setPromptIndex(index);
      setAnswer('');
      setSecondsLeft(promptSeconds);
      setProcessing(false);
      lockedRef.current = false;
      setLastResult(null);
      setPhase('prompt');
    },
    [promptSeconds]
  );

  const resolvePrompt = useCallback(
    async (submitted: string | null, timedOut: boolean) => {
      if (lockedRef.current || !playPack) return;
      lockedRef.current = true;
      setProcessing(true);

      const prompt = playPack.prompts[promptIndex];
      let result: PromptResult;

      try {
        if (isDaily || !fullPack) {
          const res = await fetch('/api/dive/judge', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              packId: playPack.id,
              promptId: prompt.id,
              answer: submitted,
              timedOut,
            }),
          });
          if (!res.ok) throw new Error('judge failed');
          const data = (await res.json()) as { result: PromptResult };
          result = data.result;
        } else {
          const fullPrompt = fullPack.prompts[promptIndex];
          result = judgeAnswer(fullPrompt, submitted, timedOut);
        }
      } catch {
        // Safe miss fallback
        result = {
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

      window.setTimeout(() => {
        setLastResult(result);
        setRun((prev) => applyResult(prev, result));
        setProcessing(false);
        setPhase('result');
      }, 400);
    },
    [playPack, promptIndex, isDaily, fullPack]
  );

  const onDive = () => {
    if (!answer.trim() || processing || phase !== 'prompt') return;
    void resolvePrompt(answer, false);
  };

  const onDescend = () => {
    if (run.results.length >= total) {
      setPhase('summary');
      return;
    }
    startPrompt(run.results.length);
  };

  useEffect(() => {
    if (phase !== 'predive') return;
    if (prediveLeft <= 0) {
      startPrompt(0);
      return;
    }
    const id = window.setTimeout(() => setPrediveLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [phase, prediveLeft, startPrompt]);

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

  const displayScore = run.score;
  const displayDepth = run.depthMeters;
  const hudIndex = phase === 'summary' ? Math.max(0, total - 1) : promptIndex;

  if (isDaily && loadingDaily) {
    return (
      <div className="relative flex min-h-[calc(100svh-2.75rem)] items-center justify-center bg-[#040816]">
        <OceanAtmosphere />
        <p className={`${pixelFont.className} relative z-10 text-[10px] tracking-wider text-cyan-200`}>
          loading today&apos;s dive…
        </p>
      </div>
    );
  }

  if (isDaily && (loadError || !publicPack)) {
    return (
      <div className="relative flex min-h-[calc(100svh-2.75rem)] flex-col items-center justify-center gap-4 bg-[#040816] px-4">
        <OceanAtmosphere />
        <p className={`${bodyFont.className} relative z-10 text-slate-300`}>
          {loadError ?? 'Daily dive unavailable.'}
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className={`${bodyFont.className} relative z-10 rounded-xl border border-cyan-400/40 px-4 py-2 text-cyan-100`}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative isolate min-h-[calc(100svh-2.75rem)] overflow-hidden bg-[#040816]">
      <div className="absolute inset-0">
        <OceanAtmosphere />
      </div>
      <div aria-hidden="true" className="scanlines pointer-events-none absolute inset-0 z-[1] opacity-35" />

      <DiveTopBar
        soundOn={soundOn}
        onToggleSound={() => setSoundOn((v) => !v)}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
      />

      {phase !== 'lobby' && <DiveDepthRail depthMeters={displayDepth} />}

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-2.75rem)] w-full max-w-3xl flex-col px-4 pb-4 pt-2 sm:px-6">
        <DiveHud
          depthMeters={phase === 'lobby' ? 0 : displayDepth}
          score={phase === 'lobby' ? 0 : displayScore}
          promptIndex={phase === 'lobby' ? 0 : hudIndex}
          total={total || config.promptsPerDive}
          results={phase === 'lobby' ? [] : run.results}
        />

        <div className="flex flex-1 flex-col">
          <AnimatePresence mode="wait">
            {phase === 'lobby' && (
              <motion.div
                key="lobby"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-1 flex-col items-center justify-center text-center"
              >
                <p className={`${pixelFont.className} text-[8px] tracking-[0.2em] text-cyan-300/80`}>
                  KRILLIONPRO · {isDaily ? 'DAILY' : 'UNLIMITED'}
                </p>
                <h1
                  className={`${pixelFont.className} mt-3 text-[clamp(1.25rem,4vw,2rem)] leading-tight text-white [text-shadow:3px_0_0_#7c3aed,-2px_0_0_#22d3ee]`}
                >
                  {isDaily ? 'THE DAILY DIVE' : 'THE ENDLESS DIVE'}
                </h1>
                <p className={`${bodyFont.className} mt-3 max-w-md text-sm text-slate-300`}>
                  {isDaily
                    ? 'eight shared prompts · rarer answers sink deeper'
                    : 'dive after dive · rarer answers sink deeper'}
                </p>
                <p className={`${pixelFont.className} mt-6 text-[8px] text-slate-400`}>
                  {isDaily
                    ? `TODAY · ${dailyDate ?? '—'}`
                    : `ENDLESS DIVE #${fullPack?.diveNumber ?? 1}`}
                </p>
                <p className={`${bodyFont.className} mt-2 text-xs text-slate-500`}>
                  {config.promptsPerDive} prompts · {config.promptSeconds}s each
                  {!isDaily ? ` · ${charted} charted` : ' · one dive per day'}
                </p>

                {!isDaily && (
                  <label
                    className={`${bodyFont.className} mt-5 flex flex-col items-center gap-1.5 text-xs text-slate-400`}
                  >
                    <span>Choose dive</span>
                    <select
                      value={packId}
                      onChange={(e) => {
                        setPackId(e.target.value);
                        setRun(createEmptyRun(getDivePack(e.target.value)));
                      }}
                      className="rounded-lg border border-cyan-400/30 bg-[#0a1628] px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/60"
                    >
                      {allPacks.map((p) => (
                        <option key={p.id} value={p.id}>
                          Dive #{p.diveNumber} — {p.title}
                        </option>
                      ))}
                    </select>
                  </label>
                )}

                <button
                  type="button"
                  onClick={beginDescent}
                  disabled={!playPack}
                  className={`${bodyFont.className} mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl border-2 border-[#e9d5ff] bg-gradient-to-r from-[#6d28d9] via-[#3730a3] to-[#0e7490] px-9 py-3.5 text-base font-bold tracking-wide text-white shadow-[0_0_32px_rgba(192,132,252,0.45)] transition-transform hover:-translate-y-0.5 disabled:opacity-50 sm:min-h-14 sm:text-lg`}
                >
                  <span aria-hidden="true">▼</span>
                  BEGIN DESCENT
                  <span aria-hidden="true">▼</span>
                </button>

                <div
                  className={`${bodyFont.className} mt-6 flex flex-wrap items-center justify-center gap-3 text-sm`}
                >
                  {isDaily ? (
                    <Link
                      href="/unlimited-krillion"
                      className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-slate-300 hover:border-cyan-300/40 hover:text-white"
                    >
                      Unlimited
                    </Link>
                  ) : (
                    <Link
                      href="/daily-challenge"
                      className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-slate-300 hover:border-cyan-300/40 hover:text-white"
                    >
                      Today&apos;s Dive
                    </Link>
                  )}
                  <Link
                    href="/"
                    className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-slate-300 hover:border-cyan-300/40 hover:text-white"
                  >
                    How to Play
                  </Link>
                </div>
              </motion.div>
            )}

            {phase === 'predive' && (
              <motion.div
                key="predive"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-1 flex-col items-center justify-center text-center"
              >
                <p className={`${pixelFont.className} text-sm tracking-[0.2em] text-white`}>
                  descending…
                </p>
                <p className={`${bodyFont.className} mt-3 text-sm text-cyan-200/80`}>
                  the clock starts in{' '}
                  <span className="font-bold text-cyan-300">{prediveLeft}</span>
                </p>
              </motion.div>
            )}

            {phase === 'prompt' && currentPrompt && (
              <motion.div
                key={`prompt-${promptIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-1 flex-col"
              >
                <div className="flex flex-1 flex-col items-center justify-center">
                  <div className="w-full max-w-lg rounded-2xl border-2 border-[#c4b5fd]/50 bg-[#070f24]/88 px-5 py-8 text-center shadow-[0_16px_40px_rgba(2,6,23,0.55)] backdrop-blur-sm sm:px-8">
                    <p className={`${pixelFont.className} text-[8px] tracking-wider text-pink-300`}>
                      PROMPT {promptIndex + 1} OF {total}
                    </p>
                    <h2
                      className={`${pixelFont.className} mt-4 text-[clamp(1rem,3.5vw,1.5rem)] leading-snug text-white`}
                    >
                      {currentPrompt.prompt}
                    </h2>
                    <p className={`${bodyFont.className} mt-4 text-xs text-slate-400 sm:text-sm`}>
                      ▼ rarer answers sink deeper ▼
                    </p>
                  </div>
                </div>

                <form
                  className="flex items-center gap-3 border-t border-white/10 bg-[#040816]/70 py-3 backdrop-blur-md"
                  onSubmit={(e) => {
                    e.preventDefault();
                    onDive();
                  }}
                >
                  <TimerRing seconds={secondsLeft} max={promptSeconds} />
                  <input
                    ref={inputRef}
                    type="text"
                    name="answer"
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    disabled={processing}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="type one answer…"
                    aria-label="Your answer"
                    className={`${bodyFont.className} min-h-12 flex-1 rounded-xl border border-cyan-400/30 bg-[#0a1628]/90 px-4 text-base text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/30`}
                  />
                  <button
                    type="submit"
                    disabled={!answer.trim() || processing}
                    className={`${pixelFont.className} inline-flex min-h-12 min-w-[5.5rem] items-center justify-center rounded-xl border-2 border-pink-300/80 bg-gradient-to-b from-fuchsia-600 to-purple-800 px-4 text-[10px] text-white shadow-[0_0_18px_rgba(232,121,249,0.35)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40`}
                  >
                    {processing ? '…' : 'DIVE'}
                  </button>
                </form>
              </motion.div>
            )}

            {phase === 'result' && lastResult && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-1 flex-col items-center justify-center text-center"
              >
                {lastResult.points > 0 ? (
                  <>
                    <p className={`${pixelFont.className} text-[8px] tracking-wider text-fuchsia-300`}>
                      {lastResult.tierLabel}
                    </p>
                    <h2
                      className={`${pixelFont.className} mt-3 text-[clamp(1.2rem,4vw,1.85rem)] text-white [text-shadow:2px_0_0_#7c3aed,-2px_0_0_#22d3ee]`}
                    >
                      {lastResult.acceptedLabel}
                    </h2>
                    <p className={`${bodyFont.className} mt-3 text-xl font-bold text-cyan-300`}>
                      +{lastResult.points} PTS
                    </p>
                    <p className={`${bodyFont.className} mt-2 text-sm text-slate-400`}>
                      depth {formatDepth(run.depthMeters)}
                    </p>
                  </>
                ) : (
                  <>
                    <h2
                      className={`${pixelFont.className} text-[clamp(1.1rem,3.5vw,1.6rem)] text-slate-200`}
                    >
                      NOTHING LANDED
                    </h2>
                    <p className={`${bodyFont.className} mt-3 text-lg font-bold text-slate-400`}>
                      +0 PTS
                    </p>
                    <p className={`${bodyFont.className} mt-2 text-sm text-slate-500`}>
                      {lastResult.timedOut
                        ? 'the clock beat you to it.'
                        : 'that answer did not catch.'}
                    </p>
                  </>
                )}

                <button
                  type="button"
                  onClick={onDescend}
                  className={`${bodyFont.className} mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-cyan-300/60 bg-[#07122b]/90 px-8 py-3 text-base font-bold text-white shadow-[0_0_24px_rgba(34,211,238,0.25)] transition-transform hover:-translate-y-0.5`}
                >
                  {run.results.length >= total ? 'SURFACE' : 'DESCEND'}
                  <span aria-hidden="true">▼</span>
                </button>
              </motion.div>
            )}

            {phase === 'summary' && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-1 flex-col py-2"
              >
                <div className="text-center">
                  <p className={`${pixelFont.className} text-[8px] tracking-[0.18em] text-cyan-300`}>
                    DIVE COMPLETE
                  </p>
                  <h2
                    className={`${pixelFont.className} mt-2 text-[clamp(1.2rem,4vw,1.75rem)] text-white`}
                  >
                    THE CATCH
                  </h2>
                  <p className={`${bodyFont.className} mt-3 text-lg text-slate-200`}>
                    <span className="font-bold text-cyan-300">{formatDepth(run.depthMeters)}</span>
                    <span className="mx-2 text-slate-500">·</span>
                    <span className="font-bold text-pink-300">{run.score} pts</span>
                  </p>
                </div>

                <ul className="mt-6 max-h-[42vh] space-y-2 overflow-y-auto pr-1">
                  {run.results.map((r, i) => (
                    <li
                      key={`${r.promptId}-${i}`}
                      className="rounded-xl border border-white/10 bg-[#07122b]/75 px-3 py-2.5 text-left backdrop-blur-sm"
                    >
                      <p className={`${pixelFont.className} text-[7px] text-slate-500`}>
                        PROMPT {i + 1}
                      </p>
                      <p className={`${bodyFont.className} mt-1 text-sm font-medium text-slate-200`}>
                        {r.prompt}
                      </p>
                      <p className={`${bodyFont.className} mt-1 text-sm text-slate-400`}>
                        {r.acceptedLabel ? (
                          <>
                            <span className="text-white">{r.acceptedLabel}</span>
                            <span className="text-slate-500"> · </span>
                            <span className="text-fuchsia-300">{r.tierLabel}</span>
                            <span className="text-cyan-300"> +{r.points}</span>
                          </>
                        ) : (
                          <span className="text-slate-500">Nothing landed · +0</span>
                        )}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col items-center gap-3 pt-6">
                  {!isDaily && (
                    <>
                      <button
                        type="button"
                        onClick={resetDive}
                        className={`${bodyFont.className} inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-[#e9d5ff] bg-gradient-to-r from-[#6d28d9] via-[#3730a3] to-[#0e7490] px-8 py-3 text-base font-bold text-white shadow-[0_0_28px_rgba(192,132,252,0.4)] transition-transform hover:-translate-y-0.5`}
                      >
                        Play This One Again
                      </button>
                      <button
                        type="button"
                        onClick={playNextDive}
                        className={`${bodyFont.className} inline-flex min-h-11 items-center justify-center rounded-xl border border-cyan-400/40 bg-[#07122b]/90 px-6 py-2.5 text-sm font-semibold text-cyan-100 transition-colors hover:border-cyan-300 hover:text-white`}
                      >
                        Next Dive →
                      </button>
                    </>
                  )}
                  {isDaily && (
                    <Link
                      href="/unlimited-krillion"
                      className={`${bodyFont.className} inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-[#e9d5ff] bg-gradient-to-r from-[#6d28d9] via-[#3730a3] to-[#0e7490] px-8 py-3 text-base font-bold text-white shadow-[0_0_28px_rgba(192,132,252,0.4)]`}
                    >
                      Play Unlimited
                    </Link>
                  )}
                  <Link
                    href="/"
                    className={`${bodyFont.className} text-sm text-slate-400 hover:text-cyan-300`}
                  >
                    Back to How to Play
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
