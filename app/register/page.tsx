'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Droplets, AlertCircle, CheckCircle2 } from 'lucide-react'

const schema = z
  .object({
    fullName: z.string().min(2, 'Nama lengkap minimal 2 karakter'),
    email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
    phoneNumber: z
      .string()
      .min(9, 'Nomor HP/WhatsApp minimal 9 digit')
      .regex(/^[0-9+-\s]+$/, 'Format nomor telepon tidak valid'),
    location: z.string().min(3, 'Nama desa atau kelompok tani wajib diisi'),
    password: z.string().min(6, 'Kata sandi minimal 6 karakter'),
    confirmPassword: z.string().min(1, 'Konfirmasi kata sandi wajib diisi'),
    agreeTerms: z.literal(true, {
      error: 'Anda harus menyetujui syarat & ketentuan',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Kata sandi tidak cocok',
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [demoRegistered, setDemoRegistered] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  function onSubmit(_data: FormData) {
    // Production authentication is not configured in this MVP.
    // Show mock confirmation and offer user entry to demo dashboard.
    setDemoRegistered(true)
  }

  if (demoRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#D9D9D9] p-8 text-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#C2F8AB] flex items-center justify-center mx-auto mb-4 text-[#077B43]">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="text-xl font-bold text-[#111111] mb-2">
            Pendaftaran Berhasil Disimulasikan!
          </h1>
          <p className="text-sm text-[#4B5563] mb-4 leading-relaxed">
            Pada versi MVP ini, autentikasi produksi belum terhubung ke database aktif.
            Akun simulasi Anda siap digunakan untuk menjelajahi seluruh fitur JagaToya.
          </p>
          <div className="rounded-xl bg-[#FFDE59]/30 border border-[#FFCC00]/40 p-4 text-sm text-left mb-6">
            <p className="font-semibold text-[#111111] mb-1">Mode Demonstrasi Aktif</p>
            <p className="text-[#4B5563]">
              Anda dapat langsung masuk ke dasbor pemantauan sawah dengan profil petani demo.
            </p>
          </div>
          <Link
            href="/dashboard"
            id="enter-dashboard-after-reg"
            className="block w-full py-3 bg-[#077B43] text-white font-semibold rounded-xl hover:bg-[#055c31] transition-colors text-sm"
          >
            Masuk ke Dasbor JagaToya
          </Link>
          <button
            onClick={() => setDemoRegistered(false)}
            className="mt-3 block w-full py-2 text-sm text-[#4B5563] hover:text-[#111111] transition-colors"
          >
            Kembali ke Formulir
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
            Daftar Akun Petani
          </h1>
          <p className="mt-2 text-sm text-[#4B5563]">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-[#077B43] font-semibold hover:underline">
              Masuk di sini
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#D9D9D9] p-8 shadow-sm">
          {/* Dev notice */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-[#FFDE59]/30 border border-[#FFCC00]/40 mb-6 text-xs text-[#4B5563]">
            <AlertCircle size={14} className="flex-shrink-0 mt-0.5 text-[#E6B800]" />
            <span>
              <strong>Pemberitahuan MVP:</strong> Pendaftaran ini berjalan dalam mode simulasi.
              Data yang Anda masukkan tidak disimpan di server publik.
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="register-fullname"
                className="block text-sm font-semibold text-[#111111] mb-1.5"
              >
                Nama Lengkap
              </label>
              <input
                id="register-fullname"
                type="text"
                autoComplete="name"
                placeholder="cth. Budi Santoso"
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D9D9] text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43] focus:border-transparent transition"
                aria-invalid={!!errors.fullName}
                {...register('fullName')}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="register-email"
                className="block text-sm font-semibold text-[#111111] mb-1.5"
              >
                Email
              </label>
              <input
                id="register-email"
                type="email"
                autoComplete="email"
                placeholder="petani@email.com"
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

            {/* Phone Number */}
            <div>
              <label
                htmlFor="register-phone"
                className="block text-sm font-semibold text-[#111111] mb-1.5"
              >
                Nomor WhatsApp / HP
              </label>
              <input
                id="register-phone"
                type="tel"
                autoComplete="tel"
                placeholder="081234567890"
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D9D9] text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43] focus:border-transparent transition"
                aria-invalid={!!errors.phoneNumber}
                {...register('phoneNumber')}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Location / Village / Kelompok Tani */}
            <div>
              <label
                htmlFor="register-location"
                className="block text-sm font-semibold text-[#111111] mb-1.5"
              >
                Desa / Kelompok Tani
              </label>
              <input
                id="register-location"
                type="text"
                placeholder="cth. Kelompok Tani Makmur, Sukamaju"
                className="w-full px-4 py-2.5 rounded-xl border border-[#D9D9D9] text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43] focus:border-transparent transition"
                aria-invalid={!!errors.location}
                {...register('location')}
              />
              {errors.location && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="register-password"
                className="block text-sm font-semibold text-[#111111] mb-1.5"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Minimal 6 karakter"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-[#D9D9D9] text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43] focus:border-transparent transition"
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
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="register-confirm-password"
                className="block text-sm font-semibold text-[#111111] mb-1.5"
              >
                Ulangi Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Ketik ulang kata sandi"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-[#D9D9D9] text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43] focus:border-transparent transition"
                  aria-invalid={!!errors.confirmPassword}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  aria-label={showConfirmPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#4B5563]"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#4B5563]">
                <input
                  type="checkbox"
                  className="mt-0.5 rounded border-[#D9D9D9] text-[#077B43] focus:ring-[#077B43]"
                  {...register('agreeTerms')}
                />
                <span>
                  Saya menyetujui{' '}
                  <Link href="/terms" className="text-[#077B43] font-semibold hover:underline">
                    Syarat & Ketentuan
                  </Link>{' '}
                  serta{' '}
                  <Link href="/privacy" className="text-[#077B43] font-semibold hover:underline">
                    Kebijakan Privasi
                  </Link>{' '}
                  layanan JagaToya.
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.agreeTerms.message}
                </p>
              )}
            </div>

            <button
              id="register-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-3 bg-[#077B43] text-white font-semibold rounded-xl hover:bg-[#055c31] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm"
            >
              {isSubmitting ? 'Memproses...' : 'Daftar Sekarang'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
