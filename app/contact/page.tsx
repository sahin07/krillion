import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LegalPageNav from '@/components/LegalPageNav';
import { bodyFont, displayFont } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Contact | KrillionPro',
  description: 'Contact the KrillionPro team about games, privacy, or feedback.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-[#040816]">
        <section className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <p className={`${displayFont.className} text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300`}>
            Support
          </p>
          <h1 className={`${displayFont.className} mt-3 text-3xl font-bold text-white sm:text-4xl`}>
            Contact KrillionPro
          </h1>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300`}>
            Questions about Daily Dive, Unlimited, Minecraft Krillion, privacy, or the site? Email
            us — we read every message.
          </p>

          <div className="mt-8 rounded-2xl border border-[#67e8f9]/25 bg-[#07122b]/80 p-6">
            <p className={`${displayFont.className} text-sm font-semibold text-cyan-200`}>Email</p>
            <a
              href="mailto:hello@krillionpro.com"
              className={`${bodyFont.className} mt-2 inline-block text-lg font-semibold text-white hover:text-cyan-300`}
            >
              hello@krillionpro.com
            </a>
            <p className={`${bodyFont.className} mt-4 text-sm text-slate-400`}>
              For privacy requests, include “Privacy” in the subject line. We typically reply within
              a few business days.
            </p>
          </div>

          <div className={`${bodyFont.className} mt-8 space-y-2 text-sm text-slate-400`}>
            <p className="font-semibold text-slate-200">What to write about</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>A correct answer was refused — include the prompt and what you typed</li>
              <li>A bug or wrong answer — page, browser, and what happened</li>
              <li>
                Privacy questions — see the{' '}
                <Link href="/privacy" className="text-cyan-300 hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                Who we are — see{' '}
                <Link href="/about" className="text-cyan-300 hover:underline">
                  About KrillionPro
                </Link>
              </li>
            </ul>
          </div>

          <LegalPageNav current="/contact" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
