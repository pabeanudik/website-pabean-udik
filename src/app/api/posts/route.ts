import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db.select().from(posts).orderBy(desc(posts.createdAt));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
}