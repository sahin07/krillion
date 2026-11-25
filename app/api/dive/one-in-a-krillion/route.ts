import { NextResponse } from 'next/server';
import { getOikPack, toOikPublicPack } from '@/lib/dive/one-in-a-krillion';

export const dynamic = 'force-dynamic';

/** One in a Krillion public pack (no answer keys). */
export async function GET() {
  const pack = getOikPack();
  return NextResponse.json({
    mode: 'one-in-a-krillion' as const,
    pack: toOikPublicPack(pack),
  });
}
