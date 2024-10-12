import React from "react";
import { Inter } from "next/font/google";
import { Newsreader } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  style: ["normal", "italic"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "swap",
});

const fanwood = localFont({
  src: [
    {
      path: "../public/fonts/fanwood_text-webfont.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/fanwood_text_italic-webfont.woff",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-fanwood",
});

const SMGoudy = localFont({
    src: [
      {
        path: "../public/fonts/GoudyStM-webfont.woff",
        weight: "400",
        style: "normal",
      },
      {
        path: "../public/fonts/GoudyStM-Italic-webfont.woff",
        weight: "400",
        style: "italic",
      },
    ],
    variable: "--font-SMGoudy",
  });

export const metadata = {
  title: "MaoMiu",
  description: "Chinese practice worksheet generator",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} ${fanwood.variable}  ${SMGoudy.variable}`}
    >
      <body className="min-h-screen">
        <main>{children}</main>
      </body>
    </html>
  );
}
