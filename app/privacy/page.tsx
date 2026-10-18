import Link from 'next/link'
import { Droplets, ArrowLeft } from 'lucide-react'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'

export const metadata = {
  title: 'Kebijakan Privasi – JagaToya',
  description: 'Kebijakan privasi perlindungan data pengguna JagaToya.',
}

export default function PrivacyPage() {
  return (
    <>
      <PublicHeader />
      <main className="min-h-screen bg-[#F9FAFB] pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#D9D9D9] p-6 sm:p-10 shadow-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#4B5563] hover:text-[#111111] mb-6"
          >
            <ArrowLeft size={14} /> Kembali ke Beranda
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-2">
            Kebijakan Privasi JagaToya
          </h1>
          <p className="text-xs text-[#9CA3AF] mb-8">Terakhir diperbarui: 18 Oktober 2026</p>

          <div className="prose prose-sm text-[#4B5563] space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-[#111111] mb-2">1. Komitmen Terhadap Petani</h2>
              <p>
                JagaToya menghargai dan melindungi privasi setiap pengguna, kelompok tani, dan mitra kami. Kebijakan ini menjelaskan bagaimana kami mengelola data yang dikumpulkan melalui situs web dan perangkat IoT kami.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#111111] mb-2">2. Data yang Dikumpulkan</h2>
              <p>
                Dalam operasional platform, sistem dapat mencatat data telemetri agronomi seperti koordinat petak sawah, pembacaan tingkat kelembapan tanah, suhu udara, serta volume ketinggian air genangan. Data ini digunakan untuk memberikan rekomendasi pengelolaan air secara objektif.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#111111] mb-2">3. Keamanan Data Simulasi & Akun</h2>
              <p>
                Pada tahap rilis MVP ini, data akun dan pengujian bersifat lokal atau tersimulasi dan tidak diperjualbelikan kepada pihak ketiga manapun.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#111111] mb-2">4. Kontak & Pertanyaan</h2>
              <p>
                Bila Anda memiliki pertanyaan seputar kebijakan privasi atau ingin mengintegrasikan sensor kelompok tani Anda, hubungi kami melalui surel resmi di <span className="font-semibold text-[#077B43]">kontak@jagatoya.id</span>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  )
}
