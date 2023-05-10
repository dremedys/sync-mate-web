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
          <span>×</span>
          {/*<Close width="9px" height="9px" />*/}
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
  border: 3px solid #1a6bde;
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
  border: 3px solid #1a6bde;
  color: #1a6bde;
  display: flex;
  line-height: 0;
  position: relative;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  width: 17px;
  height: 17px;
  font-weight: 600;
  flex-shrink: 0;
  text-align: center;
  font-size: 20px;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;
