import { TeamCard } from '@/components/team-card/team-card';
import { toast } from '@/components/toast/toast';
import { MainLayout } from '@/layout/main-layout/main-layout';
import { NextPageWithLayout } from '@/pages/_app';
import { useAuth } from '@/providers/auth.provider';
import { dislikeTeam, getTeams, likeTeam } from '@/services/team';
import { InteractionEnum } from '@/types/team';
import { Tag } from '@/ui/tag/tag';
import { Box, Typography, styled } from '@mui/material';
import { useQuery } from 'react-query';

export const TeamsPage: NextPageWithLayout = () => {
  const { profile } = useAuth();

  const { data: teams, refetch } = useQuery(['teams'], async () => {
    try {
      const { data } = await getTeams({ page: 1, limit: 100 });
      return data.results;
    } catch (e) {
      console.log(e);
    }
  });

  const handeLike = async (id: number) => {
    try {
      const { data } = await likeTeam(id);
      refetch();
      if (data.interaction === InteractionEnum.MEMBER) {
        toast.success('The team liked your account too!', { duration: 3000, title: 'Match!', variant: 'gradient' });
      } else {
        toast.success('Your request is sent!', { duration: 1000 });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDislike = async (id: number) => {
    try {
      await dislikeTeam(id);
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box className="container" mt="24px" mb="100px">
      {/*<Button onClick={() => toast.success('lol')}>wef</Button>*/}
      <Typography textAlign="center" variant="headlineLarge" mb="44px">
        Finding a team is very easy if you search for it in SyncMate{' '}
      </Typography>
      <TagsWrapper>
        {profile?.tags.map(tag => (
          <Tag key={tag.id}>{tag.name_en}</Tag>
        ))}
      </TagsWrapper>
      <Grid>
        {teams?.map(team => (
          <TeamCard key={team.id} team={team} onLike={handeLike} onDislike={handleDislike} />
        ))}
      </Grid>
    </Box>
  );
};

TeamsPage.getLayout = page => <MainLayout>{page}</MainLayout>;

export default TeamsPage;

const TagsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: '10px',
  marginBottom: '40px',
  overflow: 'hidden',
  flexWrap: 'nowrap',
}));

export const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1.5rem',
}));
