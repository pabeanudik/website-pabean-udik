// src/app/katalog/[slug]/page.tsx
import { db } from "@/db"; 
import { products } from "@/db/schema"; 
import { eq } from "drizzle-orm"; 
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

// 1. Definisikan tipe Props sesuai standar Next.js 15
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DetailProduk({ params }: PageProps) {
  // 2. WAJIB di-await sebelum digunakan
  const { slug } = await params;

  // 3. Ambil data produk berdasarkan slug
  // Catatan: Jika kamu simpan slug sebagai ID di database, gunakan eq(products.id, parseInt(slug))
  const data = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  const product = data[0];

  // 4. Jika produk tidak ditemukan, arahkan ke halaman 404
  if (!product) notFound();

  return (
    <main className="bg-white min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-24">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Visual Produk */}
          <div className="aspect-square bg-neutral-100 overflow-hidden shadow-sm">
            <img 
              src={product.foto} 
              alt={product.nama} 
              className="w-full h-full object-cover transition-all duration-700"
            />
          </div>

          {/* Info Detail Produk Pabean Udik */}
          <div className="flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-4 block font-bold">
              {product.kategori}
            </span>
            <h1 className="text-5xl font-serif text-[#2C1810] mb-8 leading-tight">
              {product.nama}
            </h1>
            <p className="text-neutral-500 leading-relaxed mb-12 font-light text-lg">
              {product.deskripsi}
            </p>

            <div className="space-y-6 pt-8 border-t border-neutral-100">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4 text-neutral-300">
                Tautan Terkait
              </h4>
              <div className="flex flex-wrap gap-6">
                {product.instagram && (
                  <a 
                    href={product.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[11px] uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition"
                  >
                    Instagram Pengrajin
                  </a>
                )}
                {product.maps && (
                  <a 
                    href={product.maps} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[11px] uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition"
                  >
                    Lokasi Produksi
                  </a>
                )}
                {product.ecommerce && (
                  <a 
                    href={product.ecommerce} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[11px] uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition"
                  >
                    Beli Online
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}