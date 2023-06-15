import { MyTeamCard } from '@/components/my-team-card/my-team-card';
import { TabPanel } from '@/components/tab-panel';
import { TeamModal } from '@/components/team-modal/team-modal';
import { MainLayout } from '@/layout/main-layout/main-layout';
import { NextPageWithLayout } from '@/pages/_app';
import { getMyTeams } from '@/services/team';
import { Box, Button, CircularProgress, Tab, Tabs, Typography, styled } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useQuery } from 'react-query';

export const MyTeams: NextPageWithLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const {
    data: teams,
    refetch,
    isLoading,
  } = useQuery(['my-teams-api'], async () => {
    try {
      const { data } = await getMyTeams({ page: 1, limit: 100 });
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <Box className="container" mt="64px" mb="64px">
      <Typography variant="headlineLarge">My teams</Typography>
      <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: '28px' }}>
        <Tab label="Active teams" />
        <Tab label="Archived teams" />
      </Tabs>
      <Button
        sx={{ marginLeft: 'auto', marginBottom: '24px' }}
        size="large"
        variant="contained"
        onClick={() => setIsOpen(true)}>
        + Create a team
      </Button>
      <TabPanel value={tabIndex} index={0}>
        {isLoading ? (
          <Box sx={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : teams?.length ? (
          <Grid>
            {teams?.map(team => (
              <MyTeamCard key={team.id} team={team} />
            ))}
          </Grid>
        ) : (
          <Box sx={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography>You do not have teams yet</Typography>
          </Box>
        )}
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        WIP
      </TabPanel>

      <TeamModal refetch={refetch} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Box>
  );
};

MyTeams.getLayout = page => <MainLayout>{page}</MainLayout>;

const Grid = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridGap: '24px',
  margin: '20px 0',
}));

export default MyTeams;
