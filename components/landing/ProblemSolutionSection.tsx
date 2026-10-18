import { AlertTriangle, EyeOff, Layers, HelpCircle } from 'lucide-react'
import { Droplets, BarChart3, Bell, Wifi } from 'lucide-react'

const problems = [
  {
    icon: <EyeOff size={20} className="text-red-500" />,
    title: 'Sulit memantau kondisi lahan secara terus-menerus',
    desc: 'Petani harus hadir langsung di lapangan untuk mengetahui kondisi tanah dan air – menyita waktu dan tenaga.',
  },
  {
    icon: <AlertTriangle size={20} className="text-orange-500" />,
    title: 'Irigasi berlebihan atau kekurangan air',
    desc: 'Keputusan irigasi sering dibuat berdasarkan perkiraan, bukan data aktual, yang bisa menyebabkan pemborosan air atau kerusakan tanaman.',
  },
  {
    icon: <Layers size={20} className="text-yellow-600" />,
    title: 'Data tersebar dan sulit dianalisis',
    desc: 'Tidak ada satu tempat untuk melihat riwayat kondisi lahan dan membandingkan perubahan dari waktu ke waktu.',
  },
  {
    icon: <HelpCircle size={20} className="text-purple-500" />,
    title: 'Keputusan irigasi tanpa dasar yang jelas',
    desc: 'Minimnya informasi kondisi tanah membuat pengelolaan air menjadi kurang optimal dan biaya operasional lebih tinggi.',
  },
]

const solutions = [
  {
    icon: <Wifi size={20} className="text-[#077B43]" />,
    title: 'Sensor IoT terhubung langsung',
    desc: 'Perangkat di lapangan mengirimkan data secara otomatis tanpa perlu hadir langsung.',
  },
  {
    icon: <Droplets size={20} className="text-[#077B43]" />,
    title: 'Data terpusat dan mudah dibaca',
    desc: 'Semua pembacaan sensor tersedia di satu dasbor yang dapat diakses dari mana saja.',
  },
  {
    icon: <BarChart3 size={20} className="text-[#077B43]" />,
    title: 'Analitik historis',
    desc: 'Grafik dan statistik membantu Anda memahami pola kondisi lahan dari waktu ke waktu.',
  },
  {
    icon: <Bell size={20} className="text-[#077B43]" />,
    title: 'Notifikasi kondisi tidak normal',
    desc: 'Sistem memberi tahu ketika kondisi melewati ambang yang Anda tetapkan, bukan asumsi universal.',
  },
]

export function ProblemSolutionSection() {
  return (
    <section
      id="masalah"
      className="py-20 bg-white"
      aria-labelledby="problem-solution-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#077B43] bg-[#C2F8AB] rounded-full mb-4">
            Tantangan & Solusi
          </span>
          <h2
            id="problem-solution-heading"
            className="text-3xl md:text-4xl font-bold text-[#111111]"
          >
            Masalah yang dihadapi petani —{' '}
            <span className="text-[#077B43]">dan cara JagaToya membantu</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Problems */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-6 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-red-400 inline-block" />
              Tantangan Umum
            </h3>
            <div className="space-y-4">
              {problems.map((p, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl bg-red-50 border border-red-100"
                >
                  <div className="flex-shrink-0 mt-0.5">{p.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-[#111111] mb-1">{p.title}</p>
                    <p className="text-sm text-[#4B5563]">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#077B43] mb-6 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#077B43] inline-block" />
              JagaToya Membantu
            </h3>
            <div className="space-y-4">
              {solutions.map((s, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl bg-[#C2F8AB]/30 border border-[#7ED957]/30"
                >
                  <div className="flex-shrink-0 mt-0.5">{s.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-[#111111] mb-1">{s.title}</p>
                    <p className="text-sm text-[#4B5563]">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
