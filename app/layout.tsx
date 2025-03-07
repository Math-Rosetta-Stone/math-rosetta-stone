import type { Metadata } from "next";
import AppProviders from "./contexts/appproviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "Math Rosetta Stone",
  description: "Learn math in english",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
