"use client";

import { useState, useEffect } from "react";

export default function Careers() {
  return (
    <div className="bg-[#f8f7f4] min-h-screen selection:bg-[#447794]/20">

      <main className="min-h-[calc(100vh-64px)] flex items-center pt-16 pb-12 px-12">
        <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="animate-[fadeUp_0.8s_ease_0.35s_forwards] opacity-0">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-[#447794] border border-[rgba(68,119,148,0.12)] px-3.5 py-1.5 rounded-full bg-[rgba(68,119,148,0.05)] mb-8">
              Careers at Deexen
            </div>
            
            <h1 className="font-serif text-[clamp(48px,5.5vw,72px)] font-normal leading-[1.05] tracking-[-0.02em] text-[#0e0d0b]">
              Build the future,<br /><em className="italic text-[#447794]">from India to the world.</em>
            </h1>
          </div>

          <div className="animate-[fadeUp_0.8s_ease_0.5s_forwards] opacity-0">
            <div className="space-y-6 text-[18px] font-light text-[#52525b] leading-[1.7] mb-12">
              <p>
                We believe the next era of intelligent software won&apos;t be dictated by the same old paradigms of Silicon Valley. We are building the most intelligent development platform on the planet, and we are doing it right here in India.
              </p>
              <p>
                Deexen AI is for engineers who crave autonomy, complexity, and the chance to redefine how humans interact with code.
              </p>
              <p className="font-medium text-[#0e0d0b]">
                If you think you are a right fit and are open to building the future from India, we want to hear from you.
              </p>
            </div>

            <a 
              href="mailto:careers@deexen.com?subject=I'm%20the%20right%20fit%20for%20Deexen" 
              className="inline-flex items-center gap-3 bg-[#447794] text-white px-10 py-5 rounded-full text-[17px] font-medium no-underline hover:opacity-90 hover:-translate-y-1 transition-all shadow-[0_20px_40px_rgba(68,119,148,0.2)]"
            >
              Write to us
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </a>
          </div>
        </div>
      </main>

    </div>
  );
}
