'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { RiFileTextLine, RiSettings3Line } from 'react-icons/ri';
import { IoIosTrendingUp } from "react-icons/io";
import { MdPeopleAlt } from "react-icons/md";

export const Sidebar = () => {
  const { user } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <SidebarWrapper>
      <SidebarContent>
        <LogoContainer>
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Reap"
              width={120}
              height={32}
              style={{ height: 'auto' }}
              priority
            />
          </Link>
        </LogoContainer>

        <Navigation>
          <NavItem>
            <Link href={ROUTES.NEW_FORM} style={{ textDecoration: 'none' }}>
              <NavLink $active={false}>
                <NavIcon><IoIosTrendingUp /></NavIcon>
                <NavText>Dashboard</NavText>
              </NavLink>
            </Link>
          </NavItem>
          
          <NavItem>
            <Link href={ROUTES.FORMS} style={{ textDecoration: 'none' }}>
              <NavLink $active={isActive(ROUTES.FORMS)}>
                <NavIcon><RiFileTextLine /></NavIcon>
                <NavText>Forms</NavText>
              </NavLink>
            </Link>
          </NavItem>
          
          <NavItem>
            <NavLink $active={false}>
              <NavIcon><MdPeopleAlt /></NavIcon>
              <NavText>Welcome</NavText>
            </NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink $active={false}>
              <NavIcon><RiSettings3Line /></NavIcon>
              <NavText>Settings</NavText>
            </NavLink>
          </NavItem>
        </Navigation>

        <UserProfile>
          <UserAvatar>
            <UserInitial>{user?.username?.charAt(0).toUpperCase() || 'U'}</UserInitial>
          </UserAvatar>
          <UserInfo>
            <UserName>{user?.username || 'User'}</UserName>
            <UserEmail>admin@getreap.com</UserEmail>
          </UserInfo>
        </UserProfile>
      </SidebarContent>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.aside.attrs({
  className: "w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex-shrink-0"
})``;

const SidebarContent = styled.div.attrs({
  className: "flex flex-col h-full p-4"
})``;

const LogoContainer = styled.div.attrs({
  className: "mb-8 px-2"
})``;

const Navigation = styled.nav.attrs({
  className: "flex-1 space-y-2"
})``;

const NavItem = styled.div``;

const NavLink = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  
  ${props => props.$active 
    ? `
      background-color: #f0fdfa;
      color: #0f766e;
      border-right: 2px solid #0d9488;
    `
    : `
      color: #4b5563;
      &:hover {
        background-color: #f9fafb;
        color: #111827;
      }
    `
  }
`;

const NavIcon = styled.span.attrs({
  className: "mr-3 text-lg"
})`
  color: inherit;
  display: flex;
  align-items: center;
`;

const NavText = styled.span``;

const UserProfile = styled.div.attrs({
  className: "mt-auto pt-4 border-t border-gray-200 flex items-center space-x-3"
})``;

const UserAvatar = styled.div.attrs({
  className: "w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0"
})``;

const UserInitial = styled.span.attrs({
  className: "text-white text-sm font-medium"
})``;

const UserInfo = styled.div.attrs({
  className: "flex-1 min-w-0"
})``;

const UserName = styled.div.attrs({
  className: "text-sm font-medium text-gray-900 truncate"
})``;

const UserEmail = styled.div.attrs({
  className: "text-xs text-gray-500 truncate"
})``; 