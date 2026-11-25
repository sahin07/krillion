import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DailyDiveGame from '@/components/dive/DailyDiveGame';
import DailyChallengeSections from '@/components/dive/DailyChallengeSections';
import DailySeoArticle from '@/components/dive/DailySeoArticle';

export const metadata: Metadata = {
  title: 'Daily Krillion Challenge · The Daily Dive | KrillionPro',
  description:
    'Play Daily Krillion: today’s shared Daily Dive with eight questions, twenty seconds each. Rare answers take you deeper. One dive for everyone on KrillionPro.',
  keywords: [
    'daily krillion',
    'daily challenge',
    'daily dive',
    'krillion daily',
    'daily games',
    'one in a krillion',
  ],
  alternates: {
    canonical: '/daily-challenge',
  },
};

export default function DailyChallengePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="flex min-h-[40vh] items-center justify-center bg-[#040816] text-cyan-200">
              Loading Daily Dive…
            </div>
          }
        >
          <DailyDiveGame />
        </Suspense>
        <DailyChallengeSections />
        <DailySeoArticle />
      </main>
      <Footer />
    </div>
  );
}
