import { bodyFont, pixelFont } from '@/lib/fonts';

/** Visible in-article game screenshot with caption. */
export default function ArticleShot({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border-2 border-cyan-300/40 bg-[#0a1628] shadow-[0_0_40px_rgba(34,211,238,0.12)]">
      <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-2">
        <p className={`${pixelFont.className} text-[8px] tracking-[0.18em] text-cyan-300`}>GAME SCREENSHOT</p>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        className="block h-auto w-full bg-[#020617] object-contain object-top"
      />
      <figcaption
        className={`${bodyFont.className} border-t border-white/10 bg-[#07122b] px-4 py-3 text-sm leading-relaxed text-slate-300`}
      >
        {caption}
      </figcaption>
    </figure>
  );
}
