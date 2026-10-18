/**
 * Demo implementation of TelemetryService + AnalyticsService.
 */

import { DEMO_READINGS } from '@/lib/demo/fixtures'
import {
  computeMultiSensorSummaries,
  filterByDateRange,
  filterByDevice,
  filterBySensorType,
} from '@/lib/analytics/utils'
import type {
  AnalyticsFilters,
  SensorReading,
  SensorSummary,
  ServiceResult,
  TelemetryFilters,
} from '@/types'
import type { AnalyticsService, TelemetryService } from '../contracts'
import { SENSOR_UNITS } from '@/types'

export const demoTelemetryService: TelemetryService = {
  async getLatestReadings(
    deviceId: string
  ): Promise<ServiceResult<SensorReading[]>> {
    await new Promise((r) => setTimeout(r, 0))

    const deviceReadings = filterByDevice(DEMO_READINGS, deviceId)
    if (deviceReadings.length === 0) {
      return { ok: true, mode: 'demo', data: [] }
    }

    // Return the most recent reading per sensor type
    const latestBySensor = new Map<string, SensorReading>()
    for (const r of deviceReadings) {
      const existing = latestBySensor.get(r.sensorType)
      if (
        !existing ||
        new Date(r.recordedAt) > new Date(existing.recordedAt)
      ) {
        latestBySensor.set(r.sensorType, r)
      }
    }

    return {
      ok: true,
      mode: 'demo',
      data: Array.from(latestBySensor.values()),
    }
  },

  async getReadingHistory(
    filters: TelemetryFilters
  ): Promise<ServiceResult<SensorReading[]>> {
    await new Promise((r) => setTimeout(r, 0))

    let readings = filterByDevice(DEMO_READINGS, filters.deviceId)

    if (filters.sensorType) {
      readings = filterBySensorType(readings, filters.sensorType)
    }

    try {
      readings = filterByDateRange(readings, filters.from, filters.to)
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : 'Filter tanggal tidak valid.',
        code: 'INVALID_FILTER',
      }
    }

    if (filters.limit) {
      readings = readings.slice(-filters.limit)
    }

    return { ok: true, mode: 'demo', data: readings }
  },
}

export const demoAnalyticsService: AnalyticsService = {
  async getSensorSummaries(
    filters: AnalyticsFilters
  ): Promise<ServiceResult<SensorSummary[]>> {
    await new Promise((r) => setTimeout(r, 0))

    let readings = filterByDevice(DEMO_READINGS, filters.deviceId)

    try {
      readings = filterByDateRange(readings, filters.from, filters.to)
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : 'Filter tanggal tidak valid.',
        code: 'INVALID_FILTER',
      }
    }

    const sensorTypes = filters.sensorTypes ?? [
      'soil_moisture',
      'water_level',
      'temperature',
    ]

    const sensorTypeUnits = sensorTypes.map((type) => ({
      type,
      unit: SENSOR_UNITS[type],
    }))

    const summaries = computeMultiSensorSummaries(readings, sensorTypeUnits)

    return { ok: true, mode: 'demo', data: summaries }
  },
}
