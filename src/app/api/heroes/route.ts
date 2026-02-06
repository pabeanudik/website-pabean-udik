import { db } from "@/db";
import { heroContent } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Mengambil semua data hero dan diurutkan dari yang terbaru berdasarkan ID
    const heroes = await db
      .select()
      .from(heroContent)
      .orderBy(desc(heroContent.id));

    return NextResponse.json(heroes);
  } catch (error) {
    console.error("Drizzle Fetch Error (Heroes):", error);
    return NextResponse.json(
      { error: "Gagal memuat data hero" }, 
      { status: 500 }
    );
  }
}