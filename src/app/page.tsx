// src/app/page.tsx
import { db } from "@/db"; 
import { heroContent, products, posts, profileContent } from "@/db/schema"; 
import { eq, desc } from "drizzle-orm"; 
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProfilDesa from "@/components/ProfilDesa";
import Katalog from "@/components/Katalog";
import BeritaSection from "@/components/BeritaSection";
import Footer from "@/components/Footer";

// Tetap gunakan force-dynamic agar data Pabean Udik selalu aktual
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // 1. Ambil data Hero yang aktif
  const activeHeroes = await db
    .select()
    .from(heroContent)
    .where(eq(heroContent.isActive, true)) 
    .limit(1); 
  
  const heroData = activeHeroes[0]; 

  // 2. Ambil data Profil Desa terbaru
  const profiles = await db
    .select()
    .from(profileContent)
    .limit(1);
    
  const dataProfil = profiles[0];

  // 3. Ambil semua produk untuk katalog (Batik, UMKM, Kuliner)
  const allProducts = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt)); 

  // 4. Ambil artikel unggulan (isFeatured)
  const featuredPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.isFeatured, true)) 
    .orderBy(desc(posts.createdAt)) 
    .limit(3); 

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section Dinamis */}
      <Hero 
        title={heroData?.title || "Pesona Pabean Udik"} 
        subtitle={heroData?.subtitle || "Membangun Kemandirian Desa Melalui Potensi Budaya dan Ekonomi Kreatif."} 
        imageUrl={heroData?.imageUrl || "/images/hero-default.jpg"} 
      />

      {/* Profil Desa yang terhubung ke Database */}
      <ProfilDesa data={dataProfil} />

      {/* Katalog Produk (Batik tulis Dermayon, Eceng Gondok, dll) */}
      <Katalog products={allProducts} />

      {/* Section Berita/Artikel */}
      <BeritaSection posts={featuredPosts} />

      <Footer />
    </main>
  );
}