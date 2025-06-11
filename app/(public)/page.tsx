'use client';
import Link from 'next/link';
import styled from 'styled-components';
import { ROUTES } from '@/lib/routes';

export default function Home() {
  return (
    <HomeContainer>
      <HeroSection>
        <Title>Welcome to Forms App</Title>
        <Subtitle>Create and manage your forms with ease</Subtitle>
        
        <ActionsContainer>
          <PrimaryLink href={ROUTES.NEW_FORM}>
            + Create Form
          </PrimaryLink>
          <SecondaryLink href={ROUTES.FORMS}>
            View Forms
          </SecondaryLink>
        </ActionsContainer>
        
        <AdminLink href={ROUTES.LOGIN}>
          Go to admin panel
        </AdminLink>
      </HeroSection>
    </HomeContainer>
  );
}

const HomeContainer = styled.div.attrs({
  className: "flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-8"
})``;

const HeroSection = styled.div.attrs({
  className: "text-center"
})``;

const Title = styled.h1.attrs({
  className: "text-5xl font-bold text-gray-900 mb-6"
})``;

const Subtitle = styled.p.attrs({
  className: "text-xl text-gray-600 mb-12 max-w-2xl"
})``;

const ActionsContainer = styled.div.attrs({
  className: "flex flex-col sm:flex-row gap-4 justify-center mb-8"
})``;

const PrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  background: #0d9488;
  color: white;
  border-radius: 12px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  box-shadow: 0 10px 25px rgba(13, 148, 136, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background: #0f766e;
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(13, 148, 136, 0.4);
  }
`;

const SecondaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  background: white;
  color: #374151;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #0d9488;
    color: #0d9488;
    transform: translateY(-1px);
  }
`;

const AdminLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  background: white;
  color: #374151;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #0d9488;
    color: #0d9488;
    transform: translateY(-1px);
  }
`;