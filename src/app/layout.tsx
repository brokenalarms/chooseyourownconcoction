import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CsvDataProvider } from '../context/csvDataContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Choose Your Own Concoction",
  description: "Presented by Cali Craft Concoctions.",
  icons: {
    icon: [
      { rel: 'icon', url: '/assets/Cali Craft Concoctions - Main Logo.png' }, // Default favicon
      { rel: 'icon', url: '/assets/Cali Craft Concoctions - Main Logo_Inverted.png', media: '(prefers-color-scheme: dark)' } // Dark mode favicon
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
      <CsvDataProvider>
        <body className={inter.className}>{children}</body>
      </CsvDataProvider>
    </html>
  );
}
