'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';
import { formatDepth } from '@/lib/dive/engine';
import {
  getBoardEntries,
  getDiverName,
  getStreak,
  hasCompletedDate,
  onDailyProgress,
  setDiverName,
  type DailyBoardEntry,
  type DailyStreakState,
} from '@/lib/dive/daily-local';
import { cn } from '@/lib/utils';

type ArchiveItem = {
  date: string;
  diveNumber: number;
  title: string;
  packId: string;
  isToday: boolean;
};

function formatLabel(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function DailyLeaderboardPanel({ date }: { date: string }) {
  const [entries, setEntries] = useState<DailyBoardEntry[]>([]);
  const [name, setName] = useState('Diver');
  const [editing, setEditing] = useState(false);

  const refresh = () => {
    setEntries(getBoardEntries(date));
    setName(getDiverName());
  };

  useEffect(() => {
    refresh();
    return onDailyProgress(refresh);
  }, [date]);

  return (
    <section id="todays-leaderboard" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <p className={`${pixelFont.className} text-[8px] tracking-[0.2em] text-cyan-300`}>TODAY&apos;S LEADERBOARD</p>
      <h2 className={`${displayFont.className} mt-2 text-2xl font-bold sm:text-3xl`}>Compare today&apos;s scores</h2>
      <p className={`${bodyFont.className} mt-3 max-w-2xl text-sm text-slate-400`}>
        Device board for {date} — finish a dive to post your best run under your diver name.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {editing ? (
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setDiverName(name);
              setEditing(false);
              refresh();
            }}
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={16}
              aria-label="Diver name"
              className={`${bodyFont.className} rounded-lg border border-cyan-400/40 bg-[#07122b] px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-cyan-400/30`}
            />
            <button
              type="submit"
              className={`${bodyFont.className} rounded-lg border border-cyan-300/50 px-3 py-2 text-sm font-semibold text-cyan-100`}
            >
              Save
            </button>
          </form>
        ) : (
          <>
            <p className={`${bodyFont.className} text-sm text-slate-300`}>
              Playing as <span className="font-semibold text-white">{name}</span>
            </p>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className={`${bodyFont.className} text-sm text-cyan-300 hover:underline`}
            >
              Change name
            </button>
          </>
        )}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#07122b]/75">
        {entries.length === 0 ? (
          <p className={`${bodyFont.className} px-5 py-10 text-center text-sm text-slate-400`}>
            No scores yet today. Complete the Daily Dive to take first place on this device.
          </p>
        ) : (
          <ol className="divide-y divide-white/10">
            {entries.slice(0, 10).map((e, i) => (
              <li key={e.id} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                <span
                  className={`${pixelFont.className} w-8 text-[10px] ${
                    i === 0 ? 'text-amber-300' : i === 1 ? 'text-slate-200' : i === 2 ? 'text-orange-300' : 'text-slate-500'
                  }`}
                >
                  #{i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`${bodyFont.className} truncate font-semibold text-white`}>{e.name}</p>
                  <p className={`${bodyFont.className} text-xs text-slate-500`}>
                    {e.validCount}/{e.total} valid
                    {e.rarest ? ` · rarest ${e.rarest}` : ''}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`${bodyFont.className} font-bold text-cyan-200`}>{e.score} pts</p>
                  <p className={`${pixelFont.className} text-[8px] text-slate-500`}>{formatDepth(e.depthMeters)}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export function DailyArchivePanel() {
  const [items, setItems] = useState<ArchiveItem[]>([]);
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/dive/daily/archive');
        if (!res.ok) return;
        const data = (await res.json()) as { items: ArchiveItem[] };
        if (!cancelled) setItems(data.items);
      } catch {
        /* ignore */
      }
    })();
    return onDailyProgress(() => {
      setDone((prev) => {
        const next = { ...prev };
        for (const key of Object.keys(next)) next[key] = hasCompletedDate(key);
        return next;
      });
    });
  }, []);

  useEffect(() => {
    const map: Record<string, boolean> = {};
    for (const it of items) map[it.date] = hasCompletedDate(it.date);
    setDone(map);
  }, [items]);

  return (
    <section id="previous-challenges" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <p className={`${pixelFont.className} text-[8px] tracking-[0.2em] text-cyan-300`}>ARCHIVE</p>
      <h2 className={`${displayFont.className} mt-2 text-2xl font-bold sm:text-3xl`}>Previous daily challenges</h2>
      <p className={`${bodyFont.className} mt-3 max-w-2xl text-sm text-slate-400`}>
        Replay older shared dives for practice. Practice runs don&apos;t replace today&apos;s competitive board.
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <li key={it.date}>
            <Link
              href={it.isToday ? '/daily-challenge' : `/daily-challenge?date=${it.date}`}
              className={cn(
                'block rounded-2xl border px-4 py-4 transition-colors',
                it.isToday
                  ? 'border-cyan-400/50 bg-cyan-500/10 hover:border-cyan-300'
                  : 'border-white/10 bg-[#07122b]/75 hover:border-cyan-400/40'
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <p className={`${pixelFont.className} text-[8px] tracking-wider text-slate-400`}>
                  {it.isToday ? 'TODAY' : 'ARCHIVE'}
                </p>
                {done[it.date] && (
                  <span className={`${pixelFont.className} text-[7px] text-emerald-300`}>DONE</span>
                )}
              </div>
              <p className={`${bodyFont.className} mt-2 font-semibold text-white`}>{formatLabel(it.date)}</p>
              <p className={`${bodyFont.className} mt-1 text-sm text-slate-400`}>
                Dive #{it.diveNumber} · {it.title}
              </p>
              <p className={`${bodyFont.className} mt-3 text-sm font-semibold text-cyan-300`}>
                {it.isToday ? 'Play today →' : 'Practice →'}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function DailyStreakPanel({ today }: { today: string }) {
  const [streak, setStreak] = useState<DailyStreakState>({ count: 0, lastDate: null, best: 0 });
  const [completedToday, setCompletedToday] = useState(false);

  const refresh = () => {
    setStreak(getStreak());
    setCompletedToday(hasCompletedDate(today));
  };

  useEffect(() => {
    refresh();
    return onDailyProgress(refresh);
  }, [today]);

  return (
    <section id="daily-streak" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <p className={`${pixelFont.className} text-[8px] tracking-[0.2em] text-cyan-300`}>STREAK</p>
      <h2 className={`${displayFont.className} mt-2 text-2xl font-bold sm:text-3xl`}>Daily streak</h2>
      <p className={`${bodyFont.className} mt-3 max-w-2xl text-sm text-slate-400`}>
        Finish today&apos;s dive each UTC day to keep the chain going. Saved on this device.
      </p>

      <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-fuchsia-400/30 bg-[#07122b]/75 px-4 py-5 text-center">
          <p className={`${pixelFont.className} text-[7px] tracking-wider text-slate-500`}>CURRENT</p>
          <p className={`${displayFont.className} mt-2 text-3xl font-bold text-fuchsia-200`}>{streak.count}</p>
          <p className={`${bodyFont.className} mt-1 text-xs text-slate-400`}>day{streak.count === 1 ? '' : 's'}</p>
        </div>
        <div className="rounded-2xl border border-cyan-400/25 bg-[#07122b]/75 px-4 py-5 text-center">
          <p className={`${pixelFont.className} text-[7px] tracking-wider text-slate-500`}>BEST</p>
          <p className={`${displayFont.className} mt-2 text-3xl font-bold text-cyan-200`}>{streak.best}</p>
          <p className={`${bodyFont.className} mt-1 text-xs text-slate-400`}>personal best</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#07122b]/75 px-4 py-5 text-center">
          <p className={`${pixelFont.className} text-[7px] tracking-wider text-slate-500`}>TODAY</p>
          <p className={`${displayFont.className} mt-2 text-3xl font-bold ${completedToday ? 'text-emerald-300' : 'text-slate-400'}`}>
            {completedToday ? '✓' : '—'}
          </p>
          <p className={`${bodyFont.className} mt-1 text-xs text-slate-400`}>
            {completedToday ? 'logged' : 'not yet'}
          </p>
        </div>
      </div>

      {!completedToday && (
        <p className={`${bodyFont.className} mt-4 text-sm text-slate-400`}>
          {streak.count > 0
            ? `You're on a ${streak.count}-day streak — finish today's dive to extend it.`
            : 'Complete today’s challenge to start or continue your streak.'}
        </p>
      )}
    </section>
  );
}
