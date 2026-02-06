// src/lib/actions/product.ts
"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData, imageUrl: string) {
  try {
    const nama = formData.get("nama") as string;
    const kategori = formData.get("kategori") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const instagram = (formData.get("instagram") as string) || null;
    const maps = (formData.get("maps") as string) || null;
    const ecommerce = (formData.get("ecommerce") as string) || null;

    const slug = nama.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

    await db.insert(products).values({
      nama,
      slug,
      kategori,
      deskripsi,
      foto: imageUrl,
      instagram,
      maps,
      ecommerce,
    });

    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Drizzle Product Error:", error);
    return { error: "Gagal menyimpan produk." };
  }
}

export async function deleteProduct(id: string) {
  try {
    await db.delete(products).where(eq(products.id, id));
    
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { error: "Gagal menghapus produk." };
  }
}