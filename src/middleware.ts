// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ambil cookie sesi admin yang sudah kita buat sebelumnya
  const adminSession = request.cookies.get('admin_session');
  const { pathname } = request.nextUrl;

  // Jika mencoba masuk ke dashboard tanpa cookie, tendang kembali ke login
  if (pathname.startsWith('/admin/dashboard')) {
    if (!adminSession || adminSession.value !== 'true') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Jika sudah login tapi malah buka halaman login admin, arahkan ke dashboard
  if (pathname === '/admin' && adminSession?.value === 'true') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

// Hanya jalankan middleware ini pada rute admin
export const config = {
  matcher: ['/admin/:path*'],
};