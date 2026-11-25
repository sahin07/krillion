import Link from 'next/link';
import ArticleShot from '@/components/seo/ArticleShot';
import { bodyFont, minecraftDisplayFont, minecraftUiFont } from '@/lib/fonts';

const FEATURES = [
  { title: '7 prompts', body: 'Seven Minecraft prompts per dive, one answer each.' },
  { title: '25 seconds', body: 'A countdown on every prompt keeps the pace sharp.' },
  { title: 'Rare scores', body: 'Unusual correct answers earn more points and depth.' },
  { title: 'Daily + Unlimited', body: 'Play today’s shared set, or dive again without a cap.' },
] as const;

const STEPS = [
  {
    title: 'Read the prompt',
    body: 'One Minecraft prompt at a time — mobs, blocks, biomes, structures, updates, and more.',
  },
  {
    title: 'Answer in 25 seconds',
    body: 'Type one valid answer before the clock runs out, then submit or pass.',
  },
  {
    title: 'Go rare',
    body: 'Common picks still count, but deeper cuts score higher on the rarity scale.',
  },
  {
    title: 'Surface and dive again',
    body: 'Review your catch, then take Unlimited for fresh Minecraft prompts anytime.',
  },
] as const;

const EXAMPLE_ROWS = [
  { prompt: 'Name a hostile mob in Minecraft', common: 'Creeper', mid: 'Warden', deep: 'Illusioner' },
  { prompt: 'Name a block in Minecraft', common: 'Dirt', mid: 'Sculk', deep: 'Reinforced Deepslate' },
  { prompt: 'Name a biome in Minecraft', common: 'Plains', mid: 'Cherry Grove', deep: 'Eroded Badlands' },
  { prompt: 'Name an enchantment in Minecraft', common: 'Sharpness', mid: 'Swift Sneak', deep: 'Lunge' },
  { prompt: 'Name something found in the Nether', common: 'Netherrack', mid: 'Shroomlight', deep: 'Chiseled Nether Bricks' },
  { prompt: 'Name a structure in a Minecraft world', common: 'Village', mid: 'Trial Chambers', deep: 'Trail Ruins' },
] as const;

const TIERS = [
  { name: 'Plankton / Common', pts: '10–15', note: 'Crowd favorites' },
  { name: 'Schooler / Uncommon', pts: '30', note: 'Solid, less obvious' },
  { name: 'Rare', pts: '60', note: 'Uncommon knowledge' },
  { name: 'Deep Cut', pts: '85', note: 'Changelog / niche picks' },
  { name: 'Legendary', pts: '100', note: 'One in a krillion' },
] as const;

const TIPS = [
  {
    title: 'Skip the first thought',
    body: 'The answer that appears instantly is usually the crowd answer. Pause for a rarer valid name.',
  },
  {
    title: 'Remember updates and renames',
    body: 'Older biome names, early update titles, and edition-only details often score deeper.',
  },
  {
    title: 'Dig into structures and mobs',
    body: 'Bastion parts, trial chamber details, and rarely spawning mobs beat “Creeper” and “Village.”',
  },
  {
    title: 'Read the prompt carefully',
    body: 'Hostile mob ≠ any mob. Nether find ≠ Overworld ore. Narrow prompts reward specialists.',
  },
] as const;

const FAQS = [
  {
    q: 'What is the Minecraft Krillion game?',
    a: 'Minecraft Krillion on KrillionPro is a rare-answer trivia dive made of Minecraft prompts. You get seven prompts, twenty-five seconds each, and rarer correct answers score more points and depth.',
  },
  {
    q: 'How is Minecraft Krillion different from a normal Minecraft quiz?',
    a: 'A normal quiz usually has one correct choice. Minecraft Krillion accepts many valid answers per prompt, and your score depends on how uncommon your correct answer is.',
  },
  {
    q: 'Is there a Minecraft Krillion unlimited mode?',
    a: 'Yes. Switch to Unlimited on this page for fresh Minecraft prompt sets with no daily cap. Daily Challenge keeps a shared set for the day.',
  },
  {
    q: 'Do Java and Bedrock answers both count?',
    a: 'Where the curated answer bank includes them, yes. Both editions can appear in accepted aliases for a prompt.',
  },
  {
    q: 'Is Minecraft Krillion an official Mojang game?',
    a: 'No. It is an independent, fan-made trivia experience on KrillionPro. It is not affiliated with or endorsed by Mojang Studios or Microsoft. Minecraft is a trademark of Mojang Studios.',
  },
  {
    q: 'Is Minecraft Krillion the same as Krillion Minecraft?',
    a: 'Yes — people search both phrases for the same idea: Minecraft-themed rare-answer trivia with timed prompts.',
  },
] as const;

export const MINECRAFT_FAQ_ITEMS = FAQS;

export default function MinecraftSeoArticle() {
  return (
    <article
      aria-labelledby="minecraft-krillion-seo-heading"
      className="border-t border-emerald-500/20 bg-[#04120c] text-slate-200"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <header className="max-w-3xl">
          <p
            className={`${minecraftUiFont.className} text-xs font-bold uppercase tracking-[0.18em] text-emerald-300`}
          >
            Minecraft Krillion Game · Guide
          </p>
          <h2
            id="minecraft-krillion-seo-heading"
            className={`${minecraftDisplayFont.className} mt-3 text-3xl tracking-wide text-white [text-shadow:2px_2px_0_#0a1f12] sm:text-4xl`}
          >
            Minecraft Krillion: Name the Rare Answer
          </h2>
          <p className={`${minecraftUiFont.className} mt-4 text-base leading-relaxed text-slate-300 sm:text-lg`}>
            Seven Minecraft prompts. Creeper is easy. Illusioner sinks deeper. Play the{' '}
            <strong className="font-semibold text-white">Minecraft Krillion game</strong> on
            KrillionPro — timed answers, rarity scoring, Daily Challenge, and Unlimited.
          </p>
        </header>

        <ArticleShot
          src="/screenshots/minecraft-prompt.png?v=3"
          alt="Minecraft Krillion gameplay with hostile mob prompt, timer, answer field, Pass and Dive"
          caption="Live Minecraft dive — prompt, countdown, answer box, Pass, and Dive."
        />

        <section className="mt-10" aria-labelledby="what-is-heading">
          <h3
            id="what-is-heading"
            className={`${minecraftDisplayFont.className} text-2xl text-white sm:text-3xl`}
          >
            What is Minecraft Krillion?
          </h3>
          <div className={`${minecraftUiFont.className} mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-slate-300`}>
            <p>
              <strong className="text-white">Minecraft Krillion</strong> is KrillionPro’s Minecraft
              trivia dive: open prompts about mobs, biomes, blocks, enchantments, the Nether,
              structures, ores, and more. You type one answer per prompt. Correct answers always
              matter — but uncommon correct answers earn more points and push your depth further.
            </p>
            <p>
              That turns every round into a knowledge flex. New players can still land valid hits.
              Veterans chase deep cuts from changelogs, rare mobs, and structures most people never
              name first.
            </p>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <li
                key={f.title}
                className="rounded-2xl border border-emerald-400/25 bg-[#0f1f18]/80 p-4 backdrop-blur-sm"
              >
                <p className={`${minecraftDisplayFont.className} text-lg text-emerald-200`}>{f.title}</p>
                <p className={`${minecraftUiFont.className} mt-2 text-sm leading-snug text-slate-300`}>
                  {f.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <ArticleShot
          src="/screenshots/minecraft-reveal.png?v=3"
          alt="Minecraft Krillion reveal showing Pale Garden Deep Cut rarity and plus 85 points"
          caption="After a hit — accepted label, Deep Cut rarity, and +85 when a rare Minecraft answer lands."
        />

        <section className="mt-14" aria-labelledby="how-to-heading">
          <h3
            id="how-to-heading"
            className={`${minecraftDisplayFont.className} text-2xl text-white sm:text-3xl`}
          >
            How to play Minecraft Krillion
          </h3>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="rounded-2xl border border-white/10 bg-black/25 p-5"
              >
                <p className={`${minecraftUiFont.className} text-xs font-bold uppercase tracking-wider text-emerald-300`}>
                  Step {i + 1}
                </p>
                <h4 className={`${minecraftDisplayFont.className} mt-2 text-xl text-white`}>
                  {step.title}
                </h4>
                <p className={`${minecraftUiFont.className} mt-2 text-sm leading-relaxed text-slate-300`}>
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <ArticleShot
          src="/screenshots/minecraft-miss.png?v=3"
          alt="Minecraft Krillion miss reveal with Nothing landed and Next button"
          caption="Miss, pass, or time out for +0 — then Next. The dive still continues."
        />

        <section className="mt-14" aria-labelledby="covers-heading">
          <h3
            id="covers-heading"
            className={`${minecraftDisplayFont.className} text-2xl text-white sm:text-3xl`}
          >
            What the Minecraft Krillion quiz covers
          </h3>
          <p className={`${minecraftUiFont.className} mt-4 max-w-3xl text-base leading-relaxed text-slate-300`}>
            Prompts span Minecraft knowledge players actually argue about: hostile and passive mobs,
            blocks and items, biomes and structures, Nether finds, enchantments, potions, ores,
            dimensions, update names, and tools. Daily Challenge shares one set for the day;
            Unlimited deals another curated pack so you can practice without waiting.
          </p>
        </section>

        <section className="mt-14" aria-labelledby="examples-heading">
          <h3
            id="examples-heading"
            className={`${minecraftDisplayFont.className} text-2xl text-white sm:text-3xl`}
          >
            Common and rare answers players chase
          </h3>
          <p className={`${minecraftUiFont.className} mt-3 max-w-3xl text-sm text-slate-400`}>
            Illustrative examples from the rarity idea — common still scores; deep cuts score more.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
            <table className={`${minecraftUiFont.className} w-full min-w-[36rem] text-left text-sm`}>
              <thead className="bg-emerald-950/60 text-emerald-100">
                <tr>
                  <th className="px-4 py-3 font-semibold">Prompt</th>
                  <th className="px-4 py-3 font-semibold">Common</th>
                  <th className="px-4 py-3 font-semibold">Deeper</th>
                  <th className="px-4 py-3 font-semibold">Deep cut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-black/20">
                {EXAMPLE_ROWS.map((row) => (
                  <tr key={row.prompt}>
                    <td className="px-4 py-3 text-slate-200">{row.prompt}</td>
                    <td className="px-4 py-3 text-slate-400">{row.common}</td>
                    <td className="px-4 py-3 text-emerald-200">{row.mid}</td>
                    <td className="px-4 py-3 text-amber-300">{row.deep}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="scoring-heading">
          <h3
            id="scoring-heading"
            className={`${minecraftDisplayFont.className} text-2xl text-white sm:text-3xl`}
          >
            How Minecraft Krillion is scored
          </h3>
          <p className={`${minecraftUiFont.className} mt-4 max-w-3xl text-base leading-relaxed text-slate-300`}>
            Each accepted answer maps to a rarity tier. Points add to your score; depth rises with
            points (10 meters per point on KrillionPro). Misses, passes, and timeouts add nothing.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {TIERS.map((t) => (
              <li
                key={t.name}
                className="rounded-xl border border-emerald-400/20 bg-[#0f1f18]/70 px-4 py-3"
              >
                <p className={`${minecraftDisplayFont.className} text-base text-white`}>{t.name}</p>
                <p className={`${minecraftUiFont.className} mt-1 text-amber-300`}>{t.pts} pts</p>
                <p className={`${minecraftUiFont.className} mt-1 text-xs text-slate-400`}>{t.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <ArticleShot
          src="/screenshots/minecraft-results.png?v=3"
          alt="Minecraft Krillion Dive Complete results with score, depth, and answer rundown"
          caption="Surface screen — Dive Complete with score, depth, and what landed across the seven prompts."
        />

        <section className="mt-14" aria-labelledby="tips-heading">
          <h3
            id="tips-heading"
            className={`${minecraftDisplayFont.className} text-2xl text-white sm:text-3xl`}
          >
            Tips for deeper Minecraft answers
          </h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {TIPS.map((tip) => (
              <li key={tip.title} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                <h4 className={`${minecraftDisplayFont.className} text-xl text-emerald-200`}>
                  {tip.title}
                </h4>
                <p className={`${minecraftUiFont.className} mt-2 text-sm leading-relaxed text-slate-300`}>
                  {tip.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="sample-heading">
          <h3
            id="sample-heading"
            className={`${minecraftDisplayFont.className} text-2xl text-white sm:text-3xl`}
          >
            A sample Minecraft Krillion dive
          </h3>
          <div className={`${minecraftUiFont.className} mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-slate-300`}>
            <p>
              Imagine the dive opens with “Name a hostile mob in Minecraft.” Zombie is safe plankton.
              Warden is rarer. Illusioner is the deep flex. Next, “Name a biome”: Plains floats;
              Pale Garden or Eroded Badlands pulls you down. Finish with an enchantment prompt —
              Sharpness for the crowd, Swift Sneak or Lunge for players who read the patch notes.
            </p>
            <p>
              A full seven-prompt dive usually takes a few minutes. The results screen shows what
              landed and what missed, so each round teaches a few names you can use on the next
              descent. Prefer the shared ocean daily instead? Play{' '}
              <Link href="/daily-challenge" className="font-semibold text-emerald-300 underline-offset-2 hover:underline">
                Daily Dive
              </Link>
              , or keep practicing on{' '}
              <Link href="/unlimited-krillion" className="font-semibold text-emerald-300 underline-offset-2 hover:underline">
                Unlimited
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="faq-heading">
          <h3
            id="faq-heading"
            className={`${minecraftDisplayFont.className} text-2xl text-white sm:text-3xl`}
          >
            Minecraft Krillion FAQ
          </h3>
          <div className="mt-6 space-y-3">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/10 bg-black/25 px-5 py-4 open:border-emerald-400/30"
              >
                <summary
                  className={`${minecraftUiFont.className} cursor-pointer list-none text-base font-bold text-white marker:content-none`}
                >
                  {item.q}
                </summary>
                <p className={`${minecraftUiFont.className} mt-3 text-sm leading-relaxed text-slate-300`}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="more-dives-heading">
          <h3
            id="more-dives-heading"
            className={`${minecraftDisplayFont.className} text-2xl text-white sm:text-3xl`}
          >
            More dives on KrillionPro
          </h3>
          <p className={`${minecraftUiFont.className} mt-4 max-w-3xl text-base leading-relaxed text-slate-300`}>
            Prefer the shared ocean challenge? Play{' '}
            <Link href="/daily-challenge" className="font-semibold text-emerald-300 hover:underline">
              Daily Dive
            </Link>
            . Want practice without waiting? Open{' '}
            <Link href="/unlimited-krillion" className="font-semibold text-emerald-300 hover:underline">
              Unlimited
            </Link>
            . Learn the rarity rules in the{' '}
            <Link href="/unlimited-krillion#unlimited-guide" className="font-semibold text-emerald-300 hover:underline">
              Unlimited Krillion guide
            </Link>{' '}
            or read{' '}
            <Link href="/about" className="font-semibold text-emerald-300 hover:underline">
              About KrillionPro
            </Link>
            .
          </p>
        </section>

        <p className={`${bodyFont.className} mt-12 max-w-3xl text-xs leading-relaxed text-slate-500`}>
          Minecraft Krillion on KrillionPro is an independent fan-made trivia game. It is not
          affiliated with or endorsed by Mojang Studios or Microsoft. Minecraft is a trademark of
          Mojang Studios. See{' '}
          <Link href="/privacy" className="text-emerald-400/90 hover:underline">
            Privacy Policy
          </Link>
          ,{' '}
          <Link href="/terms" className="text-emerald-400/90 hover:underline">
            Terms of Use
          </Link>
          , and{' '}
          <Link href="/contact" className="text-emerald-400/90 hover:underline">
            Contact
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
