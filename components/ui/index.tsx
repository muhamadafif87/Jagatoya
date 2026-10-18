import { cn } from '@/lib/utils'

// ─── EmptyState ────────────────────────────────────────────────────────────────

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-16 px-6',
        className
      )}
      role="status"
      aria-live="polite"
    >
      {icon && (
        <div className="mb-4 text-[#D9D9D9]">{icon}</div>
      )}
      <h3 className="text-base font-semibold text-[#111111] mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-[#4B5563] max-w-xs leading-relaxed mb-6">
          {description}
        </p>
      )}
      {action}
    </div>
  )
}

// ─── ErrorState ────────────────────────────────────────────────────────────────

export function ErrorState({
  title = 'Terjadi kesalahan',
  message,
  onRetry,
  className,
}: {
  title?: string
  message: string
  onRetry?: () => void
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-12 px-6',
        className
      )}
      role="alert"
    >
      <div className="mb-3 w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-500 text-2xl">
        ✕
      </div>
      <h3 className="text-base font-semibold text-[#111111] mb-1">{title}</h3>
      <p className="text-sm text-red-600 max-w-sm mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm font-semibold text-white bg-[#077B43] rounded-lg hover:bg-[#055c31] transition-colors"
        >
          Coba Lagi
        </button>
      )}
    </div>
  )
}

// ─── LoadingSkeleton ───────────────────────────────────────────────────────────

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded-lg bg-[#D9D9D9]/60', className)}
      aria-hidden="true"
    />
  )
}

export function DashboardSkeletonGrid() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Memuat data...">
      {/* Stat cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#D9D9D9] p-5">
            <LoadingSkeleton className="h-3 w-24 mb-3" />
            <LoadingSkeleton className="h-8 w-16 mb-2" />
            <LoadingSkeleton className="h-3 w-32" />
          </div>
        ))}
      </div>
      {/* Chart skeleton */}
      <div className="bg-white rounded-2xl border border-[#D9D9D9] p-5">
        <LoadingSkeleton className="h-4 w-48 mb-6" />
        <LoadingSkeleton className="h-56 w-full" />
      </div>
    </div>
  )
}

// ─── ConfirmationDialog ────────────────────────────────────────────────────────

export function ConfirmationDialog({
  open,
  title,
  description,
  confirmLabel = 'Konfirmasi',
  cancelLabel = 'Batal',
  destructive = false,
  onConfirm,
  onCancel,
}: {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full animate-fade-in">
        <h2
          id="confirm-dialog-title"
          className="text-lg font-semibold text-[#111111] mb-2"
        >
          {title}
        </h2>
        <p className="text-sm text-[#4B5563] mb-6">{description}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-[#4B5563] border border-[#D9D9D9] rounded-lg hover:bg-[#F3F4F6] transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors ${
              destructive
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-[#077B43] hover:bg-[#055c31]'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── PageHeader ────────────────────────────────────────────────────────────────

export function PageHeader({
  title,
  description,
  action,
  isDemoMode,
}: {
  title: string
  description?: string
  action?: React.ReactNode
  isDemoMode?: boolean
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-[#111111]">{title}</h1>
          {isDemoMode && <span className="demo-badge">Mode Simulasi</span>}
        </div>
        {description && (
          <p className="text-sm text-[#4B5563] mt-1">{description}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}
