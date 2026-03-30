import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Big Folwing — Football Meets Bowling Pins",
  description:
    "Austin's first mobile fowling experience. Throw a football, knock down pins, have the time of your life. Bar activations, private events, corporate team building. The Pins Abide.",
  keywords: [
    "fowling Austin",
    "football bowling Austin",
    "bar games Austin",
    "corporate team building Austin",
    "The Big Folwing",
    "Woolf Ventures",
    "Austin entertainment",
    "patio games Austin",
  ],
  openGraph: {
    title: "The Big Folwing — Football Meets Bowling Pins",
    description:
      "Austin's first mobile fowling experience. Bar activations, private events, corporate team building. The Pins Abide.",
    type: "website",
    locale: "en_US",
    siteName: "The Big Folwing",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1 pt-16 sm:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
