import type { NextConfig } from "next";
import path from "path";

// Same-origin proxy for the Beeper host API. Required so the session cookie
// (set by /api/auth/verify) lands on the frontend's origin — browsers
// (Safari ITP, Chrome 3rd-party blocking) refuse to send a cross-site cookie
// on /api/auth/me even with SameSite=None; Secure + CORS credentials.
const API_UPSTREAM =
  process.env.NEXT_PUBLIC_BEEPER_API_UPSTREAM ?? "https://beeper-v2-host.vercel.app";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${API_UPSTREAM}/api/:path*` },
    ];
  },
};

export default nextConfig;
