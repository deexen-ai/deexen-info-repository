import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Mono } from "next/font/google";
import "./globals.css";
import { WaitlistProvider } from "@/context/WaitlistContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaitlistPopup from "@/components/WaitlistPopup";

const sfPro = localFont({
  src: "../../public/fonts/SFPRODISPLAYREGULAR.otf",
  variable: "--font-sans",
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
});


export const metadata: Metadata = {
  title: "Deexen AI — The Intelligent Development Platform",
  description: "Code, debug, deploy — all inside one intelligent environment. AI that observes your work in real time and guides you exactly when you need it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${sfPro.variable} ${dmMono.variable} antialiased min-h-screen flex flex-col`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <WaitlistProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <WaitlistPopup />
        </WaitlistProvider>
      </body>
    </html>
  );
}
