"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const categories = ["Semua", "Budaya", "UMKM", "Kuliner"];

export default function Katalog({ products }: { products: any[] }) {
  const [activeTab, setActiveTab] = useState("Semua");

  const filtered = activeTab === "Semua" 
    ? products 
    : products.filter(p => p.kategori === activeTab);

  return (
    <section id="katalog" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400 mb-4 block">
              Kurasi Potensi Desa
            </h2>
            <h3 className="text-4xl font-serif text-[#2C1810]">
              Katalog <span className="italic">Pabean Udik.</span>
            </h3>
          </div>
          
          {/* TAB FILTER */}
          <div className="flex gap-8 border-b border-neutral-100 overflow-x-auto pb-1 w-full md:w-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`pb-4 text-[10px] uppercase tracking-[0.2em] transition-all relative whitespace-nowrap ${
                  activeTab === cat ? "text-[#2C1810] font-bold" : "text-neutral-300 hover:text-neutral-500"
                }`}
              >
                {cat}
                {activeTab === cat && (
                  <motion.div 
                    layoutId="underline" 
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2C1810]" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* GRID PRODUK */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-20">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                {/* Link Pembungkus agar seluruh area produk bisa diklik */}
                <Link href={`/katalog/${item.slug}`} className="group block">
                  
                  {/* Container Foto dengan Aspek Rasio Tetap (4:5) */}
                  <div className="relative aspect-[4/5] w-full mb-8 overflow-hidden bg-[#F9F7F2] shadow-sm">
                    {item.foto ? (
                      <img 
                        src={item.foto} 
                        alt={item.nama}
                        /* object-cover: Mengisi kontainer tanpa stretch.
                           w-full h-full: Memastikan gambar memenuhi aspek rasio kontainer.
                        */
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] uppercase tracking-widest text-neutral-300 italic">
                        Tanpa Foto
                      </div>
                    )}
                    
                    {/* Badge Kategori */}
                    <div className="absolute top-6 left-6 z-10">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[9px] uppercase tracking-widest font-bold text-[#2C1810]">
                        {item.kategori}
                      </span>
                    </div>
                  </div>

                  {/* Informasi Produk */}
                  <div className="space-y-3">
                    <h4 className="text-sm uppercase tracking-[0.1em] font-bold text-[#2C1810] group-hover:text-[#4B2C20] transition-colors">
                      {item.nama}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light line-clamp-2">
                      {item.deskripsi}
                    </p>
                    <div className="pt-2">
                      <span className="inline-block text-[10px] font-bold border-b border-[#2C1810] pb-1 group-hover:opacity-40 transition-opacity tracking-[0.2em]">
                        LIHAT DETAIL
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <div className="py-20 text-center border border-dashed border-neutral-100">
            <p className="text-[10px] uppercase tracking-widest text-neutral-300">
              Belum ada produk untuk kategori ini.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}