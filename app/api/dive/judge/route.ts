import { NextResponse } from 'next/server';
import { resolvePackById } from '@/lib/dive/dives';
import { judgeAnswer } from '@/lib/dive/engine';

type JudgeBody = {
  packId?: string;
  promptId?: string;
  answer?: string | null;
  timedOut?: boolean;
  /** `common` flips rarity so crowd favorites score most (Noillirk / Reverse) */
  scoring?: 'rare' | 'common';
};

/** Grade one answer against the curated pack (server-side key). */
export async function POST(request: Request) {
  let body: JudgeBody;
  try {
    body = (await request.json()) as JudgeBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const packId = body.packId?.trim();
  const promptId = body.promptId?.trim();
  if (!packId || !promptId) {
    return NextResponse.json({ error: 'packId and promptId are required' }, { status: 400 });
  }

  const pack = resolvePackById(packId);
  if (!pack) {
    return NextResponse.json({ error: 'Unknown pack' }, { status: 404 });
  }

  const prompt = pack.prompts.find((p) => p.id === promptId);
  if (!prompt) {
    return NextResponse.json({ error: 'Unknown prompt' }, { status: 404 });
  }

  const scoring = body.scoring === 'common' ? 'common' : 'rare';
  const result = judgeAnswer(prompt, body.answer ?? null, Boolean(body.timedOut), { scoring });
  return NextResponse.json({ result });
}
