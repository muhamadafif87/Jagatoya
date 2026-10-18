'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Droplets, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'

const schema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
})

type FormData = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  function onSubmit(data: FormData) {
    setSubmittedEmail(data.email)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4 py-12">
      <div className="max-w-md w-full">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#077B43] font-bold text-xl">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#FFCC00] text-[#077B43]">
              <Droplets size={20} strokeWidth={2.5} />
            </span>
            JagaToya
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-[#111111]">
            Atur Ulang Kata Sandi
          </h1>
          <p className="mt-2 text-sm text-[#4B5563]">
            Masukkan email terdaftar Anda untuk menerima tautan pemulihan sandi.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#D9D9D9] p-8 shadow-sm">
          {submittedEmail ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#C2F8AB] text-[#077B43] flex items-center justify-center mx-auto">
                <CheckCircle2 size={28} />
              </div>
              <h2 className="text-lg font-bold text-[#111111]">Tautan Simulasi Terkirim</h2>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Pada sistem simulasi, instruksi reset kata sandi telah disiapkan untuk{' '}
                <strong className="text-[#111111]">{submittedEmail}</strong>.
              </p>
              <div className="rounded-xl bg-[#FFDE59]/30 border border-[#FFCC00]/40 p-3 text-xs text-left text-[#4B5563]">
                Catatan: Pengiriman email nyata memerlukan konfigurasi penyedia SMTP yang belum aktif pada versi MVP ini.
              </div>
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-[#077B43] text-white font-semibold rounded-xl hover:bg-[#055c31] transition-colors text-sm"
                >
                  <ArrowLeft size={16} />
                  Kembali ke Halaman Masuk
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="forgot-email"
                  className="block text-sm font-semibold text-[#111111] mb-1.5"
                >
                  Email Akun Anda
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  placeholder="anda@email.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D9D9D9] text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43] focus:border-transparent transition"
                  aria-invalid={!!errors.email}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#077B43] text-white font-semibold rounded-xl hover:bg-[#055c31] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm"
              >
                {isSubmitting ? 'Memproses...' : 'Kirim Tautan Pemulihan'}
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-[#4B5563] hover:text-[#111111]"
                >
                  <ArrowLeft size={14} />
                  Batal dan kembali ke halaman masuk
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
