import type { Metadata } from "next";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import "./globals.css";
import ProtectedLayout from "@/components/identity/protected";

export const metadata: Metadata = {
  title: "CloudinatorMC Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <ConvexClientProvider>
          <ProtectedLayout>
            {children}
          </ProtectedLayout>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
