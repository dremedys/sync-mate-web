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
          <span style={{ fontWeight: 400, fontSize: '20px', lineHeight: '20px', transform: 'translateY(-1.5px)' }}>
            ×
          </span>
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
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: center;
`;

const Remove = styled.span`
  border-radius: 50%;
  transition: all 0.3s ease-out;
  border: 3px solid #1a6bde;
  color: #1a6bde;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;
