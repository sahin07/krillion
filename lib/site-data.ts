export interface NavItem {
  label: string;
  href: string;
}

export interface GameCategory {
  id: string;
  title: string;
  description: string;
  href: string;
  kicker: string;
  iconName: 'compass' | 'infinity' | 'layers' | 'trophy';
}

export interface WhyPlayFeature {
  number: string;
  title: string;
  description: string;
}

export interface HowToPlayStep {
  step: string;
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const SITE_CONFIG = {
  name: 'KrillionPro',
  brandKeyword: 'Krillion',
  url: 'https://krillionpro.com',
  title: 'Krillion Game | Play The Krillion Game Free Online | KrillionPro',
  description:
    'Play the Krillion game free in your browser. Rare-answer trivia where one in a krillion hits sink deeper. Daily Krillion, Unlimited practice, and themed Krillion games on KrillionPro.',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/#top' },
  { label: 'Krillion Games', href: '/games' },
  { label: 'Daily Challenge', href: '/daily-challenge' },
  { label: 'FAQ', href: '/#faq' },
];

export const GAME_CATEGORIES: GameCategory[] = [
  {
    id: 'daily-challenges',
    title: 'Daily Krillion',
    kicker: 'Shared Dive · Daily Edition',
    description:
      'Today’s Daily Dive: eight shared prompts, twenty seconds each. Rare correct answers sink you deeper.',
    href: '/daily-challenge',
    iconName: 'compass',
  },
  {
    id: 'unlimited-games',
    title: 'Unlimited Krillion',
    kicker: 'Open Play · No Wait',
    description:
      'Krillion unlimited practice anytime — six prompts, twenty seconds, dive again without waiting for tomorrow.',
    href: '/unlimited-krillion',
    iconName: 'infinity',
  },
  {
    id: 'krillion-games',
    title: 'Krillion Games',
    kicker: 'All Modes · Hub',
    description:
      'Browse every live Krillion mode — themed challenges, rare-answer dives, and more.',
    href: '/games',
    iconName: 'layers',
  },
  {
    id: 'leaderboards',
    title: 'Leaderboards',
    kicker: 'Friendly Competition · Scores',
    description:
      'Track personal milestones, compare daily finishes, and aim for deeper rare-answer runs.',
    href: '/leaderboards',
    iconName: 'trophy',
  },
];

export const WHY_PLAY_FEATURES: WhyPlayFeature[] = [
  {
    number: '01',
    title: 'Thoughtful Prompts Over Noise',
    description:
      'Every Krillion challenge is crafted to reward curiosity, pattern recognition, and lateral deduction rather than rote memorization.',
  },
  {
    number: '02',
    title: 'Focused Daily Rituals',
    description:
      'Enjoy a crisp, distraction-free session that fits naturally into your morning coffee or afternoon break without endless clutter.',
  },
  {
    number: '03',
    title: 'Variety Across Modes',
    description:
      'Move seamlessly between Daily Krillion, Unlimited Krillion, and themed Krillion games as new modes roll out on KrillionPro.',
  },
  {
    number: '04',
    title: 'Built for Any Screen',
    description:
      'Fast page loads, legible dark-navy contrast, and responsive layouts ensure smooth reading and play on desktop, tablet, and phone.',
  },
];

export const HOW_TO_PLAY_STEPS: HowToPlayStep[] = [
  {
    step: '01',
    title: 'Pick Your Challenge Mode',
    description:
      'Start with Today’s Daily Challenge for a shared prompt set, or browse Unlimited and other Krillion games.',
  },
  {
    step: '02',
    title: 'Read the Clue & Weigh Your Instincts',
    description:
      'Each prompt combines general knowledge with clever estimation and deduction. Think carefully before locking in your answer.',
  },
  {
    step: '03',
    title: 'Score Higher with Precision',
    description:
      'Closer guesses and sharper answers carry stronger results, encouraging thoughtful reasoning on every round.',
  },
  {
    step: '04',
    title: 'Return & Refine Your Streak',
    description:
      'Come back for new Krillion challenges each day, explore fresh topic packs, and steadily improve your personal best.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'what-is-krillion',
    question: 'What is Krillion?',
    answer:
      'Krillion is rare-answer trivia: each prompt has many valid answers, and uncommon correct ones score more. On KrillionPro that score becomes ocean depth — play Daily Dive, Unlimited, or themed packs free in the browser.',
  },
  {
    id: 'what-is-a-krillion-game',
    question: 'What is a Krillion game?',
    answer:
      'A Krillion game is rare-answer trivia: prompts have many valid answers, and uncommon correct answers score more. On KrillionPro that score also becomes ocean depth. Play Daily Krillion, Unlimited Krillion, or themed packs like Minecraft Krillion.',
  },
  {
    id: 'what-is-krillionpro',
    question: 'What is KrillionPro?',
    answer:
      'KrillionPro is the free browser home for the Krillion game. Play the Daily Dive, Unlimited practice, and themed Krillion games without downloading an app.',
  },
  {
    id: 'what-is-one-in-a-krillion',
    question: 'What does “one in a krillion” mean?',
    answer:
      'One in a krillion is the top rarity tier: a correct answer almost nobody else would type first. It is worth 100 points — about ten times a basic plankton hit.',
  },
  {
    id: 'what-is-the-krillion',
    question: 'What is the Krillion?',
    answer:
      'The Krillion is the rare-answer trivia idea itself — open prompts, rarity scoring, and depth. KrillionPro is where you play the Krillion game in the browser.',
  },
  {
    id: 'how-daily-challenge-works',
    question: 'How does Daily Krillion (Daily Challenge) work?',
    answer:
      'Daily Dive serves eight shared prompts with twenty seconds each. Type one answer per prompt. Correct answers land in rarity tiers from Plankton to One in a Krillion. Your points become ocean depth (10 metres per point).',
  },
  {
    id: 'what-are-game-packs',
    question: 'What other Krillion games can I play?',
    answer:
      'Besides Daily Dive, play Unlimited Krillion for extra ocean packs anytime, or open Minecraft Krillion for Minecraft-themed prompts with the same rarity scoring. More themed packs are planned over time.',
  },
  {
    id: 'do-i-need-an-account',
    question: 'Do I need to download anything to play the Krillion game?',
    answer:
      'No. The Krillion game on KrillionPro runs in modern browsers on phone, tablet, and desktop. No account is required for the core games.',
  },
  {
    id: 'is-krillionpro-free',
    question: 'Is the Krillion game free?',
    answer:
      'Yes. Core Krillion games are free to play in the browser. See Privacy Policy and Terms of Use for how the site operates if advertising is added later.',
  },
];
