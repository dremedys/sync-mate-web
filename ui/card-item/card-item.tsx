import { styled } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};
export const CardItem: FC<Props> = ({ children, className }) => {
  return <Root className={className}>{children}</Root>;
};

const Root = styled('div')(() => ({
  boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.11), 0px 1px 18px rgba(0, 0, 0, 0.09), 0px 3px 5px rgba(0, 0, 0, 0.16)',
  background: 'white',
  padding: '20px',
  borderRadius: '12px',
}));
