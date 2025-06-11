'use client';
import { FormBuilder } from '@/app/(private)/new-form/FormBuilder';
import { ROUTES } from '@/lib/routes';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const NewFormPage = () => {
  const router = useRouter();

  const handleFormCreated = () => {
    router.push(ROUTES.FORMS);
  };

  return (
    <Container>
      <FormContainer>
        <Header>
          <Title>Create New Form</Title>
          <Subtitle>Build your custom form with sections and fields</Subtitle>
        </Header>

        <Content>
          <FormBuilder onFormCreated={handleFormCreated} />
        </Content>
      </FormContainer>
    </Container>
  );
} 

export default NewFormPage;

const Container = styled.div.attrs({
  className: "flex justify-center items-center min-h-[calc(100vh-80px)]"
})``;

const FormContainer = styled.div.attrs({
  className: "container mx-auto px-6 py-8"
})``;

const Header = styled.div.attrs({
  className: "text-center mb-12"
})``;

const Title = styled.h1.attrs({
  className: "text-4xl font-bold text-gray-900 mb-4"
})``;

const Subtitle = styled.p.attrs({
  className: "text-xl text-gray-600 mb-8"
})``;

const Content = styled.div.attrs({
  className: "bg-white rounded-xl shadow-lg p-8 border border-gray-200"
})``;