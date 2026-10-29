// =============================================================================
// Quick Compare — ProductCard Component
// =============================================================================

import Link from 'next/link';
import { cn, formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { getAuthenticProductPhoto } from '@/lib/constants';
import type { Product, PlatformListing, PlatformId } from '@/types';

interface ProductCardProps {
  /** The product to display */
  product: Product;
  /** Listings across platforms (used to derive price and platform indicators) */
  listings?: PlatformListing[];
  /** Additional CSS classes */
  className?: string;
}

/** Platform indicator color map */
const PLATFORM_COLORS: Record<PlatformId, string> = {
  blinkit: 'bg-amber-500',
  zepto: 'bg-purple-600',
  'swiggy-instamart': 'bg-orange-500',
  bigbasket: 'bg-green-600',
};

/**
 * Product card for search results.
 * Displays product info, starting price, and platform availability indicators.
 */
export function ProductCard({ product, listings = [], className }: ProductCardProps) {
  const availableListings = listings.filter(
    (l) => l.availability === 'in-stock' || l.availability === 'limited',
  );
  const lowestPrice = availableListings.length > 0
    ? Math.min(...availableListings.map((l) => l.price))
    : null;
  const platformCount = new Set(availableListings.map((l) => l.platformId)).size;
  const platformIds = [...new Set(listings.map((l) => l.platformId))];

  return (
    <Link
      href={`/product/${encodeURIComponent(product.id)}?name=${encodeURIComponent(product.name)}`}
      className={cn(
        'group block bg-white rounded-xl border border-gray-200 overflow-hidden',
        'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200',
        className,
      )}
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-white flex items-center justify-center p-3 border-b border-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getAuthenticProductPhoto(product.name, product.imageUrl)}
          alt={product.name}
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        {/* Product name — truncate to 2 lines */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>

        {/* Brand & unit */}
        <p className="text-xs text-gray-500 truncate">
          {product.brand} · {product.unit}
        </p>

        {/* Price */}
        {lowestPrice !== null ? (
          <p className="text-base font-bold text-gray-900">
            From {formatPrice(lowestPrice)}
          </p>
        ) : (
          <p className="text-sm text-gray-400">Price unavailable</p>
        )}

        {/* Availability info */}
        {platformCount > 0 && (
          <Badge variant="info" size="sm">
            Available on {platformCount} platform{platformCount > 1 ? 's' : ''}
          </Badge>
        )}

        {/* Platform dots */}
        {platformIds.length > 0 && (
          <div className="flex items-center gap-1 pt-1" aria-label="Available platforms">
            {platformIds.map((pid) => (
              <span
                key={pid}
                className={cn(
                  'inline-block w-3 h-3 rounded-full',
                  PLATFORM_COLORS[pid] ?? 'bg-gray-300',
                )}
                title={pid}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
