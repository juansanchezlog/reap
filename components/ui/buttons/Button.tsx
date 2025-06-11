import React, { FC } from 'react';
import styled from 'styled-components';
import { ButtonVariant, ButtonProps } from '@/lib/types';

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;

  ${({ $variant }) => {
    switch ($variant) {
      case ButtonVariant.PRIMARY:
        return `
          background-color: #0d9488;
          color: white;
          
          &:hover:not(:disabled) {
            background-color: #0f766e;
          }
          
          &:disabled {
            background-color: #94a3b8;
            cursor: not-allowed;
          }
        `;
        
      case ButtonVariant.SECONDARY:
        return `
          background-color: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
          
          &:hover:not(:disabled) {
            background-color: #e2e8f0;
            border-color: #cbd5e1;
          }
          
          &:disabled {
            background-color: #f8fafc;
            color: #94a3b8;
            cursor: not-allowed;
          }
        `;
        
      case ButtonVariant.DANGER:
        return `
          background-color: #dc2626;
          color: white;
          
          &:hover:not(:disabled) {
            background-color: #b91c1c;
          }
          
          &:disabled {
            background-color: #94a3b8;
            cursor: not-allowed;
          }
        `;
        
      default:
        return `
          background-color: #0d9488;
          color: white;
          
          &:hover:not(:disabled) {
            background-color: #0f766e;
          }
          
          &:disabled {
            background-color: #94a3b8;
            cursor: not-allowed;
          }
        `;
    }
  }}
`;

export const Button: FC<ButtonProps> = ({ variant = ButtonVariant.PRIMARY, children, ...props }) => (
  <StyledButton $variant={variant} {...props}>
    {children}
  </StyledButton>
);

export { ButtonVariant };

