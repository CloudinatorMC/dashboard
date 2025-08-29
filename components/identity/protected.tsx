"use client";

import { useAuth } from "@workos-inc/authkit-nextjs/components";


interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const {user, loading} = useAuth();

  if (loading) {
    return null; // if we display a loading state, the user would believe the page is slow.
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You must be logged in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
    </>
  );
}
