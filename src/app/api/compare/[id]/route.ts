import { NextRequest, NextResponse } from 'next/server';
import { comparisonService } from '@/lib/services/comparison-service';
import type { UserLocation } from '@/types';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const { searchParams } = new URL(request.url);

  const pincode = searchParams.get('pincode');
  const city = searchParams.get('city');
  const nameHint = searchParams.get('name') || undefined;

  const location: UserLocation | undefined = pincode
    ? { pincode, city: city || undefined }
    : undefined;

  const comparison = await comparisonService.compareProduct(id, location, nameHint);

  if (!comparison) {
    return NextResponse.json(
      {
        success: false,
        error: `Product with ID '${id}' not found.`,
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    data: comparison,
    meta: {
      timestamp: new Date().toISOString(),
      dataSource: 'mock',
      cached: false,
    },
  });
}
