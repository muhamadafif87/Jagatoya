// ─── Enums & Unions ──────────────────────────────────────────────────────────

export type SensorType =
  | 'soil_moisture'
  | 'water_level'
  | 'temperature'
  | 'humidity'
  | 'ph'
  | 'light'
  | 'rainfall'
  | 'flow_rate'

export type DeviceStatus = 'online' | 'offline' | 'stale' | 'unknown'

export type ReadingQuality = 'good' | 'stale' | 'out_of_range' | 'unavailable'

export type DataMode = 'demo' | 'live'

export type NotificationSeverity = 'info' | 'warning' | 'critical'

export type NotificationType =
  | 'device_offline'
  | 'device_online'
  | 'sensor_unavailable'
  | 'threshold_exceeded'
  | 'pairing_complete'
  | 'device_status_changed'
  | 'reading_received'

// ─── Core Entities ────────────────────────────────────────────────────────────

export interface User {
  id: string
  fullName: string
  email: string
  phoneNumber: string | null
  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
}

export interface Field {
  id: string
  ownerId: string
  name: string
  locationDescription: string | null
  latitude: number | null
  longitude: number | null
  area: number | null
  areaUnit: 'ha' | 'm2' | null
  createdAt: string
  updatedAt: string
}

export interface Sensor {
  id: string
  deviceId: string
  sensorType: SensorType
  unit: string
  isAvailable: boolean
  configuration: Record<string, unknown> | null
}

export interface Device {
  id: string
  ownerId: string
  fieldId: string | null
  field: Field | null
  deviceIdentifier: string
  displayName: string
  connectionStatus: DeviceStatus
  lastSeenAt: string | null // ISO 8601
  pairedAt: string | null // ISO 8601
  sensors: Sensor[]
  createdAt: string
  updatedAt: string
}

export interface SensorReading {
  id: string
  deviceId: string
  sensorId: string
  sensorType: SensorType
  value: number | null // null = missing, never replace with 0
  unit: string
  recordedAt: string // ISO 8601 with timezone
  receivedAt: string | null // ISO 8601 with timezone
  qualityStatus: ReadingQuality
}

export interface SensorSummary {
  sensorType: SensorType
  unit: string
  min: number | null
  max: number | null
  avg: number | null
  sampleCount: number
  validCount: number // readings with non-null, non-out-of-range values
  firstAt: string | null
  lastAt: string | null
}

export interface Notification {
  id: string
  ownerId: string
  deviceId: string | null
  device: Pick<Device, 'id' | 'displayName' | 'deviceIdentifier'> | null
  type: NotificationType
  severity: NotificationSeverity
  title: string
  message: string
  readAt: string | null // ISO 8601; null = unread
  createdAt: string
}

// ─── Filter / Query Types ─────────────────────────────────────────────────────

export interface DeviceListFilters {
  status?: DeviceStatus | 'all'
  search?: string
  fieldId?: string
}

export interface TelemetryFilters {
  deviceId: string
  sensorType?: SensorType
  from: string // ISO 8601
  to: string   // ISO 8601
  limit?: number
}

export interface AnalyticsFilters {
  deviceId: string
  sensorTypes?: SensorType[]
  from: string // ISO 8601
  to: string   // ISO 8601
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PageResult<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// ─── Service Result Wrapper ───────────────────────────────────────────────────

export type ServiceResult<T> =
  | { ok: true; data: T; mode: DataMode }
  | { ok: false; error: string; code?: string }

// ─── Auth (UI only — no production auth configured) ───────────────────────────

export interface DemoSession {
  userId: string
  fullName: string
  email: string
  isDemoSession: true // must always be true for demo sessions
}

// ─── Sensor display helpers ───────────────────────────────────────────────────

export const SENSOR_LABELS: Record<SensorType, string> = {
  soil_moisture: 'Kelembapan Tanah',
  water_level: 'Ketinggian Air',
  temperature: 'Suhu',
  humidity: 'Kelembapan Udara',
  ph: 'pH Tanah',
  light: 'Intensitas Cahaya',
  rainfall: 'Curah Hujan',
  flow_rate: 'Laju Aliran',
}

export const SENSOR_UNITS: Record<SensorType, string> = {
  soil_moisture: '%',
  water_level: 'cm',
  temperature: '°C',
  humidity: '%',
  ph: 'pH',
  light: 'lux',
  rainfall: 'mm',
  flow_rate: 'L/min',
}
