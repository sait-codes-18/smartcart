'use client';

// =============================================================================
// Quick Compare — ComparisonTable Component
// =============================================================================

import React from 'react';
import type { ComparisonResult } from '@/types';
import { PlatformComparisonCard } from './PlatformComparisonCard';
import { PLATFORMS } from '@/lib/constants';
import { formatPrice, calculateTotalCost } from '@/lib/utils';
import { DeliveryEstimate } from './DeliveryEstimate';

interface ComparisonTableProps {
  comparison: ComparisonResult;
}

export function ComparisonTable({ comparison }: ComparisonTableProps) {
  const { product, listings, cheapestListing, fastestListing, bestValueListing } = comparison;

  return (
    <div className="space-y-6">
      {/* Quick summary recommendation banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Cheapest Price */}
        {cheapestListing && (
          <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5">
            <span className="text-2xl">🏷️</span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                Cheapest Item
              </span>
              <p className="text-sm font-semibold text-emerald-950">
                {PLATFORMS[cheapestListing.platformId]?.name} at{' '}
                <span className="font-extrabold">{formatPrice(cheapestListing.price)}</span>
              </p>
            </div>
          </div>
        )}

        {/* Fastest Delivery */}
        {fastestListing && (
          <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/60 p-3.5">
            <span className="text-2xl">⚡</span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Fastest Delivery
              </span>
              <p className="text-sm font-semibold text-amber-950">
                {PLATFORMS[fastestListing.platformId]?.name} in{' '}
                <span className="font-extrabold">{fastestListing.deliveryEstimate}</span>
              </p>
            </div>
          </div>
        )}

        {/* Best Value Total */}
        {bestValueListing && (
          <div className="flex items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50/60 p-3.5">
            <span className="text-2xl">💎</span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800">
                Lowest Total Checkout
              </span>
              <p className="text-sm font-semibold text-indigo-950">
                {PLATFORMS[bestValueListing.platformId]?.name} for{' '}
                <span className="font-extrabold">
                  {formatPrice(calculateTotalCost(bestValueListing).estimatedTotal)}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Grid of platform cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {listings.map((listing) => (
          <PlatformComparisonCard
            key={listing.platformId}
            listing={listing}
            isCheapest={cheapestListing?.platformId === listing.platformId}
            isFastest={fastestListing?.platformId === listing.platformId}
            isBestValue={bestValueListing?.platformId === listing.platformId}
          />
        ))}
      </div>

      {/* Full comparison breakdown table (Desktop view) */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h4 className="text-sm font-bold text-slate-800">
            Side-by-Side Breakdown
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="border-b border-slate-100 bg-slate-50/30 text-[11px] font-semibold uppercase text-slate-400">
              <tr>
                <th className="py-3 px-6">Platform</th>
                <th className="py-3 px-6">Item Price</th>
                <th className="py-3 px-6">MRP / Discount</th>
                <th className="py-3 px-6">Delivery Time</th>
                <th className="py-3 px-6">Delivery Fee</th>
                <th className="py-3 px-6">Platform Fee</th>
                <th className="py-3 px-6">Estimated Total</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listings.map((l) => {
                const cost = calculateTotalCost(l);
                const platform = PLATFORMS[l.platformId];
                const isAvail = l.availability === 'in-stock' || l.availability === 'limited';

                return (
                  <tr key={l.platformId} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: platform?.color || '#64748b' }}
                        />
                        <span>{platform?.name || l.platformId}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900 text-sm">
                      {formatPrice(l.price)}
                    </td>
                    <td className="py-4 px-6 text-slate-400">
                      {l.mrp > l.price ? (
                        <div className="space-x-1.5">
                          <span className="line-through">{formatPrice(l.mrp)}</span>
                          <span className="text-emerald-600 font-semibold text-[11px]">
                            {Math.round(((l.mrp - l.price) / l.mrp) * 100)}% off
                          </span>
                        </div>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {isAvail ? (
                        <DeliveryEstimate estimate={l.deliveryEstimate || '15 mins'} minutes={l.deliveryMinutes} />
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="py-4 px-6 font-medium">
                      {l.deliveryFee === 0 ? (
                        <span className="text-emerald-600 font-semibold">FREE</span>
                      ) : (
                        formatPrice(l.deliveryFee)
                      )}
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      {l.platformFee ? formatPrice(l.platformFee) : '₹0'}
                    </td>
                    <td className="py-4 px-6 font-extrabold text-slate-900 text-sm">
                      {formatPrice(cost.estimatedTotal)}
                    </td>
                    <td className="py-4 px-6">
                      {isAvail ? (
                        <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700 border border-rose-200">
                          Unavailable
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      {isAvail ? (
                        <a
                          href={l.productUrl || platform?.websiteUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
                        >
                          Order
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
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
