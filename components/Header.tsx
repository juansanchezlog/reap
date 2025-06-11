'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { useAuth } from '@/contexts/AuthContext';
import { Button, ButtonVariant } from '@/components/ui/buttons/Button';
import { ROUTES } from '@/lib/routes';

export const Header = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  
  if (pathname.startsWith('/forms') || pathname.startsWith('/new-form')) {
    return null;
  }

  return (
    <HeaderWrapper>
      <HeaderContent>
        <Logo>
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="reap logo"
              width={100}
              height={26}
              style={{ height: 'auto' }}
              priority
            />
          </Link>
        </Logo>
        
        <Navigation>
          {user && (
            <UserSection>
              <WelcomeText>Welcome, {user.username}!</WelcomeText>
              <Button variant={ButtonVariant.SECONDARY} onClick={logout}>
                Logout
              </Button>
            </UserSection>
          )}
          {!user && (
            <NavLink href={ROUTES.LOGIN}>Log in</NavLink>
          )}
        </Navigation>
      </HeaderContent>
    </HeaderWrapper>
  );
};

const Logo = styled.div.attrs({
  className: "text-2xl font-bold text-indigo-600"
})``;

const HeaderWrapper = styled.header.attrs({
  className: "bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50"
})``;

const HeaderContent = styled.div.attrs({
  className: "max-w-6xl mx-auto px-4 py-4 flex items-center justify-between"
})``;

const Navigation = styled.nav.attrs({
  className: "hidden md:flex items-center space-x-8"
})``;

const NavLink = styled.a.attrs({
  className: "text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer"
})``;

const UserSection = styled.div.attrs({
  className: "flex items-center space-x-3"
})``;

const WelcomeText = styled.span.attrs({
  className: "text-gray-700 font-medium"
})``;
