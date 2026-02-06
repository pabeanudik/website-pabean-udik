// src/components/ProfilDesa.tsx
"use client";
import { motion } from "framer-motion";

export default function ProfilDesa({ data }: { data: any }) {
  return (
    <section id="profil" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
        
        <div className="md:col-span-7 relative">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative z-10 aspect-[16/10] bg-neutral-50 overflow-hidden shadow-2xl"
          >
            <img 
              src={data?.imageUrl || "/images/desa-default.jpg"} 
              alt="Profil Desa Pabean Udik"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
          <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#4B2C20] z-0 hidden md:block" />
        </div>

        <div className="md:col-span-5 md:pl-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-xs uppercase tracking-[0.5em] text-neutral-400 mb-4 block font-medium">
              Warisan Pesisir
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#4B2C20] mb-8 leading-tight italic">
              {data?.title || "Kearifan Lokal Pabean Udik"}
            </h2>
            <div className="text-neutral-600 leading-relaxed text-sm md:text-base">
              {/* Menampilkan hanya satu paragraf deskripsi utama */}
              <p>
                {data?.description1 || "Pabean Udik adalah desa yang kaya akan potensi budaya dan ekonomi kreatif, menjunjung tinggi tradisi pesisir yang diwariskan secara turun-temurun."}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}