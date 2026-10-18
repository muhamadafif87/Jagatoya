'use client'

import { useState, useEffect } from 'react'
import {
  Bell,
  CheckCheck,
  AlertTriangle,
  Info,
  Filter,
  Clock,
} from 'lucide-react'
import { notificationService } from '@/lib/services'
import type { Notification, NotificationSeverity } from '@/types'
import { LoadingSkeleton, EmptyState } from '@/components/ui'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [severityFilter, setSeverityFilter] = useState<'all' | NotificationSeverity>('all')
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  useEffect(() => {
    async function loadNotifications() {
      setLoading(true)
      try {
        const res = await notificationService.getNotifications()
        if (res.ok) {
          const filteredNotifications = res.data.filter((notification) => {
            const matchesSeverity =
              severityFilter === 'all' || notification.severity === severityFilter
            const matchesReadStatus = !showUnreadOnly || !notification.readAt
            return matchesSeverity && matchesReadStatus
          })
          setNotifications(filteredNotifications)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadNotifications()
  }, [severityFilter, showUnreadOnly])

  async function handleMarkAsRead(id: string) {
    const res = await notificationService.markAsRead(id)
    if (res.ok) {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, readAt: new Date().toISOString() } : n
        )
      )
    }
  }

  async function handleMarkAllAsRead() {
    const res = await notificationService.markAllAsRead()
    if (res.ok) {
      const readAt = new Date().toISOString()
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, readAt: n.readAt ?? readAt }))
      )
    }
  }

  const unreadCount = notifications.filter((n) => !n.readAt).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="demo-badge">Mode Simulasi</span>
            <span className="text-xs text-[#4B5563]">Pusat Informasi</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111111]">Notifikasi & Peringatan</h1>
          <p className="text-sm text-[#4B5563] mt-1">
            Riwayat peringatan otomatis batas air, kelembapan tanah, dan status perangkat IoT Anda.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#D9D9D9] hover:bg-[#F3F4F6] text-[#077B43] rounded-xl text-xs font-semibold transition-colors shadow-sm self-start sm:self-auto"
          >
            <CheckCheck size={16} />
            Tandai Semua Sudah Dibaca
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-[#D9D9D9] p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <Filter size={15} className="text-[#4B5563] mr-1 flex-shrink-0" />
          <span className="text-xs text-[#4B5563] font-medium flex-shrink-0">Tingkat:</span>
          <button
            onClick={() => setSeverityFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              severityFilter === 'all'
                ? 'bg-[#077B43] text-white'
                : 'bg-[#F3F4F6] text-[#4B5563] hover:text-[#111111]'
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setSeverityFilter('critical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              severityFilter === 'critical'
                ? 'bg-red-600 text-white'
                : 'bg-[#F3F4F6] text-[#4B5563] hover:text-[#111111]'
            }`}
          >
            Kritis
          </button>
          <button
            onClick={() => setSeverityFilter('warning')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              severityFilter === 'warning'
                ? 'bg-amber-500 text-white'
                : 'bg-[#F3F4F6] text-[#4B5563] hover:text-[#111111]'
            }`}
          >
            Peringatan
          </button>
          <button
            onClick={() => setSeverityFilter('info')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              severityFilter === 'info'
                ? 'bg-[#0891b2] text-white'
                : 'bg-[#F3F4F6] text-[#4B5563] hover:text-[#111111]'
            }`}
          >
            Informasi
          </button>
        </div>

        <label className="flex items-center gap-2 cursor-pointer text-xs text-[#4B5563] self-start md:self-auto">
          <input
            type="checkbox"
            checked={showUnreadOnly}
            onChange={(e) => setShowUnreadOnly(e.target.checked)}
            className="rounded border-[#D9D9D9] text-[#077B43] focus:ring-[#077B43]"
          />
          <span>Tampilkan hanya yang belum dibaca</span>
        </label>
      </div>

      {/* Notifications List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#D9D9D9] p-4">
              <LoadingSkeleton className="h-4 w-40 mb-2" />
              <LoadingSkeleton className="h-3 w-72" />
            </div>
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <EmptyState
          icon={<Bell size={40} />}
          title="Tidak ada notifikasi"
          description="Semua kondisi lahan dan perangkat dalam status normal dan belum ada peringatan baru."
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => {
            const isCrit = notif.severity === 'critical'
            const isWarn = notif.severity === 'warning'

            return (
              <div
                key={notif.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-3 sm:gap-4 ${
                  !notif.readAt
                    ? 'bg-white border-[#077B43]/40 shadow-sm ring-1 ring-[#077B43]/10'
                    : 'bg-white/70 border-[#D9D9D9]'
                }`}
              >
                {/* Severity Icon */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isCrit
                      ? 'bg-red-100 text-red-600'
                      : isWarn
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-emerald-100 text-[#077B43]'
                  }`}
                >
                  {isCrit ? (
                    <AlertTriangle size={20} />
                  ) : isWarn ? (
                    <AlertTriangle size={20} />
                  ) : (
                    <Info size={20} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-[#111111] text-sm sm:text-base">
                      {notif.title}
                    </h3>
                    {!notif.readAt && (
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold">
                        Baru
                      </span>
                    )}
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-medium capitalize ${
                        isCrit
                          ? 'bg-red-50 text-red-700'
                          : isWarn
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {notif.severity}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-2">
                    {notif.message}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-[#9CA3AF] flex-wrap">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(notif.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      WIB
                    </span>
                    {notif.deviceId && (
                      <span className="font-mono text-[#4B5563]">
                        Node: {notif.deviceId}
                      </span>
                    )}
                  </div>
                </div>

                {/* Mark as read button */}
                {!notif.readAt && (
                  <button
                    onClick={() => handleMarkAsRead(notif.id)}
                    title="Tandai sudah dibaca"
                    className="p-2 text-[#9CA3AF] hover:text-[#077B43] hover:bg-[#F3F4F6] rounded-lg transition-colors flex-shrink-0"
                  >
                    <CheckCheck size={18} />
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
