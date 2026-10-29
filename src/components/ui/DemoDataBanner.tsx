'use client';

// =============================================================================
// Quick Compare — DemoDataBanner Component
// Dynamically adjusts message based on whether Live QuickCommerce API is active
// =============================================================================

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface DemoDataBannerProps {
  /** Additional CSS classes */
  className?: string;
}

export function DemoDataBanner({ className }: DemoDataBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const isLive = process.env.NEXT_PUBLIC_DATA_SOURCE === 'live';

  if (dismissed) return null;

  if (isLive) {
    return (
      <div
        className={cn(
          'sticky top-0 z-50 flex items-center justify-center gap-2 bg-emerald-50 border-b border-emerald-200 px-4 py-2 text-xs sm:text-sm text-emerald-800',
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-semibold">Live Mode Active:</span>
        <span>
          Connected to QuickCommerceAPI for live Blinkit, Zepto, Swiggy &amp; BigBasket data.
        </span>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="ml-auto inline-flex items-center justify-center rounded p-1 text-emerald-600 hover:text-emerald-900 hover:bg-emerald-100/60 transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'sticky top-0 z-50 flex items-center justify-center gap-2 bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs sm:text-sm text-amber-800',
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 5V5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 7.5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      <span>
        You&apos;re viewing demo data. Prices and availability are simulated.
      </span>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="ml-auto inline-flex items-center justify-center rounded p-1 text-amber-600 hover:text-amber-900 hover:bg-amber-100/60 transition-colors shrink-0"
        aria-label="Dismiss demo data banner"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
