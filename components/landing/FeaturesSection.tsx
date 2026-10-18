import {
  Eye,
  Zap,
  BarChart3,
  Bell,
  Wifi,
  Droplets,
} from 'lucide-react'

const features = [
  {
    icon: <Droplets size={24} className="text-[#077B43]" />,
    title: 'Monitoring Sensor Real-Time',
    desc: 'Pantau kelembapan tanah, ketinggian air, dan suhu secara langsung dari mana saja melalui aplikasi web.',
    color: 'bg-[#C2F8AB]',
  },
  {
    icon: <Eye size={24} className="text-[#0891b2]" />,
    title: 'Visibilitas Kondisi Lahan',
    desc: 'Dapatkan gambaran lengkap kondisi sawah tanpa harus hadir langsung di lapangan.',
    color: 'bg-[#A1DAEF]/60',
  },
  {
    icon: <Wifi size={24} className="text-[#077B43]" />,
    title: 'Status Konektivitas Perangkat',
    desc: 'Ketahui segera apakah perangkat IoT Anda terhubung, terputus, atau membutuhkan perhatian.',
    color: 'bg-[#C2F8AB]',
  },
  {
    icon: <BarChart3 size={24} className="text-[#077B43]" />,
    title: 'Grafik & Tren Historis',
    desc: 'Analisis data sensor selama periode tertentu untuk memahami pola kondisi lahan Anda.',
    color: 'bg-[#FFDE59]/60',
  },
  {
    icon: <Zap size={24} className="text-[#077B43]" />,
    title: 'Rekomendasi Irigasi',
    desc: 'Terima panduan berbasis data berdasarkan pembacaan sensor dan ambang yang Anda konfigurasi sendiri.',
    color: 'bg-[#C2F8AB]',
  },
  {
    icon: <Bell size={24} className="text-orange-500" />,
    title: 'Notifikasi Kondisi Tidak Normal',
    desc: 'Dapatkan peringatan ketika ketinggian air atau kelembapan melewati batas yang telah ditentukan.',
    color: 'bg-orange-50',
  },
]

export function FeaturesSection() {
  return (
    <section id="fitur" className="py-20 bg-white" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#077B43] bg-[#C2F8AB] rounded-full mb-4">
            Fitur Utama
          </span>
          <h2
            id="features-heading"
            className="text-3xl md:text-4xl font-bold text-[#111111] mb-4"
          >
            Semua yang Anda butuhkan untuk{' '}
            <span className="text-[#077B43]">mengelola irigasi</span>
          </h2>
          <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
            JagaToya menggabungkan sensor IoT, analitik data, dan antarmuka yang
            mudah digunakan — dirancang khusus untuk kebutuhan petani.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeatureCard({
  icon,
  title,
  desc,
  color,
  index,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  color: string
  index: number
}) {
  const staggerClass = `stagger-${Math.min(index + 1, 6)}`
  return (
    <article
      className={`animate-fade-in ${staggerClass} group p-6 rounded-2xl border border-[#D9D9D9] bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}
    >
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${color} mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-base font-semibold text-[#111111] mb-2">{title}</h3>
      <p className="text-sm text-[#4B5563] leading-relaxed">{desc}</p>
    </article>
  )
}
