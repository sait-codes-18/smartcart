'use client';

// =============================================================================
// Quick Compare — HeroSearchBar Component
// Pill-styled search input with real-time autocomplete suggestions dropdown
// =============================================================================

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { SearchSuggestion } from '@/types';
import { getAuthenticProductPhoto } from '@/lib/constants';

interface HeroSearchBarProps {
  initialQuery?: string;
  placeholder?: string;
  className?: string;
}

const DEFAULT_POPULAR_SUGGESTIONS: SearchSuggestion[] = [
  {
    text: 'Amul Taaza Toned Milk 1L',
    type: 'product',
    brand: 'Amul',
    unit: '1 L',
    imageUrl: 'https://cdn.grofers.com/da/cms-assets/cms/product/5ca91eb1-33d5-4ada-95ed-0e706ac7149e.jpg',
  },
  {
    text: 'Zero Maida Whole Wheat Bread',
    type: 'product',
    brand: 'Britannia',
    unit: '400 g',
    imageUrl: 'https://cdn.grofers.com/da/cms-assets/cms/product/4186623f-9e74-4b2b-8306-a245bf3cab7c.jpg',
  },
  {
    text: 'Classic White Protein Eggs',
    type: 'product',
    brand: 'Eggoz',
    unit: '6 pack',
    imageUrl: 'https://cdn.grofers.com/da/cms-assets/cms/product/12284710-19b1-4947-a1b8-fa7b3d000786.png',
  },
  {
    text: 'Aashirvaad Superior MP Chakki Atta',
    type: 'product',
    brand: 'Aashirvaad',
    unit: '5 kg',
    imageUrl: 'https://cdn.grofers.com/da/cms-assets/cms/product/74371e5a-f158-4aaa-b02e-304b296ca182.png',
  },
  {
    text: 'Fortune Sunlite Refined Sunflower Oil',
    type: 'product',
    brand: 'Fortune',
    unit: '1 L',
    imageUrl: 'https://cdn.grofers.com/da/cms-assets/cms/product/049f5249-d500-4195-b726-d53b40b1d9e8.jpg',
  },
  {
    text: 'Amul Pasteurised Salted Butter',
    type: 'product',
    brand: 'Amul',
    unit: '500 g',
    imageUrl: 'https://cdn.grofers.com/da/cms-assets/cms/product/e68b916e-38c6-4968-ab91-e902d09701f6.jpg',
  },
  {
    text: 'Maggi 2-Minute Masala Instant Noodles',
    type: 'product',
    brand: 'Maggi',
    unit: '280 g (4 pack)',
    imageUrl: 'https://cdn.grofers.com/da/cms-assets/cms/product/b589d27d-f289-448e-9a26-79cecb98d2e0.jpg',
  },
  {
    text: 'Tata Vacuum Evaporated Iodized Salt',
    type: 'product',
    brand: 'Tata',
    unit: '1 kg',
    imageUrl: 'https://cdn.grofers.com/da/cms-assets/cms/product/4d8e7640-0338-434a-8fef-828079fd8a87.jpg',
  },
  {
    text: 'Lay\'s Classic Salted Potato Chips',
    type: 'product',
    brand: 'Lay\'s',
    unit: '52 g',
    imageUrl: 'https://cdn.grofers.com/da/cms-assets/cms/product/rc-upload-1777353225068-257.png',
  },
  {
    text: 'Dairy & Breakfast',
    type: 'category',
    category: 'dairy',
    imageUrl: 'https://cdn.grofers.com/da/cms-assets/cms/product/5ca91eb1-33d5-4ada-95ed-0e706ac7149e.jpg',
  },
  {
    text: 'Daily Groceries & Atta',
    type: 'category',
    category: 'groceries',
    imageUrl: 'https://cdn.grofers.com/da/cms-assets/cms/product/74371e5a-f158-4aaa-b02e-304b296ca182.png',
  },
];

export function HeroSearchBar({
  initialQuery = '',
  placeholder = 'What are you looking for?',
  className = '',
}: HeroSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced suggestion fetcher
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions(DEFAULT_POPULAR_SUGGESTIONS);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?suggest=true&q=${encodeURIComponent(trimmed)}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setSuggestions(json.data);
          }
        }
      } catch (err) {
        console.warn('Autocomplete fetch failed:', err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = useCallback(
    (item: SearchSuggestion) => {
      setIsOpen(false);
      if (item.type === 'category' && item.category) {
        router.push(`/search?category=${encodeURIComponent(item.category)}`);
      } else if (item.type === 'product' && item.productId) {
        router.push(
          `/product/${encodeURIComponent(item.productId)}?name=${encodeURIComponent(item.text)}`,
        );
      } else {
        router.push(`/search?q=${encodeURIComponent(item.text)}`);
      }
    },
    [router],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push('/search');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full max-w-xl ${className}`}>
      {/* Pill Search Form matching Reference Mockup */}
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center bg-white rounded-full p-1.5 shadow-md border border-slate-200/80 transition-shadow focus-within:shadow-lg focus-within:border-slate-300"
      >
        {/* Search icon */}
        <div className="pl-4 text-slate-400 shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
        />

        {/* Clear query button */}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors mr-1"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Compare CTA button */}
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 hover:bg-slate-800 px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition-colors shrink-0"
        >
          <span>Compare</span>
          <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-slate-200/90 bg-white shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          {/* Header pill label */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span>{query.trim() ? 'Suggested Matches' : 'Popular Searches'}</span>
            {loading && (
              <span className="flex items-center gap-1 text-slate-500 font-medium normal-case">
                <svg className="animate-spin w-3 h-3 text-emerald-600" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Searching...
              </span>
            )}
          </div>

          {/* Suggestions List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {suggestions.length > 0 ? (
              suggestions.map((item, index) => {
                const isSelected = index === activeIndex;
                const isProduct = item.type === 'product';
                const isCategory = item.type === 'category';

                return (
                  <button
                    key={`${item.type}-${item.text}-${index}`}
                    type="button"
                    onClick={() => handleSelectSuggestion(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between gap-3 transition-colors ${
                      isSelected ? 'bg-amber-50/70 text-slate-900' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Real Product Photo Thumbnail */}
                      <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-200 shadow-2xs overflow-hidden p-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={getAuthenticProductPhoto(item.text, item.imageUrl)}
                          alt={item.text}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>

                      {/* Text & Metadata */}
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                          {item.text}
                        </div>
                        {(item.brand || item.unit) && (
                          <div className="text-[11px] text-slate-400 truncate">
                            {item.brand && <span>{item.brand}</span>}
                            {item.brand && item.unit && <span> • </span>}
                            {item.unit && <span>Pack: {item.unit}</span>}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tag badge and jump arrow */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                        {item.type}
                      </span>
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-6 text-center text-xs text-slate-500">
                No matching suggestions found. Press <strong>Compare</strong> to search all platforms.
              </div>
            )}
          </div>

          {/* Quick footer helper */}
          {query.trim() && (
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Press <strong>Enter</strong> to search &ldquo;{query}&rdquo;</span>
              <span className="text-emerald-700 font-semibold">Real-time comparison</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
