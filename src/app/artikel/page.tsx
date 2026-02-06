// src/app/artikel/page.tsx
import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function ArtikelPage() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return (
    <main className="min-h-screen bg-[#FBFBFB]">
      <Header />
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-20">
            <h1 className="text-5xl font-serif text-[#2C1810] mb-6">Warta Pabean Udik</h1>
            <p className="text-neutral-500 uppercase tracking-[0.3em] text-[10px] font-bold">
              Informasi Terkini & Edukasi Masyarakat
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {allPosts.map((post) => (
              <Link key={post.id} href={`/artikel/${post.slug}`} className="group">
                <article className="space-y-6">
                  <div className="aspect-video overflow-hidden bg-neutral-100 rounded-sm">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                      {new Date(post.createdAt).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                    </p>
                    <h2 className="text-2xl font-serif text-[#2C1810] group-hover:italic transition-all">
                      {post.title}
                    </h2>
                    <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 font-light">
                      {post.content}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}