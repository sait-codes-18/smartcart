"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { UserLocation } from "@/types";

interface LocationContextType {
  location: UserLocation | null;
  setLocation: (location: UserLocation) => void;
  clearLocation: () => void;
  isLocationModalOpen: boolean;
  openLocationModal: () => void;
  closeLocationModal: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

/** Pincode → city mapping for common Indian cities */
const PINCODE_MAP: Record<string, { city: string; area: string; state: string }> = {
  "110001": { city: "New Delhi", area: "Connaught Place", state: "Delhi" },
  "110002": { city: "New Delhi", area: "Darya Ganj", state: "Delhi" },
  "110003": { city: "New Delhi", area: "Civil Lines", state: "Delhi" },
  "110016": { city: "New Delhi", area: "Hauz Khas", state: "Delhi" },
  "110017": { city: "New Delhi", area: "Malviya Nagar", state: "Delhi" },
  "110019": { city: "New Delhi", area: "Kalkaji", state: "Delhi" },
  "110020": { city: "New Delhi", area: "Okhla", state: "Delhi" },
  "110025": { city: "New Delhi", area: "Lajpat Nagar", state: "Delhi" },
  "110048": { city: "New Delhi", area: "Chanakyapuri", state: "Delhi" },
  "110049": { city: "New Delhi", area: "Vasant Vihar", state: "Delhi" },
  "110065": { city: "New Delhi", area: "Saket", state: "Delhi" },
  "110070": { city: "New Delhi", area: "Pushp Vihar", state: "Delhi" },
  "400001": { city: "Mumbai", area: "Fort", state: "Maharashtra" },
  "400050": { city: "Mumbai", area: "Bandra West", state: "Maharashtra" },
  "400051": { city: "Mumbai", area: "Bandra East", state: "Maharashtra" },
  "400053": { city: "Mumbai", area: "Andheri West", state: "Maharashtra" },
  "400069": { city: "Mumbai", area: "Andheri East", state: "Maharashtra" },
  "400076": { city: "Mumbai", area: "Powai", state: "Maharashtra" },
  "560001": { city: "Bengaluru", area: "MG Road", state: "Karnataka" },
  "560008": { city: "Bengaluru", area: "Shivajinagar", state: "Karnataka" },
  "560034": { city: "Bengaluru", area: "Koramangala", state: "Karnataka" },
  "560037": { city: "Bengaluru", area: "Jayanagar", state: "Karnataka" },
  "560038": { city: "Bengaluru", area: "Indiranagar", state: "Karnataka" },
  "560066": { city: "Bengaluru", area: "Whitefield", state: "Karnataka" },
  "560095": { city: "Bengaluru", area: "HSR Layout", state: "Karnataka" },
  "560102": { city: "Bengaluru", area: "Electronic City", state: "Karnataka" },
  "500001": { city: "Hyderabad", area: "Abids", state: "Telangana" },
  "500032": { city: "Hyderabad", area: "Jubilee Hills", state: "Telangana" },
  "500033": { city: "Hyderabad", area: "Madhapur", state: "Telangana" },
  "500081": { city: "Hyderabad", area: "Gachibowli", state: "Telangana" },
  "600001": { city: "Chennai", area: "George Town", state: "Tamil Nadu" },
  "600017": { city: "Chennai", area: "T. Nagar", state: "Tamil Nadu" },
  "600020": { city: "Chennai", area: "Anna Nagar", state: "Tamil Nadu" },
  "600028": { city: "Chennai", area: "Adyar", state: "Tamil Nadu" },
  "700001": { city: "Kolkata", area: "BBD Bagh", state: "West Bengal" },
  "700019": { city: "Kolkata", area: "Ballygunge", state: "West Bengal" },
  "700029": { city: "Kolkata", area: "Park Street", state: "West Bengal" },
  "411001": { city: "Pune", area: "Shivajinagar", state: "Maharashtra" },
  "411006": { city: "Pune", area: "Deccan", state: "Maharashtra" },
  "411014": { city: "Pune", area: "Hadapsar", state: "Maharashtra" },
  "411045": { city: "Pune", area: "Hinjewadi", state: "Maharashtra" },
  "380001": { city: "Ahmedabad", area: "Lal Darwaja", state: "Gujarat" },
  "380015": { city: "Ahmedabad", area: "Paldi", state: "Gujarat" },
  "380054": { city: "Ahmedabad", area: "Prahlad Nagar", state: "Gujarat" },
  "380059": { city: "Ahmedabad", area: "SG Highway", state: "Gujarat" },
  "226001": { city: "Lucknow", area: "Hazratganj", state: "Uttar Pradesh" },
  "302001": { city: "Jaipur", area: "MI Road", state: "Rajasthan" },
  "201301": { city: "Noida", area: "Sector 15", state: "Uttar Pradesh" },
  "122001": { city: "Gurugram", area: "Old Gurgaon", state: "Haryana" },
  "122002": { city: "Gurugram", area: "DLF Phase 1", state: "Haryana" },
  "122018": { city: "Gurugram", area: "Golf Course Road", state: "Haryana" },
};

export function lookupPincode(pincode: string): { city: string; area: string; state: string } | null {
  return PINCODE_MAP[pincode] || null;
}

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocationState] = useState<UserLocation | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const setLocation = useCallback((loc: UserLocation) => {
    const lookup = lookupPincode(loc.pincode);
    const enriched: UserLocation = {
      ...loc,
      city: loc.city || lookup?.city,
      area: loc.area || lookup?.area,
      state: loc.state || lookup?.state,
    };
    setLocationState(enriched);
    // Persist to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("smartcart_location", JSON.stringify(enriched));
    }
  }, []);

  const clearLocation = useCallback(() => {
    setLocationState(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("smartcart_location");
      localStorage.removeItem("quickcompare_location");
    }
  }, []);

  const openLocationModal = useCallback(() => setIsLocationModalOpen(true), []);
  const closeLocationModal = useCallback(() => setIsLocationModalOpen(false), []);

  // Load saved location on mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("smartcart_location") || localStorage.getItem("quickcompare_location");
      if (saved) {
        try {
          setLocationState(JSON.parse(saved));
        } catch {
          // Ignore parse errors
        }
      }
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        clearLocation,
        isLocationModalOpen,
        openLocationModal,
        closeLocationModal,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
