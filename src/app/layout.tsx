import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NotificationProvider from "@/components/NotificationProvider";
import AuthProvider from "@/components/AuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Hell Heaven AI",
  description:
    "A dynamic chatbot experience where users engage with both a devil and an angel, offering contrasting perspectives in a balanced, engaging conversation.",
  openGraph: {
    title: "Hell Heaven AI",
    description:
      "A dynamic chatbot experience where users engage with both a devil and an angel, offering contrasting perspectives in a balanced, engaging conversation.",
    url: "https://heaven-hell-ai.vercel.app",
    images: [
      {
        url: "https://heaven-hell-ai.vercel.app/preview.jpg",
        width: 800,
        height: 600,
        alt: "heaven-hell-ai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@example",
    title: "Hell Heaven AI",
    description:
      "A dynamic chatbot experience where users engage with both a devil and an angel, offering contrasting perspectives in a balanced, engaging conversation.",
    images: [
      {
        url: "https://heaven-hell-ai.vercel.app/preview.jpg",
        width: 800,
        height: 600,
        alt: "heaven-hell-ai",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black  overflow-hidden`}
      >
        <AuthProvider>
          <NotificationProvider>
            <Navbar />
            {children}
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
