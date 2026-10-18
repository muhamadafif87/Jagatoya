/**
 * Service contracts for JagaToya data access layer.
 *
 * All page components and hooks must use these interfaces.
 * Never import demo fixtures or API clients directly in components.
 */

import type {
  AnalyticsFilters,
  Device,
  DeviceListFilters,
  Notification,
  PageResult,
  SensorReading,
  SensorSummary,
  ServiceResult,
  TelemetryFilters,
} from '@/types'

// ─── Device Service ───────────────────────────────────────────────────────────

export interface DeviceService {
  listDevices(
    filters: DeviceListFilters
  ): Promise<ServiceResult<PageResult<Device>>>

  getDevice(deviceId: string): Promise<ServiceResult<Device>>

  updateDeviceMetadata(
    deviceId: string,
    input: { displayName?: string; fieldId?: string | null }
  ): Promise<ServiceResult<Device>>
}

// ─── Telemetry Service ────────────────────────────────────────────────────────

export interface TelemetryService {
  getLatestReadings(
    deviceId: string
  ): Promise<ServiceResult<SensorReading[]>>

  getReadingHistory(
    filters: TelemetryFilters
  ): Promise<ServiceResult<SensorReading[]>>
}

// ─── Analytics Service ────────────────────────────────────────────────────────

export interface AnalyticsService {
  getSensorSummaries(
    filters: AnalyticsFilters
  ): Promise<ServiceResult<SensorSummary[]>>
}

// ─── Notification Service ─────────────────────────────────────────────────────

export interface NotificationService {
  getNotifications(): Promise<ServiceResult<Notification[]>>
  markAsRead(notificationId: string): Promise<ServiceResult<void>>
  markAllAsRead(): Promise<ServiceResult<void>>
}
