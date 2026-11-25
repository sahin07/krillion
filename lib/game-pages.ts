export type RelatedGameLink = {
  id: string;
  label: string;
  href: string;
};

/** Shared related-game pills for every game page (krillion.cc pattern) */
export const RELATED_GAMES: RelatedGameLink[] = [
  { id: 'daily', label: 'Daily Dive', href: '/daily-challenge' },
  { id: 'one-in-a-krillion', label: 'One in a Krillion', href: '/one-in-a-krillion' },
  { id: 'unlimited', label: 'Unlimited Krillion', href: '/unlimited-krillion' },
  { id: 'reverse', label: 'Noillirk / Reverse', href: '/reverse-krillion' },
  { id: 'pokemon', label: 'Pokémon Krillion', href: '/pokemon-krillion' },
  { id: 'sports', label: 'Sports Krillion', href: '/sports-krillion' },
  { id: 'long-shot', label: 'Long Shot Krillion', href: '/long-shot-krillion' },
  { id: 'puffer-party', label: 'Puffer Party', href: '/puffer-party-krillion' },
  { id: 'cosmillion', label: 'Cosmillion', href: '/cosmillion' },
  { id: 'minecraft', label: 'Minecraft Krillion', href: '/minecraft-krillion-game' },
  {
    id: 'stranger-things',
    label: 'Stranger Things Krillion',
    href: '/stranger-things-krillion',
  },
  { id: 'farflung', label: 'Farflung', href: '/farflung' },
  { id: 'animal', label: 'Animal Krillion', href: '/krillion-animal' },
  { id: 'wordplay', label: 'Wordplay Krillion', href: '/wordplay-krillion' },
  { id: 'science', label: 'Science Krillion', href: '/science-krillion' },
  { id: 'medical', label: 'Medical Krillion', href: '/medical-krillion' },
  { id: 'great-ape', label: 'Great Ape Krillion', href: '/great-ape-krillion' },
  { id: 'leaderboards', label: 'Leaderboards', href: '/leaderboards' },
];

export function zoneForDepth(meters: number): { title: string; blurb: string } {
  if (meters < 200) {
    return { title: 'THE SUNLIT SHALLOWS', blurb: 'warm water. everything can see you.' };
  }
  if (meters < 1000) {
    return { title: 'THE TWILIGHT ZONE', blurb: 'the light fades. keep going deeper.' };
  }
  if (meters < 3800) {
    return { title: 'THE MIDNIGHT ZONE', blurb: 'dark water. rare answers live here.' };
  }
  if (meters < 6000) {
    return { title: 'THE WRECK', blurb: 'a ship that never reached the shore.' };
  }
  return { title: 'THE TRENCH', blurb: 'one in a krillion territory.' };
}
