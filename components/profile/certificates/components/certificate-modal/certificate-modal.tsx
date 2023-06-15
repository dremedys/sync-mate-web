import { CreateCertificateDto } from '@/types/profile';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Dialog, IconButton, TextField, Typography, styled } from '@mui/material';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  onSubmit: (body: CreateCertificateDto) => void;
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
};
export const CertificateModal: FC<Props> = ({ onClose, isOpen, onSubmit, isLoading }) => {
  const { register, handleSubmit } = useForm<CreateCertificateDto>();

  return (
    <Dialog open={isOpen} PaperProps={{ sx: { maxWidth: 'unset' } }} onClose={onClose}>
      <Root>
        <Header>
          <Typography variant="headlineLarge">Add license or certification</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Header>
        <Form onSubmit={handleSubmit(val => onSubmit(val))}>
          <FieldWrap>
            <Label>Name</Label>
            <TextField {...register('file_name')} name="file_name" />
          </FieldWrap>
          <FieldWrap>
            <Label>Credential URL</Label>
            <TextField {...register('credential_url')} name="credential_url" />
          </FieldWrap>
          <FieldWrap>
            <Label>Issuing organization</Label>
            <TextField {...register('organisation_name')} name="organisation_name" />
          </FieldWrap>
          <LoadingButton variant="contained" type="submit" loading={isLoading}>
            Add
          </LoadingButton>
        </Form>
      </Root>
    </Dialog>
  );
};

const Root = styled('div')(() => ({
  width: '838px',
  padding: '20px 25px',
}));

const Header = styled('header')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '40px',
}));

const Form = styled('form')(() => ({}));

const FieldWrap = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '24px',
}));

const Label = styled('div')(({ theme }) => ({
  ...theme.typography.titleSmall,
  width: '184px',
  marginRight: '22px',
}));
