'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Music, Volume2, VolumeX } from 'lucide-react';
import GamePageIntro from '@/components/game/GamePageIntro';
import { useDiveAudio } from '@/hooks/useDiveAudio';
import { bodyFont, pixelFont } from '@/lib/fonts';
import { applyResult, createEmptyRun, formatDepth } from '@/lib/dive/engine';
import { POKEMON_CONFIG } from '@/lib/dive/pokemon';
import { zoneForDepth } from '@/lib/game-pages';
import type { DivePhase, DiveRun, PromptResult, PublicDivePack } from '@/lib/dive/types';
import { cn } from '@/lib/utils';

const ADVENTURE_BG = '/pokemon-krillion-adventure.jpg';

type PkMode = 'daily' | 'unlimited';

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
          stroke={urgent ? '#f87171' : '#facc15'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-200"
        />
      </svg>
      <span
        className={`${pixelFont.className} absolute inset-0 flex items-center justify-center text-[10px] ${
          urgent ? 'text-red-300' : 'text-yellow-200'
        }`}
      >
        {seconds}
      </span>
    </div>
  );
}

export default function PokemonDiveGame() {
  const [mode, setMode] = useState<PkMode>('daily');
  const [publicPack, setPublicPack] = useState<PublicDivePack | null>(null);
  const [dailyDate, setDailyDate] = useState<string | null>(null);
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
  const [secondsLeft, setSecondsLeft] = useState<number>(POKEMON_CONFIG.promptSeconds);
  const [lastResult, setLastResult] = useState<PromptResult | null>(null);
  const [processing, setProcessing] = useState(false);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lockedRef = useRef(false);

  const audio = useDiveAudio();
  const playing = phase === 'prompt' || phase === 'result' || phase === 'summary';

  const prompts = publicPack?.prompts ?? [];
  const total = prompts.length || POKEMON_CONFIG.promptsPerDive;
  const currentPrompt = prompts[promptIndex];
  const promptSeconds = publicPack?.promptSeconds ?? POKEMON_CONFIG.promptSeconds;
  const zone = zoneForDepth(phase === 'lobby' ? 0 : run.depthMeters);

  const loadPack = useCallback(async (nextMode: PkMode) => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch(`/api/dive/pokemon?mode=${nextMode}`);
      if (!res.ok) throw new Error('load failed');
      const data = (await res.json()) as { date?: string; pack: PublicDivePack };
      setPublicPack(data.pack);
      setDailyDate(data.date ?? null);
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
      setConfirmQuit(false);
      lockedRef.current = false;
    } catch {
      setLoadError('Could not load Pokémon Krillion. Try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPack(mode);
  }, [mode, loadPack]);

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
      let result: PromptResult;

      if (passed) {
        result = {
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
          result = data.result;
        } catch {
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
      }

      if (result.points > 0) audio.sfxHit();
      else audio.sfxMiss();

      window.setTimeout(() => {
        setLastResult(result);
        setRun((prev) => applyResult(prev, result));
        setProcessing(false);
        setPhase('result');
      }, 350);
    },
    [publicPack, promptIndex, audio]
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
    lockedRef.current = false;
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
      <div className="flex min-h-[24rem] items-center justify-center bg-[#1a0a10] py-16 text-yellow-200">
        <p className={`${bodyFont.className} text-sm`}>Loading Pokémon Krillion…</p>
      </div>
    );
  }

  if (loadError || !publicPack) {
    return (
      <div className="flex min-h-[24rem] flex-col items-center justify-center gap-4 bg-[#1a0a10] px-4 py-16">
        <p className={`${bodyFont.className} text-slate-300`}>{loadError ?? 'Unavailable.'}</p>
        <button
          type="button"
          onClick={() => void loadPack(mode)}
          className={`${bodyFont.className} rounded-xl border border-yellow-400/50 px-4 py-2 text-yellow-100`}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative isolate bg-[#140810] text-white">
      {/* Adventure art behind hero — same GamePageIntro fonts as other modes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ADVENTURE_BG}
          alt=""
          className="h-full w-full object-cover object-[center_35%] opacity-55"
        />
        <div className="absolute inset-0 bg-[#140810]/60" />
      </div>

      <div className="relative z-10">
        <GamePageIntro
          tone="ocean"
          activeId="pokemon"
          title="Pokémon Krillion: Rare-Answer Pokémon Trivia"
          description="Seven Pokémon prompts, 25 seconds each. Uncommon correct answers sink deeper. Fan-made — not affiliated with Nintendo, Game Freak, or The Pokémon Company."
        />

        <div className="mx-auto flex w-full max-w-6xl justify-center gap-2 px-4 pb-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => {
              audio.sfxClick();
              setMode('daily');
            }}
            className={cn(
              bodyFont.className,
              'rounded-full border px-4 py-1.5 text-xs font-semibold sm:text-sm',
              mode === 'daily'
                ? 'border-yellow-400 bg-yellow-500/20 text-yellow-100'
                : 'border-white/15 text-slate-300 hover:text-white'
            )}
          >
            Daily Challenge
          </button>
          <button
            type="button"
            onClick={() => {
              audio.sfxClick();
              setMode('unlimited');
            }}
            className={cn(
              bodyFont.className,
              'rounded-full border px-4 py-1.5 text-xs font-semibold sm:text-sm',
              mode === 'unlimited'
                ? 'border-yellow-400 bg-yellow-500/20 text-yellow-100'
                : 'border-white/15 text-slate-300 hover:text-white'
            )}
          >
            Unlimited
          </button>
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border-2 border-yellow-400/40 bg-[#1a0a12]/90 shadow-[0_0_40px_rgba(250,204,21,0.12)]">
            <div aria-hidden="true" className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ADVENTURE_BG}
                alt=""
                className="h-full w-full object-cover object-[center_40%] opacity-65"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a12]/25 via-[#140810]/45 to-[#0a0508]/82" />
            </div>

            {playing && (
              <div className="relative z-20 flex items-start justify-between gap-3 p-3 sm:p-4">
                <div className="space-y-2">
                  <div className="rounded-lg border border-white/15 bg-black/55 px-3 py-2 backdrop-blur-sm">
                    <p className={`${pixelFont.className} text-[7px] tracking-wider text-slate-400`}>DEPTH</p>
                    <p className={`${pixelFont.className} mt-1 text-[11px] text-yellow-200`}>
                      {formatDepth(run.depthMeters)}
                    </p>
                  </div>
                  <div className="max-w-[11rem] rounded-lg border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-sm">
                    <p className={`${pixelFont.className} text-[7px] leading-relaxed text-red-200`}>{zone.title}</p>
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
                              ? 'border-yellow-300 bg-yellow-400'
                              : done
                                ? 'border-slate-500 bg-slate-600'
                                : active
                                  ? 'border-red-300 bg-red-400/50'
                                  : 'border-slate-600 bg-slate-800'
                          )}
                        />
                      );
                    })}
                  </div>
                  <p className={`${bodyFont.className} mt-2 text-xs font-bold text-red-200`}>{run.score} pts</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label={audio.soundOn ? 'Mute sound' : 'Unmute sound'}
                    onClick={() => {
                      audio.setSoundOn(!audio.soundOn);
                      audio.sfxClick();
                    }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/50 text-white hover:border-yellow-300/50"
                  >
                    {audio.soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
                  </button>
                  <button
                    type="button"
                    aria-label={audio.musicOn ? 'Mute music' : 'Unmute music'}
                    onClick={() => audio.setMusicEnabled(!audio.musicOn)}
                    className={cn(
                      'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/50 hover:border-yellow-300/50',
                      audio.musicOn ? 'text-yellow-200' : 'text-slate-400'
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
                  <p className={`${pixelFont.className} text-[8px] tracking-[0.18em] text-yellow-300`}>
                    {mode === 'daily' ? `DAILY · ${dailyDate ?? 'TODAY'}` : 'UNLIMITED'}
                  </p>
                  <h2
                    className={`${pixelFont.className} mt-3 text-[clamp(1.25rem,4vw,2rem)] leading-tight text-white [text-shadow:4px_0_0_#b45309,-3px_0_0_#facc15,0_0_28px_rgba(250,204,21,0.3)]`}
                  >
                    Pokémon Krillion
                  </h2>
                  <p className={`${bodyFont.className} mt-3 max-w-md text-sm text-slate-300`}>
                    {POKEMON_CONFIG.promptsPerDive} Pokémon prompts · {POKEMON_CONFIG.promptSeconds}s each ·
                    rare answers score more
                  </p>
                  <button
                    type="button"
                    onClick={() => void beginDescent()}
                    className={`${bodyFont.className} mt-8 inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-yellow-200/80 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 px-9 py-3.5 text-base font-bold text-[#1a0a10] shadow-[0_0_32px_rgba(250,204,21,0.35)]`}
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
                        audio.musicOn ? 'text-yellow-200' : 'text-slate-400'
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
                    <div className="w-full max-w-xl rounded-2xl border-2 border-yellow-400/40 bg-black/55 px-5 py-7 text-center backdrop-blur-md sm:px-8">
                      <p className={`${pixelFont.className} text-[8px] tracking-wider text-yellow-300`}>
                        PROMPT {promptIndex + 1} OF {total}
                      </p>
                      <h2
                        className={`${pixelFont.className} mt-4 text-[clamp(1rem,3.5vw,1.45rem)] leading-snug text-white`}
                      >
                        {currentPrompt.prompt}
                      </h2>
                      <p className={`${bodyFont.className} mt-4 text-xs text-slate-400`}>
                        ▼ rarer answers sink deeper ▼
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
                      placeholder="type one answer…"
                      aria-label="Your answer"
                      autoComplete="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      className={`${bodyFont.className} min-h-11 flex-1 rounded-xl border border-yellow-400/35 bg-[#1a0a12]/95 px-3 text-base text-white outline-none placeholder:text-slate-500 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-400/25`}
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
                      className={`${pixelFont.className} min-h-11 rounded-xl border-2 border-yellow-300/80 bg-gradient-to-b from-yellow-500 to-red-700 px-4 text-[10px] text-[#1a0a10] disabled:opacity-40 sm:min-w-[5.5rem]`}
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
                      <p className={`${pixelFont.className} text-[8px] tracking-wider text-yellow-300`}>
                        {lastResult.tierLabel}
                      </p>
                      <h2
                        className={`${pixelFont.className} mt-3 text-[clamp(1.2rem,4vw,1.85rem)] text-white`}
                      >
                        {lastResult.acceptedLabel}
                      </h2>
                      <p className={`${bodyFont.className} mt-3 text-xl font-bold text-yellow-300`}>
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
                    className={`${bodyFont.className} mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-yellow-300/60 bg-[#1a0a12]/90 px-8 py-3 text-base font-bold text-white`}
                  >
                    {run.results.length >= total ? 'SURFACE' : 'DESCEND'}
                    <span aria-hidden="true">▼</span>
                  </button>
                </div>
              )}

              {phase === 'summary' && (
                <div className="flex flex-1 flex-col py-6">
                  <div className="text-center">
                    <p className={`${pixelFont.className} text-[8px] tracking-[0.18em] text-yellow-300`}>
                      DIVE COMPLETE
                    </p>
                    <h2
                      className={`${pixelFont.className} mt-2 text-[clamp(1.1rem,3.5vw,1.6rem)] leading-tight text-white [text-shadow:3px_0_0_#b45309,-2px_0_0_#facc15]`}
                    >
                      The Catch
                    </h2>
                    <p className={`${bodyFont.className} mt-3 text-lg text-slate-200`}>
                      <span className="font-bold text-yellow-300">{formatDepth(run.depthMeters)}</span>
                      <span className="mx-2 text-slate-500">·</span>
                      <span className="font-bold text-red-300">{run.score} pts</span>
                    </p>
                  </div>

                  <ul className="mt-6 max-h-[40vh] space-y-2 overflow-y-auto pr-1">
                    {run.results.map((r, i) => (
                      <li
                        key={`${r.promptId}-${i}`}
                        className="rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-left"
                      >
                        <p className={`${pixelFont.className} text-[7px] text-slate-500`}>PROMPT {i + 1}</p>
                        <p className={`${bodyFont.className} mt-1 text-sm font-medium text-slate-200`}>{r.prompt}</p>
                        <p className={`${bodyFont.className} mt-1 text-sm text-slate-400`}>
                          {r.acceptedLabel ? (
                            <>
                              <span className="text-white">{r.acceptedLabel}</span>
                              <span className="text-slate-500"> · </span>
                              <span className="text-yellow-300">{r.tierLabel}</span>
                              <span className="text-red-300"> +{r.points}</span>
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
                      className={`${bodyFont.className} inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-yellow-200/80 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 px-8 py-3 text-base font-bold text-[#1a0a10]`}
                    >
                      Play again
                    </button>
                    <Link
                      href="/daily-challenge"
                      className={`${bodyFont.className} text-sm text-slate-400 hover:text-yellow-300`}
                    >
                      Daily Dive (ocean)
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className={`${bodyFont.className} mt-4 text-center text-sm text-slate-400`}>
            Fan-made trivia —{' '}
            <strong className="font-semibold text-white">not affiliated with Nintendo or The Pokémon Company.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
