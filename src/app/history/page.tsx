'use client';

// =============================================================================
// Quick Compare — Price History Page
// =============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DemoDataBanner } from '@/components/ui/DemoDataBanner';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { PLATFORMS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export default function HistoryPage() {
  const [selectedProductId, setSelectedProductId] = useState(MOCK_PRODUCTS[0].id);

  const selectedProduct =
    MOCK_PRODUCTS.find((p) => p.id === selectedProductId) || MOCK_PRODUCTS[0];

  // Generate realistic historical observation points for demonstration
  const historyData = [
    {
      date: 'Today (Latest)',
      blinkit: 66,
      zepto: 68,
      swiggy: 65,
      bigbasket: 67,
    },
    {
      date: '3 days ago',
      blinkit: 66,
      zepto: 66,
      swiggy: 66,
      bigbasket: 67,
    },
    {
      date: '1 week ago',
      blinkit: 64,
      zepto: 67,
      swiggy: 66,
      bigbasket: 68,
    },
    {
      date: '2 weeks ago',
      blinkit: 65,
      zepto: 65,
      swiggy: 67,
      bigbasket: 66,
    },
    {
      date: '1 month ago',
      blinkit: 66,
      zepto: 66,
      swiggy: 66,
      bigbasket: 66,
    },
  ];

  return (
    <>
      <DemoDataBanner />
      <Header />
      <main className="flex-1 bg-slate-50 py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Price History &amp; Trends
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Track how quick-commerce platforms adjust prices over time for daily grocery staples.
            </p>
          </div>

          {/* Product Selector */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <label htmlFor="product-select" className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Product to Inspect:
            </label>
            <select
              id="product-select"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full sm:w-96 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 bg-white focus:border-indigo-600 focus:outline-none"
            >
              {MOCK_PRODUCTS.slice(0, 15).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.unit}) — {p.brand}
                </option>
              ))}
            </select>
          </div>

          {/* Trend Breakdown Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedProduct.name}
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  Pack size: {selectedProduct.unit} • Brand: {selectedProduct.brand}
                </span>
              </div>
              <Link
                href={`/product/${selectedProduct.id}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors self-start sm:self-auto"
              >
                View Live Comparison &rarr;
              </Link>
            </div>

            {/* Table of past observations */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[11px] font-semibold uppercase text-slate-400 border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Observation Window</th>
                    <th className="py-3 px-4 text-amber-700">Blinkit</th>
                    <th className="py-3 px-4 text-purple-700">Zepto</th>
                    <th className="py-3 px-4 text-orange-700">Swiggy Instamart</th>
                    <th className="py-3 px-4 text-green-700">BigBasket</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {historyData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        {row.date}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {formatPrice(row.blinkit)}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {formatPrice(row.zepto)}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {formatPrice(row.swiggy)}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {formatPrice(row.bigbasket)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-xs text-slate-600 flex items-start gap-2.5">
              <span className="text-base">ℹ️</span>
              <p>
                Price observations are logged automatically when searches are performed. When connected to Firestore, historic observations are persisted and retained for 90 days.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
