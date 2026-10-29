// =============================================================================
// Quick Compare — DeliveryEstimate Component
// =============================================================================

import { cn } from '@/lib/utils';

interface DeliveryEstimateProps {
  /** Delivery time text (e.g., "10 mins") */
  estimate: string;
  /** Delivery time in minutes for color coding */
  minutes?: number;
  /** Compact display for use inside cards */
  small?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Delivery time display with clock icon and color coding.
 * Green (<15 min), amber (15-25 min), red (>25 min).
 */
export function DeliveryEstimate({
  estimate,
  minutes,
  small = false,
  className,
}: DeliveryEstimateProps) {
  let colorClass = 'text-gray-600';
  if (minutes !== undefined) {
    if (minutes < 15) colorClass = 'text-green-600';
    else if (minutes <= 25) colorClass = 'text-amber-500';
    else colorClass = 'text-red-500';
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1',
        colorClass,
        small ? 'text-xs' : 'text-sm',
        className,
      )}
    >
      {/* Clock icon */}
      <svg
        width={small ? 12 : 14}
        height={small ? 12 : 14}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="7"
          cy="7"
          r="6"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M7 4V7L9 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="font-medium">{estimate}</span>
    </span>
  );
}
