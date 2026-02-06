// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  // Pastikan path mengarah ke folder src/ karena semua komponen kamu ada di sana
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'pabean-brown': '#4B2C20', // Warna khas Batik Tulis Dermayon
        'pabean-dark': '#2c1810',  // Sesuai dengan globals.css kamu
        'pabean-light': '#FFFFFF',
        'pabean-cream': '#F5F5F5',
        'pabean-beige': '#f9f7f2', // Tambahan dari variabel globals.css
      },
      fontFamily: {
        // Pastikan variabel CSS ini sudah di-inject di layout.tsx
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;