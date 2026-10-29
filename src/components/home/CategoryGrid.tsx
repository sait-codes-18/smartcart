import Link from 'next/link';
import { CATEGORIES } from '@/lib/constants';
import type { ProductCategory } from '@/types';

const POPULAR_CATEGORY_KEYS: ProductCategory[] = [
  'dairy',
  'groceries',
  'snacks',
  'beverages',
  'fruits-vegetables',
  'personal-care',
  'household',
  'bakery',
];

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {POPULAR_CATEGORY_KEYS.map((key) => {
        const item = CATEGORIES[key];
        return (
          <Link
            key={key}
            href={`/search?category=${key}`}
            className="group relative flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-50/70 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="mt-3 font-semibold text-slate-800 text-sm text-center group-hover:text-indigo-600 transition-colors">
              {item.label}
            </h3>
            <p className="mt-1 text-xs text-slate-400 text-center line-clamp-1">
              {item.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
