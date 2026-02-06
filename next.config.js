/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... konfigurasi lain jika ada ...
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
}

module.exports = nextConfig