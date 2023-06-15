import { Button as MuiButton, Typography, styled } from '@mui/material';

export const Root = styled('div')(({ theme }) => ({
  minWidth: '200px',
  backgroundColor: '#9ACD32',
  color: '#FFFFFF',
  boxShadow: '0px 16px 32px rgba(0, 0, 0, 0.04)',
  borderRadius: '12px',
  padding: '16px 18px',
  display: 'flex',
  columnGap: '12px',
  '& svg': {
    width: '20px',
  },
}));

export const Content = styled('div')(() => ({}));

export const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.displaySmall,
  fontWeight: 500,
  marginBottom: '8px',
}));

export const Description = styled(Typography)(({ theme }) => ({
  ...theme.typography.headlineMedium,
  marginBottom: '8px',
}));

export const Button = styled(MuiButton)(({ theme }) => ({
  border: '1px solid rgba(255, 255, 255, 0.12)',
  minWidth: 'unset',
  color: '#FFFFFF',
  height: '32px',
}));
