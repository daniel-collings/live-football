import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/_components/layout/Navbar";
import Footer from "@/app/_components/layout/Footer";
import {FC, ReactNode} from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | Live Football",
  description: "For the fans by fans. Live Football updates, statistics and news.",
};

interface RootLayoutProps {
    children: ReactNode;
}


const RootLayout: FC<RootLayoutProps> = ({ children}) => {
  return (
    <html lang="en" data-theme="light">
      <body className={`text-base-content {inter.className}`}>
        <Navbar/>
        <main>
            {children}
        </main>
      <Footer/>
      </body>

    </html>
  );
}
export default RootLayout;