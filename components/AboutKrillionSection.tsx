import { displayFont } from '@/lib/fonts';

export default function AboutKrillionSection() {
  return (
    <section
      aria-labelledby="about-krillion-heading"
      className="border-t border-[#67e8f9]/15 bg-[#040816] py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="border border-[#67e8f9]/35 bg-[#07122b]/75 p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p
                className={`${displayFont.className} text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd3fc]`}
              >
                About the Platform · Krillion
              </p>
              <h2
                id="about-krillion-heading"
                className={`${displayFont.className} mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl`}
              >
                Home of the Krillion Game
              </h2>
            </div>

            <div
              className={`${displayFont.className} space-y-4 text-base leading-relaxed text-slate-300 lg:col-span-7`}
            >
              <p>
                <strong className="font-semibold text-white">KrillionPro</strong> is where you play{' '}
                <strong className="font-semibold text-white">the Krillion game</strong> free in the
                browser — rare-answer trivia where uncommon correct answers score more and sink you
                deeper.
              </p>
              <p>
                The twist is rarity. A crowd answer still counts. A one in a krillion hit is the
                flex. That scoring idea powers Daily Krillion, Unlimited practice, and themed
                Krillion games like Minecraft Krillion.
              </p>
              <p>
                Check in once a day for the shared Daily Dive, keep practicing in Unlimited, or
                switch packs when you want a new bank of prompts — same ocean, new discoveries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
