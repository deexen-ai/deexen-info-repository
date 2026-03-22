"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0e0d0b] border-t border-[rgba(255,255,255,0.06)] py-10 px-12 flex items-center justify-between mt-auto">
      <Link href="/" className="font-sans text-[15px] font-medium text-[rgba(255,255,255,0.6)] no-underline tracking-[-0.02em]">Deexen AI</Link>
      <ul className="footer-links flex gap-7 list-none">
        <li><Link href="/#home" className="text-[13px] text-[rgba(255,255,255,0.3)] no-underline hover:text-[rgba(255,255,255,0.7)] transition-colors">Product</Link></li>
        <li><Link href="/careers" className="text-[13px] text-[rgba(255,255,255,0.3)] no-underline hover:text-[rgba(255,255,255,0.7)] transition-colors">Careers</Link></li>
      </ul>
      <span className="footer-copy font-mono text-[12px] text-[rgba(255,255,255,0.2)]">© 2025 Deexen AI</span>
    </footer>
  );
}
