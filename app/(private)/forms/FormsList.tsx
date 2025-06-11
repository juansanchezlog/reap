'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { formsAPI } from '@/lib/api';
import { Button, ButtonVariant } from '@/components/ui/buttons/Button';
import { Form } from '@/lib/types';

export const FormsList = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const fetchForms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await formsAPI.getAll();
      setForms(Array.isArray(response) ? response : []);
    } catch (error: unknown) {
      const err = error as Error & { response?: { data?: { error?: string } } };
      setError(err.response?.data?.error || err.message || 'Failed to load forms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const getFormStats = (form: Form) => {
    const sectionsCount = form.sections?.length || 0;
    const fieldsCount = form.sections?.reduce((total, section) => total + (section.fields?.length || 0), 0) || 0;
    const responsesCount = form.responseCount ?? 0;
    
    return { sectionsCount, fieldsCount, responsesCount };
  };

  if (loading) {
    return (
      <Container>
        <LoadingState>Loading forms...</LoadingState>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>Error: {error}</ErrorMessage>
      </Container>
    );
  }

  if (forms.length === 0) {
    return (
      <Container>
        <EmptyState>
          <EmptyStateText>No forms created yet</EmptyStateText>
          <EmptyStateSubtext>Create your first form to get started</EmptyStateSubtext>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <List>
        {forms.map((form) => {
          const publicUrl = baseUrl ? `${baseUrl}/form/${form.token}` : `/form/${form.token}`;
          const { sectionsCount, fieldsCount, responsesCount } = getFormStats(form);
          
          return (
            <Card key={form.id}>
              <Header>
                <Title>{form.title}</Title>
              </Header>
              
              {form.description && (
                <Description>{form.description}</Description>
              )}
              
              <Stats>
                <StatItem>{sectionsCount} {sectionsCount === 1 ? 'sección' : 'secciones'}</StatItem>
                <StatSeparator>•</StatSeparator>
                <StatItem>{fieldsCount} {fieldsCount === 1 ? 'campo' : 'campos'}</StatItem>
                <StatSeparator>•</StatSeparator>
                <StatItem>{responsesCount} {responsesCount === 1 ? 'respuesta recibida' : 'respuestas recibidas'}</StatItem>
              </Stats>
              
              <TokenContainer>
                <TokenLabel>Public Form URL:</TokenLabel>
                <TokenValue>{publicUrl}</TokenValue>
                {baseUrl && (
                  <Button
                    variant={ButtonVariant.PRIMARY}
                    onClick={() => copyToClipboard(publicUrl)}
                    className="ml-2"
                  >
                    Copy Link
                  </Button>
                )}
              </TokenContainer>
            </Card>
          );
        })}
      </List>
    </Container>
  );
}; 

const Container = styled.div.attrs({
  className: "h-full overflow-y-auto"
})``;

const List = styled.div.attrs({
  className: "space-y-4"
})``;

const Card = styled.div.attrs({
  className: "border-2 border-gray-200 rounded-lg p-4 bg-white hover:bg-gray-50 transition-colors"
})``;

const Header = styled.div.attrs({
  className: "flex justify-between items-start"
})``;

const Title = styled.h3.attrs({
  className: "text-lg font-semibold text-gray-900"
})``;

const Description = styled.p.attrs({
  className: "text-gray-600 mt-2"
})``;

const TokenContainer = styled.div.attrs({
  className: "mt-3 p-3 bg-gray-100 rounded-lg"
})``;

const TokenLabel = styled.span.attrs({
  className: "text-sm font-medium text-gray-700"
})``;

const TokenValue = styled.code.attrs({
  className: "text-sm font-mono bg-gray-200 px-2 py-1 rounded ml-2 select-all text-black"
})``;

const Stats = styled.div.attrs({
  className: "mt-3 text-sm text-gray-600 flex items-center"
})``;

const StatItem = styled.span.attrs({
  className: "text-sm font-medium text-gray-700"
})``;

const StatSeparator = styled.span.attrs({
  className: "text-sm font-medium text-gray-500 mx-2"
})``;

const EmptyState = styled.div.attrs({
  className: "text-center py-12 text-gray-500"
})``;

const LoadingState = styled.div.attrs({
  className: "text-center py-8 text-gray-500"
})``;

const ErrorMessage = styled.div.attrs({
  className: "text-red-600 text-center py-4"
})``;

const EmptyStateText = styled.div.attrs({
  className: "text-center py-12 text-gray-500"
})``;

const EmptyStateSubtext = styled.div.attrs({
  className: "text-sm mt-2"
})``;
