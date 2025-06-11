'use client';
import React from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { PrivateLayoutProps } from '@/lib/types';
import { Sidebar } from '@/components/Sidebar';
import styled from 'styled-components';

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  const { isLoading } = useProtectedRoute();

  if (isLoading) {
    return (
      <LoadingContainer>
        <div>Loading...</div>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Sidebar />
      <MainContent>
        {children}
      </MainContent>
    </Container>
  );
}

const Container = styled.div.attrs({
  className: "flex min-h-screen bg-gray-50"
})``;

const MainContent = styled.main.attrs({
  className: "flex-1 overflow-hidden h-full"
})``;

const LoadingContainer = styled.div.attrs({
  className: "flex items-center justify-center min-h-screen"
})``; 