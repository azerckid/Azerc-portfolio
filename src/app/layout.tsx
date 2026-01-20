import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AZERC | Full-Stack Developer Portfolio",
  description: "Specialized in AI, Blockchain, and 3D Graphics. Showcasing a Nexus of innovation.",
};

import { Header } from "@/components/shared/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <div className="relative min-h-screen flex flex-col">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
