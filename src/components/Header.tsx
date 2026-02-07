"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mencegah Hydration Error
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup menu saat link diklik (untuk navigasi anchor)
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: "Profil", href: "#profil" },
    { name: "Katalog", href: "#katalog" },
    { name: "Artikel", href: "/artikel" },
  ];

  if (!mounted) return null;

  return (
    <header 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? "bg-white/95 shadow-md py-3 backdrop-blur-md" 
          : "bg-white py-5"
      } border-b border-neutral-100`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Desa */}
        <Link 
          href="/" 
          onClick={closeMenu}
          className="text-lg font-serif tracking-[0.0em] font-bold text-[#2C1810] relative z-[110]"
        >
          Info Pabean Udik
        </Link>

        {/* Navigasi Desktop */}
        <nav className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.3em] font-semibold">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="hover:text-[#4B2C20] text-neutral-500 transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Tombol Hamburger - Perbaikan Z-Index */}
        <button 
          className="md:hidden flex flex-col gap-1.5 z-[110] p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Menu Navigasi"
        >
          <motion.div 
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-[#2C1810]" 
          />
          <motion.div 
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-[#2C1810]" 
          />
          <motion.div 
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-[#2C1810]" 
          />
        </button>
      </div>

      {/* Overlay Menu Mobile - Full Screen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[105] flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="text-3xl font-serif tracking-widest text-[#2C1810] hover:italic transition-all"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}