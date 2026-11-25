import type { Metadata } from 'next';
import Link from 'next/link';
import GuideShell from '@/components/guides/GuideShell';
import { bodyFont, pixelFont } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Krillion Too Clever | Scoring Tips for Rare Answers | KrillionPro',
  description:
    'What does Too Clever mean in Krillion? Scoring tips for the Too Clever tier — why clever-but-common answers score low, and how to go rarer.',
  keywords: [
    'krillion too clever',
    'too clever krillion',
    'krillion scoring tips',
    'krillion rarity',
    'too clever tier',
  ],
  alternates: { canonical: '/guides/too-clever' },
};

const FAQS = [
  {
    q: 'What does Too Clever mean in Krillion?',
    a: 'Too Clever is a mid-low rarity tier (15 points). Your answer is valid and a bit smarter than the obvious crowd pick, but plenty of players still type it — so it barely sinks you.',
  },
  {
    q: 'Is Too Clever a bad score?',
    a: 'It is better than Plankton (10) and better than a miss (0). It is not deep. If you want trench territory, skip the clever dodge everyone else also thought of.',
  },
  {
    q: 'How do I avoid Too Clever answers?',
    a: 'Pause after the first “smart” idea. Ask for a more specific, less famous, or edge-of-the-prompt example that is still valid.',
  },
] as const;

export default function TooCleverGuidePage() {
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
        eyebrow="Too Clever"
        title="Krillion Too Clever: scoring tips"
        lead="Searching “krillion too clever”? That tier is the trap between the crowd favorite and a real deep cut — here’s how it works and how to climb past it."
      >
        <section>
          <h2 className={`${pixelFont.className} text-sm text-white sm:text-base`}>What Too Clever is</h2>
          <p className="mt-3">
            On KrillionPro, rarity is curated into tiers. <strong className="text-white">Too Clever</strong>{' '}
            sits at <strong className="text-cyan-300">15 points</strong> (about 150 m of depth) — just above{' '}
            <strong className="text-white">Plankton</strong> (10) and below <strong className="text-white">Schooler</strong>{' '}
            (30).
          </p>
          <p className="mt-3">
            The name is intentional: you found a clever angle, but a whole school of players found the same
            angle. Correct, witty, and still shallow.
          </p>
        </section>

        <section>
          <h2 className={`${pixelFont.className} text-sm text-white sm:text-base`}>Tier ladder (quick)</h2>
          <ul className="mt-4 space-y-2">
            {[
              ['Plankton', '10', 'Crowd favorite'],
              ['Too Clever', '15', 'Clever dodge everyone still typed'],
              ['Schooler', '30', 'Solid, less obvious'],
              ['Rare', '60', 'Genuinely uncommon'],
              ['Deep Cut', '85', 'Niche / hard to reach'],
              ['One in a Krillion', '100', 'Almost nobody else'],
            ].map(([name, pts, note]) => (
              <li
                key={name}
                className={`rounded-xl border px-4 py-3 ${
                  name === 'Too Clever'
                    ? 'border-fuchsia-400/40 bg-fuchsia-500/10'
                    : 'border-white/10 bg-[#07122b]/70'
                }`}
              >
                <span className="font-semibold text-white">{name}</span>
                <span className="ml-2 text-cyan-300">{pts} pts</span>
                <span className="mt-1 block text-sm text-slate-400">{note}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className={`${pixelFont.className} text-sm text-white sm:text-base`}>Why you land on Too Clever</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>You skipped the most obvious word, then stopped at the second-most obvious.</li>
            <li>You picked a “meme clever” answer that still trends in group chats.</li>
            <li>You went witty instead of specific (a famous flamingo vs a obscure species).</li>
          </ul>
        </section>

        <section>
          <h2 className={`${pixelFont.className} text-sm text-white sm:text-base`}>Tips to dig past Too Clever</h2>
          <ol className="mt-3 list-decimal space-y-3 pl-5">
            <li>
              <strong className="text-white">Burn the first two thoughts</strong> — Plankton and Too Clever often
              live there. Spend the rest of the clock on a third valid idea.
            </li>
            <li>
              <strong className="text-white">Get more specific</strong> — smaller places, rarer species, niche
              products, edge cases that still fit the prompt.
            </li>
            <li>
              <strong className="text-white">Change the frame</strong> — another country, another decade, another
              subculture. Same prompt, less crowded answer space.
            </li>
            <li>
              <strong className="text-white">Don’t confuse speed with depth</strong> — twenty seconds of thinking
              beats a three-second clever hit.
            </li>
          </ol>
        </section>

        <section>
          <h2 className={`${pixelFont.className} text-sm text-white sm:text-base`}>Practice</h2>
          <p className="mt-3">
            Run{' '}
            <Link href="/unlimited-krillion" className="font-semibold text-cyan-300 hover:underline">
              Unlimited Krillion
            </Link>{' '}
            and watch the tier label after each reveal. If you keep seeing Too Clever, you are thinking smart —
            just not rare enough yet. Today’s shared set lives on{' '}
            <Link href="/daily-challenge" className="font-semibold text-cyan-300 hover:underline">
              Daily Dive
            </Link>
            . For fair-play hints without spoilers, see{' '}
            <Link href="/guides/answers-today" className="font-semibold text-cyan-300 hover:underline">
              answers today
            </Link>
            .
          </p>
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
