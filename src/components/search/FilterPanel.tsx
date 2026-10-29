'use client';

// =============================================================================
// Quick Compare — FilterPanel Component
// =============================================================================

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import type { FilterOptions, SearchParams, AvailabilityStatus } from '@/types';

interface FilterPanelProps {
  /** Available filter options with counts */
  filters: FilterOptions;
  /** Currently active filters */
  activeFilters: Partial<SearchParams>;
  /** Callback when any filter value changes */
  onFilterChange: (filters: Partial<SearchParams>) => void;
  /** Additional CSS classes */
  className?: string;
}

/** Collapsible section used within the filter panel */
function FilterSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-semibold text-gray-900"
        aria-expanded={open}
      >
        {title}
        {/* Chevron */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={cn(
            'transition-transform',
            open ? 'rotate-180' : 'rotate-0',
          )}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'delivery-time', label: 'Fastest Delivery' },
  { value: 'value', label: 'Best Value' },
] as const;

const AVAILABILITY_OPTIONS: { value: '' | AvailabilityStatus; label: string }[] = [
  { value: '', label: 'All' },
  { value: 'in-stock', label: 'In Stock' },
  { value: 'out-of-stock', label: 'Out of Stock' },
];

/**
 * Sidebar/drawer filter panel with category, brand, price, availability, and sort filters.
 * Collapsible sections with counts. Responsive layout.
 */
export function FilterPanel({
  filters,
  activeFilters,
  onFilterChange,
  className,
}: FilterPanelProps) {
  const selectedCategories = activeFilters.category ? [activeFilters.category] : [];
  const selectedBrands = activeFilters.brands ?? [];
  const minPrice = activeFilters.minPrice ?? filters.priceRange.min;
  const maxPrice = activeFilters.maxPrice ?? filters.priceRange.max;

  const handleCategoryToggle = (category: string) => {
    const isSelected = selectedCategories.includes(category as never);
    onFilterChange({
      ...activeFilters,
      category: isSelected ? undefined : (category as SearchParams['category']),
    });
  };

  const handleBrandToggle = (brand: string) => {
    const updated = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    onFilterChange({ ...activeFilters, brands: updated.length > 0 ? updated : undefined });
  };

  const handlePriceChange = (key: 'minPrice' | 'maxPrice', value: string) => {
    const num = parseInt(value, 10);
    if (isNaN(num) && value !== '') return;
    onFilterChange({
      ...activeFilters,
      [key]: value === '' ? undefined : num,
    });
  };

  const handleAvailabilityChange = (val: string) => {
    onFilterChange({
      ...activeFilters,
      availability: val ? (val as AvailabilityStatus) : undefined,
    });
  };

  const handleSortChange = (val: string) => {
    onFilterChange({
      ...activeFilters,
      sortBy: val as SearchParams['sortBy'],
    });
  };

  const handleClearAll = () => {
    onFilterChange({ query: activeFilters.query });
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    activeFilters.minPrice !== undefined ||
    activeFilters.maxPrice !== undefined ||
    activeFilters.availability !== undefined ||
    (activeFilters.sortBy && activeFilters.sortBy !== 'relevance');

  return (
    <aside className={cn('w-full lg:w-64 shrink-0', className)}>
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-900">Filters</h2>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={handleClearAll}>
              Clear All
            </Button>
          )}
        </div>

        {/* Sort */}
        <FilterSection title="Sort By" defaultOpen>
          <select
            value={activeFilters.sortBy ?? 'relevance'}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Sort by"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FilterSection>

        {/* Categories */}
        <FilterSection title="Category" defaultOpen>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {filters.categories.map((cat) => (
              <label
                key={cat.value}
                className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.value)}
                  onChange={() => handleCategoryToggle(cat.value)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="flex-1 truncate">{cat.label}</span>
                <span className="text-xs text-gray-400">{cat.count}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Brands */}
        <FilterSection title="Brand" defaultOpen={false}>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {filters.brands.map((brand) => (
              <label
                key={brand.value}
                className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand.value)}
                  onChange={() => handleBrandToggle(brand.value)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="flex-1 truncate">{brand.label}</span>
                <span className="text-xs text-gray-400">{brand.count}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range" defaultOpen>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label htmlFor="min-price" className="sr-only">
                Minimum price
              </label>
              <input
                id="min-price"
                type="number"
                placeholder={`₹${filters.priceRange.min}`}
                value={activeFilters.minPrice ?? ''}
                onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                min={0}
              />
            </div>
            <span className="text-gray-400 text-sm">—</span>
            <div className="flex-1">
              <label htmlFor="max-price" className="sr-only">
                Maximum price
              </label>
              <input
                id="max-price"
                type="number"
                placeholder={`₹${filters.priceRange.max}`}
                value={activeFilters.maxPrice ?? ''}
                onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                min={0}
              />
            </div>
          </div>
        </FilterSection>

        {/* Availability */}
        <FilterSection title="Availability" defaultOpen>
          <div className="space-y-1.5">
            {AVAILABILITY_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900"
              >
                <input
                  type="radio"
                  name="availability"
                  value={opt.value}
                  checked={
                    opt.value === ''
                      ? !activeFilters.availability
                      : activeFilters.availability === opt.value
                  }
                  onChange={() => handleAvailabilityChange(opt.value)}
                  className="border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </aside>
  );
}
