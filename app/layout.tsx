import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'JagaToya – Platform Irigasi Cerdas untuk Petani',
    template: '%s | JagaToya',
  },
  description:
    'Pantau kondisi sawah melalui teknologi IoT dan kelola irigasi berdasarkan data untuk penggunaan air dan biaya operasional yang lebih efisien.',
  keywords: ['irigasi cerdas', 'IoT pertanian', 'sensor sawah', 'pertanian digital'],
  authors: [{ name: 'Tim JagaToya' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'JagaToya',
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="id" className={inter.variable}>
      <body
        className="min-h-screen flex flex-col antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
