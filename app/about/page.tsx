import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LegalPageNav from '@/components/LegalPageNav';
import { bodyFont, displayFont } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'About The Krillion Game | KrillionPro',
  description:
    'What is Krillion? About KrillionPro — free rare-answer trivia in the browser. Daily Krillion, Unlimited, and themed games. Independent site at krillionpro.com.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-[#040816]">
        <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <p
            className={`${displayFont.className} text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300`}
          >
            About
          </p>
          <h1 className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}>
            About the Krillion game on KrillionPro
          </h1>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            A small, independent home for the Krillion game — rare-answer trivia where uncommon
            correct answers sink you deeper.
          </p>

          <div className={`${bodyFont.className} mt-10 space-y-6 text-base leading-relaxed text-slate-300`}>
            <section>
              <h2 className={`${displayFont.className} text-xl font-bold text-white`}>What is Krillion?</h2>
              <p className="mt-3">
                In short: a browser trivia format where many answers can be correct, and rarer valid
                picks beat crowd favorites. KrillionPro hosts that format as Daily Dive, Unlimited
                practice, and themed packs — free, no install.
              </p>
            </section>

            <section>
              <h2 className={`${displayFont.className} text-xl font-bold text-white`}>What this site is</h2>
              <p className="mt-3">
                KrillionPro is a free browser games site. The main{' '}
                <Link href="/daily-challenge" className="text-cyan-300 hover:underline">
                  Daily Dive
                </Link>{' '}
                shares eight prompts each day (20 seconds each).{' '}
                <Link href="/unlimited-krillion" className="text-cyan-300 hover:underline">
                  Unlimited
                </Link>{' '}
                lets you practice anytime. Themed experiences such as{' '}
                <Link href="/minecraft-krillion-game" className="text-cyan-300 hover:underline">
                  Minecraft Krillion
                </Link>{' '}
                use the same rarity twist in a different world. There is no download and no account
                required for the core games.
              </p>
            </section>

            <section>
              <h2 className={`${displayFont.className} text-xl font-bold text-white`}>Who makes it</h2>
              <p className="mt-3">
                KrillionPro is an independent project on{' '}
                <a href="https://krillionpro.com" className="text-cyan-300 hover:underline">
                  krillionpro.com
                </a>
                . The packs, scoring engine, and design are built for this domain. It is not
                affiliated with other sites that use similar gameplay ideas, and themed packs that
                reference other franchises are fan-made trivia — not official products of those
                trademark owners.
              </p>
            </section>

            <section>
              <h2 className={`${displayFont.className} text-xl font-bold text-white`}>How scoring works</h2>
              <p className="mt-3">
                Prompts accept many valid answers. Common hits score less; rarer correct answers
                score more and add depth (10 metres per point). Read the{' '}
                <Link href="/#krillion-guide" className="text-cyan-300 hover:underline">
                  Unlimited Krillion guide
                </Link>{' '}
                on the homepage for tiers, tips, and FAQs.
              </p>
            </section>

            <section>
              <h2 className={`${displayFont.className} text-xl font-bold text-white`}>Get in touch</h2>
              <p className="mt-3">
                Found a refused correct answer, a bug, or a privacy question? Visit{' '}
                <Link href="/contact" className="text-cyan-300 hover:underline">
                  Contact
                </Link>{' '}
                or email{' '}
                <a href="mailto:hello@krillionpro.com" className="text-cyan-300 hover:underline">
                  hello@krillionpro.com
                </a>
                . Also see our{' '}
                <Link href="/privacy" className="text-cyan-300 hover:underline">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href="/terms" className="text-cyan-300 hover:underline">
                  Terms of Use
                </Link>
                .
              </p>
            </section>

            <LegalPageNav current="/about" />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
