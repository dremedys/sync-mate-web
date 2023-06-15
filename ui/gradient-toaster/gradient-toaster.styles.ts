import { Close } from '@mui/icons-material';
import { styled } from '@mui/material';

export const Root = styled('div')`
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.16);
  width: 500px;
`;

export const Top = styled('div')`
  background: linear-gradient(159.52deg, #60abf3 8.93%, #4a77f5 50.34%, #3b5bf6 82.55%);
  padding: 21px 24px;
  color: white;
  border: 1px solid #e0e3ea;
  border-radius: 8px 8px 0px 0px;
`;

export const Header = styled('header')`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CloseIcon = styled(Close)`
  width: 21px;
  height: 21px;
  cursor: pointer;
  & path {
    fill: white;
  }
`;

export const Bottom = styled('div')`
  border: 1px solid #e0e3ea;
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  background: white;
  border-radius: 0px 0px 8px 8px;
`;
