import { displayFont, monoFont } from '@/lib/fonts';
import { HOW_TO_PLAY_STEPS } from '@/lib/site-data';

export default function HowToPlaySection() {
  return (
    <section
      id="how-to-play"
      aria-labelledby="how-to-play-heading"
      className="border-t border-sky-400/10 bg-[#060F1E] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-cyan-300">
            Simple Rules <span aria-hidden="true" className="mx-1.5 text-sky-400/50">·</span> Deep Thinking
          </p>
          <h2
            id="how-to-play-heading"
            className={`${displayFont.className} mt-2.5 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl`}
          >
            How to Play
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            Getting started with Krillion takes seconds—no tutorials or complex
            setup required.
          </p>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_TO_PLAY_STEPS.map((item) => (
            <li
              key={item.step}
              className="flex flex-col rounded-2xl border border-sky-400/15 bg-[#0A1933] p-6"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`${monoFont.className} inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-sm font-semibold text-cyan-300 tabular-nums`}
                >
                  {item.step}
                </span>
              </div>
              <h3
                className={`${displayFont.className} mt-5 text-lg font-semibold tracking-tight text-white`}
              >
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
