'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Music, Volume2, VolumeX } from 'lucide-react';
import GamePageIntro from '@/components/game/GamePageIntro';
import { useDiveAudio } from '@/hooks/useDiveAudio';
import { minecraftDisplayFont, minecraftUiFont } from '@/lib/fonts';
import { applyResult, createEmptyRun, formatDepth } from '@/lib/dive/engine';
import { MINECRAFT_CONFIG } from '@/lib/dive/minecraft';
import { zoneForDepth } from '@/lib/game-pages';
import type { DivePhase, DiveRun, PromptResult, PublicDivePack } from '@/lib/dive/types';
import { cn } from '@/lib/utils';

type McMode = 'daily' | 'unlimited';

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
          stroke={urgent ? '#f87171' : '#4ade80'}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-200"
        />
      </svg>
      <span
        className={`${minecraftDisplayFont.className} absolute inset-0 flex items-center justify-center text-sm ${
          urgent ? 'text-red-300' : 'text-white'
        }`}
      >
        {seconds}
      </span>
    </div>
  );
}

function highlightMinecraft(text: string) {
  const parts = text.split(/(Minecraft)/gi);
  return parts.map((part, i) =>
    part.toLowerCase() === 'minecraft' ? (
      <span key={i} className="font-semibold text-amber-300">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function MinecraftDiveGame() {
  const [mode, setMode] = useState<McMode>('daily');
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
  const [secondsLeft, setSecondsLeft] = useState<number>(MINECRAFT_CONFIG.promptSeconds);
  const [lastResult, setLastResult] = useState<PromptResult | null>(null);
  const [processing, setProcessing] = useState(false);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lockedRef = useRef(false);

  const audio = useDiveAudio();
  const playing = phase === 'prompt' || phase === 'result' || phase === 'summary';

  const prompts = publicPack?.prompts ?? [];
  const total = prompts.length || MINECRAFT_CONFIG.promptsPerDive;
  const currentPrompt = prompts[promptIndex];
  const promptSeconds = publicPack?.promptSeconds ?? MINECRAFT_CONFIG.promptSeconds;
  const zone = zoneForDepth(phase === 'lobby' ? 0 : run.depthMeters);

  const loadPack = useCallback(async (nextMode: McMode) => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch(`/api/dive/minecraft?mode=${nextMode}`);
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
      setLoadError('Could not load Minecraft Krillion. Try again.');
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
    // Music keeps looping until the user mutes it (Music button).
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
      <div className="flex min-h-[24rem] items-center justify-center bg-[#0b1a14] py-16 text-emerald-200">
        <p className={`${minecraftUiFont.className} text-sm`}>Loading Minecraft Krillion…</p>
      </div>
    );
  }

  if (loadError || !publicPack) {
    return (
      <div className="flex min-h-[24rem] flex-col items-center justify-center gap-4 bg-[#0b1a14] px-4 py-16">
        <p className={`${minecraftUiFont.className} text-slate-300`}>{loadError ?? 'Unavailable.'}</p>
        <button
          type="button"
          onClick={() => void loadPack(mode)}
          className={`${minecraftUiFont.className} rounded-xl border border-emerald-400/50 px-4 py-2 text-emerald-100`}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative isolate bg-[#04120c] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40">
        <Image
          src="/minecraft-krillion-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-[#04120c]/70" />
      </div>

      <div className="relative z-10">
        <GamePageIntro
          tone="minecraft"
          activeId="minecraft"
          title="Minecraft Krillion: Play a Minecraft Rare-Answer Dive Here"
          description="Done with today's ocean Daily Dive? Keep going with Minecraft prompts. Fan-made trivia — not affiliated with Mojang or Microsoft."
        />

        {/* Mode switch */}
        <div className="mx-auto flex w-full max-w-6xl justify-center gap-2 px-4 pb-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => {
              audio.sfxClick();
              setMode('daily');
            }}
            className={cn(
              minecraftUiFont.className,
              'rounded-full border px-4 py-1.5 text-xs font-semibold sm:text-sm',
              mode === 'daily'
                ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
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
              minecraftUiFont.className,
              'rounded-full border px-4 py-1.5 text-xs font-semibold sm:text-sm',
              mode === 'unlimited'
                ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
                : 'border-white/15 text-slate-300 hover:text-white'
            )}
          >
            Unlimited
          </button>
        </div>

        {/* Game viewport */}
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-400/40 bg-[#071510]/90 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
            <div aria-hidden="true" className="absolute inset-0">
              <Image
                src="/minecraft-krillion-bg.jpg"
                alt=""
                fill
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="object-cover object-center opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0b1a14]/40 via-[#04120c]/55 to-[#020a07]/85" />
            </div>

            {/* Play HUD chrome */}
            {playing && (
              <div className="relative z-20 flex items-start justify-between gap-3 p-3 sm:p-4">
                <div className="space-y-2">
                  <div className="rounded-lg border border-white/15 bg-black/55 px-3 py-2 backdrop-blur-sm">
                    <p className={`${minecraftUiFont.className} text-[10px] font-bold uppercase tracking-wider text-slate-400`}>
                      Depth
                    </p>
                    <p className={`${minecraftDisplayFont.className} text-lg text-emerald-200`}>
                      {formatDepth(run.depthMeters)}
                    </p>
                  </div>
                  <div className="max-w-[11rem] rounded-lg border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-sm">
                    <p className={`${minecraftDisplayFont.className} text-xs text-amber-200`}>{zone.title}</p>
                    <p className={`${minecraftUiFont.className} mt-0.5 text-[11px] leading-snug text-slate-400`}>
                      {zone.blurb}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <p className={`${minecraftUiFont.className} text-[10px] font-bold uppercase tracking-wider text-slate-300`}>
                    Prompt {Math.min(promptIndex + 1, total)} of {total}
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
                              ? 'border-emerald-300 bg-emerald-400'
                              : done
                                ? 'border-slate-500 bg-slate-600'
                                : active
                                  ? 'border-emerald-300 bg-emerald-400/40'
                                  : 'border-slate-600 bg-slate-800'
                          )}
                        />
                      );
                    })}
                  </div>
                  <p className={`${minecraftUiFont.className} mt-2 text-xs text-amber-200`}>{run.score} pts</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label={audio.soundOn ? 'Mute sound' : 'Unmute sound'}
                    aria-pressed={audio.soundOn}
                    onClick={() => {
                      audio.setSoundOn(!audio.soundOn);
                      audio.sfxClick();
                    }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/50 text-white hover:border-emerald-300/50"
                  >
                    {audio.soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
                  </button>
                  <button
                    type="button"
                    aria-label={audio.musicOn ? 'Mute music' : 'Unmute music'}
                    aria-pressed={audio.musicOn}
                    onClick={() => audio.setMusicEnabled(!audio.musicOn)}
                    className={cn(
                      'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/50 hover:border-emerald-300/50',
                      audio.musicOn ? 'text-emerald-200' : 'text-slate-400'
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
                    className={`${minecraftUiFont.className} inline-flex h-9 items-center rounded-lg border border-white/15 bg-black/50 px-2.5 text-[11px] font-bold uppercase tracking-wide text-white hover:border-rose-300/50`}
                  >
                    {confirmQuit ? 'Sure?' : 'Quit'}
                  </button>
                </div>
              </div>
            )}

            <div className="relative z-10 flex min-h-[28rem] flex-col px-4 pb-4 sm:min-h-[32rem] sm:px-6">
              {phase === 'lobby' && (
                <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
                  <p className={`${minecraftUiFont.className} text-xs font-bold uppercase tracking-[0.18em] text-emerald-300`}>
                    {mode === 'daily' ? `Daily Dive · ${dailyDate ?? 'today'}` : 'Unlimited Dive'}
                  </p>
                  <h2 className={`${minecraftDisplayFont.className} mt-3 text-3xl sm:text-4xl`}>
                    Minecraft Krillion
                  </h2>
                  <p className={`${minecraftUiFont.className} mt-3 max-w-md text-sm text-slate-300`}>
                    {MINECRAFT_CONFIG.promptsPerDive} Minecraft prompts · {MINECRAFT_CONFIG.promptSeconds}s
                    each · rare answers score more
                  </p>
                  <button
                    type="button"
                    onClick={() => void beginDescent()}
                    className={`${minecraftDisplayFont.className} mt-8 rounded-xl border-b-4 border-emerald-800 bg-emerald-500 px-8 py-3.5 text-base text-[#052e16] shadow-[0_0_24px_rgba(74,222,128,0.4)]`}
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
                        audio.musicOn ? 'text-emerald-200' : 'text-slate-400'
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
                    <div className="w-full max-w-xl rounded-2xl border border-emerald-400/35 bg-black/55 px-5 py-7 text-center backdrop-blur-md sm:px-8">
                      <p className={`${minecraftUiFont.className} text-[10px] font-bold uppercase tracking-wider text-emerald-300`}>
                        Minecraft
                      </p>
                      <h2 className={`${minecraftDisplayFont.className} mt-3 text-xl leading-snug sm:text-2xl`}>
                        {highlightMinecraft(currentPrompt.prompt)}
                      </h2>
                      <p className={`${minecraftUiFont.className} mt-4 text-xs text-slate-400`}>
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
                      className={`${minecraftUiFont.className} min-h-11 flex-1 rounded-xl border border-sky-400/40 bg-[#071510]/95 px-3 text-base text-white outline-none placeholder:text-slate-500 focus:border-sky-300 focus:ring-2 focus:ring-sky-400/25`}
                    />
                    <button
                      type="button"
                      onClick={onPass}
                      disabled={processing}
                      className={`${minecraftUiFont.className} min-h-11 rounded-xl border border-white/15 bg-white/5 px-3 text-xs font-bold uppercase tracking-wide text-slate-200 disabled:opacity-40 sm:px-4`}
                    >
                      Pass
                    </button>
                    <button
                      type="submit"
                      disabled={!answer.trim() || processing}
                      className={`${minecraftDisplayFont.className} min-h-11 rounded-xl border-b-4 border-fuchsia-900 bg-gradient-to-b from-fuchsia-500 to-purple-700 px-4 text-sm text-white disabled:opacity-40 sm:min-w-[5.5rem]`}
                    >
                      {processing ? '…' : 'Dive'}
                    </button>
                  </form>
                </div>
              )}

              {phase === 'result' && lastResult && (
                <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                  {lastResult.points > 0 ? (
                    <>
                      <p className={`${minecraftUiFont.className} text-xs uppercase tracking-widest text-emerald-300`}>
                        {lastResult.tierLabel}
                      </p>
                      <h2 className={`${minecraftDisplayFont.className} mt-2 text-3xl`}>{lastResult.acceptedLabel}</h2>
                      <p className={`${minecraftDisplayFont.className} mt-3 text-2xl text-amber-300`}>
                        +{lastResult.points} PTS
                      </p>
                      <p className={`${minecraftUiFont.className} mt-2 text-sm text-slate-400`}>
                        depth {formatDepth(run.depthMeters)}
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className={`${minecraftDisplayFont.className} text-2xl text-slate-200`}>Nothing landed</h2>
                      <p className={`${minecraftUiFont.className} mt-2 text-slate-400`}>
                        {lastResult.timedOut ? 'Time ran out.' : 'That answer did not catch.'}
                      </p>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={onContinue}
                    className={`${minecraftDisplayFont.className} mt-8 rounded-xl border-b-4 border-emerald-800 bg-emerald-500 px-8 py-3 text-sm text-[#052e16]`}
                  >
                    {run.results.length >= total ? 'Surface' : 'Next'}
                  </button>
                </div>
              )}

              {phase === 'summary' && (
                <div className="flex flex-1 flex-col py-6">
                  <h2 className={`${minecraftDisplayFont.className} text-center text-2xl`}>Dive Complete</h2>
                  <p className={`${minecraftUiFont.className} mt-2 text-center text-lg`}>
                    <span className="font-bold text-amber-300">{run.score} pts</span>
                    <span className="mx-2 text-slate-500">·</span>
                    <span className="font-bold text-emerald-300">{formatDepth(run.depthMeters)}</span>
                  </p>
                  <ul className="mt-5 max-h-[min(28rem,50vh)] space-y-2 overflow-y-auto">
                    {run.results.map((r, i) => (
                      <li
                        key={`${r.promptId}-${i}`}
                        className="rounded-xl border border-white/10 bg-black/35 px-3 py-2.5 text-left"
                      >
                        <p className={`${minecraftUiFont.className} text-xs text-slate-500`}>Q{i + 1}</p>
                        <p className={`${minecraftUiFont.className} text-sm text-slate-200`}>{r.prompt}</p>
                        <p className={`${minecraftUiFont.className} mt-1 text-sm text-slate-400`}>
                          {r.acceptedLabel ? (
                            <>
                              <span className="text-white">{r.acceptedLabel}</span>
                              <span className="text-amber-300"> +{r.points}</span>
                            </>
                          ) : (
                            <span>Pass / miss · +0</span>
                          )}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={quitToLobby}
                      className={`${minecraftDisplayFont.className} rounded-xl border-b-4 border-emerald-800 bg-emerald-500 px-6 py-3 text-sm text-[#052e16]`}
                    >
                      Play again
                    </button>
                    <Link
                      href="/unlimited-krillion"
                      className={`${minecraftUiFont.className} inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm`}
                    >
                      Unlimited Krillion
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right depth marks during play */}
            {playing && (
              <div
                aria-hidden="true"
                className={`${minecraftUiFont.className} pointer-events-none absolute right-2 top-24 hidden flex-col justify-between text-[9px] text-emerald-200/35 sm:flex sm:h-[55%]`}
              >
                {['0m', '100m', '200m', '500m', '1k'].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            )}
          </div>

          <p
            className={`${minecraftUiFont.className} mt-4 flex items-center justify-center gap-2 text-center text-sm text-slate-400`}
          >
            Think beyond the obvious —{' '}
            <strong className="font-semibold text-white">rare correct answers score more.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
