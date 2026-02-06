// src/lib/actions/cms.ts
"use server";

import { db } from "@/db";
import { heroContent, posts, profileContent } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * --- HERO SECTION ACTIONS ---
 * Mengelola identitas visual utama di halaman beranda.
 */

// Membuat konten hero baru
export async function createHero(data: { title: string; subtitle: string; imageUrl: string }) {
  try {
    await db.insert(heroContent).values({
      title: data.title,
      subtitle: data.subtitle,
      imageUrl: data.imageUrl,
      isActive: false, // Default tidak aktif agar tidak langsung mengubah tampilan publik
    });
    
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Drizzle Create Hero Error:", error);
    return { error: "Gagal menyimpan konten hero baru." };
  }
}

// Menentukan hero mana yang ditampilkan (Aktifkan satu, non-aktifkan yang lain)
export async function updateHero(id: string) {
  try {
    // Langkah 1: Set semua hero menjadi non-aktif (Reset)
    await db.update(heroContent).set({ isActive: false });
    
    // Langkah 2: Aktifkan hero yang dipilih berdasarkan ID
    await db.update(heroContent)
      .set({ isActive: true })
      .where(eq(heroContent.id, id));

    revalidatePath("/"); // Update tampilan publik
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Drizzle Update Hero Error:", error);
    return { error: "Gagal mengaktifkan hero pilihan." };
  }
}

// Menghapus data hero
export async function deleteHero(id: string) {
  try {
    await db.delete(heroContent).where(eq(heroContent.id, id));
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    return { error: "Gagal menghapus data hero." };
  }
}


/**
 * --- ARTIKEL & BERITA ACTIONS ---
 * Mengelola laporan mingguan KKN dan edukasi masyarakat (seperti di SMKN 2 Indramayu).
 */

export async function createPost(data: { 
  title: string; 
  slug: string; 
  content: string; 
  image: string; 
  isFeatured: boolean 
}) {
  try {
    await db.insert(posts).values({
      title: data.title,
      slug: data.slug,
      content: data.content,
      image: data.image,
      isFeatured: data.isFeatured,
    });
    
    revalidatePath("/"); // Update section berita di halaman utama
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Drizzle Create Post Error:", error);
    return { error: "Gagal mempublikasikan artikel." };
  }
}

export async function deletePost(id: string) {
  try {
    await db.delete(posts).where(eq(posts.id, id));
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    return { error: "Gagal menghapus artikel." };
  }
}


/**
 * --- PROFIL DESA ACTIONS ---
 * Mengelola narasi tentang kearifan lokal, Batik Dermayon, dan potensi RW 3.
 */

export async function updateProfile(data: { 
  title: string; 
  description1: string; 
  description2: string; 
  imageUrl?: string 
}) {
  try {
    // Menggunakan pola Upsert: Cek apakah data profil sudah ada
    const existing = await db.select().from(profileContent).limit(1);

    if (existing.length > 0) {
      // Jika sudah ada, lakukan update pada baris tersebut
      await db.update(profileContent)
        .set({
          title: data.title,
          description1: data.description1,
          description2: data.description2,
          // Hanya update gambar jika ada file baru yang diunggah
          ...(data.imageUrl && { imageUrl: data.imageUrl }) 
        })
        .where(eq(profileContent.id, existing[0].id));
    } else {
      // Jika database kosong (pertama kali), buat baris baru
      await db.insert(profileContent).values({
        title: data.title,
        description1: data.description1,
        description2: data.description2,
        imageUrl: data.imageUrl || "/images/default-profile.jpg",
      });
    }

    revalidatePath("/"); 
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Drizzle Update Profile Error:", error);
    return { error: "Gagal memperbarui profil desa." };
  }
}