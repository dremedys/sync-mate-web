import { PersonCard } from '@/components/person-card/person-card';
import { toast } from '@/components/toast/toast';
import { MainLayout } from '@/layout/main-layout/main-layout';
import { NextPageWithLayout } from '@/pages/_app';
import { dislikePerson, getPeople, likePerson } from '@/services/people';
import { getMyTeams } from '@/services/team';
import { SelectField } from '@/ui/SelectField/SelectField';
import { Box, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export const People: NextPageWithLayout = () => {
  const [teamId, setTeamId] = useState<number>();

  const { data: teamOptions } = useQuery(['teams'], async () => {
    try {
      const { data } = await getMyTeams({ page: 1, limit: 100, is_admin: true });
      return data.map(team => ({ label: team.name, value: team.id.toString() }));
    } catch (e) {
      console.log(e);
    }
  });

  const { data: people, refetch } = useQuery(
    ['people', teamId],
    async () => {
      if (!teamId) return;
      try {
        const { data } = await getPeople({ team_id: teamId, limit: 100, page: 1 });
        return data.results;
      } catch (e) {
        console.log(e);
      }
    },
    { enabled: !!teamId },
  );

  const handeLike = async (id: number) => {
    if (!teamId) return;
    try {
      await likePerson(id, teamId);
      refetch();
      toast.success('Your request is sent! Wait for apply!', { duration: 1000 });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDislike = async (id: number) => {
    if (!teamId) return;

    try {
      await dislikePerson(id, teamId);
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (teamOptions?.length) {
      setTeamId(+teamOptions[0].value);
    }
  }, [teamOptions]);

  return (
    <Box className="container" mt="24px" mb="100px">
      <Typography textAlign="center" variant="headlineLarge" mb="44px">
        Finding a team member is very easy if you create a team in SyncMate
      </Typography>
      <Filter>
        <Typography variant="titleSmall">Recommendations picked up by your team</Typography>
        <SelectField
          options={teamOptions || []}
          onChange={val => {
            if (!val) return;
            setTeamId(+val);
          }}
        />
      </Filter>
      <Grid>
        {people?.map(person => (
          <PersonCard onDislike={handleDislike} onLike={handeLike} person={person} key={person.id} />
        ))}
      </Grid>
    </Box>
  );
};

People.getLayout = page => <MainLayout>{page}</MainLayout>;

export const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1.5rem',
}));

const Filter = styled('div')(() => ({
  display: 'flex',
  columnGap: '36px',
  marginBottom: '28px',
  alignItems: 'center',
}));

export default People;
