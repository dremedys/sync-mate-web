import { FormLabel, styled } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  hasError: boolean;
  children: ReactNode;
};

export const Label: FC<Props> = ({ children, hasError }) => {
  return <Root sx={{ color: hasError ? 'red' : 'initial' }}>{children}</Root>;
};

export const Root = styled(FormLabel)`
  display: block;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.3;
  color: #6d6e85;
  margin-bottom: 4px;

  & a {
    color: #007994;
    text-decoration: underline;
    margin-left: 18px;
  }
`;
