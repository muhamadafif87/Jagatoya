/**
 * Demo implementation of NotificationService.
 */

import { DEMO_NOTIFICATIONS } from '@/lib/demo/fixtures'
import type { Notification, ServiceResult } from '@/types'
import type { NotificationService } from '../contracts'

// In-memory mutable copy for mark-as-read (resets on page reload — demo only)
let _notifications: Notification[] = DEMO_NOTIFICATIONS.map((n) => ({ ...n }))

export const demoNotificationService: NotificationService = {
  async getNotifications(): Promise<ServiceResult<Notification[]>> {
    await new Promise((r) => setTimeout(r, 0))
    return {
      ok: true,
      mode: 'demo',
      data: [..._notifications].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    }
  },

  async markAsRead(id: string): Promise<ServiceResult<void>> {
    await new Promise((r) => setTimeout(r, 0))
    _notifications = _notifications.map((n) =>
      n.id === id ? { ...n, readAt: new Date().toISOString() } : n
    )
    return { ok: true, mode: 'demo', data: undefined }
  },

  async markAllAsRead(): Promise<ServiceResult<void>> {
    await new Promise((r) => setTimeout(r, 0))
    const now = new Date().toISOString()
    _notifications = _notifications.map((n) => ({
      ...n,
      readAt: n.readAt ?? now,
    }))
    return { ok: true, mode: 'demo', data: undefined }
  },
}
