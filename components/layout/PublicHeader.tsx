'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Droplets } from 'lucide-react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/#beranda', label: 'Beranda' },
  { href: '/#cara-kerja', label: 'Cara Kerja' },
  { href: '/#fitur', label: 'Fitur' },
  { href: '/#tentang', label: 'Tentang Kami' },
]

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-[#D9D9D9]/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-[#077B43] focus-visible:rounded-md"
            aria-label="JagaToya – beranda"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FFCC00] text-[#077B43]">
              <Droplets size={18} strokeWidth={2.5} />
            </span>
            <span>JagaToya</span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Navigasi utama" className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#111111] hover:text-[#077B43] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              id="header-login-btn"
              className="px-4 py-2 text-sm font-semibold text-[#077B43] border border-[#077B43] rounded-lg hover:bg-[#077B43]/5 transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              id="header-register-btn"
              className="px-4 py-2 text-sm font-semibold text-[#000000] bg-[#FFCC00] rounded-lg hover:bg-[#E6B800] transition-colors shadow-sm"
            >
              Mulai Sekarang
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-[#111111] hover:bg-[#F3F4F6] transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Navigasi mobile"
          className="md:hidden bg-white border-t border-[#D9D9D9] animate-fade-in"
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 text-sm font-medium text-[#111111] rounded-lg hover:bg-[#F3F4F6] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[#D9D9D9] space-y-2">
              <Link
                href="/login"
                className="block w-full px-3 py-2.5 text-sm font-semibold text-center text-[#077B43] border border-[#077B43] rounded-lg hover:bg-[#077B43]/5 transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="block w-full px-3 py-2.5 text-sm font-semibold text-center text-black bg-[#FFCC00] rounded-lg hover:bg-[#E6B800] transition-colors"
              >
                Mulai Sekarang
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
