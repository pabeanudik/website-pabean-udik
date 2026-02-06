"use client";

import { useState, useEffect } from "react";
import { logout } from "@/lib/actions/auth";
import { uploadImage } from "@/lib/upload";
import { createProduct, deleteProduct } from "@/lib/actions/product";
import { createPost, deletePost, updateHero, createHero, deleteHero, updateProfile } from "@/lib/actions/cms"; 
import { motion, AnimatePresence } from "framer-motion";

type TabType = "hero" | "artikel" | "katalog" | "profil";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("hero");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  
  const [products, setProducts] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [heroes, setHeroes] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const [resProd, resPost, resHero] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/posts"),
        fetch("/api/heroes")
      ]);
      
      const dataProducts = await resProd.json();
      const dataPosts = await resPost.json();
      const dataHeroes = await resHero.json();

      setProducts(Array.isArray(dataProducts) ? dataProducts : []);
      setPosts(Array.isArray(dataPosts) ? dataPosts : []);
      setHeroes(Array.isArray(dataHeroes) ? dataHeroes : []);
    } catch (error) {
      console.error("Fetch error dashboard:", error);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const file = (formData.get("foto") || formData.get("image") || formData.get("heroImage") || formData.get("profileImage")) as File;
    
    try {
      let imageUrl = "";
      if (file && file.size > 0) {
        imageUrl = await uploadImage(file);
      }

      if (activeTab === "katalog") {
        await createProduct(formData, imageUrl);
      } else if (activeTab === "artikel") {
        const data = {
          title: formData.get("title") as string,
          content: formData.get("content") as string,
          image: imageUrl,
          isFeatured: formData.get("isFeatured") === "on",
          slug: (formData.get("title") as string).toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
        };
        await createPost(data);
      } else if (activeTab === "hero") {
        const data = {
          title: formData.get("title") as string,
          subtitle: formData.get("subtitle") as string,
          imageUrl: imageUrl
        };
        await createHero(data);
      } else if (activeTab === "profil") {
        const data = {
          title: formData.get("title") as string,
          description1: formData.get("description") as string, // Disatukan jadi satu field
          description2: "", // Dikosongkan karena permintaan 1 paragraf
          imageUrl: imageUrl || undefined 
        };
        await updateProfile(data);
      }

      alert(`Berhasil memperbarui ${activeTab}!`);
      setPreview(null);
      if (activeTab !== "profil") (e.target as HTMLFormElement).reset();
      fetchData();
    } catch (err) {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBFBFB] flex">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-neutral-100 p-10 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="mb-12">
          <h2 className="text-sm font-serif tracking-[0.3em] font-bold uppercase text-[#2C1810]">Pabean CMS</h2>
          <p className="text-[9px] text-neutral-400 uppercase tracking-widest mt-1">Sistem Kelola Desa</p>
        </div>
        
        <nav className="flex-1 space-y-8">
          <div className="space-y-4">
            <span className="text-[9px] text-neutral-300 uppercase tracking-widest font-bold">Identitas Visual</span>
            <SidebarButton active={activeTab === "hero"} onClick={() => setActiveTab("hero")} label="Identitas Hero" icon="🖼️" />
            <SidebarButton active={activeTab === "profil"} onClick={() => setActiveTab("profil")} label="Profil Desa" icon="🏠" />
          </div>

          <div className="space-y-4">
            <span className="text-[9px] text-neutral-300 uppercase tracking-widest font-bold">Publikasi</span>
            <SidebarButton active={activeTab === "artikel"} onClick={() => setActiveTab("artikel")} label="Artikel & Berita" icon="📝" />
            <SidebarButton active={activeTab === "katalog"} onClick={() => setActiveTab("katalog")} label="Katalog UMKM" icon="📦" />
          </div>
        </nav>

        <button onClick={() => logout()} className="text-[10px] uppercase tracking-widest font-bold text-red-400 pt-8 border-t border-neutral-50 hover:text-red-600 transition-colors">
          Keluar Sesi →
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <section className="flex-1 p-6 md:p-16 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-12">
          <header>
            <h1 className="text-3xl font-serif text-[#2C1810] capitalize">Pengaturan {activeTab === "profil" ? "Profil Desa" : activeTab}</h1>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-light mt-2">Sinkronisasi data langsung ke komponen website</p>
          </header>

          <div className="bg-white p-10 shadow-sm border border-neutral-100">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* FORM PROFIL DESA - Versi Ringkas 1 Paragraf */}
              {activeTab === "profil" && (
                <div className="space-y-8">
                  <InputField name="title" label="Judul Profil" placeholder="Contoh: Mengenal Desa Pabean Udik" />
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-neutral-400">Deskripsi Utama Desa (1 Paragraf)</label>
                    <textarea 
                      name="description" 
                      placeholder="Tuliskan gambaran umum, sejarah singkat, dan potensi utama desa..." 
                      className="border-b py-2 text-sm outline-none resize-none font-light focus:border-[#2C1810]" 
                      rows={6} 
                      required 
                    />
                  </div>
                </div>
              )}

              {activeTab === "katalog" && (
                <div className="space-y-8">
                   <div className="grid grid-cols-2 gap-6">
                    <InputField name="nama" label="Nama Produk/Kerajinan" placeholder="Contoh: Batik Tulis Dermayon" />
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-neutral-400">Kategori</label>
                      <select name="kategori" className="border-b py-2 text-sm outline-none bg-transparent font-light focus:border-[#2C1810]">
                        <option value="Budaya">Budaya</option>
                        <option value="UMKM">UMKM</option>
                        <option value="Kuliner">Kuliner</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-neutral-400">Deskripsi Produk</label>
                    <textarea name="deskripsi" placeholder="Ceritakan sejarah atau proses pembuatannya..." className="border-b py-2 text-sm outline-none resize-none font-light focus:border-[#2C1810]" rows={3} required />
                  </div>
                  <div className="grid grid-cols-3 gap-6 pt-4 border-t border-neutral-50">
                    <InputField name="instagram" label="Link Instagram" placeholder="https://instagram.com/..." required={false} />
                    <InputField name="maps" label="Link Google Maps" placeholder="https://goo.gl/maps/..." required={false} />
                    <InputField name="ecommerce" label="Link Toko Online" placeholder="https://shopee.co.id/..." required={false} />
                  </div>
                </div>
              )}

              {activeTab === "artikel" && (
                <div className="space-y-8">
                  <InputField name="title" label="Judul Laporan/Berita" placeholder="Contoh: Perkembangan UMKM Lokal" />
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-neutral-400">Konten Artikel</label>
                    <textarea name="content" placeholder="Tuliskan detail berita di sini..." className="border-b py-2 text-sm outline-none resize-none font-light focus:border-[#2C1810]" rows={8} required />
                  </div>
                  <label className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-neutral-500 font-bold cursor-pointer">
                    <input type="checkbox" name="isFeatured" className="accent-black" /> Jadikan Artikel Unggulan di Beranda
                  </label>
                </div>
              )}

              {activeTab === "hero" && (
                <div className="space-y-8">
                  <InputField name="title" label="Judul Utama (Besar)" placeholder="Contoh: Pesona Pabean Udik" />
                  <InputField name="subtitle" label="Sub-Judul (Kecil)" placeholder="Contoh: Harmoni Tradisi dan Ekonomi Kreatif" />
                </div>
              )}

              <div className="flex flex-col gap-4">
                <label className="text-[9px] uppercase tracking-widest font-bold text-neutral-400">Lampiran Foto Utama</label>
                <div className="relative border-2 border-dashed border-neutral-100 p-12 text-center group hover:border-black transition-all cursor-pointer bg-neutral-50/30">
                  <input 
                    name={activeTab === "artikel" ? "image" : activeTab === "hero" ? "heroImage" : activeTab === "profil" ? "profileImage" : "foto"} 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="absolute inset-0 opacity-0 cursor-pointer z-20" 
                    required={activeTab !== "profil" && !preview} 
                  />
                  <div className="relative z-10">
                    {preview ? (
                      <img src={preview} className="max-h-56 mx-auto rounded-sm shadow-lg object-cover" alt="Preview" />
                    ) : (
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold group-hover:text-black transition-colors">Klik untuk Unggah Gambar</p>
                        <p className="text-[9px] text-neutral-300 lowercase italic">Format: JPG, PNG, WEBP (Maks 10MB)</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-[#2C1810] text-white py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-black transition-all disabled:bg-neutral-100 disabled:text-neutral-400 shadow-xl shadow-[#2c1810]/10">
                {loading ? "Sedang Memproses..." : `Simpan Perubahan ${activeTab}`}
              </button>
            </form>
          </div>
          
          {activeTab !== "profil" && (
             <div className="bg-white p-10 shadow-sm border border-neutral-100">
             <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 border-b pb-4 text-neutral-400">Database Konten Saat Ini</h3>
             <div className="space-y-2">
               <AnimatePresence mode="popLayout">
                 {activeTab === "katalog" && products.map(item => (
                   <ListItem key={item.id} title={item.nama} sub={item.kategori} img={item.foto} onDelete={async () => { if(confirm("Hapus produk ini?")) { await deleteProduct(item.id); fetchData(); } }} />
                 ))}
                 {activeTab === "artikel" && posts.map(item => (
                   <ListItem key={item.id} title={item.title} sub={item.isFeatured ? "🌟 Featured" : "Standard"} img={item.image} onDelete={async () => { if(confirm("Hapus artikel ini?")) { await deletePost(item.id); fetchData(); } }} />
                 ))}
                 {activeTab === "hero" && heroes.map(item => (
                   <ListItem 
                     key={item.id} 
                     title={item.title} 
                     sub={item.isActive ? "✅ AKTIF" : "NON-AKTIF"} 
                     img={item.imageUrl} 
                     onDelete={async () => { if(confirm("Hapus hero ini?")) { await deleteHero(item.id); fetchData(); } }}
                     onActivate={async () => { await updateHero(item.id); fetchData(); }}
                     showActivate={!item.isActive}
                   />
                 ))}
               </AnimatePresence>
             </div>
           </div>
          )}
        </div>
      </section>
    </main>
  );
}

function SidebarButton({ active, onClick, label, icon }: any) {
  return (
    <button onClick={onClick} className={`w-full text-left text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-3 ${active ? "text-[#2C1810] translate-x-2" : "text-neutral-300 hover:text-neutral-500"}`}>
      <span className="text-sm">{icon}</span> {label}
    </button>
  );
}

function InputField({ name, label, placeholder, type = "text", required = true }: any) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[9px] uppercase tracking-widest font-bold text-neutral-400">{label}</label>
      <input 
        name={name} 
        type={type} 
        placeholder={placeholder} 
        className="border-b py-2 text-sm outline-none font-light focus:border-[#2C1810] transition-colors bg-transparent" 
        required={required} 
      />
    </div>
  );
}

function ListItem({ title, sub, img, onDelete, onActivate, showActivate }: any) {
  return (
    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-between items-center py-4 px-4 hover:bg-neutral-50 transition-colors rounded-sm group">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 bg-neutral-100 overflow-hidden rounded-sm shadow-inner relative">
          <img src={img || "/images/placeholder.jpg"} className="w-full h-full object-cover transition-all" alt="" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#2C1810]">{title}</p>
          <p className="text-[8px] text-neutral-400 uppercase tracking-widest mt-0.5">{sub}</p>
        </div>
      </div>
      <div className="flex gap-6 items-center">
        {showActivate && (
          <button onClick={onActivate} className="text-[9px] uppercase font-bold text-blue-500 hover:text-blue-700 tracking-tighter transition-colors">Aktifkan</button>
        )}
        <button onClick={onDelete} className="text-[9px] uppercase font-bold text-red-300 hover:text-red-600 transition-colors">Hapus</button>
      </div>
    </motion.div>
  );
}