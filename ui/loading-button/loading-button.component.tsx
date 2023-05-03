import { Box, Button, ButtonProps, CircularProgress, Fade } from '@mui/material';
import React from 'react';

type Props = {
  loading?: boolean;
  children: React.ReactNode;
} & ButtonProps;

export const LoadingButton = ({ loading = false, children, disabled, ...otherProps }: Props): JSX.Element => (
  <Button {...otherProps} disabled={disabled || loading}>
    {loading ? (
      <Box sx={{ display: 'flex' }}>
        <Fade in={loading} unmountOnExit>
          <CircularProgress size={15} color="inherit" />
        </Fade>
      </Box>
    ) : (
      children
    )}
  </Button>
);
