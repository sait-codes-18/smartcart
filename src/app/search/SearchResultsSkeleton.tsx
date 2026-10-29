import { Skeleton } from '@/components/ui/Skeleton';

export function SearchResultsSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar skeleton */}
      <div className="w-full lg:w-64 shrink-0 space-y-4">
        <div className="h-6 w-24 bg-slate-200 rounded animate-pulse" />
        <div className="h-32 bg-slate-100 rounded-xl animate-pulse" />
        <div className="h-40 bg-slate-100 rounded-xl animate-pulse" />
      </div>

      {/* Grid skeleton */}
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-6 w-48 bg-slate-200 rounded animate-pulse" />
          <div className="h-9 w-32 bg-slate-100 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 p-4 space-y-3"
            >
              <div className="aspect-square bg-slate-100 rounded-lg animate-pulse" />
              <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-slate-100 rounded animate-pulse" />
              <div className="h-5 w-1/3 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
