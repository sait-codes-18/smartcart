'use client';

// =============================================================================
// Quick Compare — Homepage (Pixel-Matched to User Reference Image)
// =============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DemoDataBanner } from '@/components/ui/DemoDataBanner';
import { LiveComparisonSection } from '@/components/home/LiveComparisonSection';
import { HeroSearchBar } from '@/components/search/HeroSearchBar';

export default function HomePage() {
  const router = useRouter();

  const popularKeywords = ['Milk', 'Eggs', 'Bread', 'Bananas', 'Chips'];

  return (
    <>
      <DemoDataBanner />
      <Header />

      <main className="flex-1 pb-16">
        {/* Hero Banner with Sage Green Background matching Reference Image */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
          <div
            className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden border border-emerald-900/10 shadow-xs"
            style={{ backgroundColor: '#E9EFE3' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Heading, Subtitle, Search, Tags */}
              <div className="lg:col-span-7 space-y-6">
                {/* Pill Eyebrow */}
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <span className="text-emerald-700">✦</span>
                  <span>INDIA&apos;S QUICK-COMMERCE COMPARISON</span>
                </div>

                {/* Main Heading with Playfair Display italic serif accent */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
                  Don&apos;t overpay{' '}
                  <span
                    className="font-editorial text-amber-700 block sm:inline"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontStyle: 'italic',
                      color: '#C84D29',
                    }}
                  >
                    for convenience.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                  Compare prices, delivery times, and checkout fees across your
                  favourite quick-commerce apps.
                </p>

                {/* Search Bar pill with integrated Autocomplete Suggestions dropdown */}
                <HeroSearchBar />

                {/* Popular Searches inline chips */}
                <div className="flex items-center gap-2 text-xs text-slate-600 flex-wrap pt-1">
                  <span className="font-medium text-slate-500">Popular:</span>
                  {popularKeywords.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => router.push(`/search?q=${encodeURIComponent(item)}`)}
                      className="font-semibold text-slate-800 underline hover:text-amber-800 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Floating Cart Card Graphic matching reference */}
              <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-sm">
                  {/* Floating 10 min delivery pill */}
                  <div className="absolute -top-3 -right-2 z-20 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-md">
                    <span className="text-lime-400">⚡</span>
                    <span>10 min delivery</span>
                  </div>

                  {/* Main Cart Card */}
                  <div className="rounded-2xl bg-white p-5 shadow-xl border border-slate-200/60 space-y-3.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      YOUR CART
                    </span>

                    <div className="divide-y divide-slate-100 text-xs text-slate-700">
                      <div className="flex justify-between py-2">
                        <span>Amul Taaza Milk</span>
                        <span className="font-semibold text-slate-900">₹58</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span>Whole Wheat Bread</span>
                        <span className="font-semibold text-slate-900">₹48</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span>Classic White Eggs</span>
                        <span className="font-semibold text-slate-900">₹89</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 text-sm">Best total</span>
                      <span className="text-xl font-black text-slate-900">₹198</span>
                    </div>

                    {/* Saved pill */}
                    <div className="rounded-xl bg-lime-100/70 border border-lime-200 p-2 text-center text-xs font-bold text-emerald-900 flex items-center justify-center gap-1.5">
                      <span>🏷️</span>
                      <span>₹24 saved today</span>
                    </div>
                  </div>

                  {/* Floating 'Best price found' orange badge */}
                  <div
                    className="absolute -bottom-3 -left-3 z-20 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white shadow-lg"
                    style={{ backgroundColor: '#D9532F' }}
                  >
                    <span>🏷️</span>
                    <span>Best price found</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Trust Features Under Hero */}
        <section className="mx-auto max-w-5xl px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-around gap-4 text-xs font-semibold text-slate-600 border-b border-slate-200 pb-8">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Independent comparison</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Updated every few minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No hidden commissions</span>
            </div>
          </div>
        </section>

        {/* Live Comparison Table Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
          <LiveComparisonSection />
        </section>
      </main>

      <Footer />
    </>
  );
}
