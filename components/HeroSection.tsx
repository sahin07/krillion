'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { bodyFont, pixelFont } from '@/lib/fonts';
import OceanAtmosphere from '@/components/OceanAtmosphere';
import {
  OceanDepthScale,
  PixelArrowDown,
  PixelLightbulbGraphic,
  PixelSquidMascot,
  PixelStopwatchGraphic,
} from '@/components/PixelOceanArt';

/** Header is h-11 (2.75rem). Desktop locks to remaining viewport; mobile can grow. */
const HERO_SHELL =
  'min-h-[calc(100svh-2.75rem)] lg:h-[calc(100svh-2.75rem)] lg:max-h-[calc(100svh-2.75rem)]';

/** Lobby card chrome — fixed compact height (do not stretch) */
const stepCardClass =
  'flex min-h-[200px] flex-col items-center justify-between rounded-2xl border-2 border-[#c4b5fd]/55 bg-[#070f24]/78 px-3.5 py-4 text-center shadow-[0_0_0_1px_rgba(167,139,250,0.12),0_14px_40px_rgba(2,6,23,0.55)] backdrop-blur-[3px] sm:min-h-[220px]';

const HOW_TO_STEPS = [
  {
    title: 'BEGIN DESCENT',
    body: 'Daily: 8 prompts. Unlimited: 6 prompts per dive.',
    graphic: (
      <div className="flex flex-col items-center gap-1.5 sm:gap-2">
        <PixelSquidMascot />
        <PixelArrowDown />
      </div>
    ),
  },
  {
    title: 'ANSWER FAST',
    body: 'Daily and Unlimited give 20s each.',
    graphic: <PixelStopwatchGraphic />,
  },
  {
    title: 'THINK BEYOND THE OBVIOUS',
    body: 'Valid rare answers score higher and take you deeper.',
    graphic: (
      <div className="flex w-full max-w-[11.5rem] flex-col gap-1.5 sm:gap-2">
        <div className="rounded-lg border border-[#7dd3fc]/55 bg-[#0a1c3f]/95 px-3 py-1.5 text-left sm:py-2">
          <p className={`${bodyFont.className} text-[12px] leading-snug text-[#e2e8f0] sm:text-[13px]`}>
            Shark <span className="text-[#94a3b8]">+10</span>
          </p>
        </div>
        <div className="rounded-lg border-2 border-[#e879f9] bg-[#2a1050]/95 px-3 py-1.5 text-left shadow-[0_0_20px_rgba(232,121,249,0.45)] sm:py-2">
          <p className={`${bodyFont.className} text-[12px] leading-snug text-white sm:text-[13px]`}>
            Goblin shark <span className="text-[#f0abfc]">+100</span>
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'FINISH THE DIVE',
    body: 'Surface with your depth. Daily is once shared; Unlimited keeps going.',
    graphic: (
      <div className="flex items-center justify-center gap-3">
        <PixelSquidMascot happy />
        <div className="rounded-lg border-2 border-[#a78bfa]/70 bg-[#0a1a3a]/95 px-3 py-2 text-center shadow-[0_0_16px_rgba(167,139,250,0.25)]">
          <p className={`${pixelFont.className} text-[7px] uppercase tracking-widest text-[#c4b5fd]`}>
            Depth
          </p>
          <p className={`${bodyFont.className} mt-1 text-base font-bold text-white`}>1,240m</p>
        </div>
      </div>
    ),
  },
];

export default function HeroSection() {
  return (
    <section
      id="top"
      aria-labelledby="how-to-play-heading"
      className={`relative isolate overflow-x-hidden overflow-y-auto bg-[#040816] ${HERO_SHELL}`}
    >
      <div className="absolute inset-0">
        <OceanAtmosphere />
      </div>
      <div aria-hidden="true" className="scanlines pointer-events-none absolute inset-0 z-[1] opacity-40" />

      {/* Equal gaps between blocks — cards stay compact, only spacing grows */}
      <div
        className={`relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-evenly px-4 py-5 sm:px-6 lg:h-full lg:max-h-full lg:px-8 lg:py-6 ${HERO_SHELL}`}
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="shrink-0 text-center"
        >
          <h1
            id="how-to-play-heading"
            className={`${pixelFont.className} text-[clamp(1.5rem,4.5vw,2.55rem)] leading-tight text-white [text-shadow:4px_0_0_#7c3aed,-3px_0_0_#22d3ee,0_0_28px_rgba(167,139,250,0.35)]`}
          >
            THE KRILLION GAME
          </h1>
          <p
            className={`${pixelFont.className} mt-3.5 text-[8px] uppercase leading-relaxed tracking-[0.16em] text-[#c4b5fd] sm:text-[10px]`}
          >
            HOW TO PLAY · DAILY 8×20 · UNLIMITED 6×20
          </p>
        </motion.div>

        {/* Four step cards — natural height only */}
        <motion.div
          id="how-to-play"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="relative mx-auto w-full max-w-5xl shrink-0"
        >
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {HOW_TO_STEPS.map((step) => (
              <article key={step.title} className={stepCardClass}>
                <h2
                  className={`${pixelFont.className} text-[9px] leading-relaxed text-white sm:text-[10px]`}
                >
                  {step.title}
                </h2>
                <div className="my-3.5 flex flex-1 items-center justify-center">{step.graphic}</div>
                <p className={`${bodyFont.className} text-sm leading-snug text-[#cbd5e1]`}>
                  {step.body}
                </p>
              </article>
            ))}
          </div>

          <div className="pointer-events-none absolute -right-3 top-1 bottom-1 hidden w-16 xl:block 2xl:-right-6">
            <OceanDepthScale />
          </div>
        </motion.div>

        {/* Scoring + CTA */}
        <div className="flex shrink-0 flex-col items-center gap-4 sm:gap-5">
          <div className="flex w-full max-w-3xl items-center gap-3.5 rounded-2xl border-2 border-[#c4b5fd]/55 bg-[#070f24]/82 px-4 py-3.5 shadow-[0_0_0_1px_rgba(167,139,250,0.12),0_12px_36px_rgba(2,6,23,0.5)] backdrop-blur-[3px] sm:gap-4 sm:px-6">
            <div className="shrink-0 drop-shadow-[0_0_10px_rgba(232,121,249,0.45)]">
              <PixelLightbulbGraphic />
            </div>
            <p className={`${bodyFont.className} text-sm leading-snug text-[#e2e8f0] sm:text-[15px]`}>
              <span className={`${pixelFont.className} mr-2 text-[8px] text-[#f0abfc] sm:text-[9px]`}>
                SCORING TWIST:
              </span>
              Common answers work — but a one in a krillion hit sinks you deepest.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/daily-challenge"
              className={`${bodyFont.className} group inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl border-2 border-[#e9d5ff] bg-gradient-to-r from-[#6d28d9] via-[#3730a3] to-[#0e7490] px-9 py-3.5 text-base font-bold tracking-wide text-white shadow-[0_0_32px_rgba(192,132,252,0.45),inset_0_1px_0_rgba(255,255,255,0.15)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_0_42px_rgba(232,121,249,0.55),inset_0_1px_0_rgba(255,255,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 sm:min-h-14 sm:px-11 sm:text-lg`}
            >
              <span
                aria-hidden="true"
                className="text-[#e9d5ff] transition-transform group-hover:translate-y-0.5"
              >
                ▼
              </span>
              <span>TODAY&apos;S DIVE</span>
              <span
                aria-hidden="true"
                className="text-[#e9d5ff] transition-transform group-hover:translate-y-0.5"
              >
                ▼
              </span>
            </Link>
            <Link
              href="/unlimited-krillion"
              className={`${bodyFont.className} inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-300/50 bg-[#07122b]/85 px-6 py-3 text-sm font-semibold text-cyan-100 transition-colors hover:border-cyan-200 hover:text-white sm:min-h-14 sm:px-8 sm:text-base`}
            >
              Unlimited
            </Link>
          </div>
        </div>

        {/* Side slogans */}
        <p
          aria-hidden="true"
          className={`${bodyFont.className} pointer-events-none absolute left-3 top-[42%] hidden -translate-y-1/2 rotate-180 text-[10px] font-semibold tracking-[0.38em] text-[#94a3b8]/40 [writing-mode:vertical-rl] lg:block xl:left-5`}
        >
          CURIOSITY GOES DEEPER
        </p>
        <p
          aria-hidden="true"
          className={`${bodyFont.className} pointer-events-none absolute right-3 top-[62%] hidden text-[10px] font-semibold tracking-[0.32em] text-[#94a3b8]/35 [writing-mode:vertical-rl] xl:block 2xl:right-5`}
        >
          SAME OCEAN · NEW DISCOVERIES
        </p>
        <p
          aria-hidden="true"
          className={`${bodyFont.className} pointer-events-none absolute right-3 top-[clamp(1.5rem,4vh,2.5rem)] hidden text-right text-[10px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-[#c4b5fd]/55 xl:block 2xl:right-5`}
        >
          Deeper questions
          <br />
          Brighter minds
        </p>
      </div>
    </section>
  );
}
