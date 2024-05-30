import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/_components/layout/Navbar";
import Footer from "@/app/_components/layout/Footer";
import {FC, ReactNode} from "react";
import Script from "next/script";
import { GoogleAnalytics } from '@next/third-parties/google'

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
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.GOOGLE_ADSENSE}`}
            crossOrigin="anonymous"
        />
        <GoogleAnalytics gaId="G-ET2SFF42X4" />
        <body className={`text-base-content ${inter.className}`}>
        <Navbar/>
        <main>
            {/*<QueryClientProvider client={queryClient}>*/}
            {children}
            {/*</QueryClientProvider>*/}
        </main>
        <Footer/>
        </body>

    </html>
  );
}
export default RootLayout;