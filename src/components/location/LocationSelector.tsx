'use client';

// =============================================================================
// Quick Compare — LocationSelector Component
// =============================================================================

import React, { useState } from 'react';
import type { UserLocation } from '@/types';
import { lookupPincode } from '@/context/LocationContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface LocationSelectorProps {
  currentLocation?: UserLocation;
  onSave: (location: UserLocation) => void;
  onClose: () => void;
}

const POPULAR_CITIES = [
  { name: 'Delhi NCR', pincode: '110001', area: 'Connaught Place', state: 'Delhi' },
  { name: 'Mumbai', pincode: '400001', area: 'Fort', state: 'Maharashtra' },
  { name: 'Bengaluru', pincode: '560001', area: 'MG Road', state: 'Karnataka' },
  { name: 'Hyderabad', pincode: '500001', area: 'Abids', state: 'Telangana' },
  { name: 'Pune', pincode: '411001', area: 'Shivajinagar', state: 'Maharashtra' },
  { name: 'Chennai', pincode: '600001', area: 'George Town', state: 'Tamil Nadu' },
  { name: 'Kolkata', pincode: '700001', area: 'BBD Bagh', state: 'West Bengal' },
  { name: 'Ahmedabad', pincode: '380001', area: 'Lal Darwaja', state: 'Gujarat' },
];

export function LocationSelector({
  currentLocation,
  onSave,
  onClose,
}: LocationSelectorProps) {
  const [pincode, setPincode] = useState(currentLocation?.pincode || '');
  const [error, setError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [detectedInfo, setDetectedInfo] = useState<{
    city?: string;
    area?: string;
    state?: string;
  } | null>(
    currentLocation
      ? {
          city: currentLocation.city,
          area: currentLocation.area,
          state: currentLocation.state,
        }
      : null,
  );

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(val);
    setError(null);

    if (val.length === 6) {
      const lookup = lookupPincode(val);
      if (lookup) {
        setDetectedInfo(lookup);
      } else {
        setDetectedInfo({ city: 'India', area: `Pincode ${val}` });
      }
    } else {
      setDetectedInfo(null);
    }
  };

  const handleQuickSelect = (city: typeof POPULAR_CITIES[0]) => {
    setPincode(city.pincode);
    setDetectedInfo({ city: city.name, area: city.area, state: city.state });
    setError(null);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        // Default to Bangalore tech corridor as demo geolocation mapping
        const defaultMetro = POPULAR_CITIES[2]; // Bengaluru
        setPincode(defaultMetro.pincode);
        setDetectedInfo({
          city: defaultMetro.name,
          area: 'Current Location (GPS)',
          state: defaultMetro.state,
        });
      },
      (err) => {
        setIsLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError('Location permission denied. Please enter your 6-digit PIN code manually.');
        } else {
          setError('Unable to detect location. Please enter PIN code manually.');
        }
      },
      { timeout: 8000 },
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6) {
      setError('Please enter a valid 6-digit Indian PIN code');
      return;
    }

    const lookup = lookupPincode(pincode);
    onSave({
      pincode,
      city: detectedInfo?.city || lookup?.city || 'India',
      area: detectedInfo?.area || lookup?.area || `Pincode ${pincode}`,
      state: detectedInfo?.state || lookup?.state,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Choose Delivery Location</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Prices, availability &amp; delivery times vary by area
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* GPS Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={isLocating}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/60 px-4 py-2.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-100/70 transition-colors disabled:opacity-60"
          >
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {isLocating ? 'Detecting location...' : 'Use current location'}
          </button>
        </div>

        <div className="relative my-4 flex items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-3 text-xs uppercase font-medium text-slate-400">or enter PIN code</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* PIN Code Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="pincode-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              6-digit PIN Code
            </label>
            <div className="relative">
              <input
                id="pincode-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={pincode}
                onChange={handlePincodeChange}
                placeholder="e.g. 560001, 110001, 400001"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 tracking-wider outline-none"
              />
              {pincode.length === 6 && (
                <div className="absolute right-3 top-3 text-emerald-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
            {detectedInfo && !error && (
              <p className="mt-1.5 text-xs text-indigo-700 font-medium flex items-center gap-1">
                <span>📍</span>
                <span>{detectedInfo.area ? `${detectedInfo.area}, ` : ''}{detectedInfo.city}</span>
              </p>
            )}
          </div>

          {/* Quick city suggestions */}
          <div>
            <span className="block text-xs font-medium text-slate-500 mb-2">Popular Cities</span>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_CITIES.map((c) => (
                <button
                  key={c.pincode}
                  type="button"
                  onClick={() => handleQuickSelect(c)}
                  className={cn(
                    'rounded-lg px-2.5 py-1 text-xs font-medium border transition-colors',
                    pincode === c.pincode
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100',
                  )}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={pincode.length !== 6}
            >
              Set Location
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
