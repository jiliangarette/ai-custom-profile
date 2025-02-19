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
  title: "Your AI Profile",
  description:
    "A customizable AI profile system that allows users to personalize AI-generated personas.",
  icons: {
    icon: "/bot.svg",
  },
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Your AI Profile | Personalized Digital Presence",
    description:
      "A customizable AI profile system that allows users to personalize AI-generated personas, integrating dynamic responses and personality traits.",
    url: "https://aiprofile.sbs",
    images: "/bot.svg",
    siteName: "Your AI Profile",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your AI Profile ",
    description:
      "A customizable AI profile system that allows users to personalize AI-generated personas, integrating dynamic responses and personality traits.",
    images: "/bot.svg",
    creator: "@jilian.dev",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${robotoMono.variable} font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
