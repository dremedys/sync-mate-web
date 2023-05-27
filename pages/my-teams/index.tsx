import { TeamModal } from '@/components/team-modal/team-modal';
import { MainLayout } from '@/layout/main-layout/main-layout';
import { Box, Button } from '@mui/material';
import { useState } from 'react';

export const MyTeams = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MainLayout>
      <Box className="container" mt="64px" mb="64px">
        <Button size="large" variant="contained" onClick={() => setIsOpen(true)}>
          + Create a team
        </Button>
        <TeamModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </Box>
    </MainLayout>
  );
};

export default MyTeams;
