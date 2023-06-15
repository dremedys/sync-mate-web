import { Button, Grow, Typography } from '@mui/material';
import { FC } from 'react';

import * as Styled from './gradient-toaster.styles';

type Props = {
  title?: string;
  message: string;
  onClose: () => void;
  visible: boolean;
};

export const GradientToaster: FC<Props> = ({ title, message, onClose, visible }) => {
  return (
    <Grow in={visible}>
      <Styled.Root>
        <Styled.Top>
          <Styled.Header>
            <Typography variant="displaySmall">{title}</Typography>
            <Styled.CloseIcon onClick={onClose} />
          </Styled.Header>
          <Typography variant="displaySmall" fontWeight={400}>
            {message}
          </Typography>
        </Styled.Top>

        <Styled.Bottom>
          <Button
            onClick={onClose}
            sx={{ minWidth: 'unset', padding: '14px 24px' }}
            fullWidth={false}
            variant="outlined">
            OK
          </Button>
        </Styled.Bottom>
      </Styled.Root>
    </Grow>
  );
};
