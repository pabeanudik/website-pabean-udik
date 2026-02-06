"use client";

import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function Hero({ title, subtitle, imageUrl }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image dengan Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="h-full w-full"
        >
          <img 
            src={imageUrl} 
            alt="Pabean Udik Hero" 
            /* PERBAIKAN UTAMA: 
               1. 'object-cover' memastikan foto tidak gepeng/stretch.
               2. 'object-center' menjaga titik tengah foto tetap terlihat.
               3. 'brightness-50' tetap dipertahankan agar teks putih mudah dibaca.
            */
            className="w-full h-full object-cover object-center brightness-50"
          />
        </motion.div>
      </div>

      {/* Konten Teks */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 leading-tight italic">
            {title}
          </h1>
          <p className="text-xs md:text-sm uppercase tracking-[0.6em] text-neutral-300 font-light leading-relaxed">
            {subtitle}
          </p>
          
          <div className="mt-12">
            <a 
              href="#katalog" 
              className="inline-block text-[10px] uppercase tracking-widest text-white border-b border-white pb-2 hover:opacity-50 transition-opacity duration-300"
            >
              Jelajahi Potensi Desa ↓
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}