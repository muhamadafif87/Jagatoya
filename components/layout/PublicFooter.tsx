import Link from 'next/link'
import { Droplets, Mail, Gift } from 'lucide-react'
import { CopyrightYear } from './CopyrightYear'

const footerLinks = {
  produk: [
    { href: '/#fitur', label: 'Fitur' },
    { href: '/#cara-kerja', label: 'Cara Kerja' },
    { href: '/register', label: 'Daftar Sekarang' },
  ],
  legal: [
    { href: '/privacy', label: 'Kebijakan Privasi' },
    { href: '/terms', label: 'Syarat & Ketentuan' },
  ],
  dukungan: [
    { href: '/#tentang', label: 'Tentang Kami' },
    { href: '#', label: 'Dokumentasi (Segera)' },
  ],
}

export function PublicFooter() {
  return (
    <footer className="bg-[#111111] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-white mb-4"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FFCC00] text-[#077B43]">
                <Droplets size={18} strokeWidth={2.5} />
              </span>
              JagaToya
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Platform irigasi cerdas berbasis IoT untuk petani padi Indonesia.
              Pantau sawah Anda, hemat air, dan buat keputusan irigasi yang lebih baik.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="mailto:muhamadafifajiputra@student.uns.ac.id"
                aria-label="Hubungi kami via email"
                className="p-2 text-gray-400 hover:text-[#FFCC00] rounded-lg transition-colors"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://gift.com/jagatoya"
                aria-label="JagaToya di Gift"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-[#FFCC00] rounded-lg transition-colors"
              >
                <Gift size={18} />
              </a>
            </div>
          </div>

          {/* Produk */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Produk
            </h3>
            <ul className="space-y-2">
              {footerLinks.produk.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dukungan */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Dukungan
            </h3>
            <ul className="space-y-2">
              {footerLinks.dukungan.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © <CopyrightYear /> JagaToya. Dibuat untuk petani Indonesia.
          </p>
          <p className="text-xs text-gray-600">
            Aplikasi dalam tahap pengembangan aktif.
          </p>
        </div>
      </div>
    </footer>
  )
}
