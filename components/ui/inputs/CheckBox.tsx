import React, { FC } from 'react';
import { CheckBoxProps } from '@/lib/types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCheckBox = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 12px;
  accent-color: #10b981;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  
  &:has(input:disabled) {
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

export const CheckBox: FC<CheckBoxProps> = ({ label, ...props }) => {
  return (
    <Container>
      <StyledCheckBox type="checkbox" {...props} />
      {label && <Label>{label}</Label>}
    </Container>
  );
};
