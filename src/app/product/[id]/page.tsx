import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DemoDataBanner } from '@/components/ui/DemoDataBanner';
import { ComparisonTable } from '@/components/product/ComparisonTable';
import { comparisonService } from '@/lib/services/comparison-service';
import { getProductById } from '@/lib/mock-data';
import { CATEGORIES, getAuthenticProductPhoto } from '@/lib/constants';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ name?: string; brand?: string }>;
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: ProductDetailPageProps) {
  const { id } = await params;
  const sp = searchParams ? await searchParams : {};
  const nameHint = typeof sp?.name === 'string' ? sp.name : undefined;

  const comparison = await comparisonService.compareProduct(id, undefined, nameHint);

  if (!comparison) {
    notFound();
    return null;
  }

  const product = comparison.product;
  const categoryInfo = CATEGORIES[product.category] || {
    label: 'Groceries',
    icon: '🛒',
  };

  return (
    <>
      <DemoDataBanner />
      <Header />
      <main className="flex-1 bg-slate-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/search?category=${product.category}`}
              className="hover:text-indigo-600 transition-colors"
            >
              {categoryInfo?.label || product.category}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium truncate max-w-xs sm:max-w-md">
              {product.name}
            </span>
          </nav>

          {/* Product Header Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
              {/* Real Product Photo */}
              <div className="w-40 h-40 md:w-52 md:h-52 shrink-0 rounded-2xl bg-white flex items-center justify-center p-4 border border-slate-200/80 shadow-2xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getAuthenticProductPhoto(product.name, product.imageUrl)}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 space-y-3 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {product.brand}
                  </span>
                  <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                    Pack: {product.unit}
                  </span>
                  <span className="inline-flex rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500 border border-slate-200">
                    {categoryInfo?.label}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {product.name}
                </h1>

                <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                  {product.description}
                </p>

                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 pt-1">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section: Live Comparison */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Quick-Commerce Comparison
                </h2>
                <p className="text-xs text-slate-500">
                  Real-time price, delivery speed, and availability for this exact pack size
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Simulated live updates</span>
              </div>
            </div>

            <ComparisonTable comparison={comparison} />
          </div>

          {/* Important shopping note */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 text-xs text-amber-900 space-y-1">
            <h4 className="font-bold flex items-center gap-1.5">
              <span>💡</span> Smart Buying Tip
            </h4>
            <p className="leading-relaxed">
              Total checkout cost includes delivery fee, surge, and platform handling fees. The platform with the lowest product price may not always be the cheapest if their delivery fee is higher. Check the &ldquo;Lowest Total&rdquo; badge above.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
