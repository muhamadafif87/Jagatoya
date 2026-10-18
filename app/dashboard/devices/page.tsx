'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Cpu,
  Plus,
  Search,
  Filter,
  ArrowRight,
  Wifi,
  MapPin,
  Clock,
  AlertCircle,
  X,
  CheckCircle2,
} from 'lucide-react'
import { deviceService } from '@/lib/services'
import type { Device, DeviceStatus } from '@/types'
import { DeviceStatusBadge } from '@/components/ui/DeviceStatusBadge'
import { EmptyState, LoadingSkeleton } from '@/components/ui'

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | DeviceStatus>('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newDeviceName, setNewDeviceName] = useState('')
  const [newDeviceIdentifier, setNewDeviceIdentifier] = useState('')
  const [newDeviceLocation, setNewDeviceLocation] = useState('Sawah Utara – Blok A')
  const [addSuccess, setAddSuccess] = useState(false)

  useEffect(() => {
    async function fetchDevices() {
      setLoading(true)
      try {
        const res = await deviceService.listDevices({
          search: search || undefined,
          status: statusFilter,
        })
        if (res.ok) {
          setDevices(res.data.data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDevices()
  }, [search, statusFilter])

  function handleSimulateAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newDeviceName || !newDeviceIdentifier) return

    // In demo mode, we simulate adding by pushing to local state
    const simulatedDevice: Device = {
      id: `device-sim-${Date.now()}`,
      ownerId: 'demo-user-001',
      fieldId: 'field-001',
      field: {
        id: 'field-001',
        ownerId: 'demo-user-001',
        name: newDeviceLocation,
        locationDescription: 'Desa Sukamaju',
        latitude: -6.285,
        longitude: 107.157,
        area: 1.0,
        areaUnit: 'ha',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      deviceIdentifier: newDeviceIdentifier.toUpperCase(),
      displayName: newDeviceName,
      connectionStatus: 'online',
      lastSeenAt: new Date().toISOString(),
      pairedAt: new Date().toISOString(),
      sensors: [
        {
          id: `sensor-soil-${Date.now()}`,
          deviceId: `device-sim-${Date.now()}`,
          sensorType: 'soil_moisture',
          unit: '%',
          isAvailable: true,
          configuration: null,
        },
        {
          id: `sensor-water-${Date.now()}`,
          deviceId: `device-sim-${Date.now()}`,
          sensorType: 'water_level',
          unit: 'cm',
          isAvailable: true,
          configuration: null,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setDevices((prev) => [simulatedDevice, ...prev])
    setAddSuccess(true)
    setTimeout(() => {
      setAddSuccess(false)
      setShowAddModal(false)
      setNewDeviceName('')
      setNewDeviceIdentifier('')
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="demo-badge">Mode Simulasi</span>
            <span className="text-xs text-[#4B5563]">Inventaris IoT</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111111]">Perangkat Sensor IoT</h1>
          <p className="text-sm text-[#4B5563] mt-1">
            Pantau dan kelola seluruh node sensor telemetri yang terpasang di lahan sawah Anda.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          id="btn-add-device"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#077B43] hover:bg-[#055c31] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus size={18} />
          Daftarkan Perangkat Baru
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-[#D9D9D9] p-4 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Cari nama, ID perangkat, atau petak..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F9FAFB] rounded-xl border border-[#D9D9D9] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43] focus:border-transparent transition"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9CA3AF] hover:text-[#111111]"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Filter size={15} className="text-[#4B5563] ml-1 flex-shrink-0" />
          <span className="text-xs text-[#4B5563] font-medium flex-shrink-0">Status:</span>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              statusFilter === 'all'
                ? 'bg-[#077B43] text-white'
                : 'bg-[#F3F4F6] text-[#4B5563] hover:text-[#111111]'
            }`}
          >
            Semua ({devices.length})
          </button>
          <button
            onClick={() => setStatusFilter('online')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              statusFilter === 'online'
                ? 'bg-[#077B43] text-white'
                : 'bg-[#F3F4F6] text-[#4B5563] hover:text-[#111111]'
            }`}
          >
            Online
          </button>
          <button
            onClick={() => setStatusFilter('offline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              statusFilter === 'offline'
                ? 'bg-[#077B43] text-white'
                : 'bg-[#F3F4F6] text-[#4B5563] hover:text-[#111111]'
            }`}
          >
            Offline
          </button>
        </div>
      </div>

      {/* Device Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#D9D9D9] p-5">
              <LoadingSkeleton className="h-6 w-32 mb-4" />
              <LoadingSkeleton className="h-4 w-48 mb-3" />
              <LoadingSkeleton className="h-4 w-40" />
            </div>
          ))}
        </div>
      ) : devices.length === 0 ? (
        <EmptyState
          icon={<Cpu size={40} />}
          title="Tidak ada perangkat ditemukan"
          description="Coba ubah filter status atau kata kunci pencarian Anda."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {devices.map((device) => {
            const isOnline = device.connectionStatus === 'online'
            return (
              <div
                key={device.id}
                className="bg-white rounded-2xl border border-[#D9D9D9] hover:border-[#077B43]/50 transition-all p-5 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Top card bar */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#C2F8AB]/60 text-[#077B43] flex items-center justify-center font-bold">
                        <Cpu size={18} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#111111] text-base leading-snug">
                          {device.displayName}
                        </h3>
                        <p className="text-xs font-mono text-[#9CA3AF]">
                          {device.deviceIdentifier}
                        </p>
                      </div>
                    </div>
                    <DeviceStatusBadge status={device.connectionStatus} />
                  </div>

                  {/* Field & Location */}
                  <div className="space-y-1.5 py-3 border-y border-[#D9D9D9]/50 text-xs text-[#4B5563]">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[#077B43] flex-shrink-0" />
                      <span className="font-medium text-[#111111]">
                        {device.field?.name ?? 'Petak Belum Ditentukan'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-[#9CA3AF] flex-shrink-0" />
                      <span>
                        Aktivitas: {device.lastSeenAt
                          ? new Date(device.lastSeenAt).toLocaleString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Belum tercatat'}
                      </span>
                    </div>
                  </div>

                  {/* Sensor Pills */}
                  <div className="my-3">
                    <p className="text-[11px] font-semibold text-[#4B5563] uppercase tracking-wider mb-2">
                      Sensor Terhubung ({device.sensors.length})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {device.sensors.map((s) => (
                        <span
                          key={s.id}
                          className="px-2 py-1 rounded-md bg-[#F3F4F6] text-[#4B5563] text-[11px] font-medium"
                        >
                          {s.sensorType === 'soil_moisture'
                            ? 'Kelembapan Tanah'
                            : s.sensorType === 'water_level'
                            ? 'Tinggi Air'
                            : s.sensorType === 'temperature'
                            ? 'Suhu Udara'
                            : s.sensorType === 'humidity'
                            ? 'Kelembapan Udara'
                            : s.sensorType}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="pt-3 border-t border-[#D9D9D9]/50 flex items-center justify-between">
                  <span className="text-xs text-[#9CA3AF] flex items-center gap-1">
                    <Wifi size={13} className={isOnline ? 'text-[#077B43]' : 'text-gray-400'} />
                    {isOnline ? 'Sinyal Baik' : 'Terputus'}
                  </span>
                  <Link
                    href={`/dashboard/devices/${device.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#077B43]/10 hover:bg-[#077B43] text-[#077B43] hover:text-white text-xs font-semibold transition-colors"
                  >
                    Buka Detail <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal: Tambah Perangkat (Simulasi) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-[#D9D9D9]">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 text-[#9CA3AF] hover:text-[#111111]"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl bg-[#FFCC00] text-[#077B43] flex items-center justify-center">
                <Cpu size={20} />
              </div>
              <h2 className="text-lg font-bold text-[#111111]">
                Registrasi Perangkat IoT Baru
              </h2>
            </div>

            {/* Hardware disclaimer */}
            <div className="rounded-xl bg-[#FFDE59]/30 border border-[#FFCC00]/40 p-3.5 mb-4 text-xs text-[#4B5563] flex items-start gap-2">
              <AlertCircle size={15} className="text-[#E6B800] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Perhatian:</strong> Protokol pairing fisik dan konfigurasi MQTT belum tersedia pada rilis MVP ini.
                Formulir ini menjalankan simulasi penambahan node sensor ke akun demo Anda.
              </span>
            </div>

            {addSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 size={40} className="text-[#077B43] mx-auto" />
                <h3 className="font-bold text-[#111111]">Perangkat Berhasil Didaftarkan!</h3>
                <p className="text-xs text-[#4B5563]">Memperbarui daftar inventaris perangkat...</p>
              </div>
            ) : (
              <form onSubmit={handleSimulateAdd} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Nama / Label Perangkat
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="cth. Node Sawah Barat (Pompa #3)"
                    value={newDeviceName}
                    onChange={(e) => setNewDeviceName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D9D9D9] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Nomor Seri / Device Identifier (MAC/ID)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="cth. JT-NODE-004"
                    value={newDeviceIdentifier}
                    onChange={(e) => setNewDeviceIdentifier(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D9D9D9] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43] font-mono"
                  />
                  <p className="text-[10px] text-[#9CA3AF] mt-1">
                    Biasanya tercetak pada label barcode di fisik kotak box JagaToya.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Lokasi Petak Sawah
                  </label>
                  <select
                    value={newDeviceLocation}
                    onChange={(e) => setNewDeviceLocation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D9D9D9] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#077B43]"
                  >
                    <option value="Sawah Utara – Blok A">Sawah Utara – Blok A (1.5 ha)</option>
                    <option value="Sawah Selatan – Blok B">Sawah Selatan – Blok B (0.8 ha)</option>
                    <option value="Petak Baru / Lainnya">Petak Baru / Lainnya</option>
                  </select>
                </div>

                <div className="pt-2 flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-[#D9D9D9] text-xs font-semibold text-[#4B5563] rounded-xl hover:bg-[#F3F4F6]"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#077B43] text-white text-xs font-semibold rounded-xl hover:bg-[#055c31]"
                  >
                    Simulasikan Registrasi
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
