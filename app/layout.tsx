import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/styled-components";
import { ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Reap Forms - Dynamic Form Builder",
  description: "Create and share secure forms with dynamic sections and fields",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <StyledComponentsRegistry>
          <AuthProvider>
            <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-emerald-50">
              <Header />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}