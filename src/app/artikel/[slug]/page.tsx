// src/app/artikel/[slug]/page.tsx
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Definisi tipe data untuk Next.js 15 (params sekarang bersifat asynchronous)
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DetailArtikel({ params }: PageProps) {
  // 1. Wajib melakukan await pada params sebelum mengakses propertinya
  const { slug } = await params;

  // 2. Ambil data artikel dari Neon Database melalui Drizzle
  const data = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);

  const post = data[0];

  // 3. Jika slug tidak ditemukan di database, tampilkan halaman 404
  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <article className="pt-40 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Metadata Artikel */}
          <header className="text-center mb-16 space-y-6">
            <div className="flex justify-center items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-neutral-400 font-bold">
              <span>Warta Pabean Udik</span>
              <span className="w-1 h-1 bg-neutral-300 rounded-full" />
              <span>{new Date(post.createdAt).toLocaleDateString('id-ID', { dateStyle: 'long' })}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-[#2C1810] leading-tight">
              {post.title}
            </h1>
          </header>

          {/* Gambar Utama Artikel */}
          <div className="aspect-[16/9] mb-16 overflow-hidden rounded-sm shadow-2xl bg-neutral-50">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Isi Konten Artikel */}
          <div className="prose prose-neutral max-w-none text-neutral-800 leading-relaxed space-y-8 text-lg font-light">
            {/* Memisahkan teks berdasarkan baris baru agar paragraf rapi */}
            {post.content.split('\n').map((paragraph, index) => (
              paragraph.trim() !== "" && (
                <p key={index} className="first-letter:text-3xl first-letter:font-serif first-letter:mr-1">
                  {paragraph}
                </p>
              )
            ))}
          </div>

          {/* Footer Artikel / Tanda Tangan Digital */}
          <div className="mt-20 pt-12 border-t border-neutral-100 italic text-neutral-400 text-sm font-serif">
            Ditulis untuk kemajuan Desa Pabean Udik.
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}