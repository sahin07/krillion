import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/site-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/daily-challenge',
    '/unlimited-krillion',
    '/minecraft-krillion-game',
    '/reverse-krillion',
    '/noillirk',
    '/pokemon-krillion',
    '/sports-krillion',
    '/nba-krillion',
    '/long-shot-krillion',
    '/puffer-party-krillion',
    '/cosmillion',
    '/stranger-things-krillion',
    '/farflung',
    '/krillion-animal',
    '/wordplay-krillion',
    '/science-krillion',
    '/medical-krillion',
    '/great-ape-krillion',
    '/games',
    '/games-like-krillion',
    '/one-in-a-krillion',
    '/guides',
    '/guides/too-clever',
    '/guides/answers-today',
    '/leaderboards',
    '/privacy',
    '/terms',
    '/contact',
    '/about',
  ];

  return routes.map((route) => ({
    url: `${SITE_CONFIG.url}${route || '/'}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
