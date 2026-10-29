import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h1 className="text-3xl font-extrabold text-slate-900">Terms of Service</h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            SmartCart is an independent comparison and discovery tool for quick commerce. Brand names, logos, and trademarks such as Blinkit, Zepto, Swiggy Instamart, and BigBasket belong to their respective owners.
          </p>
          <h2 className="text-xl font-bold text-slate-800">Pricing and Availability Disclaimer</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Prices, delivery estimates, promotions, and product availability are subject to change by quick-commerce platforms in real time based on demand, weather conditions, surge pricing, and warehouse stock. Always verify the final checkout total on the merchant platform before completing an order.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
