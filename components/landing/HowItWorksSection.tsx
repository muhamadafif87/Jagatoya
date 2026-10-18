import { UserPlus, Cpu, MapPin, BarChart3 } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: <UserPlus size={22} className="text-[#077B43]" />,
    title: 'Daftar Akun JagaToya',
    desc: 'Buat akun gratis dengan email Anda. Tidak perlu keahlian teknis – proses pendaftaran sederhana dan cepat.',
  },
  {
    number: '02',
    icon: <Cpu size={22} className="text-[#077B43]" />,
    title: 'Hubungkan Perangkat IoT',
    desc: 'Pasang perangkat sensor JagaToya di sawah Anda dan hubungkan ke akun melalui kode unik pada perangkat.',
  },
  {
    number: '03',
    icon: <MapPin size={22} className="text-[#077B43]" />,
    title: 'Asosiasikan dengan Lahan',
    desc: 'Tambahkan informasi lahan sawah Anda dan konfigurasikan ambang kelembapan serta ketinggian air.',
  },
  {
    number: '04',
    icon: <BarChart3 size={22} className="text-[#077B43]" />,
    title: 'Pantau & Analisis Data',
    desc: 'Lihat data sensor secara langsung, tinjau grafik historis, dan terima rekomendasi berdasarkan kondisi terkini.',
  },
]

export function HowItWorksSection() {
  return (
    <section
      id="cara-kerja"
      className="py-20 bg-[#F9FAFB]"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#077B43] bg-[#C2F8AB] rounded-full mb-4">
            Cara Kerja
          </span>
          <h2
            id="how-it-works-heading"
            className="text-3xl md:text-4xl font-bold text-[#111111] mb-4"
          >
            Mulai dalam{' '}
            <span className="text-[#077B43]">4 langkah mudah</span>
          </h2>
          <p className="text-lg text-[#4B5563] max-w-xl mx-auto">
            Dirancang agar dapat digunakan oleh petani tanpa pengalaman teknis
            sebelumnya.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div
            className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-[#D9D9D9]"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`relative text-center animate-fade-in stagger-${i + 1}`}
              >
                {/* Number circle */}
                <div className="relative mx-auto mb-5 w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-[#C2F8AB] border-2 border-[#077B43]/20" />
                  <div className="relative flex flex-col items-center">
                    {step.icon}
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center rounded-full bg-[#077B43] text-white text-[10px] font-bold">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-base font-semibold text-[#111111] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
