import { useAuth } from '@/providers/auth.provider';
import { deleteCertificate } from '@/services/profile';
import { HighlightOff, Launch } from '@mui/icons-material';
import { Button, IconButton, Typography, styled } from '@mui/material';

export const CertificationItems = () => {
  const { profile } = useAuth();

  const handleDelete = async (id: number) => {
    try {
      deleteCertificate(id);
    } catch (e) {
      console.log(e);
    }
  };

  const handleOpenLink = (link: string) => {
    window.open(link, '_blank', 'noreferrer');
  };

  if (!profile?.licences.length) {
    return (
      <Typography color="gray" variant="bodyLarge" textAlign="center">
        Add your certifications here
      </Typography>
    );
  }

  return (
    <Grid>
      {profile?.licences.map(item => (
        <Item key={item.id}>
          <HighlightOff sx={{ cursor: 'pointer' }} onClick={() => handleDelete(item.id)} />

          <Name>{item.file_name}</Name>
          <Organization>{item.organisation_name}</Organization>
          <Button
            sx={{ alignItems: 'center' }}
            fullWidth
            onClick={() => handleOpenLink(item.credential_url)}
            endIcon={<Launch />}>
            Show credentials
          </Button>
        </Item>
      ))}
    </Grid>
  );
};

const Grid = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridColumnGap: '20px',
}));

const Item = styled('div')(() => ({
  border: '1px solid gray',
  borderRadius: '12px',
  padding: '20px',
}));

const CloseButton = styled(IconButton)(() => ({
  marginBottom: '22px',
  color: 'gray',
}));

const Name = styled(Typography)(({ theme }) => ({
  ...theme.typography.bodyLarge,
  borderBottom: '1px solid gray',
  marginBottom: '20px',
  alignSelf: 'stretch',
  textAlign: 'center',
}));

const Organization = styled(Typography)(({ theme }) => ({
  ...theme.typography.bodyLarge,
  marginBottom: '20px',
  textAlign: 'center',
}));
