import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DoorStep IT | Expert IT Support at Your Door",
  description:
    "Professional door-to-door IT services. Computer repair, network setup, data recovery, and tech support — we come to you.",
  keywords: [
    "door to door IT service",
    "home computer repair",
    "IT support at home",
    "laptop repair near me",
    "network setup",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen antialiased font-sans bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}