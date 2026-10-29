'use client';

import Link from 'next/link';

const POPULAR_SEARCH_ITEMS = [
  'Amul Milk',
  'Aashirvaad Atta',
  'Amul Butter',
  'Fortune Oil',
  'Maggi Noodles',
  'India Gate Rice',
  'Tata Salt',
  'Curd',
  'Bread',
  'Eggs',
  'Lays Classic',
  'Coke 750ml',
];

export function PopularSearches() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 shrink-0">
        Trending:
      </span>
      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
        {POPULAR_SEARCH_ITEMS.map((item) => (
          <Link
            key={item}
            href={`/search?q=${encodeURIComponent(item)}`}
            className="inline-flex items-center rounded-full bg-slate-100 px-3.5 py-1 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors whitespace-nowrap"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
