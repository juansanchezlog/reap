'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { formsAPI } from '@/lib/api';
import { Input } from '@/components/ui/inputs/Input';
import { Button } from '@/components/ui/buttons/Button';
import { Form, Field, FormValues, FormErrors } from '@/lib/types';
import styled from 'styled-components';
import { Stepper } from '@/app/(public)/form/[token]/Stepper';
import Image from 'next/image';

export default function FormPage() {
  const params = useParams();  
  const token = typeof params.token === 'string' ? params.token : '';
  
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [currentStep, setCurrentStep] = useState(0);

  const steps = form ? form.sections.map((section, index) => ({
    id: index + 1,
    title: section.title,
    subtitle: section.description || `Section ${index + 1}`,
    completed: index < currentStep,
    active: index === currentStep
  })) : [];

  const fetchForm = useCallback(async () => {
    try {
      setLoading(true);
      const response = await formsAPI.getByToken(token);
      setForm(response);
    } catch (error) {
      console.error('Error fetching form:', error);
      setError('Form not found or has expired');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchForm();
    }
  }, [token, fetchForm]);

  const validateField = (field: Field, value: string | number | undefined) => {
    if (field.required && (!value || value === '')) {
      return `${field.label} is required`;
    }
    if (field.type === 'NUMBER' && value !== '' && isNaN(Number(value))) {
      return `${field.label} must be a number`;
    }
    return null;
  };

  const handleFieldChange = (fieldId: string, value: string | number) => {
    setValues((prev: FormValues) => ({
      ...prev,
      [fieldId]: value
    }));

    if (errors[fieldId]) {
      setErrors(prev => ({
        ...prev,
        [fieldId]: ''
      }));
    }
  };

  const validateCurrentStep = () => {
    if (!form) return false;
    const currentSection = form.sections[currentStep];
    const newErrors: FormErrors = {};
    let hasErrors = false;

    currentSection.fields.forEach(field => {
      const fieldValue = values[field.id];
      const error = validateField(field, fieldValue);
      if (error) {
        newErrors[field.id] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setSubmissionState('submitting');
    setError(null);
    
    try {
      const submissionData = {
        responses: Object.entries(values).map(([fieldId, value]) => ({
          fieldId,
          value: value.toString()
        }))
      };
      await formsAPI.submit(token, submissionData);
      setSubmissionState('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit form. Please try again.');
      setSubmissionState('error');
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div>Loading form...</div>
        </LoadingSpinner>
      </Container>
    );
  }

  if (!form || error) {
    return (
      <Container>
        <FormContainer>
          <ErrorMessage>
            {error || 'Form not found'}
          </ErrorMessage>
        </FormContainer>
      </Container>
    );
  }

  if (submissionState === 'success') {
    return (
      <Container>
        <FormContainer>
          <SuccessMessage>
            <SuccessTitle>Thank you!</SuccessTitle>
            <SuccessText>Your form has been submitted successfully.</SuccessText>
          </SuccessMessage>
        </FormContainer>
      </Container>
    );
  }

  const currentSection = form.sections[currentStep];
  const isLastStep = currentStep === form.sections.length - 1;

  return (
    <Container>
      <FormContainer>
        <Header>
          <Logo>
            <Image
              src="/logo.svg"
              alt="Reap"
              width={100}
              height={26}
              style={{ height: 'auto' }}
              priority
            />
          </Logo>
          <Title>{form.title}</Title>
          <Description>{form.description}</Description>
        </Header>

        <Stepper steps={steps} />

        <FormCard>
          <SectionTitle>{currentSection.title}</SectionTitle>
          {currentSection.description && (
            <SectionDescription>{currentSection.description}</SectionDescription>
          )}

          <form onSubmit={(e) => e.preventDefault()}>
            {currentSection.fields.map((field) => {
              const fieldValue = values[field.id] || '';
              const fieldError = errors[field.id];

              return (
                <FieldContainer key={field.id}>
                  <Label htmlFor={field.id}>
                    {field.label}
                    {field.required && <RequiredIndicator>*</RequiredIndicator>}
                  </Label>
                  
                  {field.type === 'TEXT' ? (
                    <Input
                      id={field.id}
                      type="text"
                      value={fieldValue}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  ) : (
                    <Input
                      id={field.id}
                      type="number"
                      value={fieldValue}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  )}
                  
                  {fieldError && <FieldError>{fieldError}</FieldError>}
                </FieldContainer>
              );
            })}

            {error && (
              <ErrorMessage>{error}</ErrorMessage>
            )}

            {isLastStep ? (
              <Button type="button" onClick={handleSubmit} disabled={submissionState === 'submitting'} className="w-full py-4 px-6 text-lg shadow-lg">
                {submissionState === 'submitting' ? 'Submitting...' : 'Submit Form'}
              </Button>
            ) : (
              <Button type="button" onClick={handleNext} className="w-full py-4 px-6 text-lg shadow-lg">
                Continue
              </Button>
            )}
          </form>
        </FormCard>
      </FormContainer>
    </Container>
  );
}

const Container = styled.div.attrs({
  className: "py-8 px-4"
})``;

const FormContainer = styled.div.attrs({
  className: "max-w-4xl mx-auto"
})``;

const Header = styled.div.attrs({
  className: "text-center mb-8"
})``;

const Logo = styled.div.attrs({
  className: "flex items-center justify-center mb-6"
})``;

const Title = styled.h1.attrs({
  className: "text-3xl font-bold text-gray-900 mb-4"
})``;

const Description = styled.p.attrs({
  className: "text-gray-600 mb-8 max-w-2xl mx-auto"
})``;

const FormCard = styled.div.attrs({
  className: "bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8"
})``;

const SectionTitle = styled.h2.attrs({
  className: "text-xl font-semibold text-gray-900 mb-4"
})``;

const SectionDescription = styled.p.attrs({
  className: "text-gray-600 mb-6 text-sm"
})``;

const FieldContainer = styled.div.attrs({
  className: "mb-6"
})``;

const Label = styled.label.attrs({
  className: "block text-sm font-medium text-gray-700 mb-2"
})``;

const FieldError = styled.span.attrs({
  className: "text-red-500 text-sm mt-1 block"
})``;

const RequiredIndicator = styled.span.attrs({
  className: "text-red-500 ml-1"
})``;

const SuccessMessage = styled.div.attrs({
  className: "text-center py-12 text-teal-600 bg-teal-50 rounded-xl border border-teal-200"
})``;

const SuccessTitle = styled.h2.attrs({
  className: "text-2xl font-semibold mb-2"
})``;

const SuccessText = styled.p.attrs({
  className: "text-base text-gray-700"
})``;

const ErrorMessage = styled.div.attrs({
  className: "text-red-600 text-center py-4 mb-4 bg-red-50 rounded-lg border border-red-200"
})``;

const LoadingSpinner = styled.div.attrs({
  className: "flex justify-center items-center py-12"
})``;