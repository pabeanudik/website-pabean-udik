// src/lib/actions/auth.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const username = (formData.get("username") as string)?.trim();
  const password = (formData.get("password") as string)?.trim();

  // Ambil dari Environment Variables Vercel
  const expectedUser = process.env.ADMIN_USERNAME?.trim();
  const expectedPass = process.env.ADMIN_PASSWORD?.trim();

  // Log ini sangat penting! Cek di Vercel Dashboard > Logs
  console.log(`LOGIN_ATTEMPT: User=${username}, Expected=${expectedUser}`);

  if (username === expectedUser && password === expectedPass && expectedUser !== undefined) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24,
      path: "/",
      sameSite: "lax",
    });
    
    // Redirect ke dashboard
    redirect("/admin/dashboard");
  } else {
    return { error: "Username atau Password salah." };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin");
}