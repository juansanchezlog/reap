'use client';
import React from 'react';
import Link from 'next/link';
import { FormsList } from '@/app/(private)/forms/FormsList';
import { ROUTES } from '@/lib/routes';
import styled from 'styled-components';

export default function FormsPage() {
  return (
    <Container>
      <Header>
        <HeaderTop>
          <HeaderContent>
            <Title>Available Forms</Title>
            <Subtitle>Browse all published forms and their public URLs</Subtitle>
          </HeaderContent>
          <CreateButton href={ROUTES.NEW_FORM}>
            + Create New Form
          </CreateButton>
        </HeaderTop>
      </Header>
      
      <Content>
        <FormsList />
      </Content>
    </Container>
  );
}

const Container = styled.div.attrs({
  className: "h-full flex flex-col"
})``;

const Header = styled.div.attrs({
  className: "pt-8 mb-8 w-full px-8"
})``;

const HeaderTop = styled.div.attrs({
  className: "flex lg:flex-row gap-4 mb-6"
})``;

const HeaderContent = styled.div.attrs({
  className: "lg:text-left"
})``;

const Title = styled.h1.attrs({
  className: "text-3xl font-bold text-gray-900 mb-4"
})``;

const Subtitle = styled.p.attrs({
  className: "text-lg text-gray-600 mb-6 lg:mb-0"
})``;

const CreateButton = styled(Link).attrs({
  className: "inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors text-decoration-none shadow-sm lg:self-start"
})``;

const Content = styled.div.attrs({
  className: "flex-1 max-w-6xl mx-auto w-full px-4 pb-8"
})``; 