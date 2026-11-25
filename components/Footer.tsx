import Link from 'next/link';
import { displayFont } from '@/lib/fonts';
import { PixelSquidLogo } from '@/components/PixelOceanArt';

const PLAY_LINKS = [
  { label: 'Daily Dive', href: '/daily-challenge' },
  { label: 'Unlimited Krillion', href: '/unlimited-krillion' },
  { label: 'Minecraft Krillion', href: '/minecraft-krillion-game' },
  { label: 'Sports Krillion', href: '/sports-krillion' },
  { label: 'Long Shot Krillion', href: '/long-shot-krillion' },
  { label: 'Puffer Party', href: '/puffer-party-krillion' },
  { label: 'Cosmillion', href: '/cosmillion' },
  { label: 'Krillion Games', href: '/games' },
  { label: 'Leaderboards', href: '/leaderboards' },
] as const;

const EXPLORE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'How to Play', href: '/#how-to-play' },
  { label: 'Krillion Guide', href: '/#krillion-guide' },
  { label: 'Guides', href: '/guides' },
  { label: 'Too Clever tips', href: '/guides/too-clever' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'About', href: '/about' },
] as const;

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Contact', href: '/contact' },
  { label: 'About KrillionPro', href: '/about' },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-[#67e8f9]/20 bg-[#02060f] py-12 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className={`${displayFont.className} inline-flex items-center gap-2.5 text-xl font-bold tracking-tight text-white transition-colors duration-150 hover:text-cyan-300`}
            >
              <PixelSquidLogo className="w-7" />
              <span>KrillionPro</span>
            </Link>
            <p className={`${displayFont.className} mt-4 max-w-sm text-sm leading-relaxed text-slate-400`}>
              Free rare-answer trivia in the browser. Daily Dive, Unlimited practice, and themed
              games like Minecraft Krillion — uncommon correct answers sink deeper.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3
              className={`${displayFont.className} text-xs font-semibold uppercase tracking-[0.16em] text-[#7dd3fc]`}
            >
              Play
            </h3>
            <ul className={`${displayFont.className} mt-4 space-y-2.5 text-sm text-slate-400`}>
              {PLAY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-cyan-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3
              className={`${displayFont.className} text-xs font-semibold uppercase tracking-[0.16em] text-[#7dd3fc]`}
            >
              Explore
            </h3>
            <ul className={`${displayFont.className} mt-4 space-y-2.5 text-sm text-slate-400`}>
              {EXPLORE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-cyan-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3
              className={`${displayFont.className} text-xs font-semibold uppercase tracking-[0.16em] text-[#7dd3fc]`}
            >
              Legal
            </h3>
            <ul className={`${displayFont.className} mt-4 space-y-2.5 text-sm text-slate-400`}>
              {LEGAL_LINKS.map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className="transition-colors hover:text-cyan-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`${displayFont.className} mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#67e8f9]/15 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center`}
        >
          <p>© {new Date().getFullYear()} KrillionPro. All rights reserved.</p>
          <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Legal quick links">
            <Link href="/privacy" className="transition-colors hover:text-cyan-300">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-cyan-300">
              Terms
            </Link>
            <Link href="/contact" className="transition-colors hover:text-cyan-300">
              Contact
            </Link>
            <Link href="/about" className="transition-colors hover:text-cyan-300">
              About
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
