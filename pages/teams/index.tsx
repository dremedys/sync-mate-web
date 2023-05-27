import { TeamCard } from '@/components/team-card/team-card';
import { MainLayout } from '@/layout/main-layout/main-layout';
import { useAuth } from '@/providers/auth.provider';
import { getTeams } from '@/services/team';
import { Tag } from '@/ui/tag/tag';
import { Box, styled } from '@mui/material';
import { useQuery } from 'react-query';

export const TeamsPage = () => {
  const { profile } = useAuth();
  const { data: teams } = useQuery(['teams'], async () => {
    try {
      const { data } = await getTeams({ page: 1, limit: 100 });
      return data.results;
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <MainLayout>
      <Box className="container" mt="24px" mb="100px">
        <TagsWrapper>
          {profile?.tags.map(tag => (
            <Tag key={tag.id}>{tag.name_en}</Tag>
          ))}
        </TagsWrapper>
        <Grid>
          {teams?.map(team => (
            <TeamCard key={team.id} team={team} />
          ))}
        </Grid>
      </Box>
    </MainLayout>
  );
};

export const TAGS = [
  'Algorithm',
  'Data structure',
  'Quantum mechanics',
  'Artificial intelligence',
  'Genetics',
  'Machine learning',
  'Neuroscience',
  'Computer vision',
  'Astronomy',
  'Cybersecurity',
  'Chemistry',
  'Big data',
  'Nanotechnology',
  'Robotics',
  'Particle physics',
];

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
