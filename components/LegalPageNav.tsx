import Link from 'next/link';
import { bodyFont } from '@/lib/fonts';

const LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About' },
] as const;

type Props = {
  current: (typeof LINKS)[number]['href'];
};

/** Cross-links between legal pages — AdSense-friendly site transparency */
export default function LegalPageNav({ current }: Props) {
  return (
    <nav
      aria-label="Legal pages"
      className={`${bodyFont.className} mt-10 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/10 pt-6 text-sm text-slate-400`}
    >
      {LINKS.map((link) =>
        link.href === current ? (
          <span key={link.href} className="font-semibold text-cyan-200">
            {link.label}
          </span>
        ) : (
          <Link key={link.href} href={link.href} className="hover:text-cyan-300">
            {link.label}
          </Link>
        )
      )}
    </nav>
  );
}
