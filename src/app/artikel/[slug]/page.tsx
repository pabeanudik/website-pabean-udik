// src/app/artikel/[slug]/page.tsx
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function DetailArtikel({ params }: { params: { slug: string } }) {
  const data = await db.select().from(posts).where(eq(posts.slug, params.slug)).limit(1);
  const post = data[0];

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <article className="pt-40 pb-24">
        {/* Konten Utama */}
        <div className="max-w-3xl mx-auto px-6">
          <header className="text-center mb-16 space-y-6">
            <p className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 font-bold">
              Publikasi Resmi • {new Date(post.createdAt).toLocaleDateString('id-ID', { dateStyle: 'long' })}
            </p>
            <h1 className="text-4xl md:text-6xl font-serif text-[#2C1810] leading-tight">
              {post.title}
            </h1>
          </header>

          <div className="aspect-[16/9] mb-16 overflow-hidden rounded-sm shadow-xl">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed space-y-8 text-lg font-light">
            {/* Split konten berdasarkan baris baru agar rapi */}
            {post.content.split('\n').map((para, i) => (
              para && <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}