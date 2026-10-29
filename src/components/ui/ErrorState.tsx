// =============================================================================
// Quick Compare — ErrorState Component
// =============================================================================

import { cn } from '@/lib/utils';
import { Button } from './Button';

interface ErrorStateProps {
  /** Error heading */
  title?: string;
  /** Error message / description */
  message: string;
  /** Callback when the retry button is clicked */
  onRetry?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Error state with warning icon, message, and optional retry button.
 */
export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-6 text-center',
        className,
      )}
      role="alert"
    >
      {/* Warning / error icon */}
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="mb-6"
      >
        {/* Circle background */}
        <circle cx="32" cy="32" r="30" fill="#fef2f2" stroke="#fecaca" strokeWidth="2" />
        {/* Exclamation body */}
        <path
          d="M32 18V36"
          stroke="#ef4444"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Exclamation dot */}
        <circle cx="32" cy="44" r="2.5" fill="#ef4444" />
      </svg>

      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{message}</p>

      {onRetry && (
        <Button variant="primary" size="md" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
