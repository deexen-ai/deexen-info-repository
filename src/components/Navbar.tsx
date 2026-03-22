"use client";

import Link from "next/link";
import { useState } from "react";
import { useWaitlist } from "@/context/WaitlistContext";

export default function Navbar() {
  const { openModal } = useWaitlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 h-16 transition-colors duration-300 ${isMenuOpen ? "bg-[#f8f7f4]" : "bg-[#f8f7f4]/85 backdrop-blur-md border-b border-[rgba(68,119,148,0.12)]"}`}>
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2 text-[17px] font-medium tracking-[-0.02em] text-[#0e0d0b] no-underline z-[110]">
          <img src="/deexenlogo.png" alt="Deexen" className="w-8 h-8" />
          Deexen AI
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-9 list-none">
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

        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 p-2 z-[110] border-none bg-transparent cursor-pointer"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-[#0e0d0b] transition-transform ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-[#0e0d0b] transition-opacity ${isMenuOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-[#0e0d0b] transition-transform ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#f8f7f4] z-[90] transition-transform duration-500 ease-in-out md:hidden flex flex-col pt-24 px-8 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <ul className="flex flex-col gap-8 list-none p-0">
          <li><Link href="/#how" onClick={closeMenu} className="text-[24px] font-serif text-[#0e0d0b] no-underline">How it works</Link></li>
          <li><Link href="/#features" onClick={closeMenu} className="text-[24px] font-serif text-[#0e0d0b] no-underline">Features</Link></li>
          <li><Link href="/#cta" onClick={closeMenu} className="text-[24px] font-serif text-[#0e0d0b] no-underline">Vision</Link></li>
          <li><Link href="/careers" onClick={closeMenu} className="text-[24px] font-serif text-[#0e0d0b] no-underline">Careers</Link></li>
        </ul>
        <div className="mt-auto pb-12">
          <button 
            onClick={() => { closeMenu(); openModal(); }} 
            className="w-full bg-[#447794] text-white py-4 rounded-full text-[16px] font-medium border-none shadow-lg"
          >
            Request Early Access
          </button>
        </div>
      </div>
    </>
  );
}
