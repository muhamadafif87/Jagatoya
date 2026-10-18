import type { DeviceStatus } from '@/types'
import { Wifi, WifiOff, Clock, HelpCircle } from 'lucide-react'

const config: Record<
  DeviceStatus,
  { label: string; bg: string; text: string; dot: string; icon: React.ReactNode }
> = {
  online: {
    label: 'Online',
    bg: 'bg-[#C2F8AB]',
    text: 'text-[#077B43]',
    dot: 'bg-[#7ED957]',
    icon: <Wifi size={12} />,
  },
  offline: {
    label: 'Offline',
    bg: 'bg-red-100',
    text: 'text-red-700',
    dot: 'bg-red-500',
    icon: <WifiOff size={12} />,
  },
  stale: {
    label: 'Data Usang',
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    dot: 'bg-orange-400',
    icon: <Clock size={12} />,
  },
  unknown: {
    label: 'Tidak Diketahui',
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    dot: 'bg-gray-400',
    icon: <HelpCircle size={12} />,
  },
}

export function DeviceStatusBadge({
  status,
  size = 'md',
}: {
  status: DeviceStatus
  size?: 'sm' | 'md'
}) {
  const c = config[status]
  const padding = size === 'sm' ? 'px-2 py-0.5' : 'px-2.5 py-1'
  const textSize = size === 'sm' ? 'text-[10px]' : 'text-xs'

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${padding} rounded-full font-semibold ${c.bg} ${c.text} ${textSize}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${c.dot} ${status === 'online' ? 'animate-pulse-slow' : ''}`}
        aria-hidden="true"
      />
      {c.icon}
      {c.label}
    </span>
  )
}
