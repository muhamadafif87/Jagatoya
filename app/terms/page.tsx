import Link from 'next/link'
import { Droplets, ArrowLeft } from 'lucide-react'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'

export const metadata = {
  title: 'Syarat & Ketentuan – JagaToya',
  description: 'Syarat dan ketentuan penggunaan platform IoT irigasi sawah JagaToya.',
}

export default function TermsPage() {
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
            Syarat & Ketentuan Layanan JagaToya
          </h1>
          <p className="text-xs text-[#9CA3AF] mb-8">Terakhir diperbarui: 18 Oktober 2026</p>

          <div className="prose prose-sm text-[#4B5563] space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-[#111111] mb-2">1. Definisi & Ruang Lingkup</h2>
              <p>
                JagaToya adalah inisiatif platform monitoring telemetri pertanian cerdas berbasis Internet of Things (IoT) yang bertujuan membantu petani dan kelompok tani mengoptimalkan pengelolaan irigasi sawah secara hemat air dan presisi.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#111111] mb-2">2. Status Rilis MVP & Mode Demonstrasi</h2>
              <p>
                Aplikasi web JagaToya saat ini beroperasi dalam fase Minimum Viable Product (MVP) dengan data telemetri demonstrasi terkelola. Layanan ini disediakan untuk tujuan evaluasi pengalaman pengguna, pemantauan simulasi sensor, serta perencanaan teknis sebelum deployment perangkat keras secara massal.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#111111] mb-2">3. Batasan Tanggung Jawab</h2>
              <p>
                Data sensor dan telemetri yang ditampilkan pada mode demonstrasi ditujukan sebagai bahan edukasi dan simulasi. Petani disarankan untuk tetap melakukan pengamatan fisik di pematang sawah sebelum melakukan tindakan irigasi atau pemupukan kritis.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#111111] mb-2">4. Hak Kekayaan Intelektual</h2>
              <p>
                Semua logo, desain visual, arsitektur perangkat lunak, dan merek dagang JagaToya adalah milik pengembang proyek JagaToya.
              </p>
            </section>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  )
}
