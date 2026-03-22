"use client";

import Link from "next/link";
import { useWaitlist } from "@/context/WaitlistContext";

export default function Navbar() {
  const { openModal } = useWaitlist();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 h-16 bg-[#f8f7f4]/85 backdrop-blur-md border-b border-[rgba(68,119,148,0.12)]">
      <Link href="/" className="flex items-center gap-2 text-[17px] font-medium tracking-[-0.02em] text-[#0e0d0b] no-underline">
        <img src="/deexenlogo.png" alt="Deexen" className="w-8 h-8" />
        Deexen AI
      </Link>
      <ul className="flex items-center gap-9 list-none">
        <li><Link href="/#how" className="text-[14px] text-[#52525b] no-underline hover:text-[#0e0d0b] transition-colors">How it works</Link></li>
        <li><Link href="/#features" className="text-[14px] text-[#52525b] no-underline hover:text-[#0e0d0b] transition-colors">Features</Link></li>
        <li><Link href="/#cta" className="text-[14px] text-[#52525b] no-underline hover:text-[#0e0d0b] transition-colors">Vision</Link></li>
        <li>
          <Link href="/careers" className="text-[13px] font-medium text-[#447794] border border-[#447794]/20 bg-[#447794]/5 px-4 py-2 rounded-full no-underline hover:bg-[#447794]/10 transition-all flex items-center gap-1.5 group">
            Careers
            <span className="w-1.5 h-1.5 bg-[#447794] rounded-full animate-pulse group-hover:scale-125 transition-transform"></span>
          </Link>
        </li>
        <li><button onClick={openModal} className="nav-cta bg-[#447794] text-white px-5 py-2 rounded-full text-[14px] font-medium no-underline hover:opacity-80 transition-opacity cursor-pointer border-none shadow-none">Early Access</button></li>
      </ul>
    </nav>
  );
}
