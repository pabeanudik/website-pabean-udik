// src/db/index.ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Pastikan kita melakukan trim() untuk menghapus spasi/karakter aneh
const connectionString = process.env.DATABASE_URL?.trim();

if (!connectionString) {
  throw new Error('DATABASE_URL tidak ditemukan atau kosong');
}

const sql = neon(connectionString);
export const db = drizzle(sql);