import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db.select().from(products).orderBy(desc(products.createdAt));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
}