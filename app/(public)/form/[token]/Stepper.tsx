'use client';
import React from 'react';
import styled from 'styled-components';
import { StepperProps } from '@/lib/types';

export const Stepper = ({ steps }: StepperProps) => {
  return (
    <Container>
      <StepperWrapper>
        <ConnectingLine />
        {steps.map((step) => (
          <StepContainer key={step.id}>
            <StepIndicator $active={step.active} $completed={step.completed}>
              {step.completed ? '✓' : step.id}
            </StepIndicator>
            
            <StepTitle $active={step.active}>
              {step.title}
            </StepTitle>
            
            {step.subtitle && (
              <StepSubtitle $active={step.active}>
                {step.subtitle}
              </StepSubtitle>
            )}
          </StepContainer>
        ))}
      </StepperWrapper>
    </Container>
  );
};

const Container = styled.div.attrs({
  className: "flex justify-center mb-8"
})``;

const StepperWrapper = styled.div.attrs({
  className: "flex items-start justify-between relative"
})``;

const ConnectingLine = styled.div.attrs({
  className: "absolute h-0.5 bg-gray-300 top-6 left-20 right-20 z-0"
})``;

const StepContainer = styled.div.attrs({
  className: "flex flex-col items-center relative flex-1"
})`
  width: 200px;
`;

const StepIndicator = styled.div.attrs<{ $active?: boolean; $completed?: boolean }>(props => ({
  className: `w-12 h-12 rounded-full flex items-center justify-center font-bold text-white mb-2 relative z-10 ${
    props.$completed 
      ? 'bg-teal-600' 
      : props.$active 
        ? 'bg-teal-500' 
        : 'bg-gray-300'
  }`
}))<{ $active?: boolean; $completed?: boolean }>``;

const StepTitle = styled.h3.attrs<{ $active?: boolean }>(props => ({
  className: `text-xs font-medium text-center leading-tight break-words ${
    props.$active ? 'text-teal-600' : 'text-gray-700'
  }`
}))<{ $active?: boolean }>``;

const StepSubtitle = styled.p.attrs<{ $active?: boolean }>(props => ({
  className: `text-xs text-center leading-tight break-words mt-1 ${
    props.$active ? 'text-gray-600' : 'text-gray-500'
  }`
}))<{ $active?: boolean }>``;
