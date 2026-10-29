// =============================================================================
// Quick Compare — Adapter Registry
// =============================================================================

import type { PlatformId } from '@/types';
import type { PlatformAdapter } from './types';
import { MockPlatformAdapter } from './mock-adapter';
import { LiveQuickCommerceAdapter } from './live-adapter';
import { isLiveApiConfigured } from './quickcommerce-client';
import { PLATFORM_IDS } from '@/lib/constants';

// Registry instance map
const adapters: Map<PlatformId, PlatformAdapter> = new Map();

export function isLiveMode(): boolean {
  const dataSource = process.env.NEXT_PUBLIC_DATA_SOURCE;
  return dataSource === 'live' || (dataSource !== 'mock' && isLiveApiConfigured());
}

/**
 * Initialize adapters based on environment setting and key presence
 */
function initializeAdapters() {
  const live = isLiveMode();

  for (const id of PLATFORM_IDS) {
    if (live && isLiveApiConfigured()) {
      adapters.set(id, new LiveQuickCommerceAdapter(id));
    } else {
      adapters.set(id, new MockPlatformAdapter(id));
    }
  }
}

// Initial initialization
initializeAdapters();

/**
 * Get adapter for a specific platform.
 */
export function getAdapter(platformId: PlatformId): PlatformAdapter {
  let adapter = adapters.get(platformId);
  if (!adapter) {
    initializeAdapters();
    adapter = adapters.get(platformId);
  }
  if (!adapter) {
    throw new Error(`No adapter registered for platform: ${platformId}`);
  }
  return adapter;
}

/**
 * Get all registered platform adapters.
 */
export function getAllAdapters(): PlatformAdapter[] {
  if (adapters.size === 0) {
    initializeAdapters();
  }
  return Array.from(adapters.values());
}

/**
 * Register a live or custom adapter
 */
export function registerAdapter(platformId: PlatformId, adapter: PlatformAdapter): void {
  adapters.set(platformId, adapter);
}

export * from './types';
export * from './mock-adapter';
export * from './live-adapter';
export * from './quickcommerce-client';
