'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Cpu,
  BarChart3,
  Bell,
  Settings,
  Droplets,
  X,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { DEMO_USER } from '@/lib/demo/fixtures'

const navItems = [
  {
    href: '/dashboard',
    label: 'Ringkasan',
    icon: <LayoutDashboard size={18} />,
    exact: true,
  },
  {
    href: '/dashboard/devices',
    label: 'Perangkat IoT',
    icon: <Cpu size={18} />,
  },
  {
    href: '/dashboard/analytics',
    label: 'Analitik',
    icon: <BarChart3 size={18} />,
  },
  {
    href: '/dashboard/notifications',
    label: 'Notifikasi',
    icon: <Bell size={18} />,
  },
  {
    href: '/dashboard/settings',
    label: 'Pengaturan',
    icon: <Settings size={18} />,
  },
]

function NavLinkContent({
  href,
  label,
  icon,
  onClick,
  isActive,
}: {
  href: string
  label: string
  icon: React.ReactNode
  onClick?: () => void
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
        isActive
          ? 'bg-[#077B43] text-white shadow-sm'
          : 'text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#111111]'
      )}
    >
      {icon}
      {label}
    </Link>
  )
}

function ActiveNavLink({
  href,
  exact,
  ...props
}: {
  href: string
  label: string
  icon: React.ReactNode
  exact?: boolean
  onClick?: () => void
}) {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  return <NavLinkContent href={href} {...props} isActive={isActive} />
}

function NavLink(props: {
  href: string
  label: string
  icon: React.ReactNode
  exact?: boolean
  onClick?: () => void
}) {
  return (
    <Suspense
      fallback={<NavLinkContent {...props} isActive={false} />}
    >
      <ActiveNavLink {...props} />
    </Suspense>
  )
}

// ─── Desktop sidebar ──────────────────────────────────────────────────────────

export function DashboardSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-white border-r border-[#D9D9D9] fixed left-0 top-0 bottom-0 z-30">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-[#D9D9D9]">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FFCC00] text-[#077B43]">
          <Droplets size={18} strokeWidth={2.5} />
        </span>
        <span className="font-bold text-lg text-[#077B43]">JagaToya</span>
        <span className="demo-badge ml-auto">Demo</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Navigasi dasbor">
        {navItems.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>

      {/* User info + logout */}
      <div className="px-3 py-4 border-t border-[#D9D9D9]">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#C2F8AB] flex items-center justify-center text-[#077B43] font-bold text-sm flex-shrink-0">
            {DEMO_USER.fullName.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-[#111111] truncate">
              {DEMO_USER.fullName}
            </p>
            <p className="text-[10px] text-[#4B5563] truncate">{DEMO_USER.email}</p>
          </div>
        </div>
        <Link
          href="/login"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-[#4B5563] hover:bg-[#F3F4F6] transition-colors"
        >
          <LogOut size={16} />
          Keluar
        </Link>
      </div>
    </aside>
  )
}

// ─── Mobile drawer ─────────────────────────────────────────────────────────────

export function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-white flex flex-col animate-slide-in-left lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Navigasi dasbor"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#D9D9D9]">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FFCC00] text-[#077B43]">
              <Droplets size={18} strokeWidth={2.5} />
            </span>
            <span className="font-bold text-lg text-[#077B43]">JagaToya</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup menu"
            className="p-2 rounded-lg hover:bg-[#F3F4F6] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} onClick={onClose} />
          ))}
        </nav>

        {/* User */}
        <div className="px-3 py-4 border-t border-[#D9D9D9]">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#C2F8AB] flex items-center justify-center text-[#077B43] font-bold text-sm">
              {DEMO_USER.fullName.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-semibold text-[#111111]">{DEMO_USER.fullName}</p>
              <p className="text-[10px] text-[#4B5563]">{DEMO_USER.email}</p>
            </div>
          </div>
          <Link
            href="/login"
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-[#4B5563] hover:bg-[#F3F4F6] transition-colors"
          >
            <LogOut size={16} />
            Keluar
          </Link>
        </div>
      </aside>
    </>
  )
}
