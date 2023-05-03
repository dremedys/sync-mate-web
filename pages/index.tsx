import { HeroSection } from '@/components/home/hero-section/hero-section';
import { Reasons } from '@/components/home/reasons/reasons';
import { SecondBanner } from '@/components/home/second-banner/second-banner';
import { MainLayout } from '@/layout/main-layout/main-layout';

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <Reasons />
      <SecondBanner />
    </MainLayout>
  );
}
