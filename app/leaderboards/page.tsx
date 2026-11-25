import type { Metadata } from 'next';
import StagePlaceholderView from '@/components/StagePlaceholderView';

export const metadata: Metadata = {
  title: 'Leaderboards | KrillionPro',
  description:
    'Preview the upcoming KrillionPro Leaderboards hub for tracking scores and comparing daily challenge performance.',
  alternates: {
    canonical: '/leaderboards',
  },
};

export default function LeaderboardsPage() {
  return (
    <StagePlaceholderView
      title="Leaderboards"
      kicker="Krillion Rankings"
      description="This page is reserved for KrillionPro Leaderboards. When live scoring and player progression roll out in future stages, this hub will let you track personal milestones and compare challenge finishes."
      highlights={[
        'Clear score tracking across Daily Challenges and Krillion games',
        'Friendly comparison for players aiming to sharpen their accuracy',
        'Designed for transparent, fair challenge benchmarks',
      ]}
      iconName="trophy"
    />
  );
}
