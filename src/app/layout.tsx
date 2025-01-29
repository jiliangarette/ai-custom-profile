import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Open_Sans, Roboto_Mono } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-opensans",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Your AI Profile | Personalized Digital Presence",
  description:
    "Create an AI-powered digital presence that truly represents you or your business. Share knowledge, answer questions, and engage authentically.",
  icons: {
    icon: "/bot.svg",
  },
  openGraph: {
    title: "Your AI Profile | Personalized Digital Presence",
    description:
      "Create an AI-powered digital presence that truly represents you or your business. Share knowledge, answer questions, and engage authentically.",
    url: "https://your-website-url.com",
    images: "/bot.svg",
    siteName: "Your AI Profile",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your AI Profile | Personalized Digital Presence",
    description:
      "Create an AI-powered digital presence that truly represents you or your business. Share knowledge, answer questions, and engage authentically.",
    images: "/bot.svg",
    creator: "@yourtwitterhandle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${robotoMono.variable} font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
