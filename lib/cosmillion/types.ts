export type CosmillionOption = {
  id: string;
  label: string;
  correct: boolean;
};

export type CosmillionPrompt = {
  id: string;
  prompt: string;
  highlight?: string;
  seconds: number;
  options: CosmillionOption[];
};

export type CosmillionPack = {
  id: string;
  title: string;
  prompts: CosmillionPrompt[];
};

export type RarityBand = 'popular' | 'rare' | 'ultra';

export type CosmillionMode = 'classic' | 'survival' | 'hunt';

export type PlayerChip = {
  id: string;
  name: string;
  color: string;
  isYou: boolean;
  score: number;
  alive: boolean;
  crystals: number;
};
