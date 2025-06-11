'use client';
import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { Input } from '../../../components/ui/inputs/Input';
import { Button } from '../../../components/ui/buttons/Button';
import { LoginFormProps } from '@/lib/types';

export const LoginForm = ({ onLogin, error, isLoading }: LoginFormProps) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <Container>
        <Title>Admin Login</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              placeholder="Enter your username"
              required
              disabled={isLoading}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={isLoading} className="w-full py-3">
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
    </Container>
  );
}; 

const Container = styled.div.attrs({
  className: "max-w-md min-w-96 mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-200"
})``;

const Title = styled.h2.attrs({
  className: "text-3xl font-bold text-center text-gray-900 mb-8"
})``;

const Form = styled.form.attrs({
  className: "space-y-6"
})``;

const FormGroup = styled.div.attrs({
  className: "space-y-2"
})``;

const Label = styled.label.attrs({
  className: "block text-sm font-medium text-gray-700"
})``;

const ErrorMessage = styled.div.attrs({
  className: "text-red-600 text-sm text-center p-3 bg-red-50 border border-red-200 rounded-lg"
})``;
