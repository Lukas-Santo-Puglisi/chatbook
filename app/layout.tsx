import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const IBMPlex = IBM_Plex_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600',  '700'],
  variable: '--font-ibm-plex'
 });

export const metadata: Metadata = {
  title: "Chatbook",
  description: "Share your AI Adventures with the World!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-IBMPlex antialised", IBMPlex.variable )}>{children}</body>
      {children }
    </html>
  );
}
