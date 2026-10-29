'use client';

// =============================================================================
// Quick Compare — SearchResults Component
// Calls /api/search to support real live API or explicit mock data
// =============================================================================

import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type {
  FilterOptions,
  Product,
  ProductCategory,
  PlatformListing,
  SearchParams,
} from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { FilterPanel } from '@/components/search/FilterPanel';
import { EmptyState } from '@/components/ui/EmptyState';
import { HeroSearchBar } from '@/components/search/HeroSearchBar';
import { CATEGORIES } from '@/lib/constants';

export function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') as ProductCategory | null;
  const sortByParam = (searchParams.get('sortBy') as any) || 'relevance';

  const [activeFilters, setActiveFilters] = useState<Partial<SearchParams>>({
    query,
    category: categoryParam || undefined,
    sortBy: sortByParam,
    brands: [],
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [listingsMap, setListingsMap] = useState<Record<string, PlatformListing[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'live' | 'mock'>('live');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    setActiveFilters((prev) => ({
      ...prev,
      query,
      category: categoryParam || undefined,
      sortBy: sortByParam,
    }));
  }, [query, categoryParam, sortByParam]);

  // Fetch from Search API
  useEffect(() => {
    let isCancelled = false;

    async function fetchResults() {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (activeFilters.query) params.set('q', activeFilters.query);
        if (activeFilters.category) params.set('category', activeFilters.category);
        if (activeFilters.sortBy) params.set('sortBy', activeFilters.sortBy);
        if (activeFilters.brands && activeFilters.brands.length > 0) {
          params.set('brand', activeFilters.brands[0]);
        }

        const res = await fetch(`/api/search?${params.toString()}`);
        const data = await res.json();

        if (isCancelled) return;

        if (res.ok && data.success) {
          setProducts(data.data?.products || []);
          setListingsMap(data.data?.listingsMap || {});
          setDataSource(data.meta?.dataSource || 'live');
        } else {
          setError(data.error || 'Failed to fetch search results.');
        }
      } catch (err: any) {
        if (!isCancelled) {
          setError(err?.message || 'Network error fetching comparison results.');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchResults();

    return () => {
      isCancelled = true;
    };
  }, [activeFilters]);

  // Dynamic filter options generated from active results
  const filterOptions: FilterOptions = useMemo(() => {
    const brandCounts: Record<string, number> = {};
    for (const p of products) {
      if (p.brand) {
        brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
      }
    }
    const brands = Object.entries(brandCounts)
      .map(([value, count]) => ({ value, label: value, count }))
      .sort((a, b) => b.count - a.count);

    const categories = Object.entries(CATEGORIES).map(([key, item]) => ({
      value: key as ProductCategory,
      label: item.label,
      count: products.filter((p) => p.category === key).length,
    }));

    return {
      categories,
      brands,
      priceRange: { min: 10, max: 2000 },
      platforms: [
        { value: 'blinkit', label: 'Blinkit', count: products.length },
        { value: 'zepto', label: 'Zepto', count: products.length },
        { value: 'swiggy-instamart', label: 'Swiggy Instamart', count: products.length },
        { value: 'bigbasket', label: 'BigBasket', count: products.length },
      ],
    };
  }, [products]);

  const handleFilterChange = (newFilters: Partial<SearchParams>) => {
    setActiveFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as any;
    setActiveFilters((prev) => ({ ...prev, sortBy: val }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      query: '',
      category: undefined,
      brands: [],
      sortBy: 'relevance',
    });
    router.push('/search');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center justify-between pb-2">
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters &amp; Sort
        </button>
        <span className="text-xs text-slate-500 font-medium">
          {products.length} items found
        </span>
      </div>

      {/* Sidebar Filters */}
      <div
        className={`w-full lg:w-64 shrink-0 ${
          mobileFilterOpen ? 'block' : 'hidden lg:block'
        }`}
      >
        <div className="sticky top-20">
          <FilterPanel
            filters={filterOptions}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Main Results View */}
      <div className="flex-1 space-y-6">
        {/* Search Bar with Autocomplete */}
        <div className="pb-2">
          <HeroSearchBar key={query} initialQuery={query} className="max-w-full" />
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">
                {query ? (
                  <>
                    Results for &ldquo;<span className="text-amber-800">{query}</span>&rdquo;
                  </>
                ) : activeFilters.category ? (
                  CATEGORIES[activeFilters.category]?.label || 'Category'
                ) : (
                  'All Products'
                )}
              </h1>
              {dataSource === 'live' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Live Data
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Showing {products.length} products available across platforms
            </p>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={activeFilters.sortBy || 'relevance'}
              onChange={handleSortChange}
              aria-label="Sort products"
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs focus:border-slate-800 focus:outline-none"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="delivery-time">Fastest Delivery</option>
            </select>
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs space-y-3">
                <div className="bg-slate-100 rounded-xl h-36 w-full" />
                <div className="h-4 bg-slate-100 rounded-sm w-3/4" />
                <div className="h-3 bg-slate-100 rounded-sm w-1/2" />
                <div className="h-5 bg-slate-100 rounded-sm w-1/3 pt-2" />
              </div>
            ))}
          </div>
        )}

        {/* Error Display */}
        {!loading && error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center space-y-3">
            <div className="inline-flex p-3 rounded-full bg-rose-100 text-rose-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-rose-900">Live Search Request Failed</h3>
            <p className="text-xs text-rose-700 max-w-md mx-auto">{error}</p>
            <button
              onClick={() => setActiveFilters({ ...activeFilters })}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs"
            >
              Retry Search
            </button>
          </div>
        )}

        {/* Results Grid or Empty State */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                listings={listingsMap[product.id] || []}
              />
            ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <EmptyState
            title="No matching products found"
            description="Try searching with a different brand, generic term (e.g. 'milk', 'atta', 'bread'), or clear active filters."
            actionLabel="Clear all filters"
            onAction={clearAllFilters}
          />
        )}
      </div>
    </div>
  );
}
