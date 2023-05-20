import { PersonCard } from '@/components/person-card/person-card';
import { MainLayout } from '@/layout/main-layout/main-layout';
import { Box, Typography, styled } from '@mui/material';

export const People = () => {
  return (
    <MainLayout>
      <Box className="container" mt="24px" mb="100px">
        <Typography variant="headlineLarge">People</Typography>
        <Grid>
          <PersonCard />
          <PersonCard />
          <PersonCard />
        </Grid>
      </Box>
    </MainLayout>
  );
};

export const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1.5rem',
}));

export default People;
