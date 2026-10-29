'use client';

// =============================================================================
// Quick Compare — Product Comparison Table Component (Reference Match)
// =============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_PRODUCTS, getListingsForProduct } from '@/lib/mock-data';
import { PLATFORMS, getAuthenticProductPhoto } from '@/lib/constants';
import { formatPrice, calculateTotalCost } from '@/lib/utils';
import type { ProductCategory } from '@/types';

const CATEGORY_TABS: { label: string; category?: ProductCategory }[] = [
  { label: 'All items' },
  { label: 'Fresh produce', category: 'fruits-vegetables' },
  { label: 'Breakfast', category: 'dairy' },
  { label: 'Snacks', category: 'snacks' },
  { label: 'Beverages', category: 'beverages' },
  { label: 'Household', category: 'household' },
];

export function LiveComparisonSection() {
  const [selectedTab, setSelectedTab] = useState('All items');

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    if (selectedTab === 'All items') return true;
    const tab = CATEGORY_TABS.find((t) => t.label === selectedTab);
    return tab?.category ? product.category === tab.category : true;
  }).slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-700 block mb-1">
            COMPARE &amp; SAVE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Start with something you need
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            See the best available option at a glance.
          </p>
        </div>

        {/* Filters button */}
        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300/80 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors self-start sm:self-auto"
        >
          <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </Link>
      </div>

      {/* Category Pills Bar matching reference */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORY_TABS.map((tab) => {
          const isActive = selectedTab === tab.label;
          return (
            <button
              key={tab.label}
              onClick={() => setSelectedTab(tab.label)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200/90 text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Clean comparison table matching reference */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-100 bg-slate-50/60 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-3.5 px-6 font-bold">PRODUCT</th>
                <th className="py-3.5 px-6 font-bold">AVAILABLE ON</th>
                <th className="py-3.5 px-6 font-bold">PRICE</th>
                <th className="py-3.5 px-6 font-bold">DELIVERY</th>
                <th className="py-3.5 px-6 font-bold">EST. TOTAL</th>
                <th className="py-3.5 px-6 font-bold text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => {
                const listings = getListingsForProduct(product.id);
                const available = listings.filter(
                  (l) => l.availability === 'in-stock' || l.availability === 'limited',
                );

                const lowestPriceListing = available.reduce(
                  (min, curr) => (curr.price < min.price ? curr : min),
                  available[0] || listings[0],
                );

                const fastestListing = available.reduce(
                  (f, curr) =>
                    (curr.deliveryMinutes || 999) < (f.deliveryMinutes || 999) ? curr : f,
                  available[0] || listings[0],
                );

                const bestValueListing = available.reduce((best, curr) => {
                  const currT = calculateTotalCost(curr).estimatedTotal;
                  const bestT = calculateTotalCost(best).estimatedTotal;
                  return currT < bestT ? curr : best;
                }, available[0] || listings[0]);

                const estTotal = bestValueListing
                  ? calculateTotalCost(bestValueListing).estimatedTotal
                  : lowestPriceListing.price;

                return (
                  <tr
                    key={product.id}
                    className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                  >
                    {/* Product Photo & Name & Pack Size */}
                    <td className="py-4 px-6">
                      <Link
                        href={`/product/${encodeURIComponent(product.id)}?name=${encodeURIComponent(product.name)}`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 p-0.5 overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={getAuthenticProductPhoto(product.name, product.imageUrl)}
                            alt={product.name}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-slate-900 group-hover:text-amber-800 transition-colors block text-xs sm:text-sm truncate">
                            {product.name}
                          </span>
                          <span className="text-[11px] text-slate-400 mt-0.5 block">
                            {product.unit} • {product.brand}
                          </span>
                        </div>
                      </Link>
                    </td>

                    {/* Available on platform badges */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {listings.map((l) => {
                          const platform = PLATFORMS[l.platformId];
                          const isAvail = l.availability === 'in-stock' || l.availability === 'limited';
                          return (
                            <span
                              key={l.platformId}
                              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                isAvail ? 'opacity-100' : 'opacity-35 line-through'
                              }`}
                              style={{
                                backgroundColor: platform?.bgColor || '#f1f5f9',
                                color: platform?.color || '#334155',
                              }}
                            >
                              {platform?.shortName || l.platformId}
                            </span>
                          );
                        })}
                      </div>
                    </td>

                    {/* Best item price */}
                    <td className="py-4 px-6">
                      <span className="font-extrabold text-slate-900 text-sm">
                        {formatPrice(lowestPriceListing?.price || 0)}
                      </span>
                      {lowestPriceListing?.mrp && lowestPriceListing.mrp > lowestPriceListing.price && (
                        <span className="text-[11px] text-slate-400 line-through ml-1.5">
                          {formatPrice(lowestPriceListing.mrp)}
                        </span>
                      )}
                    </td>

                    {/* Delivery speed badge */}
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                        <span>⚡</span>
                        <span>{fastestListing?.deliveryEstimate || '10 mins'}</span>
                      </span>
                    </td>

                    {/* Estimated Total */}
                    <td className="py-4 px-6">
                      <span className="font-extrabold text-slate-900 text-sm">
                        {formatPrice(estTotal)}
                      </span>
                    </td>

                    {/* Compare CTA */}
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/product/${encodeURIComponent(product.id)}?name=${encodeURIComponent(product.name)}`}
                        className="inline-flex items-center gap-1 rounded-xl bg-slate-900 hover:bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors"
                      >
                        Compare
                        <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
