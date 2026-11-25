import { displayFont } from '@/lib/fonts';
import { WHY_PLAY_FEATURES } from '@/lib/site-data';

export default function WhyPlaySection() {
  return (
    <section
      aria-labelledby="why-play-heading"
      className="border-t border-[#67e8f9]/15 bg-[#040816] py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`${displayFont.className} text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd3fc]`}
          >
            Designed for Curiosity
          </p>
          <h2
            id="why-play-heading"
            className={`${displayFont.className} mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl`}
          >
            Why Play KrillionPro?
          </h2>
          <p className={`${displayFont.className} mt-3 text-base leading-relaxed text-slate-300`}>
            Crafted to make daily thinking games feel crisp, welcoming, and worth coming back to
            every day.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {WHY_PLAY_FEATURES.map((feature) => (
            <div
              key={feature.number}
              className="border border-[#67e8f9]/40 bg-[#07122b]/85 p-5 sm:p-6"
            >
              <span
                className={`${displayFont.className} text-sm font-bold uppercase tracking-[0.16em] text-[#67e8f9]`}
              >
                {feature.number}
              </span>
              <h3
                className={`${displayFont.className} mt-2 text-xl font-bold tracking-tight text-white`}
              >
                {feature.title}
              </h3>
              <p className={`${displayFont.className} mt-2.5 text-sm leading-relaxed text-slate-300 sm:text-base`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
