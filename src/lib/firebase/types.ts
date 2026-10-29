// =============================================================================
// Quick Compare — Firestore Database Schema Types
// =============================================================================

import type { PlatformId, ProductCategory, AvailabilityStatus, DataSource } from '@/types';

/** /products/{productId} */
export interface FirestoreProductDoc {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subcategory?: string;
  description: string;
  imageUrl: string;
  unit: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

/** /products/{productId}/variants/{variantId} */
export interface FirestoreVariantDoc {
  id: string;
  productId: string;
  name: string;
  unit: string;
  barcode?: string;
}

/** /platform_listings/{platformId_productId} */
export interface FirestorePlatformListingDoc {
  id: string; // e.g. "blinkit_prod-001"
  productId: string;
  platformId: PlatformId;
  price: number;
  mrp: number;
  discount?: number;
  availability: AvailabilityStatus;
  deliveryMinutes?: number;
  deliveryFee: number;
  platformFee?: number;
  productUrl?: string;
  pincodeRegion?: string;
  dataSource: DataSource;
  updatedAt: string;
}

/** /price_observations/{autoId} */
export interface FirestorePriceObservationDoc {
  id: string;
  productId: string;
  platformId: PlatformId;
  price: number;
  mrp: number;
  pincode?: string;
  timestamp: string;
  source: DataSource;
}

/** /availability_observations/{autoId} */
export interface FirestoreAvailabilityObservationDoc {
  id: string;
  productId: string;
  platformId: PlatformId;
  availability: AvailabilityStatus;
  pincode?: string;
  timestamp: string;
}

/** /users/{userId}/preferences/general */
export interface FirestoreUserPreferencesDoc {
  defaultPincode?: string;
  preferredPlatforms?: PlatformId[];
  dietaryPreferences?: string[];
  updatedAt: string;
}
