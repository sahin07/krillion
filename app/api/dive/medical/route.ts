import { NextResponse } from 'next/server';
import { getMedicalPack, toMedicalPublicPack } from '@/lib/dive/medical';

export const dynamic = 'force-dynamic';

/** Medical Krillion public pack (no answer keys). */
export async function GET() {
  const pack = getMedicalPack();
  return NextResponse.json({
    mode: 'medical' as const,
    pack: toMedicalPublicPack(pack),
  });
}
