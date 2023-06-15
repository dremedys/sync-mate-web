import { CertificateModal } from '@/components/profile/certificates/components/certificate-modal/certificate-modal';
import { CertificationItems } from '@/components/profile/certificates/components/certification-items/certification-items';
import { toast } from '@/components/toast/toast';
import { authService, useAuth } from '@/providers/auth.provider';
import { createCerficate } from '@/services/profile';
import { CreateCertificateDto } from '@/types/profile';
import { CardItem } from '@/ui/card-item/card-item';
import { ControlPoint } from '@mui/icons-material';
import { Typography, styled } from '@mui/material';
import { useState } from 'react';

export const Certificates = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { profile, setProfile } = useAuth();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async (body: CreateCertificateDto) => {
    setIsCreating(true);
    try {
      await createCerficate(body);
      toast.success('License is created!');
      setIsCreateOpen(false);
      const profile = await authService.getProfile();
      authService.persistProfile(profile);
      setProfile(profile);
    } catch (e) {
      console.log(e);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <CardItem>
      <Header>
        <Title>Certificates</Title>
        <ControlPoint sx={{ cursor: 'pointer' }} onClick={() => setIsCreateOpen(true)} />
      </Header>

      <CertificationItems />

      <CertificateModal
        isLoading={isCreating}
        onSubmit={handleCreate}
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
        }}
      />
    </CardItem>
  );
};

const Header = styled('div')(() => ({
  color: '#6B6B6B',
  display: 'flex',
  alignItems: 'center',
  columnGap: '6px',
  marginBottom: '20px',
}));

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.headlineSmall,
  color: '#161616',
}));
