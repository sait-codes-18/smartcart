declare module 'next' {
  export interface Metadata {
    title?: string;
    description?: string;
    keywords?: string[];
    [key: string]: any;
  }
  export interface NextConfig {
    [key: string]: any;
  }
}

declare module 'next/dist/lib/metadata/types/metadata-interface.js' {
  export type Metadata = any;
  export type ResolvingMetadata = any;
  export type ResolvingViewport = any;
  export type Viewport = any;
}

declare module 'next/server.js' {
  export class NextRequest extends Request {
    readonly nextUrl: URL;
    constructor(input: RequestInfo | URL, init?: RequestInit);
  }
  export class NextResponse extends Response {
    static json<T = any>(body: T, init?: ResponseInit): NextResponse;
    static redirect(url: string | URL, status?: number): NextResponse;
    static next(): NextResponse;
  }
}

declare module 'next/types.js' {
  export type AppProps = any;
  export type ResolvingMetadata = any;
  export type ResolvingViewport = any;
}

declare module 'next/link' {
  import React from 'react';
  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    replace?: boolean;
    scroll?: boolean;
    prefetch?: boolean;
    children?: React.ReactNode;
  }
  const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
  export default Link;
}

declare module 'next/navigation' {
  export function useRouter(): {
    push(url: string): void;
    replace(url: string): void;
    back(): void;
    forward(): void;
    refresh(): void;
    prefetch(url: string): void;
  };
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
  export function notFound(): never;
  export function redirect(url: string): never;
}

declare module 'next/server' {
  export class NextRequest extends Request {
    readonly nextUrl: URL;
    constructor(input: RequestInfo | URL, init?: RequestInit);
  }
  export class NextResponse extends Response {
    static json<T = any>(body: T, init?: ResponseInit): NextResponse;
    static redirect(url: string | URL, status?: number): NextResponse;
    static next(): NextResponse;
  }
}

declare module 'next/font/google' {
  export function Inter(options?: any): {
    className: string;
    variable: string;
    style: { fontFamily: string };
  };
  export function Geist(options?: any): {
    className: string;
    variable: string;
    style: { fontFamily: string };
  };
  export function Geist_Mono(options?: any): {
    className: string;
    variable: string;
    style: { fontFamily: string };
  };
}
