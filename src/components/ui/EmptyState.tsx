// =============================================================================
// Quick Compare — EmptyState Component
// =============================================================================

import { cn } from '@/lib/utils';
import { Button } from './Button';

interface EmptyStateProps {
  /** Main heading */
  title: string;
  /** Supporting description text */
  description?: string;
  /** Label for the optional action button */
  actionLabel?: string;
  /** Callback when the action button is clicked */
  onAction?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Empty state placeholder with illustration, title, description, and optional action.
 */
export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-6 text-center',
        className,
      )}
      role="status"
    >
      {/* No results illustration */}
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="mb-6"
      >
        {/* Magnifying glass body */}
        <circle
          cx="52"
          cy="52"
          r="28"
          stroke="#d1d5db"
          strokeWidth="4"
          fill="#f9fafb"
        />
        {/* Glass handle */}
        <path
          d="M72 72L92 92"
          stroke="#d1d5db"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Sad face — eyes */}
        <circle cx="44" cy="48" r="2.5" fill="#9ca3af" />
        <circle cx="60" cy="48" r="2.5" fill="#9ca3af" />
        {/* Sad face — frown */}
        <path
          d="M44 62C47 58 57 58 60 62"
          stroke="#9ca3af"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>

      {description && (
        <p className="text-sm text-gray-500 max-w-sm mb-6">{description}</p>
      )}

      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
