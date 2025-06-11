import React from 'react';
import { SelectProps, OptionProps } from '@/lib/types';
import styled from 'styled-components';

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  color: #000000;
  transition: border-color 0.2s;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #10b981;
  }
  
  &:disabled {
    background-color: #f9fafb;
    cursor: not-allowed;
  }
`;

const StyledOption = styled.option`
  padding: 8px;
`;

export const Select = ({ children, ...props }: SelectProps) => {
  return (
    <StyledSelect {...props}>
      {children}
    </StyledSelect>
  );
};

export const Option = ({ children, ...props }: OptionProps) => {
  return (
    <StyledOption {...props}>
      {children}
    </StyledOption>
  );
}; 