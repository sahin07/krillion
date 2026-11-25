import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LegalPageNav from '@/components/LegalPageNav';
import { bodyFont, displayFont } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Privacy Policy | KrillionPro',
  description:
    'Privacy Policy for KrillionPro — how we handle information when you play Daily Dive, Unlimited, and other Krillion-style games.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-[#040816]">
        <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <p className={`${displayFont.className} text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300`}>
            Legal
          </p>
          <h1 className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}>
            Privacy Policy
          </h1>
          <p className={`${bodyFont.className} mt-2 text-sm text-slate-500`}>
            Last updated: {new Date().toISOString().slice(0, 10)}
          </p>

          <div className={`${bodyFont.className} mt-8 space-y-6 text-base leading-relaxed text-slate-300`}>
            <p>
              KrillionPro (“we”, “us”) operates krillionpro.com and related pages where you can play
              browser games such as Daily Dive, Unlimited, and Minecraft Krillion. This policy
              explains what information we may process when you use the site.
            </p>

            <h2 className={`${displayFont.className} text-xl font-bold text-white`}>Information we collect</h2>
            <p>
              You can play core games without creating an account. We may automatically receive
              standard technical data such as browser type, device type, approximate region, pages
              visited, and timestamps through normal web server and analytics tooling. If you contact
              us by email, we receive the address and message you send.
            </p>

            <h2 className={`${displayFont.className} text-xl font-bold text-white`}>Cookies and similar tech</h2>
            <p>
              We may use cookies or local storage for basic site function, preferences (such as sound
              toggles), and — if enabled in the future — analytics or advertising (including Google
              AdSense). You can control cookies through your browser settings.
            </p>

            <h2 className={`${displayFont.className} text-xl font-bold text-white`}>How we use information</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>To operate and improve KrillionPro games and pages</li>
              <li>To understand aggregate traffic and fix errors</li>
              <li>To respond to support or contact requests</li>
              <li>To show ads if advertising is enabled, subject to partner policies</li>
            </ul>

            <h2 className={`${displayFont.className} text-xl font-bold text-white`}>Advertising</h2>
            <p>
              We may use Google AdSense or similar partners to show ads. Third-party vendors,
              including Google, may use cookies, web beacons, IP addresses, and similar identifiers to
              serve ads based on your visits to this site and/or other sites, and to measure and
              prevent fraud. Google’s use of advertising cookies enables it and its partners to serve
              ads based on your visits to this and/or other sites on the internet.
            </p>
            <p>
              You can opt out of personalised advertising in{' '}
              <a
                href="https://adssettings.google.com/"
                className="text-cyan-300 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Ads Settings
              </a>
              , or opt out of some third-party vendors at{' '}
              <a
                href="https://www.aboutads.info/"
                className="text-cyan-300 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                aboutads.info
              </a>
              . Learn more in Google’s policies on cookies in advertising.
            </p>

            <h2 className={`${displayFont.className} text-xl font-bold text-white`}>Third parties</h2>
            <p>
              Hosting, analytics, or ad partners may process data under their own policies. We do not
              sell your personal information. Related pages:{' '}
              <Link href="/terms" className="text-cyan-300 hover:underline">
                Terms of Use
              </Link>
              ,{' '}
              <Link href="/about" className="text-cyan-300 hover:underline">
                About
              </Link>
              .
            </p>

            <h2 className={`${displayFont.className} text-xl font-bold text-white`}>Children</h2>
            <p>
              KrillionPro is a general-audience trivia site. We do not knowingly collect personal
              information from children under 13. If you believe a child provided such information,
              contact us and we will delete it.
            </p>

            <h2 className={`${displayFont.className} text-xl font-bold text-white`}>Your choices</h2>
            <p>
              You may clear cookies/local storage, use browser privacy controls, or email us to ask
              about data we hold from a contact message. For advertising opt-outs, use the tools
              provided by the ad network (for example Google Ads Settings).
            </p>

            <h2 className={`${displayFont.className} text-xl font-bold text-white`}>Contact</h2>
            <p>
              Privacy questions:{' '}
              <Link href="/contact" className="text-cyan-300 hover:underline">
                Contact page
              </Link>{' '}
              or email{' '}
              <a href="mailto:hello@krillionpro.com" className="text-cyan-300 hover:underline">
                hello@krillionpro.com
              </a>
              .
            </p>

            <LegalPageNav current="/privacy" />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
