import { NextRequest, NextResponse } from 'next/server';
import { lookupPincode } from '@/context/LocationContext';
import { getAllAdapters } from '@/lib/adapters';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pincode = searchParams.get('pincode');

  if (!pincode || pincode.length !== 6) {
    return NextResponse.json(
      {
        success: false,
        error: 'Please provide a valid 6-digit PIN code.',
      },
      { status: 400 },
    );
  }

  const locationDetails = lookupPincode(pincode);
  const adapters = getAllAdapters();

  // Check platform availability for this pincode
  const platformAvailability = await Promise.all(
    adapters.map(async (adapter) => ({
      platformId: adapter.platformId,
      isAvailable: await adapter.isAvailable({ pincode }),
      deliveryEstimate: await adapter.getDeliveryEstimate({ pincode }),
    })),
  );

  return NextResponse.json({
    success: true,
    data: {
      pincode,
      city: locationDetails?.city || 'India',
      area: locationDetails?.area || `Pincode ${pincode}`,
      state: locationDetails?.state,
      platforms: platformAvailability,
    },
  });
}
