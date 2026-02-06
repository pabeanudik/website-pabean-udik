"use client";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-neutral-100 pt-24 pb-12 px-6" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          
          {/* Brand & Motto - SEO Optimized with h3 and clear description */}
          <div className="md:col-span-6">
            <h3 className="text-xl font-serif tracking-[0.2em] mb-6 text-[#2C1810]">
              DESA PABEAN UDIK
            </h3>
            <p className="text-neutral-500 text-xs max-w-xs leading-relaxed font-light uppercase tracking-wider">
              Desa Pabean Udik Indramayu merupakan kampung nelayan produktif yang menjadi sentra utama penghasil komoditas laut segar berkualitas tinggi. Didukung oleh aktivitas masyarakat pesisir yang dinamis dan berkembangnya UMKM pengolahan ikan, desa ini menawarkan potensi ekonomi maritim yang kuat serta pengalaman wisata bahari yang otentik.
            </p>
          </div>

          {/* Navigasi Cepat - Better for Internal Linking SEO */}
          <nav className="md:col-span-3" aria-label="Footer Navigation">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-neutral-400">Peta Situs</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#profil" className="text-[11px] uppercase tracking-widest hover:text-[#2C1810] transition-colors">
                  Profil Desa
                </Link>
              </li>
              <li>
                <Link href="#katalog" className="text-[11px] uppercase tracking-widest hover:text-[#2C1810] transition-colors">
                  Katalog UMKM
                </Link>
              </li>
              <li>
                <Link href="/artikel" className="text-[11px] uppercase tracking-widest hover:text-[#2C1810] transition-colors">
                  Berita & Artikel
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social & Contact - Specific Location for Local SEO */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-neutral-400">Kontak Resmi</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://instagram.com/info.pabeanudik" target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-widest hover:text-[#2C1810] transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="mailto:pabeanudik2026@gmail.com" className="text-[11px] uppercase tracking-widest hover:text-[#2C1810] transition-colors">
                  Email Desa
                </a>
              </li>
              <li>
                <address className="not-italic text-[11px] uppercase tracking-widest text-neutral-400 leading-relaxed">
                  Kec. Indramayu, Kab. Indramayu<br />
                  Jawa Barat, Indonesia
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Cleaned from KKN branding */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-neutral-50 pt-12 gap-6">
          <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 text-center md:text-left">
            © {year} Karang Taruna RW 7 Desa Pabean Udik dan KKN Universitas Padjadjaran 2026. Dikembangkan untuk kemajuan desa.
          </p>
        </div>
      </div>
    </footer>
  );
}