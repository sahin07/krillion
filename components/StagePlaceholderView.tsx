import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Infinity as InfinityIcon,
  Layers,
  Trophy,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { displayFont } from '@/lib/fonts';

interface StagePlaceholderViewProps {
  title: string;
  kicker: string;
  description: string;
  highlights: string[];
  iconName: 'compass' | 'infinity' | 'layers' | 'trophy';
}

function ModeIcon({ name }: { name: StagePlaceholderViewProps['iconName'] }) {
  switch (name) {
    case 'compass':
      return <Compass className="h-7 w-7 text-cyan-300" aria-hidden="true" />;
    case 'infinity':
      return <InfinityIcon className="h-7 w-7 text-sky-300" aria-hidden="true" />;
    case 'layers':
      return <Layers className="h-7 w-7 text-cyan-300" aria-hidden="true" />;
    case 'trophy':
      return <Trophy className="h-7 w-7 text-sky-300" aria-hidden="true" />;
  }
}

export default function StagePlaceholderView({
  title,
  kicker,
  description,
  highlights,
  iconName,
}: StagePlaceholderViewProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center py-16 sm:py-24">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-sky-400/20 bg-gradient-to-br from-[#0B1D3B] via-[#091730] to-[#061022] p-8 sm:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10">
              <ModeIcon name={iconName} />
            </div>

            <p className="mt-6 text-sm font-medium text-cyan-300">
              {kicker} <span aria-hidden="true" className="mx-1.5 text-sky-400/50">·</span> Upcoming Stage
            </p>

            <h1
              className={`${displayFont.className} mt-2 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl`}
            >
              {title}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {description}
            </p>

            <div className="mt-8 border-t border-sky-400/15 pt-6">
              <h2 className={`${displayFont.className} text-base font-semibold text-white`}>
                What this section will offer
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-300 sm:text-base">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 text-cyan-300"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 px-5 py-2.5 text-sm font-semibold text-[#04101E] transition-all duration-150 hover:from-cyan-300 hover:to-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Back to Homepage</span>
              </Link>

              <Link
                href="/#games"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-sky-400/25 bg-[#0C1D3A] px-5 py-2.5 text-sm font-semibold text-slate-100 transition-colors duration-150 hover:border-cyan-400/50 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span>Browse All Modes</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
