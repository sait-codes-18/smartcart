import { NextRequest, NextResponse } from 'next/server';
import { getProductById, getListingsForProduct } from '@/lib/mock-data';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const product = getProductById(id);

  if (!product) {
    return NextResponse.json(
      {
        success: false,
        error: `Product with ID '${id}' not found.`,
      },
      { status: 404 },
    );
  }

  const currentListings = getListingsForProduct(id);

  // Generate mock price history
  const history = currentListings.map((listing) => ({
    platformId: listing.platformId,
    currentPrice: listing.price,
    mrp: listing.mrp,
    observations: [
      { date: new Date(Date.now() - 0).toISOString(), price: listing.price },
      { date: new Date(Date.now() - 86400000 * 3).toISOString(), price: listing.price },
      { date: new Date(Date.now() - 86400000 * 7).toISOString(), price: listing.price + (listing.price % 3 === 0 ? 2 : -1) },
      { date: new Date(Date.now() - 86400000 * 14).toISOString(), price: listing.price - 1 },
      { date: new Date(Date.now() - 86400000 * 30).toISOString(), price: listing.mrp },
    ],
  }));

  return NextResponse.json({
    success: true,
    data: {
      product,
      history,
    },
    meta: {
      timestamp: new Date().toISOString(),
      dataSource: 'mock',
      cached: false,
    },
  });
}
