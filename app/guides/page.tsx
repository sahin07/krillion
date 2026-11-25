import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { bodyFont, pixelFont } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Krillion Guides | Scoring Tips & Fair Play | KrillionPro',
  description:
    'KrillionPro guides: Too Clever scoring tips, how rarity works, and hints for today’s dive — never spoilers.',
  keywords: [
    'krillion guides',
    'one in a krillion',
    'krillion too clever',
    'krillion answers today',
    'krillion scoring tips',
  ],
  alternates: { canonical: '/guides' },
};

const CARDS = [
  {
    href: '/one-in-a-krillion',
    title: 'One in a Krillion (play)',
    body: 'Playable rare-answer dive — seven signals, streak bonuses, final rarity rank.',
  },
  {
    href: '/guides/too-clever',
    title: 'Too Clever tips',
    body: 'What the Too Clever tier means, why clever-but-common answers stall depth, and how to dig rarer.',
  },
  {
    href: '/guides/answers-today',
    title: 'Answers today (hints only)',
    body: 'How today’s Daily Dive works — scoring, clock, fair-play hints. No answer spoilers.',
  },
] as const;

export default function GuidesIndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-[#040816] text-slate-200">
        <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <p className={`${pixelFont.className} text-[8px] uppercase tracking-[0.18em] text-cyan-300 sm:text-[9px]`}>
            Help · Fair play
          </p>
          <h1
            className={`${pixelFont.className} mt-3 text-[clamp(1.3rem,4vw,2.4rem)] leading-tight text-white [text-shadow:4px_0_0_#7c3aed,-3px_0_0_#22d3ee,0_0_28px_rgba(167,139,250,0.35)]`}
          >
            Krillion guides
          </h1>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            Short reads on scoring and today’s dive — tips only, never a dump of answers.
          </p>

          <ul className="mt-10 space-y-4">
            {CARDS.map((card) => (
              <li key={card.href}>
                <Link
                  href={card.href}
                  className="block rounded-2xl border border-white/10 bg-[#07122b]/85 p-5 transition-colors hover:border-cyan-400/40"
                >
                  <h2 className={`${pixelFont.className} text-sm leading-snug text-white sm:text-base`}>
                    {card.title}
                  </h2>
                  <p className={`${bodyFont.className} mt-2 text-sm text-slate-400`}>{card.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
