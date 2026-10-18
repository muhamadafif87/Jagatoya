/**
 * JagaToya Demo Fixtures
 *
 * These are STATIC, DETERMINISTIC demo records used when the application
 * runs in demo mode (NEXT_PUBLIC_DATA_MODE=demo or unset).
 *
 * Rules:
 * - Never mutate this data at runtime.
 * - Never import this file from production service adapters.
 * - All timestamps use Asia/Jakarta (WIB, UTC+7).
 * - Missing values are represented as null, never 0.
 */

import type {
  Device,
  Field,
  Notification,
  SensorReading,
  User,
} from '@/types'

// ─── Reference point: "now" is pinned for determinism ────────────────────────
// In demo mode we pick a fixed reference time so chart data is always the same.
// Change this constant only if you need to shift the demo dataset.
const DEMO_BASE_ISO = '2026-10-18T09:00:00+07:00'
const BASE = new Date(DEMO_BASE_ISO)

function isoMinutesAgo(minutes: number): string {
  return new Date(BASE.getTime() - minutes * 60 * 1000).toISOString()
}
function isoHoursAgo(hours: number): string {
  return isoMinutesAgo(hours * 60)
}
function isoDaysAgo(days: number): string {
  return isoHoursAgo(days * 24)
}

// ─── Demo user ────────────────────────────────────────────────────────────────

export const DEMO_USER: User = {
  id: 'demo-user-001',
  fullName: 'Budi Santoso',
  email: 'budi@demo.jagatoya.id',
  phoneNumber: '+6281234567890',
  createdAt: isoDaysAgo(90),
  updatedAt: isoDaysAgo(5),
}

// ─── Demo fields ──────────────────────────────────────────────────────────────

export const DEMO_FIELDS: Field[] = [
  {
    id: 'field-001',
    ownerId: DEMO_USER.id,
    name: 'Sawah Utara – Blok A',
    locationDescription: 'Desa Sukamaju, Kec. Cikarang Utara',
    latitude: -6.285,
    longitude: 107.157,
    area: 1.5,
    areaUnit: 'ha',
    createdAt: isoDaysAgo(85),
    updatedAt: isoDaysAgo(5),
  },
  {
    id: 'field-002',
    ownerId: DEMO_USER.id,
    name: 'Sawah Selatan – Blok B',
    locationDescription: 'Desa Sukamaju, Kec. Cikarang Utara',
    latitude: -6.292,
    longitude: 107.161,
    area: 0.8,
    areaUnit: 'ha',
    createdAt: isoDaysAgo(80),
    updatedAt: isoDaysAgo(10),
  },
]

// ─── Demo devices ─────────────────────────────────────────────────────────────

export const DEMO_DEVICES: Device[] = [
  {
    id: 'device-001',
    ownerId: DEMO_USER.id,
    fieldId: 'field-001',
    field: DEMO_FIELDS[0],
    deviceIdentifier: 'JGT-A1B2C3',
    displayName: 'Sensor Blok A',
    connectionStatus: 'online',
    lastSeenAt: isoMinutesAgo(3),
    pairedAt: isoDaysAgo(80),
    sensors: [
      {
        id: 'sensor-001-sm',
        deviceId: 'device-001',
        sensorType: 'soil_moisture',
        unit: '%',
        isAvailable: true,
        configuration: { minThreshold: 40, maxThreshold: 80 },
      },
      {
        id: 'sensor-001-wl',
        deviceId: 'device-001',
        sensorType: 'water_level',
        unit: 'cm',
        isAvailable: true,
        configuration: { minThreshold: 5, maxThreshold: 25 },
      },
      {
        id: 'sensor-001-temp',
        deviceId: 'device-001',
        sensorType: 'temperature',
        unit: '°C',
        isAvailable: true,
        configuration: null,
      },
    ],
    createdAt: isoDaysAgo(80),
    updatedAt: isoMinutesAgo(3),
  },
  {
    id: 'device-002',
    ownerId: DEMO_USER.id,
    fieldId: 'field-002',
    field: DEMO_FIELDS[1],
    deviceIdentifier: 'JGT-D4E5F6',
    displayName: 'Sensor Blok B',
    connectionStatus: 'offline',
    lastSeenAt: isoHoursAgo(6),
    pairedAt: isoDaysAgo(75),
    sensors: [
      {
        id: 'sensor-002-sm',
        deviceId: 'device-002',
        sensorType: 'soil_moisture',
        unit: '%',
        isAvailable: true,
        configuration: { minThreshold: 35, maxThreshold: 75 },
      },
      {
        id: 'sensor-002-wl',
        deviceId: 'device-002',
        sensorType: 'water_level',
        unit: 'cm',
        isAvailable: false, // sensor not installed
        configuration: null,
      },
    ],
    createdAt: isoDaysAgo(75),
    updatedAt: isoHoursAgo(6),
  },
]

// ─── Demo sensor readings (deterministic time-series) ─────────────────────────

// Produces a sine-wave-ish pattern for visual interest without randomness
function deterministicValue(
  base: number,
  amplitude: number,
  offsetMinutes: number,
  periodMinutes = 240
): number {
  const phase = (offsetMinutes % periodMinutes) / periodMinutes
  const raw = base + amplitude * Math.sin(2 * Math.PI * phase)
  return Math.round(raw * 10) / 10
}

function makeReadings(
  deviceId: string,
  sensorId: string,
  sensorType: 'soil_moisture' | 'water_level' | 'temperature',
  unit: string,
  base: number,
  amplitude: number,
  countBack: number,        // how many readings
  intervalMinutes: number   // interval between readings
): SensorReading[] {
  const readings: SensorReading[] = []
  for (let i = countBack; i >= 0; i--) {
    const offsetMin = i * intervalMinutes
    const recordedAt = isoMinutesAgo(offsetMin)
    readings.push({
      id: `${sensorId}-r${i}`,
      deviceId,
      sensorId,
      sensorType,
      value: deterministicValue(base, amplitude, offsetMin),
      unit,
      recordedAt,
      receivedAt: new Date(new Date(recordedAt).getTime() + 2000).toISOString(),
      qualityStatus: 'good',
    })
  }
  return readings
}

export const DEMO_READINGS: SensorReading[] = [
  // Device 001 – soil moisture (every 15 min, last 7 days = 672 readings)
  ...makeReadings('device-001', 'sensor-001-sm', 'soil_moisture', '%', 62, 12, 672, 15),
  // Device 001 – water level (every 15 min)
  ...makeReadings('device-001', 'sensor-001-wl', 'water_level', 'cm', 14, 6, 672, 15),
  // Device 001 – temperature (every 30 min)
  ...makeReadings('device-001', 'sensor-001-temp', 'temperature', '°C', 29, 4, 336, 30),
  // Device 002 – soil moisture (last 6h only, then offline)
  ...makeReadings('device-002', 'sensor-002-sm', 'soil_moisture', '%', 55, 8, 24, 15),
]

// ─── Demo notifications ───────────────────────────────────────────────────────

export const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-001',
    ownerId: DEMO_USER.id,
    deviceId: 'device-002',
    device: {
      id: 'device-002',
      displayName: 'Sensor Blok B',
      deviceIdentifier: 'JGT-D4E5F6',
    },
    type: 'device_offline',
    severity: 'warning',
    title: 'Perangkat tidak dapat dijangkau',
    message:
      'Sensor Blok B (JGT-D4E5F6) tidak mengirimkan data sejak 6 jam lalu. Periksa koneksi daya dan jaringan.',
    readAt: null,
    createdAt: isoHoursAgo(6),
  },
  {
    id: 'notif-002',
    ownerId: DEMO_USER.id,
    deviceId: 'device-001',
    device: {
      id: 'device-001',
      displayName: 'Sensor Blok A',
      deviceIdentifier: 'JGT-A1B2C3',
    },
    type: 'threshold_exceeded',
    severity: 'info',
    title: 'Kelembapan tanah mendekati batas atas',
    message:
      'Kelembapan tanah Blok A mencapai 76% – mendekati batas atas yang dikonfigurasi (80%). Pertimbangkan untuk mengurangi irigasi.',
    readAt: isoHoursAgo(2),
    createdAt: isoHoursAgo(4),
  },
  {
    id: 'notif-003',
    ownerId: DEMO_USER.id,
    deviceId: 'device-001',
    device: {
      id: 'device-001',
      displayName: 'Sensor Blok A',
      deviceIdentifier: 'JGT-A1B2C3',
    },
    type: 'reading_received',
    severity: 'info',
    title: 'Pembacaan sensor diterima',
    message: 'Sensor Blok A mengirimkan data terbaru: kelembapan 62%, ketinggian air 14 cm.',
    readAt: isoHoursAgo(1),
    createdAt: isoMinutesAgo(3),
  },
]
