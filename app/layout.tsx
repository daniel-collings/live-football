import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/_components/layout/Navbar";
import Footer from "@/app/_components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | Live Football",
  description: "For the fans by fans. Live Football updates, statistics and news.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`text-base-content {inter.className}`}>
        <Navbar/>
        {children}
      <Footer/>
      </body>

    </html>
  );
}
