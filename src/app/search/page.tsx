import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DemoDataBanner } from "@/components/ui/DemoDataBanner";
import { SearchResults } from "./SearchResults";
import { SearchResultsSkeleton } from "./SearchResultsSkeleton";

export default function SearchPage() {
  return (
    <>
      <DemoDataBanner />
      <Header />
      <main className="flex-1 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <Suspense fallback={<SearchResultsSkeleton />}>
            <SearchResults />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
