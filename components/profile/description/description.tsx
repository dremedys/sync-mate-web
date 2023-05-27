import { authService, useAuth } from '@/providers/auth.provider';
import { CardItem } from '@/ui/card-item/card-item';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react';

export const Description = () => {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<string | undefined>();

  useEffect(() => {
    setDescription(profile?.bio);
  }, [profile]);
  const handleSubmit = () => {
    setLoading(true);
    authService.updateProfile({ bio: description }).then(() => {
      setLoading(false);
    });
  };
  return (
    <CardItem>
      <Title>Description</Title>
      <StyledTextField
        fullWidth
        multiline
        minRows={5}
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <LoadingButton
        disabled={description === profile?.bio}
        loading={loading}
        variant="contained"
        sx={{ marginLeft: 0 }}
        onClick={handleSubmit}>
        Save
      </LoadingButton>
    </CardItem>
  );
};

const Title = styled(Typography)(() => ({
  marginBottom: '20px',
}));

const StyledTextField = styled(TextField)(() => ({
  '& textarea': { padding: 0 },
  marginBottom: '20px',
}));
