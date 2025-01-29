import type { Metadata } from "next";
import "./globals.css";

import { Providers } from "./context/Providers"
import { SidebarProvider } from "./context/SidebarAuthProvider";

export const metadata: Metadata = {
  title: "E-commerce",
  description: "e-commerce website made by Ilan and Victor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
      <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-50">
        <Providers>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
