import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carly AI - Automotive Dealership AI Assistant",
  description: "Experience the future of automotive sales with Carly and Carlyle, your AI-powered dealership assistants.",
  keywords: ["AI", "automotive", "dealership", "voice assistant", "car sales", "artificial intelligence"],
  authors: [{ name: "Carly AI Team" }],
  openGraph: {
    title: "Carly AI - Transform Your Dealership with AI",
    description: "Meet Carly and Carlyle, AI assistants revolutionizing automotive sales",
    type: "website",
    locale: "en_US",
    siteName: "Carly AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
