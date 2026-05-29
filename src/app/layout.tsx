import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Crimson Plume - Scrollytelling",
  description: "High-end scrollytelling landing page for Crimson Plume.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable}`}>
      <body className="min-h-full flex flex-col relative">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
