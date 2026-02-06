"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function BeritaSection({ posts }: { posts: any[] }) {
  return (
    <section className="py-32 px-6 bg-[#FBFBFB]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 block mb-4">
              Kabar Terbaru
            </span>
            <h2 className="text-4xl font-serif text-[#2C1810]">
              Berita <span className="italic">Desa Pabean Udik</span>
            </h2>
          </div>
          <Link 
            href="/artikel" 
            className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition"
          >
            Lihat Semua Cerita →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {posts.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              {/* Gambar Artikel */}
              <div className="aspect-[16/10] overflow-hidden bg-neutral-200 mb-6">
                <img 
                  src={post.image || "/images/placeholder.jpg"} 
                  alt={post.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>

              {/* Teks Artikel */}
              <div className="space-y-4">
                <span className="text-[9px] uppercase tracking-widest text-neutral-400 block">
                  {new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <h3 className="text-xl font-serif text-[#2C1810] group-hover:text-neutral-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {post.content.replace(/<[^>]*>?/gm, '')} {/* Menghapus tag HTML jika ada */}
                </p>
                <Link 
                  href={`/artikel/${post.slug}`}
                  className="inline-block pt-4 text-[10px] font-bold uppercase tracking-widest text-[#2C1810] border-b border-transparent group-hover:border-[#2C1810] transition-all"
                >
                  Baca Selengkapnya
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 border border-dashed border-neutral-200">
            <p className="text-[10px] uppercase tracking-widest text-neutral-300">Belum ada artikel unggulan.</p>
          </div>
        )}
      </div>
    </section>
  );
}