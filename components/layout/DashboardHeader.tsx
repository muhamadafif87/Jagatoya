'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Bell, ChevronDown, Droplets } from 'lucide-react'
import { MobileSidebar } from './DashboardSidebar'

export function DashboardHeader({ pageTitle }: { pageTitle?: string }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 lg:left-60 z-20 bg-white border-b border-[#D9D9D9] h-16 flex items-center px-4 sm:px-6 gap-4">
        {/* Mobile hamburger */}
        <button
          id="dashboard-mobile-menu-toggle"
          onClick={() => setDrawerOpen(true)}
          aria-label="Buka menu navigasi"
          className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-[#F3F4F6] transition-colors"
        >
          <Menu size={22} />
        </button>

        {/* Mobile logo (shown when drawer is closed on small screens) */}
        <div className="flex items-center gap-2 lg:hidden">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#FFCC00] text-[#077B43]">
            <Droplets size={14} strokeWidth={2.5} />
          </span>
          <span className="font-bold text-base text-[#077B43]">JagaToya</span>
        </div>

        {/* Page title — desktop */}
        {pageTitle && (
          <h1 className="hidden lg:block text-base font-semibold text-[#111111]">
            {pageTitle}
          </h1>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Demo badge */}
        <span className="demo-badge hidden sm:inline-flex">Mode Simulasi</span>

        {/* Notifications */}
        <Link
          href="/dashboard/notifications"
          id="dashboard-notifications-link"
          aria-label="Buka notifikasi"
          className="relative p-2 rounded-lg hover:bg-[#F3F4F6] transition-colors text-[#4B5563]"
        >
          <Bell size={20} />
          {/* Unread dot */}
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"
            aria-hidden="true"
          />
        </Link>

        {/* User menu (simplified — no real auth) */}
        <button
          aria-label="Menu pengguna"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F3F4F6] transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-[#C2F8AB] flex items-center justify-center text-[#077B43] font-bold text-xs">
            B
          </div>
          <ChevronDown size={16} className="text-[#4B5563] hidden sm:block" />
        </button>
      </header>

      {/* Mobile drawer */}
      <MobileSidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
