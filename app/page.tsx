import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { HeroSection } from '@/components/landing/HeroSection'
import { ProblemSolutionSection } from '@/components/landing/ProblemSolutionSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { SustainabilitySection } from '@/components/landing/SustainabilitySection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JagaToya – Platform Irigasi Cerdas untuk Petani',
  description:
    'Pantau kondisi sawah melalui teknologi IoT dan kelola irigasi berdasarkan data untuk penggunaan air dan biaya operasional yang lebih efisien.',
}

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main id="main-content">
        <HeroSection />
        <ProblemSolutionSection />
        <FeaturesSection />
        <HowItWorksSection />
        <SustainabilitySection />
      </main>
      <PublicFooter />
    </>
  )
}
