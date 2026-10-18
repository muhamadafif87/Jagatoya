'use client'

import { useState } from 'react'
import {
  User,
  Bell,
  Shield,
  Save,
  CheckCircle2,
  AlertCircle,
  Database,
  Smartphone,
  Mail,
  MessageSquare,
} from 'lucide-react'
import { DEMO_USER } from '@/lib/demo/fixtures'

export default function SettingsPage() {
  const [fullName, setFullName] = useState(DEMO_USER.fullName)
  const [email, setEmail] = useState(DEMO_USER.email)
  const [phone, setPhone] = useState(DEMO_USER.phoneNumber ?? '+6281234567890')
  const [village, setVillage] = useState('Desa Sukamaju, Cikarang Utara')
  const [kelompokTani, setKelompokTani] = useState('Kelompok Tani Subur Makmur')

  // Notification channels
  const [notifyWa, setNotifyWa] = useState(true)
  const [notifySms, setNotifySms] = useState(false)
  const [notifyEmail, setNotifyEmail] = useState(true)

  // Status feedback
  const [savedSuccess, setSavedSuccess] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="demo-badge">Mode Simulasi</span>
          <span className="text-xs text-[#4B5563]">Konfigurasi Akun</span>
        </div>
        <h1 className="text-2xl font-bold text-[#111111]">Pengaturan & Preferensi</h1>
        <p className="text-sm text-[#4B5563] mt-1">
          Kelola data profil petani, saluran notifikasi WhatsApp, dan preferensi sistem JagaToya.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-800 flex items-center gap-2.5 animate-fade-in">
          <CheckCircle2 size={18} className="text-[#077B43] flex-shrink-0" />
          <span>Pengaturan preferensi berhasil disimpan untuk sesi simulasi saat ini.</span>
        </div>
      )}

      {/* Profile Form */}
      <div className="bg-white rounded-2xl border border-[#D9D9D9] p-6 shadow-sm">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#D9D9D9]/60 mb-5">
          <div className="w-8 h-8 rounded-lg bg-[#C2F8AB] text-[#077B43] flex items-center justify-center font-bold">
            <User size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#111111]">Profil Petani</h2>
            <p className="text-xs text-[#4B5563]">Informasi kontak dan identitas kelompok tani</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D9D9] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D9D9] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                Nomor WhatsApp (Untuk Notifikasi Kritis)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D9D9] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                Kelompok Tani
              </label>
              <input
                type="text"
                value={kelompokTani}
                onChange={(e) => setKelompokTani(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D9D9] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                Lokasi Desa & Kecamatan Sawah
              </label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D9D9] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43]"
              />
            </div>
          </div>

          {/* Notification Channels */}
          <div className="pt-6 border-t border-[#D9D9D9]/60">
            <h3 className="text-sm font-bold text-[#111111] mb-3 flex items-center gap-2">
              <Bell size={16} className="text-[#077B43]" />
              Saluran Notifikasi Peringatan
            </h3>
            <p className="text-xs text-[#4B5563] mb-4">
              Pilih media yang Anda inginkan untuk menerima alarm saat air surut atau tanah kering.
            </p>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded-xl border border-[#D9D9D9] hover:bg-[#F9FAFB] cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#077B43] flex items-center justify-center">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#111111]">Pesan WhatsApp</p>
                    <p className="text-[11px] text-[#4B5563]">Kirim peringatan cepat ke nomor HP terdaftar</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifyWa}
                  onChange={(e) => setNotifyWa(e.target.checked)}
                  className="rounded border-[#D9D9D9] text-[#077B43] focus:ring-[#077B43] w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-[#D9D9D9] hover:bg-[#F9FAFB] cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#111111]">Email Ringkasan Mingguan</p>
                    <p className="text-[11px] text-[#4B5563]">Laporan komparasi tren telemetri sawah</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.checked)}
                  className="rounded border-[#D9D9D9] text-[#077B43] focus:ring-[#077B43] w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-[#D9D9D9] hover:bg-[#F9FAFB] cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                    <Smartphone size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#111111]">SMS Darurat</p>
                    <p className="text-[11px] text-[#4B5563]">Pesan teks biasa bila koneksi data internet padam</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifySms}
                  onChange={(e) => setNotifySms(e.target.checked)}
                  className="rounded border-[#D9D9D9] text-[#077B43] focus:ring-[#077B43] w-4 h-4"
                />
              </label>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#077B43] hover:bg-[#055c31] text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
            >
              <Save size={15} />
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>

      {/* System Diagnostic & Architecture Info */}
      <div className="bg-white rounded-2xl border border-[#D9D9D9] p-6 shadow-sm">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#D9D9D9]/60 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#FFDE59]/60 text-[#111111] flex items-center justify-center font-bold">
            <Database size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#111111]">Informasi Sumber Data & Arsitektur</h2>
            <p className="text-xs text-[#4B5563]">Transparansi sistem MVP JagaToya</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-[#4B5563] leading-relaxed">
          <div className="flex items-start gap-2 p-3 rounded-xl bg-[#F9FAFB] border border-[#D9D9D9]">
            <Shield size={16} className="text-[#077B43] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#111111]">Mode Data Aktif: DEMO (Simulasi Fixtures)</strong>
              <p className="mt-0.5">
                Aplikasi berjalan dengan fixture statis deterministik (`DEMO_DEVICES`, `DEMO_READINGS`).
                Tidak ada koneksi MQTT atau hardware sensor fisik langsung yang dihubungkan ke server produksi pada fase ini.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-xl bg-[#F9FAFB] border border-[#D9D9D9]">
            <AlertCircle size={16} className="text-[#E6B800] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#111111]">Kesiapan Transisi Hardware IoT</strong>
              <p className="mt-0.5">
                Lapisan akses data menggunakan Service Factory (`lib/services`). Ketika endpoint backend & broker MQTT
                resmi telah siap, adapter `apiDeviceService` dan `apiTelemetryService` dapat langsung dihubungkan tanpa merombak komponen UI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
