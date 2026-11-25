'use client';

import { ArrowDown } from 'lucide-react';
import { pixelFont } from '@/lib/fonts';
import {
  PixelLightbulbGraphic,
  PixelSquidMascot,
  PixelStopwatchGraphic,
} from '@/components/PixelOceanArt';

const STEPS = [
  {
    title: 'BEGIN DESCENT',
    body: 'Start a run and get ready for 6 questions.',
    graphic: (
      <div className="flex flex-col items-center gap-1.5">
        <PixelSquidMascot />
        <ArrowDown className="h-4 w-4 text-[#c4b5fd]" aria-hidden="true" />
      </div>
    ),
  },
  {
    title: 'ANSWER FAST',
    body: 'You have 20 seconds for each question.',
    graphic: <PixelStopwatchGraphic />,
  },
  {
    title: 'THINK BEYOND THE OBVIOUS',
    body: 'Valid rare answers score higher and take you deeper.',
    graphic: (
      <div className="flex w-full max-w-[10.5rem] flex-col gap-1.5">
        <div className="rounded-sm border border-[#7dd3fc]/55 bg-[#0a1c3f]/90 px-2 py-1.5 text-left">
          <p className={`${pixelFont.className} text-[7px] leading-relaxed text-[#e2e8f0]`}>
            Shark <span className="text-[#94a3b8]">+10</span>
          </p>
        </div>
        <div className="rounded-sm border border-[#e879f9] bg-[#2a1050]/95 px-2 py-1.5 text-left shadow-[0_0_14px_rgba(232,121,249,0.35)]">
          <p className={`${pixelFont.className} text-[7px] leading-relaxed text-white`}>
            Goblin shark <span className="text-[#f0abfc]">+100</span>
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'FINISH THE DIVE',
    body: 'Complete all 6 questions, review your depth, then dive again with no daily limit.',
    graphic: (
      <div className="flex items-center justify-center gap-2.5">
        <PixelSquidMascot happy />
        <div className="rounded-sm border border-[#a78bfa]/55 bg-[#0a1a3a]/95 px-2 py-1.5 text-center">
          <p className={`${pixelFont.className} text-[6px] uppercase tracking-widest text-[#c4b5fd]`}>
            Depth
          </p>
          <p className={`${pixelFont.className} mt-1 text-[8px] text-white`}>1,240m</p>
        </div>
      </div>
    ),
  },
];

export default function HowToPlayLobbySection() {
  return (
    <section
      id="how-to-play"
      aria-labelledby="how-to-play-heading"
      className="relative border-t border-sky-400/10 bg-[#040816] py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            id="how-to-play-heading"
            className={`${pixelFont.className} text-[clamp(1.1rem,3vw,1.75rem)] text-white [text-shadow:3px_0_0_#7c3aed,-2px_0_0_#22d3ee]`}
          >
            HOW TO PLAY
          </h2>
          <p
            className={`${pixelFont.className} mt-3 text-[8px] tracking-[0.14em] text-[#c4b5fd] sm:text-[9px]`}
          >
            KRILLION UNLIMITED · THE ENDLESS DIVE
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {STEPS.map((step) => (
            <article
              key={step.title}
              className="flex min-h-[200px] flex-col items-center justify-between border border-[#a78bfa]/55 bg-[#07122b]/85 px-3 py-4 text-center"
            >
              <h3 className={`${pixelFont.className} text-[8px] leading-relaxed text-white sm:text-[9px]`}>
                {step.title}
              </h3>
              <div className="my-3 flex flex-1 items-center justify-center">{step.graphic}</div>
              <p className={`${pixelFont.className} text-[6px] leading-relaxed text-[#cbd5e1] sm:text-[7px]`}>
                {step.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-5 flex max-w-3xl items-center gap-3 border border-[#7dd3fc]/40 bg-[#06132b]/90 px-3 py-3 sm:px-5">
          <PixelLightbulbGraphic />
          <p className={`${pixelFont.className} text-[6px] leading-relaxed text-[#e2e8f0] sm:text-[7px]`}>
            <span className="text-[#f0abfc]">SCORING TWIST:</span> Common answers work, but unusual
            correct answers earn more points.
          </p>
        </div>
      </div>
    </section>
  );
}
