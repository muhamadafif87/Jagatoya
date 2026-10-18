'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Droplets, AlertCircle } from 'lucide-react'

const schema = z.object({
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
  password: z
    .string()
    .min(6, 'Kata sandi minimal 6 karakter'),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [demoSessionStarted, setDemoSessionStarted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  function onSubmit(_data: FormData) {
    // Production auth is not configured.
    // A real integration would call the auth provider here.
    // For now, we inform the user that auth is unavailable.
    setDemoSessionStarted(true)
  }

  if (demoSessionStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#D9D9D9] p-8 text-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#FFDE59] flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={24} className="text-[#111111]" />
          </div>
          <h1 className="text-xl font-bold text-[#111111] mb-2">
            Autentikasi belum dikonfigurasi
          </h1>
          <p className="text-sm text-[#4B5563] mb-4 leading-relaxed">
            Produksi autentikasi memerlukan konfigurasi penyedia auth (misalnya Supabase)
            yang belum tersedia. Ini adalah batasan MVP saat ini.
          </p>
          <div className="rounded-xl bg-[#FFDE59]/30 border border-[#FFCC00]/40 p-4 text-sm text-left mb-6">
            <p className="font-semibold text-[#111111] mb-1">Mode Demonstrasi</p>
            <p className="text-[#4B5563]">
              Klik tombol di bawah untuk menjelajahi dasbor menggunakan data simulasi.
              Sesi ini tidak mewakili akun nyata dan tidak menyimpan data apapun.
            </p>
          </div>
          <Link
            href="/dashboard"
            id="enter-demo-dashboard"
            className="block w-full py-3 bg-[#077B43] text-white font-semibold rounded-xl hover:bg-[#055c31] transition-colors text-sm"
          >
            Lanjutkan ke Dasbor Simulasi
          </Link>
          <button
            onClick={() => setDemoSessionStarted(false)}
            className="mt-3 block w-full py-2 text-sm text-[#4B5563] hover:text-[#111111] transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    )
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
            Masuk ke akun Anda
          </h1>
          <p className="mt-2 text-sm text-[#4B5563]">
            Belum punya akun?{' '}
            <Link href="/register" className="text-[#077B43] font-semibold hover:underline">
              Daftar gratis
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#D9D9D9] p-8 shadow-sm">
          {/* Dev notice */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-[#FFDE59]/30 border border-[#FFCC00]/40 mb-6 text-xs text-[#4B5563]">
            <AlertCircle size={14} className="flex-shrink-0 mt-0.5 text-[#E6B800]" />
            <span>
              Hanya mockup.
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-semibold text-[#111111] mb-1.5"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="anda@email.com"
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D9D9] text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43] focus:border-transparent transition"
                aria-describedby={errors.email ? 'login-email-error' : undefined}
                aria-invalid={!!errors.email}
                {...register('email')}
              />
              {errors.email && (
                <p
                  id="login-email-error"
                  role="alert"
                  className="mt-1 text-xs text-red-600 flex items-center gap-1"
                >
                  <AlertCircle size={12} />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-semibold text-[#111111] mb-1.5"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-[#D9D9D9] text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43] focus:border-transparent transition"
                  aria-describedby={errors.password ? 'login-password-error' : undefined}
                  aria-invalid={!!errors.password}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#4B5563]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p
                  id="login-password-error"
                  role="alert"
                  className="mt-1 text-xs text-red-600 flex items-center gap-1"
                >
                  <AlertCircle size={12} />
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs text-[#077B43] hover:underline"
              >
                Lupa kata sandi?
              </Link>
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#077B43] text-white font-semibold rounded-xl hover:bg-[#055c31] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm"
            >
              {isSubmitting ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#9CA3AF] mt-6">
          Dengan masuk, Anda menyetujui{' '}
          <Link href="/terms" className="hover:underline">Syarat & Ketentuan</Link>{' '}
          dan{' '}
          <Link href="/privacy" className="hover:underline">Kebijakan Privasi</Link>{' '}
          kami.
        </p>
      </div>
    </div>
  )
}
