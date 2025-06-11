'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/app/(public)/login/LoginForm';
import { ROUTES } from '@/lib/routes';

export default function LoginPage() {
  const { login, user, isLoading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (user && !isLoading) {
      setIsRedirecting(true);
      router.push(ROUTES.FORMS);
    }
  }, [user, isLoading, router]);

  if (isRedirecting) {
    return <div>Redirecting...</div>;
  }

  const handleLogin = async (credentials: { username: string; password: string }) => {
    try {
      await login(credentials.username, credentials.password);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
} 