import { WorkForm } from '@/components/profile/additional-information/work-experience/work-form/work-form';
import { WorkModal } from '@/components/profile/additional-information/work-experience/work-modal/work-modal';
import { toast } from '@/components/toast/toast';
import { authService, useAuth } from '@/providers/auth.provider';
import { addWorkExperience } from '@/services/profile';
import { CreateOrUpdateWorkDto } from '@/types/profile';
import { ControlPoint } from '@mui/icons-material';
import { Box, IconButton, Typography, styled } from '@mui/material';
import { useState } from 'react';

export const WorkExperience = () => {
  const { profile, setProfile } = useAuth();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleSubmit = async (body: CreateOrUpdateWorkDto, id?: number) => {
    try {
      const { data } = await addWorkExperience(body);
      setIsCreateOpen(false);
      const profile = await authService.getProfile();
      setProfile(profile);
      toast.success('Work experience is added!');
      authService.persistProfile(profile);
    } catch (e) {
      toast.error(JSON.stringify(e));
    }
  };

  return (
    <Box mb="40px">
      <Header>
        <Title>Work experience</Title>
        <IconButton onClick={() => setIsCreateOpen(true)}>
          <ControlPoint />
        </IconButton>
      </Header>
      {profile?.work_experience_history.length ? (
        profile?.work_experience_history.map(history => (
          <StyledWorkForm key={history.id} onSubmit={body => handleSubmit(body, history.id)} />
        ))
      ) : (
        <Typography color="gray" variant="bodyLarge" textAlign="center">
          Add your work experience here
        </Typography>
      )}
      <WorkModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onSubmit={handleSubmit} />
    </Box>
  );
};

const Header = styled('div')(() => ({
  color: '#6B6B6B',
  display: 'flex',
  alignItems: 'center',
  columnGap: '6px',
}));

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.paragraphLarge,
  color: '#161616',
}));

const StyledWorkForm = styled(WorkForm)(() => ({
  borderTop: '1px dashed gray',
  borderBottom: '1px dashed gray',
  padding: '20px 0',
}));
