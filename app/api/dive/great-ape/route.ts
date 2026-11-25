import { NextResponse } from 'next/server';
import { getGreatApePack, toGreatApePublicPack } from '@/lib/dive/great-ape';

export const dynamic = 'force-dynamic';

/** Great Ape Krillion public pack (no answer keys). */
export async function GET() {
  const pack = getGreatApePack();
  return NextResponse.json({
    mode: 'great-ape' as const,
    pack: toGreatApePublicPack(pack),
  });
}
