import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Same source of truth as lib/api.ts — CSP always matches the real backend.
const apiOrigin = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000").origin;
  } catch {
    return "http://localhost:3000";
  }
})();

const cspHeader = [
  `default-src 'self'`,
  // 'unsafe-inline' needed for Next's own hydration/RSC inline scripts
  // (no nonce setup — that requires proxy.js + forcing dynamic rendering,
  // bigger scope than this change). 'unsafe-eval' only in dev (React debug).
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  // 'unsafe-inline' needed for the inline style={{filter:...}} in SoccerVideo.tsx
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' blob: data:`,
  `font-src 'self'`, // fonts are self-hosted via next/font, no external origin
  `media-src 'self'`, // /videos/soccer-juggle.mp4
  `connect-src 'self' ${apiOrigin}`, // backend API (dev or Render, from env)
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'none'`, // CSP-level reinforcement of X-Frame-Options
  `upgrade-insecure-requests`,
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: cspHeader },
        ],
      },
    ];
  },
};

export default nextConfig;
