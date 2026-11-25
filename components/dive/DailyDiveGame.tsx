'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Music, Volume2, VolumeX } from 'lucide-react';
import GamePageIntro from '@/components/game/GamePageIntro';
import DailyDiveAtmosphere from '@/components/dive/DailyDiveAtmosphere';
import { useDiveAudio } from '@/hooks/useDiveAudio';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';
import { applyResult, createEmptyRun, formatDepth } from '@/lib/dive/engine';
import { submitBoardEntry } from '@/lib/dive/daily-local';
import { zoneForDepth } from '@/lib/game-pages';
import type { DivePhase, DiveRun, PromptResult, PublicDivePack } from '@/lib/dive/types';
import { MODE_CONFIG } from '@/lib/dive/types';
import { cn } from '@/lib/utils';

const CONFIG = MODE_CONFIG.daily;

function formatDailyDate(iso: string | null): string {
  if (!iso) return 'TODAY';
  const d = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso.toUpperCase();
  return d
    .toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    })
    .toUpperCase();
}

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

function packMeta(pack: PublicDivePack) {
  return { id: pack.id, title: pack.title, diveNumber: pack.diveNumber, prompts: [] as never[] };
}

export default function DailyDiveGame() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');

  const [publicPack, setPublicPack] = useState<PublicDivePack | null>(null);
  const [dailyDate, setDailyDate] = useState<string | null>(null);
  const [practice, setPractice] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [phase, setPhase] = useState<DivePhase>('lobby');
  const [run, setRun] = useState<DiveRun>(() =>
    createEmptyRun({ id: 'daily', title: 'Daily', diveNumber: 1, prompts: [] })
  );
  const [promptIndex, setPromptIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [secondsLeft, setSecondsLeft] = useState<number>(CONFIG.promptSeconds);
  const [lastResult, setLastResult] = useState<PromptResult | null>(null);
  const [processing, setProcessing] = useState(false);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const [shareNote, setShareNote] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lockedRef = useRef(false);
  const recordedRef = useRef(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const audio = useDiveAudio();

  const playing = phase === 'prompt' || phase === 'result' || phase === 'summary';
  const prompts = publicPack?.prompts ?? [];
  const total = prompts.length || CONFIG.promptsPerDive;
  const currentPrompt = prompts[promptIndex];
  const promptSeconds = publicPack?.promptSeconds ?? CONFIG.promptSeconds;
  const zone = zoneForDepth(phase === 'lobby' ? 0 : run.depthMeters);

  const validCount = run.results.filter((r) => r.points > 0).length;
  const rarest = run.results.reduce<PromptResult | null>((best, r) => {
    if (r.points <= 0) return best;
    if (!best || r.points > best.points) return r;
    return best;
  }, null);

  const loadDaily = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    recordedRef.current = false;
    try {
      const qs = dateParam ? `?date=${encodeURIComponent(dateParam)}` : '';
      const res = await fetch(`/api/dive/daily${qs}`);
      if (!res.ok) throw new Error('load failed');
      const data = (await res.json()) as { date: string; practice?: boolean; pack: PublicDivePack };
      setDailyDate(data.date);
      setPractice(Boolean(data.practice));
      setPublicPack(data.pack);
      setRun(createEmptyRun(packMeta(data.pack)));
      setPhase('lobby');
      setPromptIndex(0);
      setAnswer('');
      setLastResult(null);
      setConfirmQuit(false);
      lockedRef.current = false;
    } catch {
      setLoadError('Could not load Daily Dive. Try again.');
    } finally {
      setLoading(false);
    }
  }, [dateParam]);

  useEffect(() => {
    void loadDaily();
  }, [loadDaily]);

  // Record board + streak once when a non-practice dive completes
  useEffect(() => {
    if (phase !== 'summary' || !dailyDate || practice || recordedRef.current) return;
    recordedRef.current = true;
    const top = run.results.reduce<PromptResult | null>((best, r) => {
      if (r.points <= 0) return best;
      if (!best || r.points > best.points) return r;
      return best;
    }, null);
    submitBoardEntry({
      date: dailyDate,
      score: run.score,
      depthMeters: run.depthMeters,
      validCount: run.results.filter((r) => r.points > 0).length,
      total: run.results.length,
      rarest: top?.acceptedLabel ?? null,
    });
  }, [phase, dailyDate, practice, run]);

  const beginDescent = async () => {
    if (!publicPack) return;
    await audio.unlock();
    audio.sfxDive();
    void audio.startMusic();
    setRun(createEmptyRun(packMeta(publicPack)));
    setPromptIndex(0);
    setAnswer('');
    setLastResult(null);
    setConfirmQuit(false);
    lockedRef.current = false;
    setSecondsLeft(promptSeconds);
    setPhase('prompt');
    viewportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

      try {
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
        }
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

  const shareResults = async () => {
    const text = `KrillionPro Daily Dive #${publicPack?.diveNumber ?? '—'} — ${run.score} pts · ${formatDepth(run.depthMeters)} · ${validCount}/${total} landed${rarest?.acceptedLabel ? ` · rarest: ${rarest.acceptedLabel}` : ''}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'KrillionPro Daily Dive', text, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
        setShareNote('Copied to clipboard');
        window.setTimeout(() => setShareNote(null), 2000);
      }
    } catch {
      /* user cancelled share */
    }
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
          loading today&apos;s challenge…
        </p>
      </div>
    );
  }

  if (loadError || !publicPack) {
    return (
      <div className="relative flex min-h-[40vh] flex-col items-center justify-center gap-4 bg-[#040816] px-4 py-20">
        <DailyDiveAtmosphere variant="page" />
        <p className={`${bodyFont.className} relative z-10 text-slate-300`}>{loadError ?? 'Daily Dive unavailable.'}</p>
        <button
          type="button"
          onClick={() => void loadDaily()}
          className={`${bodyFont.className} relative z-10 rounded-xl border border-cyan-400/40 px-4 py-2 text-cyan-100`}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative isolate bg-[#040816] text-white">
      <DailyDiveAtmosphere variant="page" priority />

      <div className="relative z-10">
        <GamePageIntro
          tone="ocean"
          activeId="daily"
          title="Daily Krillion: One Shared Dive for Everyone"
          description="Eight questions. Twenty seconds each. Rare answers take you deeper. Play today’s Daily Dive, then keep going in Unlimited."
        />

        {/* Hero — today's challenge */}
        {phase === 'lobby' && (
          <section className="mx-auto w-full max-w-6xl px-4 pb-6 text-center sm:px-6 lg:px-8">
            <p className={`${pixelFont.className} text-[9px] tracking-[0.22em] text-cyan-300`}>
              {practice ? 'ARCHIVE PRACTICE' : "TODAY'S CHALLENGE"}
            </p>
            <p className={`${pixelFont.className} mt-2 text-[10px] tracking-wider text-slate-400`}>
              {formatDailyDate(dailyDate)}
            </p>
            <h2
              className={`${displayFont.className} mt-4 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl`}
            >
              The Daily Dive
            </h2>
            <p className={`${pixelFont.className} mt-3 text-[10px] tracking-[0.18em] text-fuchsia-300`}>
              HOW DEEP CAN YOU GO?
            </p>
            <p className={`${bodyFont.className} mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base`}>
              Eight questions. Twenty seconds each. Rare answers take you deeper.
              {practice ? ' Practice mode — scores do not replace today’s board.' : ''}
            </p>

            <dl className="mx-auto mt-8 grid max-w-lg grid-cols-3 gap-3">
              {[
                { label: 'Questions', value: String(CONFIG.promptsPerDive).padStart(2, '0') },
                { label: 'Per question', value: `${CONFIG.promptSeconds}s` },
                { label: 'Rare answers', value: '∞' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-cyan-400/25 bg-[#07122b]/70 px-3 py-4 backdrop-blur-sm"
                >
                  <dt className={`${bodyFont.className} text-[11px] uppercase tracking-wide text-slate-400`}>
                    {stat.label}
                  </dt>
                  <dd className={`${pixelFont.className} mt-2 text-xl text-cyan-200 sm:text-2xl`}>{stat.value}</dd>
                </div>
              ))}
            </dl>

            <p className={`${bodyFont.className} mt-6 text-sm text-slate-400`}>
              One shared daily challenge for everyone · Dive #{publicPack.diveNumber}
            </p>
          </section>
        )}

        {/* Game viewport */}
        <div ref={viewportRef} className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 pb-10 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border-2 border-cyan-400/35 bg-[#07122b]/88 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
            <DailyDiveAtmosphere variant="viewport" />

            {playing && (
              <div className="relative z-20 flex items-start justify-between gap-3 p-3 sm:p-4">
                <div className="space-y-2">
                  <div className="rounded-lg border border-white/15 bg-black/55 px-3 py-2 backdrop-blur-sm">
                    <p className={`${pixelFont.className} text-[7px] tracking-wider text-slate-400`}>YOUR DEPTH</p>
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
                    DAILY DIVE #{publicPack.diveNumber}
                  </p>
                  <p className={`${pixelFont.className} mt-1 text-[7px] tracking-wider text-pink-300`}>
                    QUESTION {Math.min(promptIndex + 1, total)} / {total}
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

                <div className="flex flex-col items-end gap-1.5">
                  {phase === 'prompt' && (
                    <div className="rounded-lg border border-white/15 bg-black/55 px-3 py-2 text-right backdrop-blur-sm">
                      <p className={`${pixelFont.className} text-[7px] tracking-wider text-slate-400`}>
                        TIME REMAINING
                      </p>
                      <p
                        className={`${pixelFont.className} mt-1 text-[11px] ${
                          secondsLeft <= 5 ? 'text-pink-300' : 'text-cyan-200'
                        }`}
                      >
                        00:{String(secondsLeft).padStart(2, '0')}
                      </p>
                    </div>
                  )}
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
              </div>
            )}

            <div className="relative z-10 flex min-h-[28rem] flex-col px-4 pb-4 sm:min-h-[32rem] sm:px-6">
              {phase === 'lobby' && (
                <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
                  <button
                    type="button"
                    onClick={() => void beginDescent()}
                    className={`${bodyFont.className} inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border-2 border-[#e9d5ff] bg-gradient-to-r from-[#6d28d9] via-[#3730a3] to-[#0e7490] px-10 py-4 text-lg font-bold tracking-wide text-white shadow-[0_0_32px_rgba(192,132,252,0.45)] transition-transform hover:-translate-y-0.5`}
                  >
                    START TODAY&apos;S CHALLENGE ↓
                  </button>

                  <div className="mt-5 flex gap-2">
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

                  <p className={`${bodyFont.className} mt-6 text-sm text-slate-400`}>
                    Prefer endless play?{' '}
                    <Link href="/unlimited-krillion" className="font-semibold text-cyan-300 hover:underline">
                      Unlimited Mode
                    </Link>{' '}
                    stays separate — new sets anytime.
                  </p>
                </div>
              )}

              {phase === 'prompt' && currentPrompt && (
                <div className="flex flex-1 flex-col">
                  <div className="flex flex-1 flex-col items-center justify-center py-4">
                    <div className="w-full max-w-xl rounded-2xl border-2 border-[#c4b5fd]/45 bg-[#070f24]/88 px-5 py-7 text-center shadow-[0_16px_40px_rgba(2,6,23,0.55)] backdrop-blur-sm sm:px-8">
                      <p className={`${pixelFont.className} text-[8px] tracking-wider text-pink-300`}>
                        QUESTION {promptIndex + 1} / {total}
                      </p>
                      <h2
                        className={`${pixelFont.className} mt-4 text-[clamp(1rem,3.5vw,1.5rem)] leading-snug text-white`}
                      >
                        {currentPrompt.prompt}
                      </h2>
                      <p className={`${bodyFont.className} mt-4 text-xs text-slate-400 sm:text-sm`}>
                        Think beyond the obvious. Unusual valid answers earn more points.
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
                    <TimerRing seconds={secondsLeft} max={promptSeconds} />
                    <input
                      ref={inputRef}
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      disabled={processing}
                      placeholder="Type your answer…"
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
                      {processing ? '…' : 'SUBMIT'}
                    </button>
                  </form>
                </div>
              )}

              {phase === 'result' && lastResult && (
                <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                  {lastResult.points > 0 ? (
                    <>
                      <p className={`${pixelFont.className} text-[9px] tracking-[0.2em] text-emerald-300`}>
                        VALID ANSWER!
                      </p>
                      <h2
                        className={`${pixelFont.className} mt-3 text-[clamp(1.25rem,4vw,2rem)] text-white [text-shadow:2px_0_0_#7c3aed,-2px_0_0_#22d3ee]`}
                      >
                        {lastResult.acceptedLabel}
                      </h2>
                      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                        <div className="rounded-xl border border-fuchsia-400/30 bg-black/40 px-4 py-3">
                          <p className={`${pixelFont.className} text-[7px] tracking-wider text-slate-400`}>
                            ANSWER RARITY
                          </p>
                          <p className={`${pixelFont.className} mt-1 text-sm text-fuchsia-300`}>
                            {lastResult.tierLabel}
                          </p>
                        </div>
                        <div className="rounded-xl border border-cyan-400/30 bg-black/40 px-4 py-3">
                          <p className={`${pixelFont.className} text-[7px] tracking-wider text-slate-400`}>
                            POINTS EARNED
                          </p>
                          <p className={`${bodyFont.className} mt-1 text-xl font-bold text-cyan-300`}>
                            +{lastResult.points}
                          </p>
                        </div>
                      </div>
                      <p className={`${pixelFont.className} mt-6 text-[10px] tracking-wider text-cyan-200`}>
                        YOU DIVE DEEPER!
                      </p>
                      <p className={`${bodyFont.className} mt-2 max-w-sm text-sm text-slate-400`}>
                        Your unusual answer takes you further into the ocean — depth{' '}
                        {formatDepth(run.depthMeters)}.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className={`${pixelFont.className} text-[clamp(1.1rem,3.5vw,1.6rem)] text-slate-200`}>
                        NOTHING LANDED
                      </h2>
                      <p className={`${bodyFont.className} mt-3 text-lg font-bold text-slate-400`}>+0 PTS</p>
                      <p className={`${bodyFont.className} mt-2 text-sm text-slate-500`}>
                        {lastResult.timedOut ? 'Time ran out.' : 'That answer did not catch — try rarer next time.'}
                      </p>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={onContinue}
                    className={`${bodyFont.className} mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-cyan-300/60 bg-[#07122b]/90 px-8 py-3 text-base font-bold text-white`}
                  >
                    {run.results.length >= total ? 'SEE RESULTS →' : 'NEXT QUESTION →'}
                  </button>
                </div>
              )}

              {phase === 'summary' && (
                <div className="flex flex-1 flex-col py-6">
                  <div className="text-center">
                    <p className={`${pixelFont.className} text-[8px] tracking-[0.18em] text-cyan-300`}>
                      DAILY DIVE COMPLETE
                    </p>
                    <h2 className={`${pixelFont.className} mt-2 text-[clamp(1.2rem,4vw,1.75rem)] text-white`}>
                      TODAY&apos;S RESULTS
                    </h2>
                  </div>

                  <dl className="mx-auto mt-6 grid w-full max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { label: 'Total score', value: `${run.score}` },
                      { label: 'Final depth', value: formatDepth(run.depthMeters) },
                      { label: 'Valid answers', value: `${validCount}/${total}` },
                      {
                        label: 'Rarest answer',
                        value: rarest?.acceptedLabel ?? '—',
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-center"
                      >
                        <dt className={`${pixelFont.className} text-[6px] tracking-wider text-slate-500`}>
                          {item.label.toUpperCase()}
                        </dt>
                        <dd className={`${bodyFont.className} mt-1 text-sm font-bold text-cyan-100`}>{item.value}</dd>
                      </div>
                    ))}
                  </dl>

                  {rarest && (
                    <p className={`${bodyFont.className} mt-4 text-center text-sm text-slate-400`}>
                      Best of your dive:{' '}
                      <span className="font-semibold text-fuchsia-300">
                        {rarest.acceptedLabel} ({rarest.tierLabel})
                      </span>
                    </p>
                  )}

                  <ul className="mt-6 max-h-[32vh] space-y-2 overflow-y-auto pr-1">
                    {run.results.map((r, i) => (
                      <li
                        key={`${r.promptId}-${i}`}
                        className="rounded-xl border border-white/10 bg-[#07122b]/75 px-3 py-2.5 text-left"
                      >
                        <p className={`${pixelFont.className} text-[7px] text-slate-500`}>QUESTION {i + 1}</p>
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
                            <span className="text-slate-500">Miss / pass · +0</span>
                          )}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col items-center gap-3 pt-6">
                    <button
                      type="button"
                      onClick={() => void shareResults()}
                      className={`${bodyFont.className} inline-flex min-h-12 w-full max-w-sm items-center justify-center rounded-2xl border-2 border-cyan-300/50 bg-[#07122b]/90 px-8 py-3 text-base font-bold text-white`}
                    >
                      Share results
                    </button>
                    {shareNote && (
                      <p className={`${bodyFont.className} text-xs text-emerald-300`}>{shareNote}</p>
                    )}
                    <Link
                      href="/unlimited-krillion"
                      className={`${bodyFont.className} inline-flex min-h-12 w-full max-w-sm items-center justify-center rounded-2xl border-2 border-[#e9d5ff] bg-gradient-to-r from-[#6d28d9] via-[#3730a3] to-[#0e7490] px-8 py-3 text-base font-bold text-white`}
                    >
                      Play Unlimited
                    </Link>
                    <p className={`${bodyFont.className} text-center text-xs text-slate-500`}>
                      {practice
                        ? 'Practice complete — return to today’s dive for the live board.'
                        : 'Score posted to today’s device leaderboard · streak updated. Come back tomorrow for a new shared dive.'}
                    </p>
                    {practice && (
                      <Link
                        href="/daily-challenge"
                        className={`${bodyFont.className} text-sm font-semibold text-cyan-300 hover:underline`}
                      >
                        Back to today’s challenge →
                      </Link>
                    )}
                    <a
                      href="#todays-leaderboard"
                      className={`${bodyFont.className} text-sm text-slate-400 hover:text-cyan-300`}
                    >
                      View leaderboard ↓
                    </a>
                    <button
                      type="button"
                      onClick={quitToLobby}
                      className={`${bodyFont.className} text-sm text-slate-400 hover:text-cyan-300`}
                    >
                      Back to lobby
                    </button>
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
