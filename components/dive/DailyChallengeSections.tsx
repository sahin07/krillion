'use client';

import { useEffect, useState } from 'react';
import DailyDiveAtmosphere from '@/components/dive/DailyDiveAtmosphere';
import {
  DailyArchivePanel,
  DailyLeaderboardPanel,
  DailyStreakPanel,
} from '@/components/dive/DailyProgressPanels';
import { bodyFont, displayFont, pixelFont } from '@/lib/fonts';
import { MODE_CONFIG } from '@/lib/dive/types';
import { TIER_LABELS } from '@/lib/dive/tiers';

const CONFIG = MODE_CONFIG.daily;

const RULES = [
  `Everyone gets the same ${CONFIG.promptsPerDive} prompts each UTC day.`,
  `You have ${CONFIG.promptSeconds} seconds per question.`,
  'Only valid answers score. Rarer valid answers score more and push you deeper.',
  'Pass or time out for +0 — you still continue the dive.',
  'Daily Challenge is once-per-day shared content. Unlimited Mode is separate.',
];

const SCORING = [
  { tier: TIER_LABELS.plankton, pts: 10, blurb: 'Common — barely sinks the needle.' },
  { tier: TIER_LABELS.too_clever, pts: 15, blurb: 'Clever, but still crowded water.' },
  { tier: TIER_LABELS.schooler, pts: 30, blurb: 'Solid school — you’re going down.' },
  { tier: TIER_LABELS.rare, pts: 60, blurb: 'Rare catch — real depth.' },
  { tier: TIER_LABELS.deep_cut, pts: 85, blurb: 'Deep cut — few land this.' },
  { tier: TIER_LABELS.one_in_a_krillion, pts: 100, blurb: 'One in a Krillion territory.' },
];

const FAQ = [
  {
    q: 'Is Daily Challenge the same for everyone?',
    a: 'Yes. One shared prompt set per UTC day so scores are comparable.',
  },
  {
    q: 'Can I replay today’s dive?',
    a: 'You can practice from the archive. Today’s competitive board keeps your best score under your diver name on this device.',
  },
  {
    q: 'Where are today’s answers?',
    a: 'We don’t publish spoiler lists. Hints and scoring tips live in How scoring works — keep the dive fair.',
  },
  {
    q: 'How is Daily different from Unlimited?',
    a: 'Daily = same eight for everyone, once a day. Unlimited = new question sets whenever you want.',
  },
];

export default function DailyChallengeSections() {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/dive/daily');
        if (!res.ok) return;
        const data = (await res.json()) as { date: string };
        if (!cancelled) setToday(data.date);
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative isolate border-t border-cyan-400/15 bg-[#040816] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <DailyDiveAtmosphere variant="page" />
      </div>

      <div className="relative z-10">
        {today ? (
          <DailyLeaderboardPanel date={today} />
        ) : (
          <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <p className={`${pixelFont.className} text-[9px] text-slate-500`}>Loading leaderboard…</p>
          </section>
        )}

        <DailyArchivePanel />

        <section id="how-scoring-works" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className={`${pixelFont.className} text-[8px] tracking-[0.2em] text-cyan-300`}>SCORING</p>
          <h2 className={`${displayFont.className} mt-2 text-2xl font-bold sm:text-3xl`}>How scoring works</h2>
          <p className={`${bodyFont.className} mt-3 max-w-2xl text-sm text-slate-400`}>
            Valid answers earn points by rarity. Points become depth — rarer correct answers sink you further.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SCORING.map((row) => (
              <li key={row.tier} className="rounded-2xl border border-white/10 bg-[#07122b]/75 px-4 py-4">
                <p className={`${pixelFont.className} text-[8px] tracking-wider text-fuchsia-300`}>{row.tier}</p>
                <p className={`${bodyFont.className} mt-1 text-lg font-bold text-cyan-200`}>+{row.pts}</p>
                <p className={`${bodyFont.className} mt-2 text-sm text-slate-400`}>{row.blurb}</p>
              </li>
            ))}
          </ul>
        </section>

        {today ? <DailyStreakPanel today={today} /> : null}

        <section id="challenge-rules" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className={`${pixelFont.className} text-[8px] tracking-[0.2em] text-cyan-300`}>RULES</p>
          <h2 className={`${displayFont.className} mt-2 text-2xl font-bold sm:text-3xl`}>Challenge rules</h2>
          <ul className={`${bodyFont.className} mt-6 max-w-2xl space-y-3 text-sm text-slate-300`}>
            {RULES.map((rule) => (
              <li key={rule} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="share-challenge" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className={`${pixelFont.className} text-[8px] tracking-[0.2em] text-cyan-300`}>INVITE</p>
          <h2 className={`${displayFont.className} mt-2 text-2xl font-bold sm:text-3xl`}>Share the challenge</h2>
          <p className={`${bodyFont.className} mt-3 max-w-2xl text-sm text-slate-400`}>
            Send friends to today&apos;s shared dive. After you finish, use Share results in the game viewport for your
            score card.
          </p>
          <p
            className={`${bodyFont.className} mt-6 inline-flex rounded-xl border border-cyan-400/30 bg-[#07122b]/80 px-4 py-3 text-sm text-cyan-100`}
          >
            krillionpro.com/daily-challenge
          </p>
        </section>

        <section id="daily-faq" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-14 pb-20 sm:px-6 lg:px-8">
          <p className={`${pixelFont.className} text-[8px] tracking-[0.2em] text-cyan-300`}>FAQ</p>
          <h2 className={`${displayFont.className} mt-2 text-2xl font-bold sm:text-3xl`}>Daily Challenge FAQ</h2>
          <ul className="mt-8 max-w-3xl space-y-4">
            {FAQ.map((item) => (
              <li key={item.q} className="rounded-2xl border border-white/10 bg-[#07122b]/70 px-5 py-4">
                <h3 className={`${bodyFont.className} text-base font-semibold text-white`}>{item.q}</h3>
                <p className={`${bodyFont.className} mt-2 text-sm leading-relaxed text-slate-400`}>{item.a}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
