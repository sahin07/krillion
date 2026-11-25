'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { BarChart3, Fish, Music, Smile, Volume2, VolumeX } from 'lucide-react';
import GamePageIntro from '@/components/game/GamePageIntro';
import { useDiveAudio } from '@/hooks/useDiveAudio';
import { bodyFont, pixelFont } from '@/lib/fonts';
import { cn } from '@/lib/utils';

const BG = '/puffer-party-krillion-bg.jpg';
const ROUNDS = 3;
const ROUND_SECONDS = 60;
const START_PLAYERS = 16;
const POINTS_PER_SECOND = 1;
const POINTS_PER_ELIM = 10;
const POINTS_ROUND_CLEAR = 100;
const POINTS_PARTY_SURVIVE = 250;

type Phase = 'lobby' | 'playing' | 'round_end' | 'results';

type Hex = { q: number; r: number; alive: boolean; danger: boolean };

type Puffer = {
  id: number;
  q: number;
  r: number;
  color: string;
  alive: boolean;
  isYou: boolean;
};

const HEX_DIRS = [
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
] as const;

const COLORS = ['#facc15', '#60a5fa', '#f87171', '#34d399', '#fb923c', '#c084fc', '#f472b6', '#22d3ee'];

function hexKey(q: number, r: number) {
  return `${q},${r}`;
}

function makeArena(): Hex[] {
  const cells: Hex[] = [];
  const radius = 3;
  for (let q = -radius; q <= radius; q++) {
    for (let r = -radius; r <= radius; r++) {
      if (Math.abs(q + r) > radius) continue;
      cells.push({ q, r, alive: true, danger: false });
    }
  }
  return cells;
}

function neighbors(q: number, r: number) {
  return HEX_DIRS.map(([dq, dr]) => ({ q: q + dq, r: r + dr }));
}

function hexToPixel(q: number, r: number, size: number) {
  const x = size * (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r);
  const y = size * ((3 / 2) * r);
  return { x, y };
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function spawnPuffers(hexes: Hex[]): Puffer[] {
  const spots = [...hexes].sort(() => Math.random() - 0.5);
  const youSpot = spots[0];
  const list: Puffer[] = [
    {
      id: 0,
      q: youSpot.q,
      r: youSpot.r,
      color: COLORS[0],
      alive: true,
      isYou: true,
    },
  ];
  for (let i = 1; i < START_PLAYERS; i++) {
    const spot = spots[i % spots.length];
    list.push({
      id: i,
      q: spot.q,
      r: spot.r,
      color: COLORS[i % COLORS.length],
      alive: true,
      isYou: false,
    });
  }
  return list;
}

export default function PufferPartyGame() {
  const audio = useDiveAudio();
  const [phase, setPhase] = useState<Phase>('lobby');
  const [round, setRound] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(ROUND_SECONDS);
  const [hexes, setHexes] = useState<Hex[]>(() => makeArena());
  const [puffers, setPuffers] = useState<Puffer[]>([]);
  const [message, setMessage] = useState('Don’t Fall!');
  const [score, setScore] = useState(0);
  const tickRef = useRef(0);
  const prevAliveRef = useRef(START_PLAYERS);
  const scoredRoundRef = useRef(0);
  const endSfxRef = useRef(false);

  const aliveCount = useMemo(() => puffers.filter((p) => p.alive).length, [puffers]);
  const you = puffers.find((p) => p.isYou);
  const youAlive = you?.alive ?? false;

  const hexMap = useMemo(() => {
    const m = new Map<string, Hex>();
    for (const h of hexes) m.set(hexKey(h.q, h.r), h);
    return m;
  }, [hexes]);

  const beginParty = async () => {
    await audio.unlock();
    audio.sfxDive();
    void audio.startMusic();
    const arena = makeArena();
    setHexes(arena);
    setPuffers(spawnPuffers(arena));
    setRound(1);
    setSecondsLeft(ROUND_SECONDS);
    setMessage('Don’t Fall!');
    setScore(0);
    tickRef.current = 0;
    prevAliveRef.current = START_PLAYERS;
    scoredRoundRef.current = 0;
    endSfxRef.current = false;
    setPhase('playing');
  };

  const dropHazard = useCallback(() => {
    setHexes((prev) => {
      const alive = prev.filter((h) => h.alive);
      if (alive.length <= 7) return prev;
      const pick = alive[Math.floor(Math.random() * alive.length)];
      return prev.map((h) =>
        h.q === pick.q && h.r === pick.r ? { ...h, danger: true } : h
      );
    });
  }, []);

  const resolveDanger = useCallback(() => {
    setHexes((prev) => {
      const falling = prev.filter((h) => h.danger && h.alive);
      if (!falling.length) return prev;
      const fallKeys = new Set(falling.map((h) => hexKey(h.q, h.r)));
      setPuffers((ps) =>
        ps.map((p) => {
          if (!p.alive) return p;
          if (fallKeys.has(hexKey(p.q, p.r))) {
            return { ...p, alive: false };
          }
          return p;
        })
      );
      return prev.map((h) =>
        fallKeys.has(hexKey(h.q, h.r)) ? { ...h, alive: false, danger: false } : h
      );
    });
  }, []);

  const jumpYou = () => {
    if (phase !== 'playing' || !youAlive || !you) return;
    const opts = neighbors(you.q, you.r).filter((n) => hexMap.get(hexKey(n.q, n.r))?.alive);
    if (!opts.length) return;
    audio.sfxClick();
    const next = opts[Math.floor(Math.random() * opts.length)];
    setPuffers((ps) =>
      ps.map((p) => (p.isYou ? { ...p, q: next.q, r: next.r } : p))
    );
  };

  const botStep = useCallback(() => {
    setPuffers((ps) => {
      const aliveHex = new Set(
        hexes.filter((h) => h.alive && !h.danger).map((h) => hexKey(h.q, h.r))
      );
      return ps.map((p) => {
        if (!p.alive || p.isYou) return p;
        if (Math.random() > 0.55) return p;
        const opts = neighbors(p.q, p.r).filter((n) => aliveHex.has(hexKey(n.q, n.r)));
        if (!opts.length) return p;
        const next = opts[Math.floor(Math.random() * opts.length)];
        return { ...p, q: next.q, r: next.r };
      });
    });
  }, [hexes]);

  useEffect(() => {
    if (phase !== 'playing') return;
    const id = window.setInterval(() => {
      tickRef.current += 1;
      setSecondsLeft((s) => Math.max(0, s - 1));
      setScore((prev) => prev + POINTS_PER_SECOND);
      if (tickRef.current % 3 === 0) dropHazard();
      if (tickRef.current % 4 === 0) resolveDanger();
      if (tickRef.current % 2 === 0) botStep();
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase, dropHazard, resolveDanger, botStep]);

  useEffect(() => {
    if (phase !== 'playing' || !youAlive) return;
    const dropped = prevAliveRef.current - aliveCount;
    if (dropped > 0) {
      setScore((prev) => prev + dropped * POINTS_PER_ELIM);
      audio.sfxHit();
    }
    prevAliveRef.current = aliveCount;
  }, [phase, aliveCount, youAlive, audio]);

  useEffect(() => {
    if (phase !== 'playing') return;
    const alive = puffers.filter((p) => p.alive);
    const youOut = !alive.some((p) => p.isYou);
    if (youOut) {
      if (!endSfxRef.current) {
        endSfxRef.current = true;
        audio.sfxMiss();
      }
      setMessage('You fell!');
      setPhase('results');
      return;
    }
    if (alive.length <= 1 || secondsLeft <= 0) {
      if (round >= ROUNDS) {
        if (scoredRoundRef.current < round) {
          scoredRoundRef.current = round;
          setScore((prev) => prev + POINTS_ROUND_CLEAR + POINTS_PARTY_SURVIVE);
        }
        if (!endSfxRef.current) {
          endSfxRef.current = true;
          audio.sfxHit();
        }
        setMessage(alive.some((p) => p.isYou) ? 'You survived the party!' : 'Party over');
        setPhase('results');
      } else {
        if (scoredRoundRef.current < round) {
          scoredRoundRef.current = round;
          setScore((prev) => prev + POINTS_ROUND_CLEAR);
          audio.sfxHit();
        }
        setPhase('round_end');
        setMessage(`Round ${round} clear`);
      }
    }
  }, [phase, puffers, secondsLeft, round, audio]);

  const nextRound = () => {
    audio.sfxClick();
    const arena = makeArena();
    setHexes(arena);
    setPuffers((ps) => {
      const survivors = ps.filter((p) => p.alive);
      const spots = [...arena].sort(() => Math.random() - 0.5);
      return survivors.map((p, i) => ({
        ...p,
        q: spots[i % spots.length].q,
        r: spots[i % spots.length].r,
      }));
    });
    setRound((r) => r + 1);
    setSecondsLeft(ROUND_SECONDS);
    setMessage('Don’t Fall!');
    tickRef.current = 0;
    prevAliveRef.current = aliveCount;
    setPhase('playing');
  };

  const MuteControls = ({ className }: { className?: string }) => (
    <div className={cn('flex items-center gap-1.5', className)}>
      <button
        type="button"
        aria-label={audio.soundOn ? 'Mute sound' : 'Unmute sound'}
        onClick={() => {
          audio.setSoundOn(!audio.soundOn);
          audio.sfxClick();
        }}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-sky-700/80 text-white hover:border-sky-200/60"
      >
        {audio.soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-slate-300" />}
      </button>
      <button
        type="button"
        aria-label={audio.musicOn ? 'Mute music' : 'Unmute music'}
        onClick={() => audio.setMusicEnabled(!audio.musicOn)}
        className={cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-sky-700/80 hover:border-sky-200/60',
          audio.musicOn ? 'text-amber-200' : 'text-slate-300'
        )}
      >
        <Music className="h-4 w-4" />
      </button>
    </div>
  );

  const size = 28;
  const positions = hexes.map((h) => ({ ...h, ...hexToPixel(h.q, h.r, size) }));
  const minX = Math.min(...positions.map((p) => p.x));
  const maxX = Math.max(...positions.map((p) => p.x));
  const minY = Math.min(...positions.map((p) => p.y));
  const maxY = Math.max(...positions.map((p) => p.y));
  const width = maxX - minX + size * 2.4;
  const height = maxY - minY + size * 2.4;

  return (
    <section className="relative overflow-hidden bg-[#041526] text-white">
      <div className="pointer-events-none absolute inset-0">
        <img src={BG} alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#041526]/70 via-[#041526]/55 to-[#041526]" />
      </div>

      <div className="relative z-10">
        <GamePageIntro
          tone="ocean"
          activeId="puffer-party"
          title="Puffer Party Krillion: Don’t Fall Party Mode"
          description="Jump across hex tiles, stay alive while the floor drops, and survive the rounds. KrillionPro’s own party mode — not Daily Dive trivia."
        />

        <div className="mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[1.75rem] border-2 border-sky-300/40 bg-[#062033]/85 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            {/* HUD */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2 border-b border-white/10 px-3 py-3 sm:px-5">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg">
                  <Fish className="h-5 w-5" />
                </span>
                <div>
                  <p className={`${pixelFont.className} text-[8px] tracking-wide text-sky-200`}>PUFFER PARTY</p>
                  <p className={`${bodyFont.className} text-sm font-bold text-white`}>Krillion</p>
                </div>
              </div>
              <div className="text-center">
                <p className={`${bodyFont.className} text-xs font-semibold text-white/90`}>
                  Round {round} / {ROUNDS}
                </p>
                <p className={`${pixelFont.className} mt-1 text-[11px] text-amber-200`}>{message}</p>
                <p className={`${bodyFont.className} mt-1 text-lg font-bold tabular-nums text-white`}>
                  {formatTime(secondsLeft)}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <p className={`${bodyFont.className} text-xs font-semibold text-sky-100`}>
                  Players Left: {phase === 'lobby' ? 0 : aliveCount} / {START_PLAYERS}
                </p>
                <p className={`${bodyFont.className} text-sm font-bold tabular-nums text-amber-200`}>
                  {score} pts
                </p>
                {phase !== 'lobby' && <MuteControls />}
              </div>
            </div>

            <div className="relative min-h-[420px] sm:min-h-[520px]">
              {/* Side tools */}
              <div className="absolute left-3 top-4 z-20 flex flex-col gap-2">
                {[BarChart3, Smile].map((Icon, i) => (
                  <button
                    key={i}
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/40 bg-sky-600 text-white shadow-md"
                    aria-label={i === 0 ? 'Score' : 'Emotes'}
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                ))}
              </div>

              {phase === 'lobby' && (
                <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center sm:min-h-[520px]">
                  <p className={`${pixelFont.className} text-[8px] tracking-[0.18em] text-sky-200`}>
                    PARTY MODE
                  </p>
                  <h2
                    className={`${pixelFont.className} mt-3 text-[clamp(1.2rem,4vw,2rem)] text-white [text-shadow:3px_0_0_#0369a1,-2px_0_0_#facc15]`}
                  >
                    Puffer Party Krillion
                  </h2>
                  <p className={`${bodyFont.className} mt-3 max-w-md text-sm text-sky-50/90`}>
                    {ROUNDS} rounds · jump the hexes · don’t fall when tiles drop. Score for time
                    survived, eliminations, and round clears.
                  </p>
                  <button
                    type="button"
                    onClick={() => void beginParty()}
                    className={`${bodyFont.className} mt-8 inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white bg-sky-500 px-10 py-3 text-base font-bold text-white shadow-[0_0_28px_rgba(14,165,233,0.55)]`}
                  >
                    START PARTY
                  </button>
                  <MuteControls className="mt-4 justify-center" />
                </div>
              )}

              {(phase === 'playing' || phase === 'round_end' || phase === 'results') && (
                <div className="flex flex-col items-center justify-center px-4 py-8">
                  <svg
                    viewBox={`${minX - size * 1.2} ${minY - size * 1.2} ${width} ${height}`}
                    className="h-[280px] w-full max-w-xl sm:h-[360px]"
                    role="img"
                    aria-label="Puffer Party hex arena"
                  >
                    {positions.map((h) => {
                      if (!h.alive && !h.danger) return null;
                      const pts = Array.from({ length: 6 }, (_, i) => {
                        const angle = ((60 * i - 30) * Math.PI) / 180;
                        return `${h.x + size * Math.cos(angle)},${h.y + size * Math.sin(angle)}`;
                      }).join(' ');
                      const fill = !h.alive
                        ? 'transparent'
                        : h.danger
                          ? '#f87171'
                          : ['#fbbf24', '#38bdf8', '#fb7185', '#fb923c'][
                              Math.abs(h.q + h.r * 2) % 4
                            ];
                      return (
                        <polygon
                          key={hexKey(h.q, h.r)}
                          points={pts}
                          fill={fill}
                          stroke="rgba(255,255,255,0.55)"
                          strokeWidth="2"
                          opacity={h.alive ? 1 : 0}
                        />
                      );
                    })}
                    {puffers
                      .filter((p) => p.alive)
                      .map((p) => {
                        const { x, y } = hexToPixel(p.q, p.r, size);
                        return (
                          <g key={p.id} transform={`translate(${x}, ${y})`}>
                            {p.isYou && (
                              <text
                                y={-22}
                                textAnchor="middle"
                                fill="#fff"
                                fontSize="10"
                                fontWeight="700"
                              >
                                You ▾
                              </text>
                            )}
                            <circle r="12" fill={p.color} stroke="#fff" strokeWidth="2" />
                            <circle cx="-4" cy="-2" r="2" fill="#0f172a" />
                            <circle cx="4" cy="-2" r="2" fill="#0f172a" />
                          </g>
                        );
                      })}
                  </svg>

                  {phase === 'playing' && (
                    <button
                      type="button"
                      onClick={jumpYou}
                      disabled={!youAlive}
                      className={cn(
                        bodyFont.className,
                        'mt-4 inline-flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-white bg-sky-500 text-white shadow-[0_8px_24px_rgba(2,132,199,0.55)] disabled:opacity-40'
                      )}
                    >
                      <span className="text-2xl" aria-hidden="true">
                        ⬆
                      </span>
                      <span className="text-xs font-bold">Jump</span>
                    </button>
                  )}

                  {phase === 'round_end' && (
                    <div className="mt-4 text-center">
                      <p className={`${bodyFont.className} text-sm text-sky-100`}>
                        {aliveCount} puffers still swimming · +{POINTS_ROUND_CLEAR} pts
                      </p>
                      <p className={`${bodyFont.className} mt-1 text-base font-bold text-amber-200`}>
                        {score} pts
                      </p>
                      <button
                        type="button"
                        onClick={nextRound}
                        className={`${bodyFont.className} mt-3 rounded-full bg-amber-400 px-6 py-2.5 text-sm font-bold text-slate-900`}
                      >
                        Next round
                      </button>
                    </div>
                  )}

                  {phase === 'results' && (
                    <div className="mt-4 text-center">
                      <p className={`${pixelFont.className} text-[10px] text-amber-200`}>{message}</p>
                      <p className={`${bodyFont.className} mt-2 text-2xl font-bold tabular-nums text-white`}>
                        {score} pts
                      </p>
                      <p className={`${bodyFont.className} mt-1 text-sm text-sky-100`}>
                        Finished with {aliveCount} player{aliveCount === 1 ? '' : 's'} left
                      </p>
                      <button
                        type="button"
                        onClick={() => void beginParty()}
                        className={`${bodyFont.className} mt-4 rounded-full bg-sky-500 px-6 py-2.5 text-sm font-bold text-white`}
                      >
                        Play again
                      </button>
                      <div className="mt-3">
                        <Link
                          href="/daily-challenge"
                          className={`${bodyFont.className} text-sm text-sky-200 hover:underline`}
                        >
                          Or try Daily Dive trivia →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
