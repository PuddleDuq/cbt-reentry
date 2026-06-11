import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReFrame — CBT for Reentry",
  description:
    "A cognitive behavioral therapy tool to support successful community reentry.",
};

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`} style={{ colorScheme: "light" }}>
      <body className="min-h-full flex">
        <Sidebar />
        <MobileNav />
        <main className="flex-1 md:ml-60 p-6 pt-16 md:pt-8 md:p-8 max-w-4xl">
          {children}
        </main>
      </body>
    </html>
  );
}
