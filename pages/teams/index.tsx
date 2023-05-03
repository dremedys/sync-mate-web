import { TeamCard } from '@/components/team-card/team-card';
import { MainLayout } from '@/layout/main-layout/main-layout';
import { Tag } from '@/ui/tag/tag';
import { Box, styled } from '@mui/material';

export const TeamsPage = () => {
  return (
    <MainLayout>
      <Box className="container" mt="24px" mb="100px">
        <TagsWrapper>
          {TAGS.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsWrapper>
        <Grid>
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
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
