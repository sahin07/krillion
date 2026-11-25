import type { Metadata } from 'next';
import Link from 'next/link';
import GuideShell from '@/components/guides/GuideShell';
import { bodyFont, pixelFont } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Krillion Answers Today | Hints Only (No Spoilers) | KrillionPro',
  description:
    'Looking for Krillion answers today? We never publish spoilers. Get fair-play hints, how today’s Daily Dive scoring works, and links to play — no answer dump.',
  keywords: [
    'krillion answers today',
    'krillion answers',
    'daily krillion hints',
    'krillion today',
    'daily dive tips',
  ],
  alternates: { canonical: '/guides/answers-today' },
  robots: {
    index: true,
    follow: true,
  },
};

const FAQS = [
  {
    q: 'Where can I find Krillion answers today?',
    a: 'You will not find them on KrillionPro. We do not publish today’s answer list. Play Daily Dive and earn your own depth — that is the point of a shared daily set.',
  },
  {
    q: 'Do you post spoilers or answer dumps?',
    a: 'No. This page is hints and scoring help only. Full answer lists spoil the daily for everyone and we will not ship them.',
  },
  {
    q: 'How can I improve without spoilers?',
    a: 'Read the Too Clever guide, practice on Unlimited, and use the clock to hunt a rarer valid answer instead of the first clever one.',
  },
] as const;

function utcDateLabel(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export default function AnswersTodayGuidePage() {
  const today = utcDateLabel();

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <GuideShell
        eyebrow="Answers today"
        title="Krillion answers today — hints only"
        lead="If you searched for today’s answers, here is the honest page: no spoilers, no dump, just how the daily works and how to play fair."
      >
        <section className="rounded-2xl border border-amber-400/35 bg-amber-500/10 p-5">
          <p className={`${pixelFont.className} text-[8px] tracking-wider text-amber-300`}>ANTI-SPOILER</p>
          <p className="mt-2 text-sm sm:text-base">
            <strong className="text-white">We do not publish Krillion answers for {today} (UTC)</strong> — or any
            other day. This guide never lists today’s correct answers. Spoilers ruin the shared daily for
            everyone.
          </p>
        </section>

        <section>
          <h2 className={`${pixelFont.className} text-sm text-white sm:text-base`}>What “today” means here</h2>
          <p className="mt-3">
            <Link href="/daily-challenge" className="font-semibold text-cyan-300 hover:underline">
              Daily Dive
            </Link>{' '}
            uses one shared prompt set per <strong className="text-white">UTC calendar day</strong>. Everyone
            gets the same eight prompts and a 20-second clock. Your score and depth are comparable with friends
            who also played fair.
          </p>
        </section>

        <section>
          <h2 className={`${pixelFont.className} text-sm text-white sm:text-base`}>Fair-play hints (no answers)</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Many answers can be valid — pick uncommon correct ones for more depth.</li>
            <li>
              If the reveal says <strong className="text-white">Too Clever</strong>, you were smart but not rare —
              see the{' '}
              <Link href="/guides/too-clever" className="font-semibold text-cyan-300 hover:underline">
                Too Clever guide
              </Link>
              .
            </li>
            <li>Pass or timeout is +0; the dive continues either way.</li>
            <li>Aliases and close spellings often count when they match the bank.</li>
            <li>Want more practice without waiting for tomorrow? Use Unlimited.</li>
          </ul>
        </section>

        <section>
          <h2 className={`${pixelFont.className} text-sm text-white sm:text-base`}>How scoring works today</h2>
          <p className="mt-3">
            Same ladder every day: Plankton → Too Clever → Schooler → Rare → Deep Cut → One in a Krillion. Points
            become depth (10 metres per point). Wrong answers, blanks, and passes score zero — they never unlock
            a hidden answer list on this site.
          </p>
        </section>

        <section>
          <h2 className={`${pixelFont.className} text-sm text-white sm:text-base`}>Play instead of spoil</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/daily-challenge"
              className={`${bodyFont.className} inline-flex min-h-11 items-center justify-center rounded-2xl border-2 border-[#e9d5ff] bg-gradient-to-r from-[#6d28d9] via-[#3730a3] to-[#0e7490] px-6 py-2.5 text-sm font-bold text-white`}
            >
              Play today’s Daily Dive
            </Link>
            <Link
              href="/unlimited-krillion"
              className={`${bodyFont.className} inline-flex min-h-11 items-center justify-center rounded-2xl border border-cyan-300/50 bg-[#07122b]/85 px-6 py-2.5 text-sm font-semibold text-cyan-100`}
            >
              Practice Unlimited
            </Link>
          </div>
        </section>

        <section>
          <h2 className={`${pixelFont.className} text-sm text-white sm:text-base`}>FAQ</h2>
          <div className="mt-4 space-y-3">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="rounded-2xl border border-white/10 bg-[#07122b]/70 px-5 py-4 open:border-cyan-400/30"
              >
                <summary className={`${bodyFont.className} cursor-pointer list-none font-semibold text-white`}>
                  {item.q}
                </summary>
                <p className="mt-3 text-sm text-slate-300">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </GuideShell>
    </>
  );
}
