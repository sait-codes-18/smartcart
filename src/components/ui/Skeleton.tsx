// =============================================================================
// Quick Compare — Skeleton Component
// =============================================================================

import { cn } from '@/lib/utils';

/** Skeleton shape variants */
type SkeletonVariant = 'text' | 'circle' | 'rect' | 'card';

interface SkeletonProps {
  /** Shape variant */
  variant?: SkeletonVariant;
  /** Additional CSS classes for custom sizing */
  className?: string;
  /** Number of skeleton lines (only for 'text' variant) */
  lines?: number;
}

const variantClasses: Record<SkeletonVariant, string> = {
  text: 'h-4 w-full rounded',
  circle: 'h-10 w-10 rounded-full',
  rect: 'h-32 w-full rounded-lg',
  card: 'h-64 w-full rounded-xl',
};

/**
 * Loading skeleton placeholder with pulse animation.
 */
export function Skeleton({
  variant = 'text',
  className,
  lines = 1,
}: SkeletonProps) {
  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2" role="status" aria-label="Loading">
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={cn(
              'animate-pulse bg-gray-200 rounded h-4',
              i === lines - 1 && 'w-3/4',
              className,
            )}
          />
        ))}
        <span className="sr-only">Loading…</span>
      </div>
    );
  }

  return (
    <div role="status" aria-label="Loading">
      <div
        className={cn(
          'animate-pulse bg-gray-200',
          variantClasses[variant],
          className,
        )}
      />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

/**
 * A pre-composed product card skeleton for search result loading states.
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
      <Skeleton variant="rect" className="h-40" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
      <div className="flex items-center gap-2">
        <Skeleton variant="text" className="w-16 h-6" />
        <Skeleton variant="text" className="w-24 h-4" />
      </div>
      <div className="flex gap-1">
        <Skeleton variant="circle" className="h-5 w-5" />
        <Skeleton variant="circle" className="h-5 w-5" />
        <Skeleton variant="circle" className="h-5 w-5" />
      </div>
    </div>
  );
}
