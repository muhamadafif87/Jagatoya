/**
 * Analytics utility functions.
 *
 * Pure functions — no side effects, no imports from service adapters.
 * All functions exclude null/invalid values and never replace missing data with 0.
 */

import type { SensorReading, SensorSummary, SensorType } from '@/types'

// ─── Validity ─────────────────────────────────────────────────────────────────

export function isValidReading(reading: SensorReading): boolean {
  return (
    reading.value !== null &&
    reading.qualityStatus !== 'out_of_range' &&
    reading.qualityStatus !== 'unavailable'
  )
}

// ─── Date filtering ───────────────────────────────────────────────────────────

export function filterByDateRange(
  readings: SensorReading[],
  from: string,
  to: string
): SensorReading[] {
  const fromMs = new Date(from).getTime()
  const toMs = new Date(to).getTime()

  if (isNaN(fromMs) || isNaN(toMs)) {
    throw new Error(`Invalid date range: from="${from}" to="${to}"`)
  }
  if (fromMs > toMs) {
    throw new Error(`Date range invalid: "from" (${from}) is after "to" (${to})`)
  }

  return readings.filter((r) => {
    const t = new Date(r.recordedAt).getTime()
    return t >= fromMs && t <= toMs
  })
}

// ─── Sensor type filtering ────────────────────────────────────────────────────

export function filterBySensorType(
  readings: SensorReading[],
  sensorType: SensorType
): SensorReading[] {
  return readings.filter((r) => r.sensorType === sensorType)
}

export function filterByDevice(
  readings: SensorReading[],
  deviceId: string
): SensorReading[] {
  return readings.filter((r) => r.deviceId === deviceId)
}

// ─── Statistics ───────────────────────────────────────────────────────────────

/**
 * Compute min/max/avg from an array of readings.
 * - Null values are excluded.
 * - Out-of-range and unavailable readings are excluded.
 * - Returns null aggregates when no valid readings exist (never defaults to 0).
 */
export function computeSummary(
  readings: SensorReading[],
  sensorType: SensorType,
  unit: string
): SensorSummary {
  const validReadings = readings
    .filter((r) => r.sensorType === sensorType)
    .filter(isValidReading)

  const values = validReadings.map((r) => r.value as number)

  if (values.length === 0) {
    return {
      sensorType,
      unit,
      min: null,
      max: null,
      avg: null,
      sampleCount: readings.filter((r) => r.sensorType === sensorType).length,
      validCount: 0,
      firstAt: null,
      lastAt: null,
    }
  }

  const sorted = [...validReadings].sort(
    (a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime()
  )

  const sum = values.reduce((acc, v) => acc + v, 0)

  return {
    sensorType,
    unit,
    min: Math.min(...values),
    max: Math.max(...values),
    avg: Math.round((sum / values.length) * 10) / 10,
    sampleCount: readings.filter((r) => r.sensorType === sensorType).length,
    validCount: values.length,
    firstAt: sorted[0].recordedAt,
    lastAt: sorted[sorted.length - 1].recordedAt,
  }
}

/**
 * Compute summaries for multiple sensor types in one pass.
 */
export function computeMultiSensorSummaries(
  readings: SensorReading[],
  sensorTypes: { type: SensorType; unit: string }[]
): SensorSummary[] {
  return sensorTypes.map(({ type, unit }) =>
    computeSummary(readings, type, unit)
  )
}

// ─── Chart data formatting ────────────────────────────────────────────────────

export interface ChartDataPoint {
  /** ISO timestamp string */
  timestamp: string
  /** Formatted local time label for axis */
  timeLabel: string
  value: number | null
}

export function toChartData(
  readings: SensorReading[],
  sensorType: SensorType
): ChartDataPoint[] {
  return readings
    .filter((r) => r.sensorType === sensorType)
    .sort(
      (a, b) =>
        new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime()
    )
    .map((r) => ({
      timestamp: r.recordedAt,
      timeLabel: formatChartTime(r.recordedAt),
      // Keep null as null — never replace with 0
      value: isValidReading(r) ? r.value : null,
    }))
}

export function formatChartTime(iso: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(iso))
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date(iso))
}

export function formatRelativeTime(iso: string, now = new Date()): string {
  const diffMs = now.getTime() - new Date(iso).getTime()
  const diffMin = Math.floor(diffMs / 60_000)
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)

  if (diffMin < 1) return 'Baru saja'
  if (diffMin < 60) return `${diffMin} menit lalu`
  if (diffHr < 24) return `${diffHr} jam lalu`
  return `${diffDay} hari lalu`
}

export function isStale(iso: string | null, thresholdMinutes = 30): boolean {
  if (!iso) return true
  const diffMs = Date.now() - new Date(iso).getTime()
  return diffMs > thresholdMinutes * 60_000
}
