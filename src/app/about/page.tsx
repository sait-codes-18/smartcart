import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DemoDataBanner } from '@/components/ui/DemoDataBanner';

export default function AboutPage() {
  return (
    <>
      <DemoDataBanner />
      <Header />
      <main className="flex-1 bg-slate-50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              About SmartCart
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Transparent quick-commerce price comparison for India
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Quick-commerce services like Blinkit, Zepto, and Swiggy Instamart have transformed how India shops for daily essentials. However, identical items often have differing prices, delivery fees, and estimated arrival times across platforms.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-2">
              <span className="text-3xl">🏷️</span>
              <h3 className="text-base font-bold text-slate-900">Lowest Total Cost</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We calculate the true total checkout cost: Product Price + Delivery Fee + Handling Fee − Discounts. A cheaper item with high delivery charges isn&apos;t truly cheaper.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-2">
              <span className="text-3xl">⚡</span>
              <h3 className="text-base font-bold text-slate-900">Fastest Delivery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When you need an ingredient right now, saving ₹5 is less important than receiving it in 10 minutes vs 30 minutes. We always spotlight the fastest available option.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-2">
              <span className="text-3xl">📍</span>
              <h3 className="text-base font-bold text-slate-900">Hyperlocal Availability</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Stock and dark store coverage vary by PIN code. We ensure prices and availability reflect your specific delivery location before you decide.
              </p>
            </div>
          </div>

          {/* Data Integrity & Architecture */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs space-y-6">
            <h2 className="text-xl font-bold text-slate-900">
              Data Integrity &amp; Integration Principles
            </h2>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong>No Scraping or TOS Violations:</strong> SmartCart relies on modular platform adapters designed for authorized partner APIs, open feeds, or consented customer integrations. We strictly avoid unauthorized web scraping, bypassing CAPTCHAs, or violating terms of service.
              </p>
              <p>
                <strong>Transparent Demo Notice:</strong> When live platform APIs are pending partnership approval, our system runs mock adapters with realistic Indian retail pricing and explicitly labels them as <em>Demo Data</em>. We never fabricate live claims.
              </p>
              <p>
                <strong>Standardized Unit Matching:</strong> A 500g pack of butter is never compared to a 100g pack. Every comparison strictly normalizes variants, pack sizes, and brands.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
            >
              Start Comparing Groceries Now
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
