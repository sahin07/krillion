'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Music, Volume2, VolumeX } from 'lucide-react';
import GamePageIntro from '@/components/game/GamePageIntro';
import OceanAtmosphere from '@/components/OceanAtmosphere';
import { useDiveAudio } from '@/hooks/useDiveAudio';
import { bodyFont, pixelFont } from '@/lib/fonts';
import { getDivePack, getDivePackCount, getNextDivePack, listDivePacks } from '@/lib/dive/dives';
import { applyResult, createEmptyRun, formatDepth, judgeAnswer } from '@/lib/dive/engine';
import { zoneForDepth } from '@/lib/game-pages';
import type { DivePack, DivePhase, DiveRun, PromptResult } from '@/lib/dive/types';
import { MODE_CONFIG } from '@/lib/dive/types';
import { cn } from '@/lib/utils';

const CONFIG = MODE_CONFIG.unlimited;

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

export default function UnlimitedDiveGame() {
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
  const zone = zoneForDepth(phase === 'lobby' ? 0 : run.depthMeters);
  const charted = getDivePackCount();

  useEffect(() => {
    setPack(getDivePack(packId));
  }, [packId]);

  const beginDescent = async () => {
    await audio.unlock();
    audio.sfxDive();
    // Music keeps looping until the user mutes it (Music button).
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
        : judgeAnswer(prompt, submitted, timedOut);

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
    <div className="relative isolate bg-[#040816] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <OceanAtmosphere />
      </div>
      <div aria-hidden="true" className="scanlines pointer-events-none absolute inset-0 z-[1] opacity-25" />

      <div className="relative z-10">
        <GamePageIntro
          tone="ocean"
          activeId="unlimited"
          title="Unlimited Krillion: Name What Nobody Else Names"
          description="Done with today's Daily Dive? Keep going. Dive after dive — rarer correct answers sink deeper."
        />

        <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border-2 border-cyan-400/35 bg-[#07122b]/88 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
            <div className="pointer-events-none absolute inset-0 opacity-50">
              <OceanAtmosphere />
            </div>

            {playing && (
              <div className="relative z-20 flex items-start justify-between gap-3 p-3 sm:p-4">
                <div className="space-y-2">
                  <div className="rounded-lg border border-white/15 bg-black/55 px-3 py-2 backdrop-blur-sm">
                    <p className={`${pixelFont.className} text-[7px] tracking-wider text-slate-400`}>DEPTH</p>
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
                              ? 'border-cyan-300 bg-cyan-400'
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
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/50 text-white hover:border-cyan-300/50"
                  >
                    {audio.soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
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
                  <p className={`${pixelFont.className} text-[8px] tracking-[0.2em] text-cyan-300/80`}>
                    KRILLIONPRO · UNLIMITED
                  </p>
                  <h2
                    className={`${pixelFont.className} mt-3 text-[clamp(1.25rem,4vw,2rem)] text-white [text-shadow:3px_0_0_#7c3aed,-2px_0_0_#22d3ee]`}
                  >
                    THE ENDLESS DIVE
                  </h2>
                  <p className={`${bodyFont.className} mt-3 max-w-md text-sm text-slate-300`}>
                    dive after dive · rarer answers sink deeper
                  </p>
                  <p className={`${pixelFont.className} mt-5 text-[8px] text-slate-400`}>
                    ENDLESS DIVE #{pack.diveNumber}
                  </p>
                  <p className={`${bodyFont.className} mt-2 text-xs text-slate-500`}>
                    {CONFIG.promptsPerDive} prompts · {CONFIG.promptSeconds}s each · {charted} charted
                  </p>

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

                  <button
                    type="button"
                    onClick={() => void beginDescent()}
                    className={`${bodyFont.className} mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl border-2 border-[#e9d5ff] bg-gradient-to-r from-[#6d28d9] via-[#3730a3] to-[#0e7490] px-9 py-3.5 text-base font-bold text-white shadow-[0_0_32px_rgba(192,132,252,0.45)]`}
                  >
                    <span aria-hidden="true">▼</span>
                    BEGIN DESCENT
                    <span aria-hidden="true">▼</span>
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
                    <div className="w-full max-w-xl rounded-2xl border-2 border-[#c4b5fd]/45 bg-[#070f24]/88 px-5 py-7 text-center shadow-[0_16px_40px_rgba(2,6,23,0.55)] backdrop-blur-sm sm:px-8">
                      <p className={`${pixelFont.className} text-[8px] tracking-wider text-pink-300`}>
                        PROMPT {promptIndex + 1} OF {total}
                      </p>
                      <h2
                        className={`${pixelFont.className} mt-4 text-[clamp(1rem,3.5vw,1.5rem)] leading-snug text-white`}
                      >
                        {currentPrompt.prompt}
                      </h2>
                      <p className={`${bodyFont.className} mt-4 text-xs text-slate-400`}>
                        ▼ rarer answers sink deeper ▼
                      </p>
                    </div>
                  </div>

                  <form
                    className="flex items-center gap-2 border-t border-white/10 bg-[#040816]/70 py-3 backdrop-blur-md sm:gap-3"
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
                      placeholder="type one answer…"
                      aria-label="Your answer"
                      autoComplete="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      className={`${bodyFont.className} min-h-11 flex-1 rounded-xl border border-cyan-400/30 bg-[#0a1628]/90 px-3 text-base text-white outline-none placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30`}
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
                      className={`${pixelFont.className} min-h-11 rounded-xl border-2 border-pink-300/80 bg-gradient-to-b from-fuchsia-600 to-purple-800 px-4 text-[10px] text-white disabled:opacity-40 sm:min-w-[5.5rem]`}
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
                      <h2 className={`${pixelFont.className} text-[clamp(1.1rem,3.5vw,1.6rem)] text-slate-200`}>
                        NOTHING LANDED
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
                    <h2 className={`${pixelFont.className} mt-2 text-[clamp(1.2rem,4vw,1.75rem)] text-white`}>
                      THE CATCH
                    </h2>
                    <p className={`${bodyFont.className} mt-3 text-lg text-slate-200`}>
                      <span className="font-bold text-cyan-300">{formatDepth(run.depthMeters)}</span>
                      <span className="mx-2 text-slate-500">·</span>
                      <span className="font-bold text-pink-300">{run.score} pts</span>
                    </p>
                  </div>

                  <ul className="mt-6 max-h-[40vh] space-y-2 overflow-y-auto pr-1">
                    {run.results.map((r, i) => (
                      <li
                        key={`${r.promptId}-${i}`}
                        className="rounded-xl border border-white/10 bg-[#07122b]/75 px-3 py-2.5 text-left"
                      >
                        <p className={`${pixelFont.className} text-[7px] text-slate-500`}>PROMPT {i + 1}</p>
                        <p className={`${bodyFont.className} mt-1 text-sm font-medium text-slate-200`}>{r.prompt}</p>
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
                    <button
                      type="button"
                      onClick={quitToLobby}
                      className={`${bodyFont.className} inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-[#e9d5ff] bg-gradient-to-r from-[#6d28d9] via-[#3730a3] to-[#0e7490] px-8 py-3 text-base font-bold text-white`}
                    >
                      Play This One Again
                    </button>
                    <button
                      type="button"
                      onClick={playNextDive}
                      className={`${bodyFont.className} inline-flex min-h-11 items-center justify-center rounded-xl border border-cyan-400/40 bg-[#07122b]/90 px-6 py-2.5 text-sm font-semibold text-cyan-100`}
                    >
                      Next Dive →
                    </button>
                    <Link
                      href="/minecraft-krillion-game"
                      className={`${bodyFont.className} text-sm text-slate-400 hover:text-cyan-300`}
                    >
                      Minecraft Krillion
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {playing && (
              <div
                aria-hidden="true"
                className={`${pixelFont.className} pointer-events-none absolute right-2 top-24 hidden flex-col justify-between text-[6px] text-sky-200/35 sm:flex sm:h-[55%]`}
              >
                {['0m', '100m', '200m', '500m', '1k'].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            )}
          </div>

          <p className={`${bodyFont.className} mt-4 text-center text-sm text-slate-400`}>
            Think beyond the obvious —{' '}
            <strong className="font-semibold text-white">rare correct answers score more.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
