import type { ReactNode } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { bodyFont, pixelFont } from '@/lib/fonts';

const GUIDE_LINKS = [
  { href: '/one-in-a-krillion', label: 'One in a Krillion' },
  { href: '/guides/too-clever', label: 'Too Clever tips' },
  { href: '/guides/answers-today', label: 'Answers today (hints)' },
] as const;

export default function GuideShell({
  eyebrow,
  title,
  lead,
  children,
  parent = { href: '/guides', label: 'Guides' },
}: {
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
  /** Mid crumb between home and the page. Pass null for home → page only. */
  parent?: { href: string; label: string } | null;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-[#040816] text-slate-200">
        <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className={`${bodyFont.className} text-sm text-slate-400`}>
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-cyan-300">
                  KrillionPro
                </Link>
              </li>
              {parent ? (
                <>
                  <li aria-hidden="true" className="text-slate-600">
                    /
                  </li>
                  <li>
                    <Link href={parent.href} className="hover:text-cyan-300">
                      {parent.label}
                    </Link>
                  </li>
                </>
              ) : null}
              <li aria-hidden="true" className="text-slate-600">
                /
              </li>
              <li className="text-cyan-200">{eyebrow}</li>
            </ol>
          </nav>

          <p className={`${pixelFont.className} mt-6 text-[8px] uppercase tracking-[0.18em] text-cyan-300 sm:text-[9px]`}>
            {eyebrow}
          </p>
          <h1
            className={`${pixelFont.className} mt-3 text-[clamp(1.2rem,4vw,2.2rem)] leading-tight text-white [text-shadow:4px_0_0_#7c3aed,-3px_0_0_#22d3ee,0_0_28px_rgba(167,139,250,0.35)]`}
          >
            {title}
          </h1>
          <p className={`${bodyFont.className} mt-4 text-base leading-relaxed text-slate-300 sm:text-lg`}>
            {lead}
          </p>

          <div className={`${bodyFont.className} mt-10 space-y-10 text-base leading-relaxed text-slate-300`}>
            {children}
          </div>

          <aside className="mt-14 rounded-2xl border border-white/10 bg-[#07122b]/80 p-5">
            <p className={`${pixelFont.className} text-[8px] tracking-wider text-cyan-300`}>MORE GUIDES</p>
            <ul className="mt-3 space-y-2">
              {GUIDE_LINKS.map((g) => (
                <li key={g.href}>
                  <Link href={g.href} className="font-semibold text-cyan-300 hover:underline">
                    {g.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/daily-challenge"
              className={`${bodyFont.className} mt-5 inline-flex min-h-11 items-center justify-center rounded-2xl border-2 border-[#e9d5ff] bg-gradient-to-r from-[#6d28d9] via-[#3730a3] to-[#0e7490] px-6 py-2.5 text-sm font-bold text-white`}
            >
              Play Daily Dive
            </Link>
          </aside>
        </article>
      </main>
      <Footer />
    </div>
  );
}
