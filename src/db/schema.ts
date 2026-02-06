// src/db/schema.ts
import { pgTable, text, uuid, timestamp, boolean } from "drizzle-orm/pg-core";

/**
 * TABEL HERO CONTENT
 * Mengelola identitas visual utama di bagian atas halaman beranda.
 */
export const heroContent = pgTable("hero_content", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  imageUrl: text("image_url").notNull(),
  isActive: boolean("is_active").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * TABEL PRODUCTS
 * Mengelola katalog potensi desa seperti Batik Tulis Dermayon, 
 * kerajinan Eceng Gondok, dan hasil olahan laut.
 */
export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  nama: text("nama").notNull(),
  slug: text("slug").unique().notNull(),
  kategori: text("kategori").notNull(), // Budaya, UMKM, Kuliner
  deskripsi: text("deskripsi").notNull(),
  foto: text("foto").notNull(),
  instagram: text("instagram"),
  maps: text("maps"),
  ecommerce: text("ecommerce"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * TABEL POSTS
 * Mengelola publikasi artikel, laporan mingguan KKN, 
 * dan konten edukasi masyarakat.
 */
export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * TABEL PROFILE CONTENT
 * Mengelola narasi sejarah desa, kearifan lokal di RW 3, 
 * dan dokumentasi profil desa secara keseluruhan.
 */
export const profileContent = pgTable("profile_content", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description1: text("description1").notNull(),
  description2: text("description2").notNull(),
  imageUrl: text("image_url").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});