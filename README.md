# QuickCompare — Quick-Commerce Price Comparison Platform

QuickCompare is a full-stack web application designed for users in India to compare product prices, availability, estimated delivery times, and total checkout costs across quick-commerce platforms (**Blinkit**, **Zepto**, **Swiggy Instamart**, and **BigBasket**) before placing an order.

---

## 1. Key Value Propositions

1. **Lowest Total Checkout Cost**: Unlike basic scrapers that only compare item sticker prices, QuickCompare computes:
   $$\text{Total Cost} = \text{Product Price} + \text{Delivery Fee} + \text{Platform Fee} - \text{Discounts}$$
2. **Fastest Delivery**: Spotlights the quickest platform when time is of the essence (e.g. 10 mins vs 25 mins).
3. **Hyperlocal Availability**: Uses user PIN codes to determine actual dark-store serviceability and realistic delivery estimates.
4. **Standardized Pack Sizes**: Ensures items with different weights, volumes, or pack configurations (e.g. 500g butter vs 100g butter) are never conflated as identical.

---

## 2. Technology Stack

- **Framework**: Next.js 16+ (App Router, Server & Client Components)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore (with dedicated security rules in `firestore.rules`)
- **Backend**: Next.js Route Handlers (`/api/search`, `/api/compare/[id]`, `/api/location`, `/api/history/[id]`)
- **Deployment**: Vercel ready

---

## 3. Architecture & Project Structure

```
d:\PROJECTS\Quick_Compare\
├── firestore.rules              # Firebase Firestore security rules
├── next.config.ts               # Next.js configuration
├── package.json                 # Scripts and dependencies
├── .env.example                 # Template for environment configuration
├── tests/
│   └── ranking-and-cost.test.mjs# Automated unit test suite
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Global app layout with font & Providers
│   │   ├── page.tsx             # Homepage with search, categories, how-it-works
│   │   ├── search/
│   │   │   ├── page.tsx         # Search results page
│   │   │   ├── SearchResults.tsx# Search & filter UI with debounce & sorting
│   │   │   └── SearchResultsSkeleton.tsx
│   │   ├── product/[id]/
│   │   │   └── page.tsx         # Detailed multi-platform comparison page
│   │   ├── history/
│   │   │   └── page.tsx         # Historical price tracking page
│   │   ├── about/
│   │   │   └── page.tsx         # Transparency & data integration docs
│   │   ├── privacy/ & terms/    # Privacy and Terms pages
│   │   └── api/
│   │       ├── search/route.ts  # Search & autocomplete API
│   │       ├── compare/[id]/route.ts # Multi-platform comparison API
│   │       ├── location/route.ts# PIN code availability API
│   │       └── history/[id]/route.ts # Historical price trend API
│   ├── components/
│   │   ├── layout/ (Header, Footer)
│   │   ├── search/ (SearchBar, FilterPanel)
│   │   ├── product/ (ProductCard, PlatformComparisonCard, ComparisonTable, DeliveryEstimate, PriceBadge)
│   │   ├── location/ (LocationSelector modal with GPS & PIN lookup)
│   │   ├── home/ (CategoryGrid, HowItWorks, PopularSearches)
│   │   └── ui/ (Button, Badge, Skeleton, EmptyState, ErrorState, Logo, DemoDataBanner)
│   ├── context/
│   │   └── LocationContext.tsx  # React Context for PIN code, city, area
│   ├── lib/
│   │   ├── adapters/            # Modular platform adapter interfaces
│   │   │   ├── types.ts         # PlatformAdapter interface
│   │   │   ├── mock-adapter.ts  # Simulated mock adapter
│   │   │   └── index.ts         # Adapter registry (getAdapter, getAllAdapters)
│   │   ├── services/            # Business logic
│   │   │   ├── ranking-service.ts    # Cheapest, fastest, best-value ranking
│   │   │   ├── comparison-service.ts # Cross-platform aggregation & basket calc
│   │   │   └── search-service.ts     # Search, autocomplete & filter service
│   │   ├── firebase/            # Firebase client and admin SDK helpers
│   │   ├── constants.ts         # Platforms, colors, categories, metro areas
│   │   ├── mock-data.ts         # 30+ realistic Indian grocery items across platforms
│   │   └── utils.ts             # Price formatting, INR format, debounce, slugify
│   └── types/
│       ├── index.ts             # Core domain TypeScript interfaces
│       └── next.d.ts            # Type definitions for Next.js internal modules
```

---

## 4. Platform Adapter Architecture

All platform integrations implement the standard `PlatformAdapter` interface:

```typescript
export interface PlatformAdapter {
  readonly platformId: PlatformId;
  searchProducts(params: SearchParams): Promise<Product[]>;
  getProductListing(productId: string, location?: UserLocation): Promise<PlatformListing | null>;
  getProductListings(productIds: string[], location?: UserLocation): Promise<PlatformListing[]>;
  isAvailable(location: UserLocation): Promise<boolean>;
  getDeliveryEstimate(location: UserLocation): Promise<string | null>;
}
```

### Transitioning from Demo Data to Live APIs:
1. Create a new adapter file (e.g. `src/lib/adapters/blinkit-live.ts`) implementing `PlatformAdapter`.
2. Connect to authorized merchant partner APIs or customer feeds.
3. Register the live adapter in `src/lib/adapters/index.ts` via `registerAdapter('blinkit', new BlinkitLiveAdapter())`.
4. Set `dataSource: 'live'` on listings returned by the adapter. The UI automatically displays or hides the "Demo data" indicator.

---

## 5. Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm or pnpm

### Installation & Environment Setup
1. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```
2. Run automated unit tests:
   ```bash
   npm test
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Start the production server:
   ```bash
   npm run start
   ```

---

## 6. Firestore Security Rules

Production Firestore rules are located in [`firestore.rules`](./firestore.rules):
- **Products & Platform Listings**: Read-only for public clients; write operations restricted to backend server / Admin SDK.
- **Price & Availability Observations**: Read-only for public clients; writes restricted to server.
- **Users Collection**: Scoped strictly to authenticated users matching `request.auth.uid`.

---

## 7. Verification Performed

- **TypeScript Compilation**: `tsc --noEmit` verified with 0 errors.
- **Unit Test Suite**: 4/4 test suites passing (`tests/ranking-and-cost.test.mjs`):
  - Total cost calculation (sticker price + delivery fee + platform fee - discounts)
  - Product matching, pack-size variant differentiation, and category filtering
  - Comparison ranking for cheapest item, fastest delivery, and lowest total cost
  - Location-aware coverage logic
- **Next.js Production Build**: Static and dynamic routes compiled successfully:
  - Homepage (`/`)
  - Search & Filters (`/search`)
  - Product Comparison (`/product/[id]`)
  - Price History (`/history`)
  - Explainer / About (`/about`)
  - Privacy Policy (`/privacy`)
  - Terms of Service (`/terms`)
  - API Route Handlers (`/api/search`, `/api/compare/[id]`, `/api/location`, `/api/history/[id]`)
