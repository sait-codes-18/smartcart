'use client';

// =============================================================================
// Quick Compare — Header Component (Reference Match)
// =============================================================================

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { LocationSelector } from '@/components/location/LocationSelector';
import { useLocation } from '@/context/LocationContext';

export function Header() {
  const { location, setLocation, isLocationModalOpen, openLocationModal, closeLocationModal } = useLocation();
  const [localModalOpen, setLocalModalOpen] = useState(false);

  const showModal = isLocationModalOpen || localModalOpen;
  const handleOpen = () => {
    openLocationModal();
    setLocalModalOpen(true);
  };
  const handleClose = () => {
    closeLocationModal();
    setLocalModalOpen(false);
  };

  const displayLocation = location
    ? location.area
      ? `${location.area}, ${location.city}`
      : location.city || location.pincode
    : 'Indiranagar, Bengaluru';

  return (
    <>
      <header className="w-full bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center" aria-label="QuickCompare Home">
              <Logo size="md" />
            </Link>

            {/* Right Nav: My searches, How it works, Location Selector */}
            <div className="flex items-center gap-6 sm:gap-8">
              <Link
                href="/history"
                className="hidden md:inline-flex text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                My searches
              </Link>
              <Link
                href="/about"
                className="hidden md:inline-flex text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                How it works
              </Link>

              {/* Location Pill matching reference */}
              <button
                type="button"
                onClick={handleOpen}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/80 hover:bg-white px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 shadow-2xs transition-all shrink-0"
                aria-label="Change location"
              >
                {/* Location pin icon */}
                <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-semibold text-slate-800 max-w-[140px] sm:max-w-[200px] truncate">
                  {displayLocation}
                </span>
                {/* Chevron */}
                <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Location selector modal */}
      {showModal && (
        <LocationSelector
          currentLocation={location ?? undefined}
          onSave={(loc) => {
            setLocation(loc);
            handleClose();
          }}
          onClose={handleClose}
        />
      )}
    </>
  );
}
