// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Mengabaikan error TypeScript saat build di Vercel
    ignoreBuildErrors: true, 
  },
  eslint: {
    // Mengabaikan error ESLint saat build di Vercel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;