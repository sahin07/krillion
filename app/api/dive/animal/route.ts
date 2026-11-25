import { NextResponse } from 'next/server';
import { getAnimalPack, toAnimalPublicPack } from '@/lib/dive/animal';

export const dynamic = 'force-dynamic';

/** Animal Krillion public pack (no answer keys). */
export async function GET() {
  const pack = getAnimalPack();
  return NextResponse.json({
    mode: 'animal' as const,
    pack: toAnimalPublicPack(pack),
  });
}
