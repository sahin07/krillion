import { NextResponse } from 'next/server';
import { getSciencePack, toSciencePublicPack } from '@/lib/dive/science';

export const dynamic = 'force-dynamic';

/** Science Krillion public pack (no answer keys). */
export async function GET() {
  const pack = getSciencePack();
  return NextResponse.json({
    mode: 'science' as const,
    pack: toSciencePublicPack(pack),
  });
}
