import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown, Droplets, Thermometer, Gauge } from 'lucide-react'

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-rice-field.jpg"
          alt="Sawah padi hijau dengan saluran irigasi di Indonesia"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay — dark at left for text contrast, lighter at right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 md:py-40">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFCC00]/20 border border-[#FFCC00]/40 backdrop-blur-sm mb-6 animate-fade-in">
            <Droplets size={14} className="text-[#FFCC00]" />
            <span className="text-xs font-semibold text-[#FFDE59] tracking-wide">
              Platform IoT Pertanian
            </span>
          </div>

          <h1
            id="hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in stagger-1"
          >
            Pengairan Sawah{' '}
            <span className="text-[#FFCC00]">Lebih Cerdas,</span>
            <br />
            Air Lebih Efisien.
          </h1>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8 animate-fade-in stagger-2 max-w-xl">
            Pantau kondisi sawah melalui teknologi IoT dan bantu kelola irigasi
            berdasarkan data untuk penggunaan air dan biaya operasional yang
            lebih efisien.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in stagger-3">
            <Link
              href="/register"
              id="hero-cta-primary"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FFCC00] text-black font-semibold rounded-xl hover:bg-[#E6B800] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
            >
              Mulai Sekarang
              <ArrowRight size={18} />
            </Link>
            <a
              href="#cara-kerja"
              id="hero-cta-secondary"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-all backdrop-blur-sm text-base"
            >
              Pelajari Cara Kerjanya
              <ChevronDown size={18} />
            </a>
          </div>
        </div>

        {/* Floating sensor card — illustrative demo data */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block animate-fade-in stagger-4">
          <div className="glass rounded-2xl p-5 w-64 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#111111]">Sensor Blok A</span>
              <span className="demo-badge">Contoh Data</span>
            </div>
            <div className="space-y-3">
              <MetricRow
                icon={<Gauge size={14} className="text-[#077B43]" />}
                label="Kelembapan Tanah"
                value="62%"
                color="text-[#077B43]"
              />
              <MetricRow
                icon={<Droplets size={14} className="text-[#A1DAEF]" />}
                label="Ketinggian Air"
                value="14 cm"
                color="text-[#0891b2]"
              />
              <MetricRow
                icon={<Thermometer size={14} className="text-orange-500" />}
                label="Suhu"
                value="29°C"
                color="text-orange-600"
              />
            </div>
            <div className="mt-3 pt-3 border-t border-[#D9D9D9]">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-[#7ED957] animate-pulse-slow" />
                <span className="text-xs text-[#4B5563]">Online – 3 menit lalu</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#masalah"
        aria-label="Gulir ke bagian berikutnya"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-white transition-colors animate-pulse-slow"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  )
}

function MetricRow({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs text-[#4B5563]">{label}</span>
      </div>
      <span className={`text-sm font-bold ${color}`}>{value}</span>
    </div>
  )
}
