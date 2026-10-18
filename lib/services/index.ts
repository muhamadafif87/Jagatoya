/**
 * Service factory — selects the correct adapter based on NEXT_PUBLIC_DATA_MODE.
 *
 * When NEXT_PUBLIC_DATA_MODE=demo (or unset): demo adapters are used.
 * When NEXT_PUBLIC_DATA_MODE=live: API adapters are selected.
 *   → If no API is configured, services return an explicit error.
 *     Never falls back silently to demo data.
 */

import { demoDeviceService } from './demo/device'
import { demoTelemetryService, demoAnalyticsService } from './demo/telemetry'
import { demoNotificationService } from './demo/notifications'
import type {
  AnalyticsService,
  DeviceService,
  NotificationService,
  TelemetryService,
} from './contracts'

export const DATA_MODE =
  (process.env.NEXT_PUBLIC_DATA_MODE as 'demo' | 'live' | undefined) ?? 'demo'

export const IS_DEMO_MODE = DATA_MODE === 'demo'

// ─── API stubs (placeholder — not implemented) ────────────────────────────────

const notConfigured = (name: string) =>
  async (): Promise<never> => {
    throw new Error(
      `[JagaToya] Live adapter "${name}" not configured. ` +
        'Set NEXT_PUBLIC_DATA_MODE=demo to use the demo adapter, ' +
        'or configure a real API adapter.'
    )
  }

const apiDeviceService: DeviceService = {
  listDevices: notConfigured('DeviceService.listDevices'),
  getDevice: notConfigured('DeviceService.getDevice'),
  updateDeviceMetadata: notConfigured('DeviceService.updateDeviceMetadata'),
}

const apiTelemetryService: TelemetryService = {
  getLatestReadings: notConfigured('TelemetryService.getLatestReadings'),
  getReadingHistory: notConfigured('TelemetryService.getReadingHistory'),
}

const apiAnalyticsService: AnalyticsService = {
  getSensorSummaries: notConfigured('AnalyticsService.getSensorSummaries'),
}

const apiNotificationService: NotificationService = {
  getNotifications: notConfigured('NotificationService.getNotifications'),
  markAsRead: notConfigured('NotificationService.markAsRead'),
  markAllAsRead: notConfigured('NotificationService.markAllAsRead'),
}

// ─── Exported service instances ───────────────────────────────────────────────

export const deviceService: DeviceService = IS_DEMO_MODE
  ? demoDeviceService
  : apiDeviceService

export const telemetryService: TelemetryService = IS_DEMO_MODE
  ? demoTelemetryService
  : apiTelemetryService

export const analyticsService: AnalyticsService = IS_DEMO_MODE
  ? demoAnalyticsService
  : apiAnalyticsService

export const notificationService: NotificationService = IS_DEMO_MODE
  ? demoNotificationService
  : apiNotificationService
