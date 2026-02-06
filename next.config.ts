// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // @ts-ignore
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TAMBAHKAN INI:
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Naikin jadi 10 MB
    },
  },
};

export default nextConfig;