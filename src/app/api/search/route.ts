import { NextRequest, NextResponse } from 'next/server';
import { searchService } from '@/lib/services/search-service';
import { isLiveMode } from '@/lib/adapters';
import type { ProductCategory } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get('q') || '';
  const category = (searchParams.get('category') as ProductCategory) || undefined;
  const brand = searchParams.get('brand');
  const brands = brand ? [brand] : undefined;
  const sortBy = searchParams.get('sortBy') as any;
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1;
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 20;

  // Check if suggestions requested
  const suggestionsOnly = searchParams.get('suggest') === 'true';
  if (suggestionsOnly) {
    const suggestions = await searchService.getSuggestions(query);
    return NextResponse.json({
      success: true,
      data: suggestions,
    });
  }

  try {
    const results = await searchService.search({
      query,
      category,
      brands,
      sortBy,
      page,
      limit,
    });

    const isLive = isLiveMode();

    return NextResponse.json({
      success: true,
      data: results,
      meta: {
        timestamp: new Date().toISOString(),
        dataSource: isLive ? 'live' : 'mock',
        cached: false,
      },
    });
  } catch (err: any) {
    console.error('Search API error:', err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Failed to search products',
      },
      { status: 500 },
    );
  }
}
