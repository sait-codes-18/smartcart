// =============================================================================
// Quick Compare — PriceBadge Component
// =============================================================================

import { cn, formatPrice, getDiscountPercent } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface PriceBadgeProps {
  /** Current selling price */
  price: number;
  /** Maximum retail price */
  mrp: number;
  /** Whether to visually emphasize this price (e.g., for deals) */
  highlight?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Price display component showing current price, MRP strikethrough, and discount badge.
 */
export function PriceBadge({ price, mrp, highlight = false, className }: PriceBadgeProps) {
  const discount = getDiscountPercent(mrp, price);
  const hasDiscount = discount > 0;

  return (
    <div className={cn('inline-flex items-center gap-2 flex-wrap', className)}>
      <span
        className={cn(
          'text-lg font-bold',
          highlight ? 'text-emerald-600' : 'text-gray-900',
        )}
      >
        {formatPrice(price)}
      </span>

      {hasDiscount && (
        <>
          <span className="text-sm text-gray-400 line-through">
            {formatPrice(mrp)}
          </span>
          <Badge variant="success" size="sm">
            {discount}% off
          </Badge>
        </>
      )}
    </div>
  );
}
