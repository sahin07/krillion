import {
  Outfit,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Press_Start_2P,
  Lilita_One,
  Nunito,
} from 'next/font/google';

export const displayFont = Outfit({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

export const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const pixelFont = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

/** Minecraft Krillion — thick blocky logo / CTA type */
export const minecraftDisplayFont = Lilita_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

/** Minecraft Krillion — rounded UI body */
export const minecraftUiFont = Nunito({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});
