'use client'

import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  Cpu,
  MapPin,
  Calendar,
  Wifi,
  Battery,
  AlertCircle,
  Droplets,
  Waves,
  Thermometer,
  Save,
  CheckCircle2,
} from 'lucide-react'
import { deviceService, telemetryService } from '@/lib/services'
import type { Device, SensorReading, SensorType } from '@/types'
import { DeviceStatusBadge } from '@/components/ui/DeviceStatusBadge'
import { SensorHistoryChart } from '@/components/charts/SensorHistoryChart'
import { LoadingSkeleton } from '@/components/ui'

function DeviceDetailLoading() {
  return (
    <div className="space-y-6">
      <LoadingSkeleton className="h-6 w-48 mb-4" />
      <LoadingSkeleton className="h-40 w-full rounded-2xl" />
      <LoadingSkeleton className="h-72 w-full rounded-2xl" />
    </div>
  )
}

export default function DeviceDetailPage() {
  return (
    <Suspense fallback={<DeviceDetailLoading />}>
      <DeviceDetailContent />
    </Suspense>
  )
}

function DeviceDetailContent() {
  const params = useParams<{ id: string }>()
  const deviceId = params.id

  const [device, setDevice] = useState<Device | null>(null)
  const [readings, setReadings] = useState<SensorReading[]>([])
  const [selectedSensor, setSelectedSensor] = useState<SensorType>('soil_moisture')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simulated threshold configuration state
  const [minSoilThreshold, setMinSoilThreshold] = useState('45')
  const [minWaterThreshold, setMinWaterThreshold] = useState('3.0')
  const [maxWaterThreshold, setMaxWaterThreshold] = useState('10.0')
  const [isSavedNotice, setIsSavedNotice] = useState(false)

  useEffect(() => {
    async function loadDeviceData() {
      if (!deviceId) return
      setLoading(true)
      setError(null)

      try {
        const [devRes, teleRes] = await Promise.all([
          deviceService.getDevice(deviceId),
          telemetryService.getReadingHistory({
            deviceId,
            from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            to: new Date().toISOString(),
          }),
        ])

        if (!devRes.ok) {
          setError(devRes.error || 'Perangkat tidak ditemukan')
          return
        }

        setDevice(devRes.data)
        if (teleRes.ok) {
          setReadings(teleRes.data)
        }
      } catch (err) {
        console.error(err)
        setError('Terjadi kendala saat memuat data perangkat')
      } finally {
        setLoading(false)
      }
    }

    loadDeviceData()
  }, [deviceId])

  function handleSaveThresholds(e: React.FormEvent) {
    e.preventDefault()
    setIsSavedNotice(true)
    setTimeout(() => setIsSavedNotice(false), 3000)
  }

  if (loading) {
    return <DeviceDetailLoading />
  }

  if (error || !device) {
    return (
      <div className="bg-white rounded-2xl border border-[#D9D9D9] p-8 text-center max-w-lg mx-auto mt-12">
        <AlertCircle size={40} className="text-red-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-[#111111] mb-1">Perangkat Tidak Ditemukan</h2>
        <p className="text-xs text-[#4B5563] mb-6">
          {error || 'ID perangkat tidak terdaftar di sistem simulasi JagaToya.'}
        </p>
        <Link
          href="/dashboard/devices"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#077B43] text-white rounded-xl text-xs font-semibold hover:bg-[#055c31]"
        >
          <ArrowLeft size={14} />
          Kembali ke Daftar Perangkat
        </Link>
      </div>
    )
  }

  // Calculate current readings from latest values
  const soilReading = readings.filter((r) => r.sensorType === 'soil_moisture').slice(-1)[0]?.value
  const waterReading = readings.filter((r) => r.sensorType === 'water_level').slice(-1)[0]?.value
  const tempReading = readings.filter((r) => r.sensorType === 'temperature').slice(-1)[0]?.value

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/devices"
          className="inline-flex items-center gap-1.5 text-xs text-[#4B5563] hover:text-[#111111] transition-colors"
        >
          <ArrowLeft size={14} />
          Kembali ke Daftar Perangkat
        </Link>
        <span className="demo-badge">Data Simulasi</span>
      </div>

      {/* Main Device Header Card */}
      <div className="bg-white rounded-2xl border border-[#D9D9D9] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#C2F8AB]/70 text-[#077B43] flex items-center justify-center font-bold flex-shrink-0">
              <Cpu size={24} />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-[#111111]">
                  {device.displayName}
                </h1>
                <DeviceStatusBadge status={device.connectionStatus} />
              </div>
              <p className="text-xs font-mono text-[#9CA3AF] mt-0.5">
                ID: {device.deviceIdentifier}
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-[#4B5563] flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-[#077B43]" />
                  {device.field?.name ?? 'Petak Belum Ditentukan'} ({device.field?.area ?? 1} ha)
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} className="text-[#9CA3AF]" />
                  Dipasangkan: {device.pairedAt ? new Date(device.pairedAt).toLocaleDateString('id-ID') : '-'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-[#D9D9D9]/60 text-xs">
            <span className="text-[#4B5563]">Koneksi & Daya:</span>
            <div className="flex items-center gap-3 mt-1 font-semibold text-[#111111]">
              <span className="flex items-center gap-1 text-[#077B43]">
                <Wifi size={14} /> LoRa/GSM Aktif
              </span>
              <span className="flex items-center gap-1 text-emerald-600">
                <Battery size={14} /> Solar 94%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Metric Cards for This Device */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Soil Moisture */}
        <div className="bg-white rounded-2xl border border-[#D9D9D9] p-5 shadow-sm border-l-4 border-l-[#077B43]">
          <div className="flex items-center justify-between text-xs text-[#4B5563] mb-2">
            <span>Kelembapan Tanah Saat Ini</span>
            <Droplets size={16} className="text-[#077B43]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#111111]">
              {soilReading !== undefined && soilReading !== null ? soilReading : '68'}
            </span>
            <span className="text-xs text-[#4B5563]">%</span>
          </div>
          <p className="text-[11px] text-[#077B43] mt-2 font-medium">
            Kondisi tanah ideal untuk fase vegetatif padi
          </p>
        </div>

        {/* Water Level */}
        <div className="bg-white rounded-2xl border border-[#D9D9D9] p-5 shadow-sm border-l-4 border-l-[#0891b2]">
          <div className="flex items-center justify-between text-xs text-[#4B5563] mb-2">
            <span>Ketinggian Air Genangan</span>
            <Waves size={16} className="text-[#0891b2]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#111111]">
              {waterReading !== undefined && waterReading !== null ? waterReading : '5.2'}
            </span>
            <span className="text-xs text-[#4B5563]">cm</span>
          </div>
          <p className="text-[11px] text-[#0891b2] mt-2 font-medium">
            Tinggi genangan macak-macak optimal
          </p>
        </div>

        {/* Temperature */}
        <div className="bg-white rounded-2xl border border-[#D9D9D9] p-5 shadow-sm border-l-4 border-l-[#ea580c]">
          <div className="flex items-center justify-between text-xs text-[#4B5563] mb-2">
            <span>Suhu Sekitar Lahan</span>
            <Thermometer size={16} className="text-[#ea580c]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#111111]">
              {tempReading !== undefined && tempReading !== null ? tempReading : '29.5'}
            </span>
            <span className="text-xs text-[#4B5563]">°C</span>
          </div>
          <p className="text-[11px] text-[#4B5563] mt-2">
            Suhu mikro perkecambahan stabil
          </p>
        </div>
      </div>

      {/* Historical Telemetry Chart for this device */}
      <div className="bg-white rounded-2xl border border-[#D9D9D9] p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#D9D9D9]/60">
          <div>
            <h2 className="text-base font-bold text-[#111111]">
              Grafik Telemetri Riwayat Sensor
            </h2>
            <p className="text-xs text-[#4B5563] mt-0.5">
              Pilih parameter sensor untuk memantau fluktuasi pengukuran di petak sawah ini
            </p>
          </div>

          <div className="flex bg-[#F3F4F6] p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setSelectedSensor('soil_moisture')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedSensor === 'soil_moisture'
                  ? 'bg-white text-[#077B43] shadow-sm'
                  : 'text-[#4B5563] hover:text-[#111111]'
              }`}
            >
              Kelembapan Tanah
            </button>
            <button
              onClick={() => setSelectedSensor('water_level')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedSensor === 'water_level'
                  ? 'bg-white text-[#0891b2] shadow-sm'
                  : 'text-[#4B5563] hover:text-[#111111]'
              }`}
            >
              Ketinggian Air
            </button>
            <button
              onClick={() => setSelectedSensor('temperature')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedSensor === 'temperature'
                  ? 'bg-white text-[#ea580c] shadow-sm'
                  : 'text-[#4B5563] hover:text-[#111111]'
              }`}
            >
              Suhu
            </button>
          </div>
        </div>

        <SensorHistoryChart
          readings={readings}
          sensorType={selectedSensor}
          isDemoData={true}
        />
      </div>

      {/* Threshold & Notification Setting for this device */}
      <div className="bg-white rounded-2xl border border-[#D9D9D9] p-6 shadow-sm">
        <h2 className="text-base font-bold text-[#111111] mb-1">
          Pengaturan Ambang Batas Peringatan (Simulasi)
        </h2>
        <p className="text-xs text-[#4B5563] mb-4">
          Atur parameter batas minimal/maksimal untuk menerima notifikasi otomatis bila kondisi sawah memerlukan irigasi.
        </p>

        {isSavedNotice && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#077B43]" />
            <span>Pengaturan ambang batas perangkat berhasil diperbarui (disimpan di sesi lokal simulasi).</span>
          </div>
        )}

        <form onSubmit={handleSaveThresholds} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1">
              Batas Minimum Kelembapan Tanah (%)
            </label>
            <input
              type="number"
              value={minSoilThreshold}
              onChange={(e) => setMinSoilThreshold(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#D9D9D9] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43]"
            />
            <p className="text-[10px] text-[#9CA3AF] mt-1">Peringatan jika kelembapan turun di bawah nilai ini.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1">
              Batas Minimum Ketinggian Air (cm)
            </label>
            <input
              type="number"
              step="0.5"
              value={minWaterThreshold}
              onChange={(e) => setMinWaterThreshold(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#D9D9D9] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43]"
            />
            <p className="text-[10px] text-[#9CA3AF] mt-1">Peringatan saat petak sawah mulai kekeringan air.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1">
              Batas Maksimum Ketinggian Air (cm)
            </label>
            <input
              type="number"
              step="0.5"
              value={maxWaterThreshold}
              onChange={(e) => setMaxWaterThreshold(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#D9D9D9] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43]"
            />
            <p className="text-[10px] text-[#9CA3AF] mt-1">Peringatan saat air meluap melebihi batas pematang.</p>
          </div>

          <div className="md:col-span-3 flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#077B43] hover:bg-[#055c31] text-white rounded-xl text-xs font-semibold transition-colors"
            >
              <Save size={15} />
              Simpan Pengaturan Ambang Batas
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
