'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { Music, Timer, Volume2, VolumeX } from 'lucide-react';
import GamePageIntro from '@/components/game/GamePageIntro';
import FarflungAtmosphere from '@/components/farflung/FarflungAtmosphere';
import { useDiveAudio } from '@/hooks/useDiveAudio';
import { bodyFont, pixelFont } from '@/lib/fonts';
import { applyResult, createEmptyRun } from '@/lib/dive/engine';
import {
  FARFLUNG_CONFIG,
  FF_TIER_LABELS,
  rareAnswerBonus,
  ffMeterFromTier,
  streakBonus,
  explorationRankForRun,
} from '@/lib/dive/farflung';
import type { DivePhase, DiveRun, PromptResult, PublicDivePack, TierId } from '@/lib/dive/types';
import { cn } from '@/lib/utils';

type BonusBreakdown = {
  base: number;
  rareBonus: number;
  streakBonus: number;
  streakLength: number;
};

function HudChip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'ff-hud-chip bg-black/75 px-4 py-2 backdrop-blur-sm sm:px-5 sm:py-2.5',
        className
      )}
    >
      {children}
    </div>
  );
}

function RarityMeter({ tier }: { tier: TierId | null }) {
  const fill = ffMeterFromTier(tier);
  const pct = Math.round(fill * 100);
  return (
    <div className="ff-meter-frame flex flex-col items-center gap-2.5 bg-black/70 px-3 py-3.5 backdrop-blur-sm">
      <div className="relative h-40 w-3.5">
        <span
          aria-hidden="true"
          className="absolute -left-[11px] z-10 h-0 w-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-white drop-shadow-[0_0_4px_rgba(255,255,255,0.85)] transition-[bottom] duration-500"
          style={{ bottom: `calc(${Math.max(pct, 4)}% - 5px)` }}
        />
        <div className="relative h-full w-full overflow-hidden rounded-sm bg-black/80">
          <div
            className="absolute bottom-0 left-0 right-0 transition-[height] duration-500"
            style={{
              height: `${pct}%`,
              background:
                'linear-gradient(to top, #22d3ee, #f97316, #eab308, #22c55e, #06b6d4, #a855f7)',
            }}
          />
        </div>
      </div>
      <p
        className={`${pixelFont.className} max-w-[5.5rem] text-center text-[7px] leading-tight text-white`}
      >
        {tier ? FF_TIER_LABELS[tier] : 'Rarity Meter'}
      </p>
    </div>
  );
}

export default function FarflungDiveGame() {
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
  const [secondsLeft, setSecondsLeft] = useState<number>(FARFLUNG_CONFIG.promptSeconds);
  const [lastResult, setLastResult] = useState<PromptResult | null>(null);
  const [lastBonus, setLastBonus] = useState<BonusBreakdown | null>(null);
  const [hitStreak, setHitStreak] = useState(0);
  const [meterTier, setMeterTier] = useState<TierId | null>(null);
  const [processing, setProcessing] = useState(false);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lockedRef = useRef(false);

  const audio = useDiveAudio();
  const playing = phase === 'prompt' || phase === 'result' || phase === 'summary';

  const prompts = publicPack?.prompts ?? [];
  const total = prompts.length || FARFLUNG_CONFIG.promptsPerDive;
  const currentPrompt = prompts[promptIndex];
  const promptSeconds = publicPack?.promptSeconds ?? FARFLUNG_CONFIG.promptSeconds;
  const finalRank = explorationRankForRun(run.score, total);

  const loadPack = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch('/api/dive/farflung');
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
      setMeterTier(null);
      setConfirmQuit(false);
      lockedRef.current = false;
    } catch {
      setLoadError('Could not load Farflung. Try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPack();
  }, [loadPack]);

  const beginChallenge = async () => {
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
    setMeterTier(null);
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
      const tier = baseResult.tier;

      if (base > 0 && tier) {
        nextStreak = hitStreak + 1;
        sBonus = streakBonus(nextStreak);
        rBonus = rareAnswerBonus(base);
        baseResult = {
          ...baseResult,
          tierLabel: FF_TIER_LABELS[tier],
        };
      } else {
        nextStreak = 0;
      }

      const totalPoints = base + rBonus + sBonus;
      const result: PromptResult = { ...baseResult, points: totalPoints };

      if (totalPoints > 0) audio.sfxHit();
      else audio.sfxMiss();

      window.setTimeout(() => {
        setHitStreak(nextStreak);
        setMeterTier(tier);
        setLastBonus({
          base,
          rareBonus: rBonus,
          streakBonus: sBonus,
          streakLength: nextStreak,
        });
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
    void beginChallenge();
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

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');

  if (loading) {
    return (
      <div className="relative flex min-h-[40vh] items-center justify-center bg-[#0a0618] py-20 text-fuchsia-200">
        <FarflungAtmosphere variant="page" priority />
        <p className={`${bodyFont.className} relative z-10 text-sm`}>Charting the course…</p>
      </div>
    );
  }

  if (loadError || !publicPack) {
    return (
      <div className="relative flex min-h-[40vh] flex-col items-center justify-center gap-4 bg-[#0a0618] px-4 py-20">
        <FarflungAtmosphere variant="page" />
        <p className={`${bodyFont.className} relative z-10 text-slate-300`}>
          {loadError ?? 'Unavailable.'}
        </p>
        <button
          type="button"
          onClick={() => void loadPack()}
          className={`${bodyFont.className} relative z-10 rounded-xl border border-fuchsia-400/50 px-4 py-2 text-fuchsia-100`}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div id="ff-play" className="relative isolate scroll-mt-20 bg-[#0a0618] text-white">
      <FarflungAtmosphere variant="page" priority />

      <div className="relative z-10">
        <GamePageIntro
          tone="cosmic"
          activeId="farflung"
          title="Play Farflung Online"
          description="Think beyond the familiar. Discover the extraordinary. An original cosmic rare-answer exploration challenge — seven rounds, rarity scoring, and a final Farflung rank."
        />

        <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border-2 border-fuchsia-400/50 bg-[#12082a]/75 shadow-[0_0_48px_rgba(168,85,247,0.25)]">
            <FarflungAtmosphere variant="viewport" />

            {/* Top HUD — Round / Timer / Score (mock layout) + controls */}
            {playing && (
              <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 px-3 pt-3 sm:px-5 sm:pt-4">
                <HudChip>
                  <p className={`${pixelFont.className} text-[9px] tracking-wide text-white sm:text-[10px]`}>
                    Round {Math.min(promptIndex + 1, total)} of {total}
                  </p>
                </HudChip>

                <HudChip>
                  <p
                    className={cn(
                      `${pixelFont.className} flex items-center gap-1.5 text-[9px] tracking-wide tabular-nums text-white sm:text-[10px]`,
                      secondsLeft <= 5 && 'text-pink-300'
                    )}
                  >
                    <Timer className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden="true" />
                    {mm}:{ss}
                  </p>
                </HudChip>

                <div className="flex items-center gap-2">
                  <HudChip>
                    <p className={`${pixelFont.className} text-[9px] tracking-wide text-white sm:text-[10px]`}>
                      Score: <span className="text-amber-300">{run.score}</span>
                    </p>
                  </HudChip>
                  <button
                    type="button"
                    aria-label={audio.soundOn ? 'Mute sound' : 'Unmute sound'}
                    onClick={() => {
                      audio.setSoundOn(!audio.soundOn);
                      audio.sfxClick();
                    }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-fuchsia-400/40 bg-black/55 text-white hover:border-fuchsia-300/70"
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
                      'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-fuchsia-400/40 bg-black/55 hover:border-cyan-300/50',
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
                    className={`${pixelFont.className} inline-flex h-9 items-center rounded-lg border border-fuchsia-400/40 bg-black/55 px-2.5 text-[7px] text-white hover:border-fuchsia-300/60`}
                  >
                    {confirmQuit ? 'SURE?' : 'QUIT'}
                  </button>
                </div>
              </div>
            )}

            <div className="relative z-10 flex min-h-[28rem] flex-col px-4 pb-4 sm:min-h-[32rem] sm:px-6">
              {phase === 'lobby' && (
                <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-12 text-center">
                  <div className="ff-question-card w-full max-w-xl rounded-md px-6 py-10 backdrop-blur-md sm:px-10">
                    <p
                      className={`${pixelFont.className} text-[8px] tracking-[0.18em] text-fuchsia-300`}
                    >
                      COSMIC EXPLORATION
                    </p>
                    <h2
                      className={`${pixelFont.className} mt-3 text-[clamp(1.1rem,3.8vw,1.85rem)] leading-tight text-white [text-shadow:3px_0_0_#6b21a8,-2px_0_0_#22d3ee,0_0_28px_rgba(217,70,239,0.4)]`}
                    >
                      EXPLORE THE UNKNOWN
                    </h2>
                    <p
                      className={`${bodyFont.className} mt-4 text-sm leading-relaxed text-slate-300 sm:text-base`}
                    >
                      Distant worlds. Lost places. Unexpected finds. Seven exploration rounds —
                      uncommon accepted answers earn more.
                    </p>
                    <dl className="mx-auto mt-6 grid max-w-md grid-cols-3 gap-2">
                      {[
                        { label: 'Rounds', value: String(FARFLUNG_CONFIG.promptsPerDive) },
                        { label: 'Seconds', value: String(FARFLUNG_CONFIG.promptSeconds) },
                        { label: 'Goal', value: 'Rarity' },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="ff-hud-chip bg-black/55 px-2 py-3"
                        >
                          <dt
                            className={`${bodyFont.className} text-[10px] font-semibold uppercase tracking-wide text-slate-400`}
                          >
                            {stat.label}
                          </dt>
                          <dd
                            className={`${pixelFont.className} mt-1 text-sm text-fuchsia-200`}
                          >
                            {stat.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <button
                      type="button"
                      onClick={() => void beginChallenge()}
                      className={`${bodyFont.className} ff-submit-pill mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-b from-fuchsia-500 via-violet-600 to-purple-800 px-10 py-3.5 text-base font-bold text-white`}
                    >
                      Play Now
                    </button>
                    <div className="mt-4 flex justify-center gap-2">
                      <button
                        type="button"
                        aria-label="Toggle sound"
                        onClick={() => audio.setSoundOn(!audio.soundOn)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/40"
                      >
                        {audio.soundOn ? (
                          <Volume2 className="h-4 w-4" />
                        ) : (
                          <VolumeX className="h-4 w-4" />
                        )}
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
                </div>
              )}

              {phase === 'prompt' && currentPrompt && (
                <div className="relative z-10 grid flex-1 grid-cols-[auto_1fr] items-center gap-3 py-5 sm:gap-5 sm:py-8">
                  <div className="flex flex-col items-center gap-2 self-center pl-1 sm:pl-2">
                    <RarityMeter tier={meterTier} />
                    {hitStreak > 1 ? (
                      <p
                        className={`${bodyFont.className} text-[10px] font-bold uppercase tracking-wide text-fuchsia-200`}
                      >
                        Streak ×{hitStreak}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-col items-center justify-center gap-4 pr-1 sm:pr-4">
                    <div className="ff-question-card w-full max-w-xl rounded-md px-5 py-8 text-center backdrop-blur-sm sm:px-8 sm:py-10">
                      <h2
                        className={`${pixelFont.className} text-[clamp(1rem,3.5vw,1.45rem)] leading-snug text-white`}
                      >
                        {currentPrompt.prompt}
                      </h2>
                    </div>

                    <form
                      className="flex w-full max-w-xl flex-col items-center gap-3"
                      onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                      }}
                    >
                      <input
                        ref={inputRef}
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        disabled={processing}
                        placeholder="Type your answer..."
                        aria-label="Your answer"
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        className={`${bodyFont.className} ff-answer-field min-h-12 w-full rounded-full bg-black/70 px-5 text-base text-white outline-none placeholder:italic placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-300/40`}
                      />
                      <div className="flex w-full max-w-md items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={onPass}
                          disabled={processing}
                          className={`${bodyFont.className} min-h-11 rounded-full border border-white/20 bg-black/45 px-5 text-sm font-bold text-slate-200 disabled:opacity-40`}
                        >
                          Pass
                        </button>
                        <button
                          type="submit"
                          disabled={!answer.trim() || processing}
                          className={`${bodyFont.className} ff-submit-pill min-h-12 flex-1 rounded-full bg-gradient-to-b from-fuchsia-500 via-violet-600 to-purple-800 px-8 text-base font-bold text-white disabled:opacity-40`}
                        >
                          {processing ? '…' : 'Submit Answer'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {phase === 'result' && lastResult && (
                <div className="grid flex-1 grid-cols-[auto_1fr] items-center gap-3 py-8 sm:gap-5">
                  <div className="pl-1 sm:pl-2">
                    <RarityMeter tier={meterTier} />
                  </div>
                  <div className="flex flex-col items-center justify-center pr-2 text-center sm:pr-4">
                    <div className="ff-question-card w-full max-w-lg rounded-md px-6 py-8 backdrop-blur-sm">
                      {lastResult.points > 0 ? (
                        <>
                          <p
                            className={`${bodyFont.className} text-xs font-bold uppercase tracking-[0.18em] text-cyan-300`}
                          >
                            {lastResult.tierLabel}
                          </p>
                          <h2
                            className={`${pixelFont.className} mt-3 text-[clamp(1.2rem,4vw,1.85rem)] text-white`}
                          >
                            {lastResult.acceptedLabel}
                          </h2>
                          <p
                            className={`${bodyFont.className} mt-3 text-xl font-bold text-amber-300`}
                          >
                            +{lastResult.points} PTS
                          </p>
                          {lastBonus &&
                          (lastBonus.rareBonus > 0 || lastBonus.streakBonus > 0) ? (
                            <p className={`${bodyFont.className} mt-2 text-xs text-slate-400`}>
                              base {lastBonus.base}
                              {lastBonus.rareBonus > 0
                                ? ` · rare +${lastBonus.rareBonus}`
                                : ''}
                              {lastBonus.streakBonus > 0
                                ? ` · streak ×${lastBonus.streakLength} +${lastBonus.streakBonus}`
                                : ''}
                            </p>
                          ) : null}
                        </>
                      ) : (
                        <>
                          <h2
                            className={`${pixelFont.className} text-[clamp(1.1rem,3.5vw,1.6rem)] text-slate-200`}
                          >
                            Nothing landed
                          </h2>
                          <p
                            className={`${bodyFont.className} mt-3 text-lg font-bold text-slate-400`}
                          >
                            +0 PTS
                          </p>
                          <p className={`${bodyFont.className} mt-2 text-sm text-slate-500`}>
                            {lastResult.timedOut
                              ? 'The countdown won. Streak reset.'
                              : 'That answer did not catch. Streak reset.'}
                          </p>
                        </>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={onContinue}
                      className={`${bodyFont.className} ff-submit-pill mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-b from-fuchsia-500 via-violet-600 to-purple-800 px-8 text-base font-bold text-white`}
                    >
                      {run.results.length >= total ? 'See Results' : 'Next Round'}
                    </button>
                  </div>
                </div>
              )}

              {phase === 'summary' && (
                <div className="flex flex-1 flex-col py-6">
                  <div className="text-center">
                    <p
                      className={`${pixelFont.className} text-[8px] tracking-[0.18em] text-fuchsia-300`}
                    >
                      Challenge complete
                    </p>
                    <h2
                      className={`${pixelFont.className} mt-2 text-[clamp(1.1rem,3.5vw,1.6rem)] leading-tight text-white [text-shadow:3px_0_0_#6b21a8,-2px_0_0_#22d3ee]`}
                    >
                      {finalRank.title}
                    </h2>
                    <p className={`${bodyFont.className} mt-2 text-sm text-slate-300`}>
                      {finalRank.blurb}
                    </p>
                    <p className={`${bodyFont.className} mt-4 text-lg`}>
                      <span className="font-bold text-amber-300">{run.score} pts</span>
                    </p>
                  </div>

                  <ul className="mt-6 max-h-[40vh] space-y-2 overflow-y-auto pr-1">
                    {run.results.map((r, i) => (
                      <li
                        key={`${r.promptId}-${i}`}
                        className="border border-white/10 bg-black/50 px-3 py-2.5 text-left [clip-path:polygon(1%_0,99%_0,100%_18%,100%_82%,99%_100%,1%_100%,0_82%,0_18%)]"
                      >
                        <p
                          className={`${bodyFont.className} text-[10px] font-bold uppercase tracking-wide text-slate-500`}
                        >
                          Round {i + 1}
                        </p>
                        <p
                          className={`${bodyFont.className} mt-1 text-sm font-medium text-slate-200`}
                        >
                          {r.prompt}
                        </p>
                        <p className={`${bodyFont.className} mt-1 text-sm text-slate-400`}>
                          {r.acceptedLabel ? (
                            <>
                              <span className="text-white">{r.acceptedLabel}</span>
                              <span className="text-slate-500"> · </span>
                              <span className="text-cyan-300">{r.tierLabel}</span>
                              <span className="text-amber-300"> +{r.points}</span>
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
                      className={`${bodyFont.className} ff-submit-pill inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-b from-fuchsia-500 via-violet-600 to-purple-800 px-8 py-3 text-base font-bold text-white`}
                    >
                      Play Again
                    </button>
                    <Link
                      href="/one-in-a-krillion"
                      className={`${bodyFont.className} text-sm text-slate-400 hover:text-fuchsia-300`}
                    >
                      One in a Krillion
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className={`${bodyFont.className} mt-4 text-center text-sm text-slate-400`}>
            Original rare-answer exploration on{' '}
            <strong className="font-semibold text-white">KrillionPro</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
