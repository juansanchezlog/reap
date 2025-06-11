'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/routes';

export const useProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push(ROUTES.UNAUTHORIZED);
    }
  }, [user, isLoading, router]);

  return { user, isLoading };
}; 