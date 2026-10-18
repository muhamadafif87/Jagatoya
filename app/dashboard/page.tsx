'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Droplets,
  Waves,
  Cpu,
  Bell,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Info,
  Calendar,
  Sparkles,
} from 'lucide-react'
import { deviceService, telemetryService, notificationService } from '@/lib/services'
import type { Device, Notification, SensorReading, SensorType } from '@/types'
import { StatCard } from '@/components/ui/StatCard'
import { DeviceStatusBadge } from '@/components/ui/DeviceStatusBadge'
import { SensorHistoryChart } from '@/components/charts/SensorHistoryChart'
import { LoadingSkeleton } from '@/components/ui'

export default function DashboardOverviewPage() {
  const [devices, setDevices] = useState<Device[]>([])
  const [readings, setReadings] = useState<SensorReading[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [activeSensorTab, setActiveSensorTab] = useState<SensorType>('soil_moisture')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true)
      try {
        const [devRes, teleRes, notifRes] = await Promise.all([
          deviceService.listDevices({}),
          telemetryService.getReadingHistory({
            deviceId: 'device-001',
            from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            to: new Date().toISOString(),
          }),
          notificationService.getNotifications(),
        ])

        if (devRes.ok) setDevices(devRes.data.data)
        if (teleRes.ok) setReadings(teleRes.data)
        if (notifRes.ok) setNotifications(notifRes.data)
      } catch (err) {
        console.error('Error loading dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const onlineDevicesCount = devices.filter((d) => d.connectionStatus === 'online').length
  const totalDevicesCount = devices.length
  const unreadNotifsCount = notifications.filter((n) => !n.readAt).length

  // Filter latest soil moisture and water level readings
  const latestSoil = readings.filter((r) => r.sensorType === 'soil_moisture').slice(-1)[0]?.value
  const latestWater = readings.filter((r) => r.sensorType === 'water_level').slice(-1)[0]?.value

  return (
    <div className="space-y-6">
      {/* Top Banner / Greeting */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-[#077B43]/10 via-[#C2F8AB]/20 to-[#FFDE59]/20 p-5 rounded-2xl border border-[#077B43]/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="demo-badge">Mode Simulasi JagaToya</span>
            <span className="text-xs text-[#4B5563] flex items-center gap-1">
              <Calendar size={13} /> Sesi Demo Terjadwal
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111111]">
            Selamat Datang, Pak Budi! 👋
          </h1>
          <p className="text-sm text-[#4B5563] mt-1">
            Kondisi kelembapan tanah dan level air sawah Anda di <strong>Sawah Utara & Selatan</strong> terpantau stabil.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/analytics"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#077B43] hover:bg-[#055c31] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
          >
            <TrendingUp size={16} />
            Lihat Analitik
          </Link>
          <Link
            href="/dashboard/devices"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#D9D9D9] hover:bg-[#F3F4F6] text-[#111111] rounded-xl text-sm font-semibold transition-colors"
          >
            <Cpu size={16} />
            Perangkat ({totalDevicesCount})
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Kelembapan Tanah"
          value={latestSoil !== undefined && latestSoil !== null ? latestSoil : '68'}
          unit="%"
          subtitle="Plot Utama (Sawah Utara)"
          accent="green"
          icon={<Droplets size={20} className="text-[#077B43]" />}
          badge={<span className="text-[10px] bg-[#C2F8AB] text-[#077B43] font-semibold px-2 py-0.5 rounded-full">Optimal</span>}
        />

        <StatCard
          title="Ketinggian Genangan Air"
          value={latestWater !== undefined && latestWater !== null ? latestWater : '5.2'}
          unit="cm"
          subtitle="Tingkat air sawah saat ini"
          accent="blue"
          icon={<Waves size={20} className="text-[#0891b2]" />}
          badge={<span className="text-[10px] bg-[#A1DAEF]/50 text-[#0e7490] font-semibold px-2 py-0.5 rounded-full">Aman</span>}
        />

        <StatCard
          title="Status Perangkat IoT"
          value={`${onlineDevicesCount}/${totalDevicesCount}`}
          subtitle={`${onlineDevicesCount} online, 1 offline`}
          accent="yellow"
          icon={<Cpu size={20} className="text-[#d97706]" />}
          badge={<span className="text-[10px] bg-[#FFDE59]/50 text-[#92400e] font-semibold px-2 py-0.5 rounded-full">Simulasi</span>}
        />

        <StatCard
          title="Notifikasi & Peringatan"
          value={unreadNotifsCount}
          subtitle="Pemberitahuan belum dibaca"
          accent={unreadNotifsCount > 0 ? 'red' : 'green'}
          icon={<Bell size={20} className={unreadNotifsCount > 0 ? 'text-red-500' : 'text-[#077B43]'} />}
          badge={
            unreadNotifsCount > 0 ? (
              <span className="text-[10px] bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">Perhatian</span>
            ) : (
              <span className="text-[10px] bg-[#C2F8AB] text-[#077B43] font-semibold px-2 py-0.5 rounded-full">Normal</span>
            )
          }
        />
      </div>

      {/* Main Content: Chart + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Sensor Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#D9D9D9] p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#D9D9D9]/60">
            <div>
              <h2 className="text-base font-bold text-[#111111] flex items-center gap-2">
                <Sparkles size={18} className="text-[#077B43]" />
                Pantauan Sensor Utama (Node Sukamaju #1)
              </h2>
              <p className="text-xs text-[#4B5563] mt-0.5">
                Data telemetri simulasi 24 jam terakhir dengan interval pembacaan 1 jam
              </p>
            </div>

            {/* Tab switch */}
            <div className="flex bg-[#F3F4F6] p-1 rounded-xl self-start sm:self-auto">
              <button
                onClick={() => setActiveSensorTab('soil_moisture')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSensorTab === 'soil_moisture'
                    ? 'bg-white text-[#077B43] shadow-sm'
                    : 'text-[#4B5563] hover:text-[#111111]'
                }`}
              >
                Kelembapan Tanah
              </button>
              <button
                onClick={() => setActiveSensorTab('water_level')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSensorTab === 'water_level'
                    ? 'bg-white text-[#0891b2] shadow-sm'
                    : 'text-[#4B5563] hover:text-[#111111]'
                }`}
              >
                Ketinggian Air
              </button>
            </div>
          </div>

          {loading ? (
            <LoadingSkeleton className="h-64 w-full" />
          ) : (
            <SensorHistoryChart
              readings={readings}
              sensorType={activeSensorTab}
              isDemoData={true}
            />
          )}

          <div className="mt-4 pt-3 border-t border-[#D9D9D9]/50 flex items-center justify-between text-xs text-[#4B5563]">
            <span>Perangkat: <strong>JT-NODE-001 (Sawah Utara)</strong></span>
            <Link
              href="/dashboard/analytics"
              className="text-[#077B43] font-semibold hover:underline inline-flex items-center gap-1"
            >
              Lihat grafik parameter lainnya <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Right 1 Col: Quick Alerts / Notifications */}
        <div className="bg-white rounded-2xl border border-[#D9D9D9] p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9D9D9]/60 mb-4">
            <h2 className="text-base font-bold text-[#111111] flex items-center gap-2">
              <Bell size={18} className="text-[#077B43]" />
              Peringatan Terbaru
            </h2>
            <Link
              href="/dashboard/notifications"
              className="text-xs font-semibold text-[#077B43] hover:underline"
            >
              Lihat Semua
            </Link>
          </div>

          <div className="space-y-3 flex-1">
            {notifications.slice(0, 3).map((notif) => {
              const isCrit = notif.severity === 'critical'
              const isWarn = notif.severity === 'warning'
              return (
                <div
                  key={notif.id}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    isCrit
                      ? 'bg-red-50/60 border-red-200'
                      : isWarn
                      ? 'bg-amber-50/60 border-amber-200'
                      : 'bg-emerald-50/40 border-emerald-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-semibold text-[#111111] flex items-center gap-1.5">
                      {isCrit ? (
                        <AlertTriangle size={14} className="text-red-500 flex-shrink-0" />
                      ) : isWarn ? (
                        <AlertTriangle size={14} className="text-amber-500 flex-shrink-0" />
                      ) : (
                        <Info size={14} className="text-[#077B43] flex-shrink-0" />
                      )}
                      {notif.title}
                    </span>
                    {!notif.readAt && (
                      <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-[#4B5563] leading-relaxed line-clamp-2">
                    {notif.message}
                  </p>
                  <p className="text-[10px] text-[#9CA3AF] mt-2">
                    {new Date(notif.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-[#D9D9D9]/50">
            <Link
              href="/dashboard/notifications"
              className="block w-full py-2 text-center text-xs font-semibold text-[#077B43] bg-[#077B43]/10 hover:bg-[#077B43]/20 rounded-lg transition-colors"
            >
              Kelola Notifikasi & Ambang Batas
            </Link>
          </div>
        </div>
      </div>

      {/* Devices Quick Table */}
      <div className="bg-white rounded-2xl border border-[#D9D9D9] p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base font-bold text-[#111111]">
              Ringkasan Perangkat Sawah
            </h2>
            <p className="text-xs text-[#4B5563] mt-0.5">
              Daftar sensor node IoT yang terdaftar di lokasi petak sawah Anda
            </p>
          </div>
          <Link
            href="/dashboard/devices"
            className="text-xs font-semibold text-[#077B43] hover:underline inline-flex items-center gap-1"
          >
            Kelola Semua Perangkat <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#D9D9D9] text-xs font-semibold text-[#4B5563]">
                <th className="pb-3 pr-4">Nama Perangkat</th>
                <th className="pb-3 px-4">Lokasi / Petak</th>
                <th className="pb-3 px-4">Status Koneksi</th>
                <th className="pb-3 px-4">Sensor Terpasang</th>
                <th className="pb-3 px-4">Aktivitas Terakhir</th>
                <th className="pb-3 pl-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9D9D9]/50">
              {devices.map((device) => (
                <tr key={device.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-3.5 pr-4 font-semibold text-[#111111]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#C2F8AB]/50 flex items-center justify-center text-[#077B43]">
                        <Cpu size={15} />
                      </div>
                      <div>
                        <p>{device.displayName}</p>
                        <p className="text-[11px] text-[#9CA3AF] font-normal">{device.deviceIdentifier}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#4B5563] text-xs">
                    {device.field?.name ?? 'Belum ditentukan'}
                  </td>
                  <td className="py-3.5 px-4">
                    <DeviceStatusBadge status={device.connectionStatus} />
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#4B5563]">
                    {device.sensors.length} sensor aktif
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#4B5563]">
                    {device.lastSeenAt
                      ? new Date(device.lastSeenAt).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit',
                        }) + ' WIB'
                      : 'Belum pernah'}
                  </td>
                  <td className="py-3.5 pl-4 text-right">
                    <Link
                      href={`/dashboard/devices/${device.id}`}
                      className="inline-flex items-center px-3 py-1 bg-[#F3F4F6] hover:bg-[#077B43] hover:text-white rounded-lg text-xs font-semibold text-[#111111] transition-colors"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
