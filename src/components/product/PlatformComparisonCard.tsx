'use client';

// =============================================================================
// Quick Compare — PlatformComparisonCard Component
// =============================================================================

import React from 'react';
import type { PlatformListing } from '@/types';
import { PLATFORMS } from '@/lib/constants';
import { formatPrice, calculateTotalCost, cn } from '@/lib/utils';
import { DeliveryEstimate } from './DeliveryEstimate';
import { PriceBadge } from './PriceBadge';

interface PlatformComparisonCardProps {
  listing: PlatformListing;
  isCheapest?: boolean;
  isFastest?: boolean;
  isBestValue?: boolean;
  className?: string;
}

export function PlatformComparisonCard({
  listing,
  isCheapest,
  isFastest,
  isBestValue,
  className,
}: PlatformComparisonCardProps) {
  const platform = PLATFORMS[listing.platformId];
  const cost = calculateTotalCost(listing);
  const isAvailable =
    listing.availability === 'in-stock' || listing.availability === 'limited';

  return (
    <div
      className={cn(
        'relative flex flex-col justify-between rounded-2xl border p-5 bg-white transition-all',
        isBestValue
          ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
          : isCheapest
          ? 'border-emerald-500 ring-2 ring-emerald-500/10 shadow-sm'
          : isFastest
          ? 'border-amber-400 ring-2 ring-amber-400/10 shadow-sm'
          : 'border-slate-200/90 hover:border-slate-300',
        !isAvailable && 'opacity-60 bg-slate-50/80',
        className,
      )}
    >
      {/* Top badges for recommendations */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {/* Platform pill */}
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
            style={{
              backgroundColor: platform?.bgColor || '#f1f5f9',
              color: platform?.color || '#334155',
            }}
          >
            {platform?.name || listing.platformId}
          </span>
          {listing.dataSource === 'mock' && (
            <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              Demo
            </span>
          )}
        </div>

        {/* Feature badges */}
        <div className="flex items-center gap-1.5">
          {isBestValue && (
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[11px] font-semibold text-white">
              <span>💎</span> Lowest Total
            </span>
          )}
          {isCheapest && !isBestValue && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[11px] font-semibold text-white">
              <span>🏷️</span> Cheapest Price
            </span>
          )}
          {isFastest && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-600 px-2.5 py-0.5 text-[11px] font-semibold text-white">
              <span>⚡</span> Fastest
            </span>
          )}
        </div>
      </div>

      {/* Main product price and delivery info */}
      <div className="space-y-3 py-2">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xs uppercase font-medium text-slate-400 block mb-0.5">
              Item Price
            </span>
            <PriceBadge
              price={listing.price}
              mrp={listing.mrp}
              highlight={isCheapest}
            />
          </div>

          <div className="text-right">
            <span className="text-xs uppercase font-medium text-slate-400 block mb-0.5">
              Delivery
            </span>
            {isAvailable ? (
              <DeliveryEstimate
                estimate={listing.deliveryEstimate || '15 mins'}
                minutes={listing.deliveryMinutes}
              />
            ) : (
              <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Breakdown of fees */}
        <div className="border-t border-dashed border-slate-200 pt-2.5 space-y-1.5 text-xs text-slate-600">
          <div className="flex justify-between">
            <span className="text-slate-500">Delivery Fee</span>
            <span className="font-medium">
              {listing.deliveryFee === 0 ? (
                <span className="text-emerald-600 font-semibold">FREE</span>
              ) : (
                formatPrice(listing.deliveryFee)
              )}
            </span>
          </div>

          {listing.platformFee !== undefined && listing.platformFee > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-500">Platform Fee</span>
              <span className="font-medium">{formatPrice(listing.platformFee)}</span>
            </div>
          )}

          {/* Estimated final cost */}
          <div className="flex justify-between items-baseline pt-1.5 border-t border-slate-100">
            <span className="font-semibold text-slate-900">Estimated Total</span>
            <span className="text-base font-bold text-slate-900">
              {formatPrice(cost.estimatedTotal)}
            </span>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        {isAvailable ? (
          <a
            href={listing.productUrl || platform?.websiteUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-colors"
          >
            <span>Order on {platform?.name || 'Platform'}</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
          <button
            disabled
            className="w-full rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-400 cursor-not-allowed text-center"
          >
            Currently Unavailable
          </button>
        )}
      </div>
    </div>
  );
}
