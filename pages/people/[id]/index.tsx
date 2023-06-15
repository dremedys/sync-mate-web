import { MainLayout } from '@/layout/main-layout/main-layout';
import { NextPageWithLayout } from '@/pages/_app';
import { getPersonDetails } from '@/services/people';
import { ArrowBackIos } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export const PersonPage: NextPageWithLayout = () => {
  const router = useRouter();
  const id = Number(router.query.id as string);

  const { data: person } = useQuery(['person', id], async () => {
    const { data } = await getPersonDetails(id);
    return data;
  });

  return (
    <Box pt="40px" pb="40px">
      <Button endIcon={<ArrowBackIos />}>Go back to all members</Button>
    </Box>
  );
};

PersonPage.getLayout = page => <MainLayout>{page}</MainLayout>;

export default PersonPage;
