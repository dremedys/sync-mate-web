import { EducationForm } from '@/components/profile/additional-information/education-history/components/education-form/education-form';
import { CreateOrUpdateEducationResponseDto, GetEducationResponseDto } from '@/types/profile';
import { Close } from '@mui/icons-material';
import { Dialog, IconButton, Typography, styled } from '@mui/material';
import { FC } from 'react';

type Props = {
  education?: GetEducationResponseDto;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CreateOrUpdateEducationResponseDto) => void;
  loaging: boolean;
};

export const EducationModal: FC<Props> = ({ education, onClose, isOpen, onSubmit, loaging }) => {
  return (
    <Dialog open={isOpen} PaperProps={{ sx: { maxWidth: 'unset', zIndex: 10 } }} onClose={onClose}>
      <Root>
        <Header>
          <Typography variant="headlineLarge">Add an education</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Header>
        <EducationForm education={education} onSubmit={onSubmit} isLoading={loaging} />
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
