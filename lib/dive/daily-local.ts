/** Client-side Daily Challenge progress (streak + device leaderboard). */

export type DailyBoardEntry = {
  id: string;
  name: string;
  score: number;
  depthMeters: number;
  validCount: number;
  total: number;
  rarest: string | null;
  at: string; // ISO
  date: string; // YYYY-MM-DD UTC
};

export type DailyStreakState = {
  count: number;
  lastDate: string | null;
  best: number;
};

const NAME_KEY = 'krillion.daily.diverName';
const BOARD_KEY = 'krillion.daily.board.v1';
const STREAK_KEY = 'krillion.daily.streak.v1';
const COMPLETED_KEY = 'krillion.daily.completed.v1';

const BOARD_EVENT = 'krillion:daily-progress';

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getDiverName(): string {
  if (typeof window === 'undefined') return 'Diver';
  const n = localStorage.getItem(NAME_KEY)?.trim();
  return n && n.length > 0 ? n.slice(0, 16) : 'Diver';
}

export function setDiverName(name: string) {
  if (typeof window === 'undefined') return;
  const cleaned = name.trim().slice(0, 16) || 'Diver';
  localStorage.setItem(NAME_KEY, cleaned);
  notifyProgress();
}

export function getBoardEntries(date: string): DailyBoardEntry[] {
  if (typeof window === 'undefined') return [];
  const all = safeParse<DailyBoardEntry[]>(localStorage.getItem(BOARD_KEY), []);
  return all
    .filter((e) => e.date === date)
    .sort((a, b) => b.score - a.score || b.depthMeters - a.depthMeters || a.at.localeCompare(b.at));
}

export function submitBoardEntry(input: {
  date: string;
  score: number;
  depthMeters: number;
  validCount: number;
  total: number;
  rarest: string | null;
}): DailyBoardEntry {
  const entry: DailyBoardEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: getDiverName(),
    score: input.score,
    depthMeters: input.depthMeters,
    validCount: input.validCount,
    total: input.total,
    rarest: input.rarest,
    at: new Date().toISOString(),
    date: input.date,
  };

  const all = safeParse<DailyBoardEntry[]>(localStorage.getItem(BOARD_KEY), []);
  // Keep best run per name per day; replace if this score is higher
  const filtered = all.filter((e) => !(e.date === entry.date && e.name.toLowerCase() === entry.name.toLowerCase()));
  const prev = all.find((e) => e.date === entry.date && e.name.toLowerCase() === entry.name.toLowerCase());
  if (!prev || entry.score >= prev.score) {
    filtered.push(entry);
  } else {
    filtered.push(prev);
  }

  // Cap storage
  const trimmed = filtered.slice(-200);
  localStorage.setItem(BOARD_KEY, JSON.stringify(trimmed));
  markCompleted(input.date);
  bumpStreak(input.date);
  notifyProgress();
  return entry;
}

export function getStreak(): DailyStreakState {
  if (typeof window === 'undefined') return { count: 0, lastDate: null, best: 0 };
  return safeParse<DailyStreakState>(localStorage.getItem(STREAK_KEY), {
    count: 0,
    lastDate: null,
    best: 0,
  });
}

function prevUtcDate(date: string): string {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

function bumpStreak(date: string) {
  const cur = getStreak();
  if (cur.lastDate === date) {
    // already counted today
    localStorage.setItem(
      STREAK_KEY,
      JSON.stringify({ ...cur, best: Math.max(cur.best, cur.count) })
    );
    return;
  }

  let count = 1;
  if (cur.lastDate && cur.lastDate === prevUtcDate(date)) {
    count = cur.count + 1;
  }

  const next: DailyStreakState = {
    count,
    lastDate: date,
    best: Math.max(cur.best, count),
  };
  localStorage.setItem(STREAK_KEY, JSON.stringify(next));
}

function markCompleted(date: string) {
  const set = new Set(safeParse<string[]>(localStorage.getItem(COMPLETED_KEY), []));
  set.add(date);
  localStorage.setItem(COMPLETED_KEY, JSON.stringify([...set].slice(-90)));
}

export function hasCompletedDate(date: string): boolean {
  if (typeof window === 'undefined') return false;
  const set = new Set(safeParse<string[]>(localStorage.getItem(COMPLETED_KEY), []));
  return set.has(date);
}

export function notifyProgress() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(BOARD_EVENT));
}

export function onDailyProgress(cb: () => void) {
  if (typeof window === 'undefined') return () => undefined;
  window.addEventListener(BOARD_EVENT, cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(BOARD_EVENT, cb);
    window.removeEventListener('storage', cb);
  };
}
