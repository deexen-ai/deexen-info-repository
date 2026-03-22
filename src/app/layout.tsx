import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { WaitlistProvider } from "@/context/WaitlistContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaitlistPopup from "@/components/WaitlistPopup";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
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
        className={`${dmSans.variable} ${dmMono.variable} ${instrumentSerif.variable} antialiased min-h-screen flex flex-col`}
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
