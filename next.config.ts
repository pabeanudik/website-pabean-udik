// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Konfigurasi Server Actions untuk mendukung upload gambar besar (>1MB)
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  // 2. Izinkan Next.js memuat gambar dari domain eksternal (Supabase Storage)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co", // Mengizinkan semua domain Supabase
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // 3. Konfigurasi Turbopack dan optimasi lainnya (Opsional)
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;