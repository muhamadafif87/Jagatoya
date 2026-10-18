'use client'

import { useMemo } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts'
import type { SensorReading, SensorType } from '@/types'
import { SENSOR_LABELS, SENSOR_UNITS } from '@/types'
import { toChartData } from '@/lib/analytics/utils'
import { EmptyState, ErrorState, LoadingSkeleton } from '@/components/ui'

const SENSOR_COLORS: Record<SensorType, string> = {
  soil_moisture: '#077B43',
  water_level:   '#0891b2',
  temperature:   '#ea580c',
  humidity:      '#7c3aed',
  ph:            '#d97706',
  light:         '#eab308',
  rainfall:      '#2563eb',
  flow_rate:     '#0e7490',
}

interface SensorHistoryChartProps {
  readings: SensorReading[]
  sensorType: SensorType
  loading?: boolean
  error?: string | null
  isDemoData?: boolean
}

interface TooltipPayload {
  value: number | null
  payload: { timestamp: string; value: number | null }
}

function CustomTooltip({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
  unit: string
}) {
  if (!active || !payload?.length) return null
  const val = payload[0]?.value
  return (
    <div className="bg-white border border-[#D9D9D9] rounded-xl px-3 py-2 shadow-lg text-xs">
      <p className="text-[#4B5563] mb-1">{label}</p>
      <p className="font-bold text-[#111111]">
        {val !== null && val !== undefined ? `${val} ${unit}` : 'Data tidak tersedia'}
      </p>
    </div>
  )
}

export function SensorHistoryChart({
  readings,
  sensorType,
  loading,
  error,
  isDemoData,
}: SensorHistoryChartProps) {
  const chartData = useMemo(
    () => toChartData(readings, sensorType),
    [readings, sensorType]
  )

  const unit = SENSOR_UNITS[sensorType]
  const label = SENSOR_LABELS[sensorType]
  const color = SENSOR_COLORS[sensorType]

  if (loading) {
    return <LoadingSkeleton className="h-64 w-full rounded-xl" />
  }

  if (error) {
    return (
      <ErrorState
        title="Gagal memuat grafik"
        message={error}
        className="h-64"
      />
    )
  }

  if (chartData.length === 0) {
    return (
      <EmptyState
        title="Tidak ada data"
        description={`Belum ada pembacaan ${label} pada rentang waktu yang dipilih.`}
        className="h-64"
      />
    )
  }

  // Determine Y domain with some padding
  const values = chartData
    .map((d) => d.value)
    .filter((v): v is number => v !== null)
  const min = values.length > 0 ? Math.floor(Math.min(...values) * 0.9) : 0
  const max = values.length > 0 ? Math.ceil(Math.max(...values) * 1.1) : 100

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-sm font-semibold text-[#111111]">{label}</span>
          <span className="text-xs text-[#4B5563]">({unit})</span>
        </div>
        {isDemoData && <span className="demo-badge">Data Simulasi</span>}
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={chartData} margin={{ top: 4, right: 16, bottom: 4, left: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="timeLabel"
            tick={{ fontSize: 10, fill: '#6B7280' }}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[min, max]}
            tick={{ fontSize: 10, fill: '#6B7280' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => `${v}${unit}`}
          />
          <Tooltip
            content={<CustomTooltip unit={unit} />}
            cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '4 4' }}
          />
          {/* Null gaps are handled by connectNulls=false (default) */}
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
