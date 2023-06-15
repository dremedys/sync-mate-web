import { WorkForm } from '@/components/profile/additional-information/work-experience/work-form/work-form';
import { CreateOrUpdateWorkDto, GetWorkDto } from '@/types/profile';
import { Close } from '@mui/icons-material';
import { Dialog, IconButton, Typography, styled } from '@mui/material';
import { FC } from 'react';

type Props = {
  work?: GetWorkDto;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CreateOrUpdateWorkDto) => void;
};

export const WorkModal: FC<Props> = ({ work, onClose, isOpen, onSubmit }) => {
  return (
    <Dialog open={isOpen} PaperProps={{ sx: { maxWidth: 'unset', zIndex: 10 } }} onClose={onClose}>
      <Root>
        <Header>
          <Typography variant="headlineLarge">Add an work experience</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Header>
        <WorkForm work={work} onSubmit={onSubmit} />
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
