import React, { forwardRef } from 'react';
import { TextAreaProps } from '@/lib/types';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  color: #000000;
  transition: border-color 0.2s;
  resize: vertical;
  min-height: 100px;
  
  &::placeholder {
    color: #6b7280;
  }
  
  &:focus {
    outline: none;
    border-color: #10b981;
  }
  
  &:disabled {
    background-color: #f9fafb;
    cursor: not-allowed;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
`;

const Container = styled.div``;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, ...props }, ref) => {
    return (
      <Container>
        {label && <Label>{label}</Label>}
        <StyledTextArea ref={ref} {...props} />
      </Container>
    );
  }
);

TextArea.displayName = 'TextArea';
