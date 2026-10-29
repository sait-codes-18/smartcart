// =============================================================================
// Quick Compare — Utility Functions
// =============================================================================

import type { CostBreakdown, PlatformListing } from '@/types';

/**
 * Safely parse a value as a finite number.
 */
export function toNumber(val: unknown, fallback: number = 0): number {
  if (typeof val === 'number') {
    return Number.isFinite(val) ? val : fallback;
  }
  if (typeof val === 'string') {
    // Strip currency symbols and whitespace
    const cleaned = val.replace(/[^0-9.-]/g, '');
    const parsed = parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

/**
 * Format a numeric price as Indian Rupees.
 * @example formatPrice(199) → "₹199"
 * @example formatPrice(1499.5) → "₹1,500"
 */
export function formatPrice(price: number | string): string {
  const num = toNumber(price, 0);
  const rounded = Math.round(num);
  return `₹${rounded.toLocaleString('en-IN')}`;
}

/**
 * Format delivery time in minutes to a human-readable string.
 * @example formatDeliveryTime(10) → "10 mins"
 * @example formatDeliveryTime(1)  → "1 min"
 */
export function formatDeliveryTime(minutes: number | string): string {
  const num = toNumber(minutes, 0);
  if (num <= 0) return 'Instant';
  if (num === 1) return '1 min';
  return `${num} mins`;
}

/**
 * Calculate the total cost breakdown for a platform listing.
 * Strict mathematical invariant:
 * estimatedTotal = productPrice + deliveryFee + platformFee
 * (where productPrice is already the actual discounted checkout price from the platform).
 * If a separate promotional promo-code discount is ever provided, it is subtracted strictly from numeric sums.
 */
export function calculateTotalCost(listing: Partial<PlatformListing>): CostBreakdown {
  const productPrice = Math.max(0, toNumber(listing.price, 0));
  const deliveryFee = Math.max(0, toNumber(listing.deliveryFee, 0));
  const platformFee = Math.max(0, toNumber(listing.platformFee, 0));
  
  // Note: listing.price in quick-commerce is ALREADY the discounted selling price (offer_price).
  // We do NOT subtract the MRP discount again (which would double-count the discount).
  // Only extra coupon/cart-level discounts would be subtracted here if explicitly marked.
  const additionalDiscount = 0;

  const estimatedTotal = productPrice + deliveryFee + platformFee - additionalDiscount;

  return {
    productPrice,
    deliveryFee,
    platformFee,
    discount: additionalDiscount,
    estimatedTotal: Math.max(0, Math.round(estimatedTotal)),
    isComplete: listing.platformFee !== undefined,
  };
}

/**
 * Merge CSS class names, filtering out falsy values.
 */
export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Create a debounced version of a function.
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  ms: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, ms);
  };
}

/**
 * Generate a simple unique ID string.
 */
export function generateId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}`;
}

/**
 * Convert an ISO date string to a human-readable relative time.
 */
export function getTimeAgo(isoDate: string): string {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diffMs = now - then;

  if (diffMs < 0) return 'just now';

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'just now';
  if (minutes === 1) return '1 min ago';
  if (minutes < 60) return `${minutes} mins ago`;
  if (hours === 1) return '1 hour ago';
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;

  return new Date(isoDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Convert a string to a URL-safe slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Calculate the discount percentage between MRP and selling price.
 */
export function getDiscountPercent(mrp: number | string, price: number | string): number {
  const numMrp = toNumber(mrp, 0);
  const numPrice = toNumber(price, 0);
  if (numMrp <= 0 || numPrice >= numMrp) return 0;
  return Math.round(((numMrp - numPrice) / numMrp) * 100);
}

/**
 * Clamp a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
