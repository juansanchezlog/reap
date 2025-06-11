'use client';
import Link from 'next/link';
import styled from 'styled-components';
import { ROUTES } from '@/lib/routes';

const UnauthorizedPage = () => {
  return (
    <Container>
      <Card>
        <Icon>🔒</Icon>
        <Title>Access Denied</Title>
        <Message>
          This is a protected route, only authenticated users can access to it. 
          Please log in to get access.
        </Message>
        <LoginButton href={ROUTES.LOGIN}>
          Log In
        </LoginButton>
        <HomeLink href={ROUTES.HOME}>
          Go to Home
        </HomeLink>
      </Card>
    </Container>
  );
};

export default UnauthorizedPage;

const Container = styled.div.attrs({
  className: "flex justify-center items-center min-h-[calc(100vh-80px)] p-8"
})``;

const Card = styled.div.attrs({
  className: "bg-white rounded-xl shadow-lg p-12 text-center max-w-md w-full border border-gray-200"
})``;

const Icon = styled.div.attrs({
  className: "text-6xl mb-6"
})``;

const Title = styled.h1.attrs({
  className: "text-3xl font-bold text-gray-900 mb-4"
})``;

const Message = styled.p.attrs({
  className: "text-gray-600 text-lg leading-relaxed mb-8"
})``;

const LoginButton = styled(Link).attrs({
  className: "inline-flex items-center justify-center w-full px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors text-decoration-none mb-4"
})``;

const HomeLink = styled(Link).attrs({
  className: "inline-block text-gray-500 hover:text-teal-600 transition-colors text-decoration-none"
})``; 