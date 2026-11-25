'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { displayFont } from '@/lib/fonts';
import { FAQ_ITEMS } from '@/lib/site-data';

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-20 border-t border-[#67e8f9]/15 bg-[#040816] py-14 sm:py-16"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p
            className={`${displayFont.className} text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd3fc]`}
          >
            Frequently Asked Questions
          </p>
          <h2
            id="faq-heading"
            className={`${displayFont.className} mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl`}
          >
            Everything You Need to Know About KrillionPro
          </h2>
          <p
            className={`${displayFont.className} mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-300`}
          >
            Quick answers about how Krillion works, game modes, and upcoming releases.
          </p>
        </div>

        <div className="mt-10 border border-[#67e8f9]/40 bg-[#07122b]/85">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <div
                key={item.id}
                className={`px-5 py-4 sm:px-6 ${
                  index > 0 ? 'border-t border-[#67e8f9]/20' : ''
                }`}
              >
                <h3 className={`${displayFont.className} text-base font-semibold text-white`}>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="flex min-h-11 w-full items-center justify-between gap-4 text-left transition-colors duration-150 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <span className="text-base font-semibold sm:text-lg">{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-cyan-300 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className={`${displayFont.className} pt-3 pr-8 text-sm leading-relaxed text-slate-300 sm:text-base`}
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
