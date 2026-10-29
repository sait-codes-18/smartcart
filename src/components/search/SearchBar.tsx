'use client';

// =============================================================================
// Quick Compare — SearchBar Component
// =============================================================================

import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn, debounce } from '@/lib/utils';
import type { SearchSuggestion } from '@/types';

/** Search bar size variants */
type SearchBarSize = 'sm' | 'lg';

interface SearchBarProps {
  /** Size variant — 'lg' for homepage, 'sm' for header */
  size?: SearchBarSize;
  /** Callback fired on search submission */
  onSearch?: (query: string) => void;
  /** Additional CSS classes */
  className?: string;
}

/** Hardcoded suggestion data for client-side filtering */
const SUGGESTION_DATA: SearchSuggestion[] = [
  { text: 'Amul Milk 1L', type: 'product' },
  { text: 'Amul Butter 500g', type: 'product' },
  { text: 'Amul', type: 'brand' },
  { text: 'Aashirvaad Atta 5kg', type: 'product' },
  { text: 'Maggi Noodles', type: 'product' },
  { text: 'Tata Salt 1kg', type: 'product' },
  { text: 'Britannia Bread', type: 'product' },
  { text: 'Eggs (12 pack)', type: 'product' },
  { text: 'Mother Dairy Curd 400g', type: 'product' },
  { text: 'Fortune Sunflower Oil 1L', type: 'product' },
  { text: 'India Gate Rice 5kg', type: 'product' },
  { text: 'Parle-G Biscuits', type: 'product' },
  { text: "Lay's Chips", type: 'product' },
  { text: 'Surf Excel Detergent', type: 'product' },
  { text: 'Coca-Cola 750ml', type: 'product' },
  { text: 'Haldiram Namkeen', type: 'product' },
  { text: 'Dairy', type: 'category', category: 'dairy' },
  { text: 'Snacks', type: 'category', category: 'snacks' },
  { text: 'Beverages', type: 'category', category: 'beverages' },
  { text: 'Groceries', type: 'category', category: 'groceries' },
  { text: 'Personal Care', type: 'category', category: 'personal-care' },
  { text: 'Household', type: 'category', category: 'household' },
];

const TYPE_LABELS: Record<SearchSuggestion['type'], string> = {
  product: 'Product',
  brand: 'Brand',
  category: 'Category',
};

const sizeClasses: Record<SearchBarSize, { wrapper: string; input: string; icon: number }> = {
  sm: {
    wrapper: 'h-10',
    input: 'pl-9 pr-3 text-sm',
    icon: 16,
  },
  lg: {
    wrapper: 'h-14',
    input: 'pl-12 pr-4 text-base',
    icon: 20,
  },
};

/**
 * Main search input with debounced suggestion filtering and keyboard navigation.
 */
export function SearchBar({ size = 'lg', onSearch, className }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { wrapper, input, icon } = sizeClasses[size];

  // Filter suggestions with simulated loading
  const filterSuggestions = useCallback(
    debounce((q: string) => {
      if (q.trim().length < 1) {
        setSuggestions([]);
        setLoading(false);
        return;
      }
      const lower = q.toLowerCase();
      const filtered = SUGGESTION_DATA.filter((s) =>
        s.text.toLowerCase().includes(lower),
      ).slice(0, 8);
      setSuggestions(filtered);
      setLoading(false);
    }, 300),
    [],
  );

  const handleInputChange = (value: string) => {
    setQuery(value);
    setActiveIndex(-1);
    if (value.trim().length > 0) {
      setLoading(true);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setLoading(false);
    }
    filterSuggestions(value);
  };

  const submitSearch = (searchQuery: string) => {
    const q = searchQuery.trim();
    if (!q) return;
    setShowSuggestions(false);
    onSearch?.(q);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'category' && suggestion.category) {
      setShowSuggestions(false);
      router.push(`/search?category=${encodeURIComponent(suggestion.category)}`);
    } else {
      setQuery(suggestion.text);
      submitSearch(suggestion.text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        submitSearch(query);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1,
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          handleSuggestionClick(suggestions[activeIndex]);
        } else {
          submitSearch(query);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveIndex(-1);
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Group suggestions by type
  const grouped = suggestions.reduce<Record<string, SearchSuggestion[]>>(
    (acc, s) => {
      const key = s.type;
      if (!acc[key]) acc[key] = [];
      acc[key].push(s);
      return acc;
    },
    {},
  );

  let flatIndex = -1;

  return (
    <div ref={wrapperRef} className={cn('relative w-full', className)}>
      <div className={cn('relative', wrapper)}>
        {/* Search icon */}
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className={cn(
            'absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none',
            size === 'lg' ? 'left-4' : 'left-3',
          )}
        >
          <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M14 14L18 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim().length > 0 && suggestions.length > 0)
              setShowSuggestions(true);
          }}
          placeholder="Search for groceries, dairy, snacks..."
          className={cn(
            'w-full h-full rounded-xl border border-gray-300 bg-white',
            'placeholder:text-gray-400 text-gray-900',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
            'transition-shadow',
            input,
          )}
          role="combobox"
          aria-expanded={showSuggestions}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls="search-suggestions"
          aria-activedescendant={
            activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined
          }
        />

        {/* Submit button (visible on lg only) */}
        {size === 'lg' && (
          <button
            type="button"
            onClick={() => submitSearch(query)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Search"
          >
            Search
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div
          id="search-suggestions"
          role="listbox"
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 max-h-80 overflow-y-auto"
        >
          {loading && (
            <div className="px-4 py-3 text-sm text-gray-400 flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Searching…
            </div>
          )}

          {!loading && suggestions.length === 0 && query.trim().length > 0 && (
            <div className="px-4 py-3 text-sm text-gray-400">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}

          {!loading &&
            Object.entries(grouped).map(([type, items]) => (
              <div key={type}>
                <div className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50">
                  {TYPE_LABELS[type as SearchSuggestion['type']]}
                </div>
                {items.map((suggestion) => {
                  flatIndex++;
                  const idx = flatIndex;
                  return (
                    <button
                      key={`${type}-${suggestion.text}`}
                      id={`suggestion-${idx}`}
                      role="option"
                      aria-selected={activeIndex === idx}
                      className={cn(
                        'w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer',
                        activeIndex === idx
                          ? 'bg-indigo-50 text-indigo-900'
                          : 'text-gray-700 hover:bg-gray-50',
                      )}
                      onClick={() => handleSuggestionClick(suggestion)}
                      onMouseEnter={() => setActiveIndex(idx)}
                    >
                      {suggestion.text}
                    </button>
                  );
                })}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
