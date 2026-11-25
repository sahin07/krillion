'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Music, Volume2, VolumeX } from 'lucide-react';
import GamePageIntro from '@/components/game/GamePageIntro';
import OceanAtmosphere from '@/components/OceanAtmosphere';
import { useDiveAudio } from '@/hooks/useDiveAudio';
import { bodyFont, pixelFont } from '@/lib/fonts';
import { getDivePack, getDivePackCount, getNextDivePack, listDivePacks } from '@/lib/dive/dives';
import { applyResult, createEmptyRun, judgeAnswer } from '@/lib/dive/engine';
import {
  REVERSE_CONFIG,
  altitudeFromScore,
  formatAltitude,
  zoneForAltitude,
} from '@/lib/dive/reverse';
import type { DivePack, DivePhase, DiveRun, PromptResult } from '@/lib/dive/types';
import { cn } from '@/lib/utils';

const CONFIG = REVERSE_CONFIG;

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
          stroke={urgent ? '#f472b6' : '#fbbf24'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-200"
        />
      </svg>
      <span
        className={`${pixelFont.className} absolute inset-0 flex items-center justify-center text-[10px] ${
          urgent ? 'text-pink-300' : 'text-amber-200'
        }`}
      >
        {seconds}
      </span>
    </div>
  );
}

type Props = {
  /** Page brand: reverse-krillion vs noillirk naming */
  brand?: 'reverse' | 'noillirk';
};

export default function ReverseDiveGame({ brand = 'reverse' }: Props) {
  const allPacks = useMemo(() => listDivePacks(), []);
  const [packId, setPackId] = useState(allPacks[0]?.id ?? 'classic-1');
  const [pack, setPack] = useState<DivePack>(() => getDivePack(packId));

  const [phase, setPhase] = useState<DivePhase>('lobby');
  const [run, setRun] = useState<DiveRun>(() => createEmptyRun(getDivePack(packId)));
  const [promptIndex, setPromptIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [secondsLeft, setSecondsLeft] = useState<number>(CONFIG.promptSeconds);
  const [lastResult, setLastResult] = useState<PromptResult | null>(null);
  const [processing, setProcessing] = useState(false);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lockedRef = useRef(false);
  const audio = useDiveAudio();

  const playing = phase === 'prompt' || phase === 'result' || phase === 'summary';
  const total = pack.prompts.length;
  const currentPrompt = pack.prompts[promptIndex];
  const altitude = altitudeFromScore(run.score);
  const zone = zoneForAltitude(phase === 'lobby' ? 0 : altitude);
  const charted = getDivePackCount();

  const brandLabel = brand === 'noillirk' ? 'NOILLIRK' : 'REVERSE KRILLION';
  const introTitle =
    brand === 'noillirk'
      ? 'Noillirk: Name What Everybody Names'
      : 'Reverse Krillion: Name What Everybody Names';
  const introDescription =
    brand === 'noillirk'
      ? 'The Krillion backwards game (Noillirk): common correct answers score most. Opposite of rare-answer Krillion — think like the crowd and rise.'
      : 'The opposite of Krillion — also the Krillion backwards game. Common correct answers score most. Think like everybody and rise.';

  useEffect(() => {
    setPack(getDivePack(packId));
  }, [packId]);

  const beginAscent = async () => {
    await audio.unlock();
    audio.sfxDive();
    void audio.startMusic();
    setRun(createEmptyRun(pack));
    setPromptIndex(0);
    setAnswer('');
    setLastResult(null);
    setConfirmQuit(false);
    lockedRef.current = false;
    setSecondsLeft(CONFIG.promptSeconds);
    setPhase('prompt');
  };

  const startPrompt = useCallback((index: number) => {
    setPromptIndex(index);
    setAnswer('');
    setSecondsLeft(CONFIG.promptSeconds);
    setProcessing(false);
    lockedRef.current = false;
    setLastResult(null);
    setConfirmQuit(false);
    setPhase('prompt');
  }, []);

  const resolvePrompt = useCallback(
    (submitted: string | null, timedOut: boolean, passed = false) => {
      if (lockedRef.current) return;
      lockedRef.current = true;
      setProcessing(true);
      audio.sfxClick();

      const prompt = pack.prompts[promptIndex];
      const result = passed
        ? {
            promptId: prompt.id,
            prompt: prompt.prompt,
            submitted: null,
            acceptedLabel: null,
            tier: null,
            tierLabel: null,
            points: 0,
            timedOut: false,
          }
        : judgeAnswer(prompt, submitted, timedOut, { scoring: 'common' });

      if (result.points > 0) audio.sfxHit();
      else audio.sfxMiss();

      window.setTimeout(() => {
        setLastResult(result);
        setRun((prev) => applyResult(prev, result));
        setProcessing(false);
        setPhase('result');
      }, 350);
    },
    [pack.prompts, promptIndex, audio]
  );

  const onSubmit = () => {
    if (!answer.trim() || processing || phase !== 'prompt') return;
    resolvePrompt(answer, false);
  };

  const onPass = () => {
    if (processing || phase !== 'prompt') return;
    resolvePrompt(null, false, true);
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
    lockedRef.current = false;
  };

  const playNextDive = () => {
    const next = getNextDivePack(packId);
    setPackId(next.id);
    setPack(next);
    setRun(createEmptyRun(next));
    setPromptIndex(0);
    setAnswer('');
    setLastResult(null);
    setConfirmQuit(false);
    lockedRef.current = false;
    setPhase('lobby');
  };

  useEffect(() => {
    if (phase !== 'prompt' || processing) return;
    if (secondsLeft <= 0) {
      resolvePrompt(answer, true);
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

  return (
    <div className="relative isolate bg-[#0c0618] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <OceanAtmosphere />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-amber-500/10 via-transparent to-fuchsia-900/20"
      />
      <div aria-hidden="true" className="scanlines pointer-events-none absolute inset-0 z-[1] opacity-20" />

      <div className="relative z-10">
        <GamePageIntro
          tone="ocean"
          activeId="reverse"
          title={introTitle}
          description={introDescription}
        />

        <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border-2 border-amber-400/35 bg-[#12081f]/90 shadow-[0_0_40px_rgba(251,191,36,0.12)]">
            <div className="pointer-events-none absolute inset-0 opacity-40">
              <OceanAtmosphere />
            </div>

            {playing && (
              <div className="relative z-20 flex items-start justify-between gap-3 p-3 sm:p-4">
                <div className="space-y-2">
                  <div className="rounded-lg border border-white/15 bg-black/55 px-3 py-2 backdrop-blur-sm">
                    <p className={`${pixelFont.className} text-[7px] tracking-wider text-slate-400`}>ALTITUDE</p>
                    <p className={`${pixelFont.className} mt-1 text-[11px] text-amber-200`}>
                      {formatAltitude(altitude)}
                    </p>
                  </div>
                  <div className="max-w-[11rem] rounded-lg border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-sm">
                    <p className={`${pixelFont.className} text-[7px] leading-relaxed text-amber-200`}>
                      {zone.title}
                    </p>
                    <p className={`${bodyFont.className} mt-1 text-[11px] leading-snug text-slate-400`}>
                      {zone.blurb}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <p className={`${pixelFont.className} text-[7px] tracking-wider text-slate-300`}>
                    PROMPT {Math.min(promptIndex + 1, total)} OF {total}
                  </p>
                  <div className="mt-1.5 flex gap-1">
                    {Array.from({ length: total }).map((_, i) => {
                      const done = i < run.results.length;
                      const active = i === promptIndex && phase === 'prompt';
                      const pts = done ? run.results[i]?.points ?? 0 : 0;
                      return (
                        <span
                          key={i}
                          className={cn(
                            'h-2.5 w-2.5 rounded-[2px] border',
                            done && pts > 0
                              ? 'border-amber-300 bg-amber-400'
                              : done
                                ? 'border-slate-500 bg-slate-600'
                                : active
                                  ? 'border-pink-300 bg-pink-400/50'
                                  : 'border-slate-600 bg-slate-800'
                          )}
                        />
                      );
                    })}
                  </div>
                  <p className={`${bodyFont.className} mt-2 text-xs font-bold text-pink-200`}>{run.score} pts</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label={audio.soundOn ? 'Mute sound' : 'Unmute sound'}
                    onClick={() => {
                      audio.setSoundOn(!audio.soundOn);
                      audio.sfxClick();
                    }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/50 text-white hover:border-amber-300/50"
                  >
                    {audio.soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
                  </button>
                  <button
                    type="button"
                    aria-label={audio.musicOn ? 'Mute music' : 'Unmute music'}
                    onClick={() => audio.setMusicEnabled(!audio.musicOn)}
                    className={cn(
                      'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/50 hover:border-amber-300/50',
                      audio.musicOn ? 'text-amber-200' : 'text-slate-400'
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
                  <p className={`${pixelFont.className} text-[8px] tracking-[0.2em] text-amber-300/90`}>
                    KRILLIONPRO · {brandLabel}
                  </p>
                  <h2
                    className={`${pixelFont.className} mt-3 text-[clamp(1.25rem,4vw,2rem)] text-white [text-shadow:3px_0_0_#b45309,-2px_0_0_#e879f9]`}
                  >
                    THINK LIKE EVERYBODY
                  </h2>
                  <p className={`${bodyFont.className} mt-3 max-w-md text-sm text-slate-300`}>
                    common correct answers score most · rise with the crowd
                  </p>
                  <p className={`${pixelFont.className} mt-5 text-[8px] text-slate-400`}>
                    ASCENT #{pack.diveNumber}
                  </p>
                  <p className={`${bodyFont.className} mt-2 text-xs text-slate-500`}>
                    {CONFIG.promptsPerDive} prompts · {CONFIG.promptSeconds}s each · {charted} charted
                  </p>

                  <label
                    className={`${bodyFont.className} mt-5 flex flex-col items-center gap-1.5 text-xs text-slate-400`}
                  >
                    <span>Choose set</span>
                    <select
                      value={packId}
                      onChange={(e) => {
                        setPackId(e.target.value);
                        setRun(createEmptyRun(getDivePack(e.target.value)));
                      }}
                      className="rounded-lg border border-amber-400/30 bg-[#1a0f2e] px-3 py-2 text-sm text-white outline-none focus:border-amber-300/60"
                    >
                      {allPacks.map((p) => (
                        <option key={p.id} value={p.id}>
                          Set #{p.diveNumber} — {p.title}
                        </option>
                      ))}
                    </select>
                  </label>

                  <button
                    type="button"
                    onClick={() => void beginAscent()}
                    className={`${bodyFont.className} mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl border-2 border-amber-200/80 bg-gradient-to-r from-amber-600 via-fuchsia-700 to-violet-800 px-9 py-3.5 text-base font-bold text-white shadow-[0_0_32px_rgba(251,191,36,0.35)]`}
                  >
                    <span aria-hidden="true">▲</span>
                    BEGIN ASCENT
                    <span aria-hidden="true">▲</span>
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
                        audio.musicOn ? 'text-amber-200' : 'text-slate-400'
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
                    <div className="w-full max-w-xl rounded-2xl border-2 border-amber-300/40 bg-[#1a0f2e]/90 px-5 py-7 text-center shadow-[0_16px_40px_rgba(2,6,23,0.55)] backdrop-blur-sm sm:px-8">
                      <p className={`${pixelFont.className} text-[8px] tracking-wider text-amber-300`}>
                        PROMPT {promptIndex + 1} OF {total}
                      </p>
                      <h2
                        className={`${pixelFont.className} mt-4 text-[clamp(1rem,3.5vw,1.5rem)] leading-snug text-white`}
                      >
                        {currentPrompt.prompt}
                      </h2>
                      <p className={`${bodyFont.className} mt-4 text-xs text-slate-400`}>
                        ▲ common answers rise higher ▲
                      </p>
                    </div>
                  </div>

                  <form
                    className="flex items-center gap-2 border-t border-white/10 bg-[#0c0618]/75 py-3 backdrop-blur-md sm:gap-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      onSubmit();
                    }}
                  >
                    <TimerRing seconds={secondsLeft} max={CONFIG.promptSeconds} />
                    <input
                      ref={inputRef}
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      disabled={processing}
                      placeholder="type the crowd answer…"
                      aria-label="Your answer"
                      autoComplete="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      className={`${bodyFont.className} min-h-11 flex-1 rounded-xl border border-amber-400/30 bg-[#1a0f2e]/90 px-3 text-base text-white outline-none placeholder:text-slate-500 focus:border-amber-300 focus:ring-2 focus:ring-amber-400/30`}
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
                      className={`${pixelFont.className} min-h-11 rounded-xl border-2 border-amber-300/80 bg-gradient-to-b from-amber-500 to-fuchsia-800 px-4 text-[10px] text-white disabled:opacity-40 sm:min-w-[5.5rem]`}
                    >
                      {processing ? '…' : 'RISE'}
                    </button>
                  </form>
                </div>
              )}

              {phase === 'result' && lastResult && (
                <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                  {lastResult.points > 0 ? (
                    <>
                      <p className={`${pixelFont.className} text-[8px] tracking-wider text-amber-300`}>
                        {lastResult.tierLabel}
                      </p>
                      <h2
                        className={`${pixelFont.className} mt-3 text-[clamp(1.2rem,4vw,1.85rem)] text-white [text-shadow:2px_0_0_#b45309,-2px_0_0_#e879f9]`}
                      >
                        {lastResult.acceptedLabel}
                      </h2>
                      <p className={`${bodyFont.className} mt-3 text-xl font-bold text-amber-300`}>
                        +{lastResult.points} PTS
                      </p>
                      <p className={`${bodyFont.className} mt-2 text-sm text-slate-400`}>
                        altitude {formatAltitude(altitudeFromScore(run.score))}
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className={`${pixelFont.className} text-[clamp(1.1rem,3.5vw,1.6rem)] text-slate-200`}>
                        NO CONSENSUS
                      </h2>
                      <p className={`${bodyFont.className} mt-3 text-lg font-bold text-slate-400`}>+0 PTS</p>
                      <p className={`${bodyFont.className} mt-2 text-sm text-slate-500`}>
                        {lastResult.timedOut ? 'the clock beat you to it.' : 'that answer did not catch.'}
                      </p>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={onContinue}
                    className={`${bodyFont.className} mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-amber-300/60 bg-[#1a0f2e]/90 px-8 py-3 text-base font-bold text-white`}
                  >
                    {run.results.length >= total ? 'LAND' : 'ASCEND'}
                    <span aria-hidden="true">▲</span>
                  </button>
                </div>
              )}

              {phase === 'summary' && (
                <div className="flex flex-1 flex-col py-6">
                  <div className="text-center">
                    <p className={`${pixelFont.className} text-[8px] tracking-[0.18em] text-amber-300`}>
                      ASCENT COMPLETE
                    </p>
                    <h2 className={`${pixelFont.className} mt-2 text-[clamp(1.2rem,4vw,1.75rem)] text-white`}>
                      THE CROWD
                    </h2>
                    <p className={`${bodyFont.className} mt-3 text-lg text-slate-200`}>
                      <span className="font-bold text-amber-300">{formatAltitude(altitude)}</span>
                      <span className="mx-2 text-slate-500">·</span>
                      <span className="font-bold text-pink-300">{run.score} pts</span>
                    </p>
                  </div>

                  <ul className="mt-6 max-h-[40vh] space-y-2 overflow-y-auto pr-1">
                    {run.results.map((r, i) => (
                      <li
                        key={`${r.promptId}-${i}`}
                        className="rounded-xl border border-white/10 bg-[#1a0f2e]/75 px-3 py-2.5 text-left"
                      >
                        <p className={`${pixelFont.className} text-[7px] text-slate-500`}>PROMPT {i + 1}</p>
                        <p className={`${bodyFont.className} mt-1 text-sm font-medium text-slate-200`}>{r.prompt}</p>
                        <p className={`${bodyFont.className} mt-1 text-sm text-slate-400`}>
                          {r.acceptedLabel ? (
                            <>
                              <span className="text-white">{r.acceptedLabel}</span>
                              <span className="text-slate-500"> · </span>
                              <span className="text-amber-300">{r.tierLabel}</span>
                              <span className="text-pink-300"> +{r.points}</span>
                            </>
                          ) : (
                            <span className="text-slate-500">No consensus · +0</span>
                          )}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col items-center gap-3 pt-6">
                    <button
                      type="button"
                      onClick={quitToLobby}
                      className={`${bodyFont.className} inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-amber-200/80 bg-gradient-to-r from-amber-600 via-fuchsia-700 to-violet-800 px-8 py-3 text-base font-bold text-white`}
                    >
                      Play This One Again
                    </button>
                    <button
                      type="button"
                      onClick={playNextDive}
                      className={`${bodyFont.className} inline-flex min-h-11 items-center justify-center rounded-xl border border-amber-400/40 bg-[#1a0f2e]/90 px-6 py-2.5 text-sm font-semibold text-amber-100`}
                    >
                      Next Ascent →
                    </button>
                    <Link
                      href="/daily-challenge"
                      className={`${bodyFont.className} text-sm text-slate-400 hover:text-amber-300`}
                    >
                      Switch to Daily Dive (rare wins)
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className={`${bodyFont.className} mt-4 text-center text-sm text-slate-400`}>
            Flip the instinct —{' '}
            <strong className="font-semibold text-white">common correct answers score more.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
