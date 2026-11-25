import { NextResponse } from 'next/server';
import { getWordplayPack, getWordplayPrompt } from '@/lib/dive/wordplay';
import { judgeWordplayAnswer } from '@/lib/dive/wordplay-validate';

export const dynamic = 'force-dynamic';

type Body = {
  packId?: string;
  promptId?: string;
  answer?: string | null;
  timedOut?: boolean;
  usedWords?: string[];
};

/** Wordplay-only judge: dictionary + rule + frequency rarity + duplicates. */
export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const packId = body.packId?.trim();
  const promptId = body.promptId?.trim();
  if (!packId || !promptId) {
    return NextResponse.json({ error: 'packId and promptId are required' }, { status: 400 });
  }

  const pack = getWordplayPack(packId);
  if (pack.id !== packId && packId !== 'wordplay-1') {
    // still allow default pack if unknown id falls back
  }
  const prompt = getWordplayPrompt(pack, promptId);
  if (!prompt) {
    return NextResponse.json({ error: 'Unknown prompt' }, { status: 404 });
  }

  const judged = judgeWordplayAnswer({
    prompt,
    answer: body.answer ?? null,
    timedOut: Boolean(body.timedOut),
    usedWords: Array.isArray(body.usedWords) ? body.usedWords : [],
  });

  if (!judged.ok) {
    return NextResponse.json({
      result: {
        promptId: prompt.id,
        prompt: prompt.prompt,
        submitted: judged.word,
        acceptedLabel: null,
        tier: null,
        tierLabel: null,
        points: 0,
        timedOut: judged.code === 'timeout',
        failCode: judged.code,
        failMessage: judged.message,
      },
    });
  }

  return NextResponse.json({
    result: {
      promptId: prompt.id,
      prompt: prompt.prompt,
      submitted: judged.word,
      acceptedLabel: judged.word,
      tier: judged.tier,
      tierLabel: judged.tierLabel,
      points: judged.points,
      timedOut: false,
      rarityReason: judged.reason,
    },
  });
}
