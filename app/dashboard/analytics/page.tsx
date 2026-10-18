'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Calendar,
  Download,
  Droplets,
  Waves,
  Thermometer,
  CloudRain,
  Clock,
  Sparkles,
} from 'lucide-react'
import { analyticsService, telemetryService, deviceService } from '@/lib/services'
import type {
  Device,
  SensorReading,
  SensorSummary,
  SensorType,
} from '@/types'
import { SENSOR_LABELS, SENSOR_UNITS } from '@/types'
import { SensorHistoryChart } from '@/components/charts/SensorHistoryChart'
import { LoadingSkeleton, EmptyState } from '@/components/ui'

export default function AnalyticsPage() {
  const [devices, setDevices] = useState<Device[]>([])
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('device-001')
  const [selectedSensor, setSelectedSensor] = useState<SensorType>('soil_moisture')
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d')
  const [readings, setReadings] = useState<SensorReading[]>([])
  const [summaries, setSummaries] = useState<SensorSummary[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch initial devices list
  useEffect(() => {
    async function loadDevices() {
      const res = await deviceService.listDevices({})
      if (res.ok) {
        setDevices(res.data.data)
      }
    }
    loadDevices()
  }, [])

  // Fetch telemetry & summaries when device or timeRange changes
  useEffect(() => {
    async function loadTelemetry() {
      setLoading(true)
      try {
        const [historyRes, summaryRes] = await Promise.all([
          telemetryService.getReadingHistory({
            deviceId: selectedDeviceId,
            sensorType: selectedSensor,
          }),
          analyticsService.getSensorSummaries({
            deviceId: selectedDeviceId,
            sensorTypes: ['soil_moisture', 'water_level', 'temperature', 'humidity'],
          }),
        ])

        if (historyRes.ok) {
          setReadings(historyRes.data)
        }
        if (summaryRes.ok) {
          setSummaries(summaryRes.data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadTelemetry()
  }, [selectedDeviceId, selectedSensor, timeRange])

  // Get current active sensor summary
  const currentSummary = useMemo(() => {
    return summaries.find((s) => s.sensorType === selectedSensor)
  }, [summaries, selectedSensor])

  // Export CSV handler (simulated client-side download)
  function handleExportCsv() {
    if (readings.length === 0) return
    const headers = 'Waktu (WIB),Device ID,Sensor,Nilai,Satuan,Status Kualitas\n'
    const rows = readings
      .map(
        (r) =>
          `"${new Date(r.recordedAt).toLocaleString('id-ID')}",${r.deviceId},${r.sensorType},${
            r.value !== null ? r.value : ''
          },${r.unit},${r.qualityStatus}`
      )
      .join('\n')

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `jagatoya-sensor-${selectedSensor}-${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="demo-badge">Mode Simulasi</span>
            <span className="text-xs text-[#4B5563]">Analitik & Telemetri</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111111]">Analisis Sensor Sawah</h1>
          <p className="text-sm text-[#4B5563] mt-1">
            Pantau tren historis kelembapan, air, dan suhu untuk optimalisasi jadwal irigasi padi.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          disabled={readings.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#D9D9D9] hover:bg-[#F3F4F6] text-[#111111] rounded-xl text-xs font-semibold transition-colors shadow-sm self-start sm:self-auto disabled:opacity-50"
        >
          <Download size={15} />
          Ekspor Data (CSV)
        </button>
      </div>

      {/* Control / Filter Bar */}
      <div className="bg-white rounded-2xl border border-[#D9D9D9] p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Device select */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-[#4B5563] whitespace-nowrap">
            Pilih Node Perangkat:
          </span>
          <select
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            className="w-full md:w-64 px-3 py-2 bg-[#F9FAFB] rounded-xl border border-[#D9D9D9] text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#077B43]"
          >
            {devices.map((d) => (
              <option key={d.id} value={d.id}>
                {d.displayName} ({d.deviceIdentifier})
              </option>
            ))}
          </select>
        </div>

        {/* Time range pills */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <span className="text-xs font-semibold text-[#4B5563] whitespace-nowrap flex items-center gap-1">
            <Calendar size={14} /> Rentang Waktu:
          </span>
          <div className="flex bg-[#F3F4F6] p-1 rounded-xl">
            <button
              onClick={() => setTimeRange('24h')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                timeRange === '24h'
                  ? 'bg-white text-[#077B43] shadow-sm'
                  : 'text-[#4B5563] hover:text-[#111111]'
              }`}
            >
              24 Jam
            </button>
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                timeRange === '7d'
                  ? 'bg-white text-[#077B43] shadow-sm'
                  : 'text-[#4B5563] hover:text-[#111111]'
              }`}
            >
              7 Hari Terakhir
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                timeRange === '30d'
                  ? 'bg-white text-[#077B43] shadow-sm'
                  : 'text-[#4B5563] hover:text-[#111111]'
              }`}
            >
              30 Hari
            </button>
          </div>
        </div>
      </div>

      {/* Sensor Selection Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(
          [
            { type: 'soil_moisture', label: 'Kelembapan Tanah', icon: <Droplets size={16} /> },
            { type: 'water_level', label: 'Ketinggian Air', icon: <Waves size={16} /> },
            { type: 'temperature', label: 'Suhu Udara', icon: <Thermometer size={16} /> },
            { type: 'humidity', label: 'Kelembapan Udara', icon: <CloudRain size={16} /> },
          ] as const
        ).map((sensor) => {
          const isActive = selectedSensor === sensor.type
          const summary = summaries.find((s) => s.sensorType === sensor.type)
          return (
            <button
              key={sensor.type}
              onClick={() => setSelectedSensor(sensor.type)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-white border-[#077B43] ring-2 ring-[#077B43]/20 shadow-md'
                  : 'bg-white border-[#D9D9D9] hover:border-[#077B43]/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-[#4B5563] mb-2">
                <span className="font-semibold">{sensor.label}</span>
                <span className={isActive ? 'text-[#077B43]' : 'text-[#9CA3AF]'}>
                  {sensor.icon}
                </span>
              </div>
              <div>
                <p className="text-xl font-bold text-[#111111]">
                  {summary?.avg !== null && summary?.avg !== undefined
                    ? `${summary.avg} ${summary.unit}`
                    : '-'}
                </p>
                <p className="text-[10px] text-[#9CA3AF] mt-0.5">
                  Rata-rata periode ini
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Statistical Summary Row */}
      {currentSummary && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-[#D9D9D9] p-4 text-center">
            <p className="text-xs text-[#4B5563] mb-1">Nilai Minimum</p>
            <p className="text-lg font-bold text-[#111111]">
              {currentSummary.min !== null ? `${currentSummary.min} ${currentSummary.unit}` : 'N/A'}
            </p>
            <p className="text-[10px] text-[#9CA3AF] mt-1">Titik terendah</p>
          </div>

          <div className="bg-white rounded-xl border border-[#D9D9D9] p-4 text-center">
            <p className="text-xs text-[#4B5563] mb-1">Nilai Rata-rata</p>
            <p className="text-lg font-bold text-[#077B43]">
              {currentSummary.avg !== null ? `${currentSummary.avg} ${currentSummary.unit}` : 'N/A'}
            </p>
            <p className="text-[10px] text-[#9CA3AF] mt-1">Stabil teratur</p>
          </div>

          <div className="bg-white rounded-xl border border-[#D9D9D9] p-4 text-center">
            <p className="text-xs text-[#4B5563] mb-1">Nilai Maksimum</p>
            <p className="text-lg font-bold text-[#111111]">
              {currentSummary.max !== null ? `${currentSummary.max} ${currentSummary.unit}` : 'N/A'}
            </p>
            <p className="text-[10px] text-[#9CA3AF] mt-1">Titik puncak</p>
          </div>

          <div className="bg-white rounded-xl border border-[#D9D9D9] p-4 text-center">
            <p className="text-xs text-[#4B5563] mb-1">Total Sampel Valid</p>
            <p className="text-lg font-bold text-[#111111]">
              {currentSummary.validCount} / {currentSummary.sampleCount}
            </p>
            <p className="text-[10px] text-emerald-600 mt-1">100% Kualitas Baik</p>
          </div>
        </div>
      )}

      {/* Main Graph Card */}
      <div className="bg-white rounded-2xl border border-[#D9D9D9] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#D9D9D9]/60">
          <div>
            <h2 className="text-base font-bold text-[#111111] flex items-center gap-2">
              <Sparkles size={18} className="text-[#077B43]" />
              Tren Historis {SENSOR_LABELS[selectedSensor]}
            </h2>
            <p className="text-xs text-[#4B5563] mt-0.5">
              Grafik deret waktu telemetri IoT JagaToya (WIB, Asia/Jakarta)
            </p>
          </div>
          <span className="demo-badge self-start sm:self-auto">Simulasi Fixtures</span>
        </div>

        {loading ? (
          <LoadingSkeleton className="h-72 w-full rounded-xl" />
        ) : (
          <SensorHistoryChart
            readings={readings}
            sensorType={selectedSensor}
            isDemoData={true}
          />
        )}
      </div>

      {/* Tabular Telemetry Preview */}
      <div className="bg-white rounded-2xl border border-[#D9D9D9] p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-[#111111] flex items-center gap-2">
            <Clock size={16} className="text-[#077B43]" />
            Log Pembacaan Telemetri Terkini
          </h2>
          <span className="text-xs text-[#9CA3AF]">
            Menampilkan {readings.slice(-10).length} log terakhir
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#D9D9D9] text-[#4B5563] font-semibold">
                <th className="pb-2.5 pr-4">Waktu Rekam (WIB)</th>
                <th className="pb-2.5 px-4">Parameter</th>
                <th className="pb-2.5 px-4">Nilai Terukur</th>
                <th className="pb-2.5 px-4">Satuan</th>
                <th className="pb-2.5 pl-4 text-right">Status Kualitas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9D9D9]/40">
              {readings.slice(-8).reverse().map((r) => (
                <tr key={r.id} className="hover:bg-[#F9FAFB]">
                  <td className="py-2.5 pr-4 text-[#111111] font-mono">
                    {new Date(r.recordedAt).toLocaleString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-2.5 px-4 text-[#4B5563] font-medium">
                    {SENSOR_LABELS[r.sensorType]}
                  </td>
                  <td className="py-2.5 px-4 font-bold text-[#111111]">
                    {r.value !== null ? r.value : <span className="text-red-500 font-normal">Kosong (null)</span>}
                  </td>
                  <td className="py-2.5 px-4 text-[#9CA3AF]">
                    {r.unit}
                  </td>
                  <td className="py-2.5 pl-4 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {r.qualityStatus === 'good' ? 'Baik' : r.qualityStatus}
                    </span>
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
