import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            SmartCart does not collect, sell, or store precise GPS location coordinates without user consent. Location data (PIN code) is only used locally on your device to display relevant store availability and estimate delivery charges accurately.
          </p>
          <h2 className="text-xl font-bold text-slate-800">Data Storage</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Preferences such as chosen PIN code are stored solely in your browser&apos;s local storage. No identifying personal data is stored unless you create an account.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
