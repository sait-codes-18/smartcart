import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "SmartCart — India's Quick-Commerce Comparison",
  description:
    "Don't overpay for convenience. Compare prices, delivery times, and checkout fees across Blinkit, Zepto, Swiggy Instamart & BigBasket.",
  keywords: [
    "quick commerce",
    "price comparison",
    "blinkit",
    "zepto",
    "swiggy instamart",
    "bigbasket",
    "grocery",
    "delivery",
    "india",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Tailwind configuration initialized before CDN scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.tailwind = {
                config: {
                  theme: {
                    extend: {
                      colors: {
                        cream: '#FBFBEE',
                        olive: {
                          50: '#F4F7EE',
                          100: '#E8EEDC',
                          200: '#D5DFBF',
                          500: '#758852',
                          800: '#2A3618',
                          900: '#1D2710',
                        },
                        terracotta: {
                          500: '#D9532F',
                          600: '#C24220',
                        },
                      },
                      fontFamily: {
                        serif: ['Playfair Display', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
                        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
                      }
                    }
                  }
                }
              };
            `,
          }}
        />
        {/* Primary CDN + local fallback for Tailwind */}
        <script src="https://cdn.tailwindcss.com" async />
        <script src="/tailwind.cdn.js" defer />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full flex flex-col text-slate-900"
        style={{
          backgroundColor: '#F8F8F0',
          fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
