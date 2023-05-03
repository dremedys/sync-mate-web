import { Close } from '@mui/icons-material';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

export function Tag<T>({ onClick, onRemove, children }: TagProps<T>) {
  return (
    <Wrapper onClick={onClick}>
      <Text>{children}</Text>
      {onRemove && (
        <Remove
          onClick={event => {
            onRemove(event);
          }}>
          <Close />
        </Remove>
      )}
    </Wrapper>
  );
}

export interface TagProps<T> {
  onClick?: () => void;
  onRemove?: (event?: T | React.MouseEvent<HTMLSpanElement>) => void;
  // className?: string;
  children: ReactNode;
}

const Wrapper = styled.div`
  border-radius: 8px;
  display: flex;
  box-sizing: border-box;
  position: relative;
  column-gap: 4px;
  align-items: center;
  padding: 4px 8px;
  border: 2px solid #1a6bde;
  cursor: default;
`;

const Text = styled.div`
  width: 100%;
  text-align: center;
  color: #1a6bde;
  white-space: nowrap;
`;

const Remove = styled.span`
  padding: 0;
  border-radius: 50%;
  transition: all 0.3s ease-out;
  border: 1px solid #1a6bde;
  display: flex;
  box-sizing: border-box;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  & > svg {
    width: 10px;
    height: 10px;
  }

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;
