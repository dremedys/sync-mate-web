import { Info } from '@mui/icons-material';
import { Fade } from '@mui/material';
import { FC } from 'react';

import * as Styled from './complex-toast.styles';

type Props = {
  title?: string;
  message: string;
  onClose: () => void;
  visible: boolean;
};

export const ComplexToast: FC<Props> = ({ title, message, onClose, visible }) => {
  return (
    <Fade in={visible}>
      <Styled.Root>
        <Info />
        <Styled.Content>
          <Styled.Description>{message}</Styled.Description>
        </Styled.Content>
      </Styled.Root>
    </Fade>
  );
};
