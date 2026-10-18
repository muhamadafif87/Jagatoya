import Link from 'next/link'
import { ArrowRight, Leaf, Droplets, Sprout, Zap } from 'lucide-react'

const sdgs = [
  {
    icon: <Droplets size={20} className="text-[#A1DAEF]" />,
    code: 'SDG 6',
    title: 'Air Bersih & Sanitasi',
    desc: 'Pengelolaan air yang lebih efisien mendukung ketersediaan sumber daya air bersih.',
  },
  {
    icon: <Sprout size={20} className="text-[#7ED957]" />,
    code: 'SDG 2',
    title: 'Tanpa Kelaparan',
    desc: 'Pertanian yang lebih efisien berkontribusi pada ketahanan pangan yang lebih baik.',
  },
  {
    icon: <Leaf size={20} className="text-[#C2F8AB]" />,
    code: 'SDG 13',
    title: 'Penanganan Iklim',
    desc: 'Irigasi berbasis data dapat membantu mengurangi penggunaan sumber daya yang tidak perlu.',
  },
  {
    icon: <Zap size={20} className="text-[#FFDE59]" />,
    code: 'SDG 7',
    title: 'Energi Bersih & Terjangkau',
    desc: 'Pengurangan operasi pompa yang tidak perlu mendukung penggunaan energi yang lebih efisien.',
  },
]

export function SustainabilitySection() {
  return (
    <section
      id="tentang"
      className="relative py-20 overflow-hidden"
      aria-labelledby="sustainability-heading"
    >
      {/* Deep green background */}
      <div className="absolute inset-0 bg-[#077B43]" />
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, #FFCC00 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C2F8AB 0%, transparent 40%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#FFCC00] bg-white/10 rounded-full mb-4">
            Keberlanjutan
          </span>
          <h2
            id="sustainability-heading"
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Irigasi efisien untuk{' '}
            <span className="text-[#FFCC00]">pertanian berkelanjutan</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            JagaToya dirancang dengan kesadaran bahwa pengelolaan air yang bijak
            berdampak melampaui batas sawah. Platform ini mendukung prinsip
            pertanian yang lebih bertanggung jawab terhadap lingkungan.
          </p>
        </div>

        {/* SDG cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {sdgs.map((s, i) => (
            <div
              key={s.code}
              className={`glass-dark rounded-2xl p-5 animate-fade-in stagger-${i + 1}`}
            >
              <div className="flex items-center gap-2 mb-3">
                {s.icon}
                <span className="text-xs font-bold text-[#FFCC00] uppercase tracking-wider">
                  {s.code}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-xs text-white/70 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-white/50 mb-12 max-w-2xl mx-auto">
          Referensi SDG di atas merupakan aspirasi dan tujuan desain produk, bukan klaim atas
          pencapaian yang telah terukur.
        </p>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-block glass rounded-2xl p-8 max-w-lg mx-auto">
            <h3 className="text-2xl font-bold text-[#111111] mb-3">
              Siap mencoba JagaToya?
            </h3>
            <p className="text-sm text-[#4B5563] mb-6">
              Daftar sekarang dan jelajahi platform dengan data demonstrasi.
              Integrasi perangkat IoT nyata tersedia setelah perangkat keras
              dikonfigurasikan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/register"
                id="sustainability-cta"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FFCC00] text-black font-semibold rounded-xl hover:bg-[#E6B800] transition-all shadow-md text-sm"
              >
                Daftar Gratis
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-6 py-3 text-[#077B43] font-semibold rounded-xl border border-[#077B43] hover:bg-[#077B43]/5 transition-colors text-sm"
              >
                Masuk ke Akun
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
