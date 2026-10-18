import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  unit?: string
  subtitle?: string
  icon?: React.ReactNode
  badge?: React.ReactNode
  /** Color accent for the left border */
  accent?: 'green' | 'yellow' | 'blue' | 'orange' | 'gray'
  isDemoData?: boolean
  className?: string
}

const accentMap: Record<string, string> = {
  green:  'border-l-[#7ED957]',
  yellow: 'border-l-[#FFCC00]',
  blue:   'border-l-[#A1DAEF]',
  orange: 'border-l-orange-400',
  gray:   'border-l-[#D9D9D9]',
}

export function StatCard({
  title,
  value,
  unit,
  subtitle,
  icon,
  badge,
  accent = 'green',
  isDemoData,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-[#D9D9D9] border-l-4 p-5 shadow-sm hover:shadow-md transition-shadow',
        accentMap[accent],
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
          {title}
        </p>
        <div className="flex items-center gap-2">
          {isDemoData && <span className="demo-badge">Simulasi</span>}
          {badge}
          {icon && (
            <div className="flex-shrink-0 text-[#D9D9D9]">{icon}</div>
          )}
        </div>
      </div>

      <div className="flex items-end gap-1">
        <span className="text-3xl font-bold text-[#111111] leading-none">
          {value}
        </span>
        {unit && (
          <span className="text-sm text-[#4B5563] mb-0.5">{unit}</span>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-xs text-[#4B5563]">{subtitle}</p>
      )}
    </div>
  )
}
