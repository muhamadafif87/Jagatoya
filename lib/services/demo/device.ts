/**
 * Demo implementation of DeviceService.
 * Uses deterministic fixture data. Never calls external APIs.
 * All results include mode: 'demo' to signal this is simulated data.
 */

import {
  DEMO_DEVICES,
} from '@/lib/demo/fixtures'
import type {
  Device,
  DeviceListFilters,
  PageResult,
  ServiceResult,
} from '@/types'
import type { DeviceService } from '../contracts'

function matchesFilter(device: Device, filters: DeviceListFilters): boolean {
  if (filters.status && filters.status !== 'all') {
    if (device.connectionStatus !== filters.status) return false
  }
  if (filters.fieldId) {
    if (device.fieldId !== filters.fieldId) return false
  }
  if (filters.search) {
    const q = filters.search.toLowerCase()
    const inName = device.displayName.toLowerCase().includes(q)
    const inId = device.deviceIdentifier.toLowerCase().includes(q)
    const inField = device.field?.name.toLowerCase().includes(q) ?? false
    if (!inName && !inId && !inField) return false
  }
  return true
}

export const demoDeviceService: DeviceService = {
  async listDevices(
    filters: DeviceListFilters
  ): Promise<ServiceResult<PageResult<Device>>> {
    // Simulate async boundary — do NOT generate random data here
    await new Promise((r) => setTimeout(r, 0))

    const filtered = DEMO_DEVICES.filter((d) => matchesFilter(d, filters))

    return {
      ok: true,
      mode: 'demo',
      data: {
        data: filtered,
        total: filtered.length,
        page: 1,
        pageSize: filtered.length,
        hasMore: false,
      },
    }
  },

  async getDevice(deviceId: string): Promise<ServiceResult<Device>> {
    await new Promise((r) => setTimeout(r, 0))

    const device = DEMO_DEVICES.find((d) => d.id === deviceId)
    if (!device) {
      return { ok: false, error: 'Perangkat tidak ditemukan.', code: 'NOT_FOUND' }
    }
    return { ok: true, mode: 'demo', data: device }
  },

  async updateDeviceMetadata(
    deviceId: string,
    input: { displayName?: string; fieldId?: string | null }
  ): Promise<ServiceResult<Device>> {
    await new Promise((r) => setTimeout(r, 0))

    const device = DEMO_DEVICES.find((d) => d.id === deviceId)
    if (!device) {
      return { ok: false, error: 'Perangkat tidak ditemukan.', code: 'NOT_FOUND' }
    }
    // In demo mode, changes are not persisted — return a merged copy
    const updated: Device = {
      ...device,
      displayName: input.displayName ?? device.displayName,
      fieldId: input.fieldId !== undefined ? input.fieldId : device.fieldId,
    }
    return { ok: true, mode: 'demo', data: updated }
  },
}
