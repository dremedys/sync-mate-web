import { EducationForm } from '@/components/profile/additional-information/education-history/components/education-form/education-form';
import { EducationModal } from '@/components/profile/additional-information/education-history/components/education-modal/education-modal';
import { toast } from '@/components/toast/toast';
import { authService, useAuth } from '@/providers/auth.provider';
import { addEducation, deleteEducation } from '@/services/profile';
import { CreateOrUpdateEducationResponseDto, GetEducationResponseDto } from '@/types/profile';
import { ControlPoint } from '@mui/icons-material';
import { Box, IconButton, Typography, styled } from '@mui/material';
import { useState } from 'react';

export const EducationHistory = () => {
  const { profile, setProfile } = useAuth();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editEducation, setEditEducation] = useState<GetEducationResponseDto>();
  const [loading, setLoading] = useState(false);
  const handleAddEducation = () => {};

  const handleDeleteEducation = async (id: number) => {
    try {
      await deleteEducation(id);
      authService.getProfile();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (body: CreateOrUpdateEducationResponseDto, id?: number) => {
    setLoading(true);
    try {
      const { data } = await addEducation(body);
      setIsCreateOpen(false);
      const profile = await authService.getProfile();
      setProfile(profile);
      authService.persistProfile(profile);
      setLoading(false);
      toast.success('Education info is  added!');
    } catch (e) {
      toast.error(JSON.stringify(e));
    }
  };

  return (
    <Box mb="40px">
      <Header>
        <Title>Education</Title>
        <IconButton onClick={() => setIsCreateOpen(true)}>
          <ControlPoint />
        </IconButton>
      </Header>
      {profile?.education_history.length ? (
        profile?.education_history.map(history => (
          <StyledEducationForm
            onDelete={() => handleDeleteEducation(history.id)}
            key={history.id}
            education={history}
            onSubmit={body => handleSubmit(body, history.id)}
          />
        ))
      ) : (
        <Typography color="gray" variant="bodyLarge" textAlign="center">
          Add your education history here
        </Typography>
      )}
      <EducationModal
        loaging={loading}
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleSubmit}
      />
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

const StyledEducationForm = styled(EducationForm)(() => ({
  borderTop: '1px dashed gray',
  borderBottom: '1px dashed gray',
  padding: '20px 0',
}));
