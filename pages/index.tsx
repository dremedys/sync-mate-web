import { HeroSection } from '@/components/home/hero-section/hero-section';
import { Reasons } from '@/components/home/reasons/reasons';
import { SecondBanner } from '@/components/home/second-banner/second-banner';
import { MainLayout } from '@/layout/main-layout/main-layout';
import { NextPageWithLayout } from '@/pages/_app';
import { Box } from '@mui/material';

export const Home: NextPageWithLayout = () => {
  return (
    <Box>
      <HeroSection />
      <Reasons />
      <SecondBanner />
    </Box>
  );
};

Home.getLayout = page => <MainLayout>{page}</MainLayout>;

export default Home;
