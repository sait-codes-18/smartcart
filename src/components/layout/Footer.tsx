'use client';

// =============================================================================
// Quick Compare — Footer Component
// =============================================================================

import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

interface FooterProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * App footer with branding, tagline, and useful links.
 */
export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn('bg-slate-100 border-t border-gray-200', className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <Logo size="sm" />
            <p className="mt-2 text-sm text-gray-500 max-w-xs">
              Compare prices across Blinkit, Zepto, Swiggy Instamart &amp; more.
              Find the cheapest and fastest delivery for your groceries.
            </p>
          </div>

          {/* Links */}
          <nav
            className="flex items-center gap-6 text-sm text-gray-500"
            aria-label="Footer navigation"
          >
            <Link
              href="/about"
              className="hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="hover:text-gray-900 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-900 transition-colors"
            >
              Terms
            </Link>
          </nav>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-400">
          © {currentYear} QuickCompare. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
