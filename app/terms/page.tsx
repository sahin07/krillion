import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LegalPageNav from '@/components/LegalPageNav';
import { bodyFont, displayFont } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Terms of Use | KrillionPro',
  description: 'Terms of Use for playing games and using content on KrillionPro.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-[#040816]">
        <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <p className={`${displayFont.className} text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300`}>
            Legal
          </p>
          <h1 className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}>
            Terms of Use
          </h1>
          <p className={`${bodyFont.className} mt-2 text-sm text-slate-500`}>
            Last updated: {new Date().toISOString().slice(0, 10)}
          </p>

          <div className={`${bodyFont.className} mt-8 space-y-6 text-base leading-relaxed text-slate-300`}>
            <p>
              By using KrillionPro you agree to these terms. If you do not agree, please do not use
              the site.
            </p>

            <h2 className={`${displayFont.className} text-xl font-bold text-white`}>The service</h2>
            <p>
              KrillionPro provides browser-based trivia and guessing games, including Daily Dive,
              Unlimited, and themed experiences. Features may change as we improve the site.
            </p>

            <h2 className={`${displayFont.className} text-xl font-bold text-white`}>Acceptable use</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>Play fairly; do not attempt to abuse scoring APIs or disrupt the service</li>
              <li>Do not scrape or republish our prompt banks at scale without permission</li>
              <li>Do not use the site for illegal activity</li>
            </ul>

            <h2 className={`${displayFont.className} text-xl font-bold text-white`}>Intellectual property</h2>
            <p>
              Site design, original copy, and our curated game packs belong to KrillionPro or its
              licensors. Themed packs that reference other franchises are fan-made trivia and are not
              affiliated with those trademark owners.
            </p>

            <h2 className={`${displayFont.className} text-xl font-bold text-white`}>Disclaimer</h2>
            <p>
              Games and content are provided “as is.” We do not guarantee uninterrupted access,
              perfect answer coverage, or specific scores. To the fullest extent allowed by law, we
              are not liable for indirect or consequential damages from using the site.
            </p>

            <h2 className={`${displayFont.className} text-xl font-bold text-white`}>Privacy</h2>
            <p>
              See our{' '}
              <Link href="/privacy" className="text-cyan-300 hover:underline">
                Privacy Policy
              </Link>{' '}
              for how information is handled.
            </p>

            <h2 className={`${displayFont.className} text-xl font-bold text-white`}>Advertising</h2>
            <p>
              The site may show ads from partners such as Google AdSense and may link to other
              websites. We are not responsible for advertisers’ products or for third-party site
              content. Cookie use for ads is described in the{' '}
              <Link href="/privacy" className="text-cyan-300 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>

            <h2 className={`${displayFont.className} text-xl font-bold text-white`}>Contact</h2>
            <p>
              Questions about these terms:{' '}
              <Link href="/contact" className="text-cyan-300 hover:underline">
                Contact
              </Link>
              ,{' '}
              <Link href="/about" className="text-cyan-300 hover:underline">
                About
              </Link>
              , or{' '}
              <a href="mailto:hello@krillionpro.com" className="text-cyan-300 hover:underline">
                hello@krillionpro.com
              </a>
              .
            </p>

            <LegalPageNav current="/terms" />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
