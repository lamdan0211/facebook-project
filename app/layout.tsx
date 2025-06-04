import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Facebook Clone",
  description: "A Facebook clone built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
      <body>
        <div className="flex flex-col h-screen">
          <Header />
          <div className="flex flex-1 overflow-hidden pt-14 md:pt-16 md:flex">
            <aside className="hidden md:block lg:w-64 bg-gray-100 p-4 overflow-y-auto flex-shrink-0">
              <LeftSidebar />
            </aside>
            <main className="flex-1 overflow-y-auto p-4">
              {children}
            </main>
            <aside className="hidden lg:block w-80 bg-gray-100 p-4 overflow-y-auto flex-shrink-0">
              <RightSidebar />
            </aside>
          </div>
        </div>
      </body>
    </html>
    </>
  );
}
