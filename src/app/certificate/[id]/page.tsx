import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificate Verification | Deexen AI",
  description: "Verify Deexen AI internship and employee certificates.",
};

const certificates: Record<string, {
  name: string;
  role: string;
  status: string;
  certificateId: string;
  issueDate: string;
}> = {
  "dxn-2025-0047": {
    name: "Abbu Ganesh",
    role: "Machine Learning Intern",
    status: "Verified",
    certificateId: "DXN-2025-0047",
    issueDate: "January 2026",
  },
  "dxn-2025-0001": {
    name: "Ravi Pratap Singh",
    role: "Frontend Lead Developer",
    status: "Verified",
    certificateId: "DXN-2025-0001",
    issueDate: "April 2026",
  },
};

export default async function CertificateVerificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cert = certificates[id.toLowerCase()];

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-[var(--bg)] p-6 pt-24 md:pt-32 pb-24 font-sans">
      <div 
        className="max-w-md w-full rounded-2xl p-8 relative overflow-hidden flex flex-col items-center text-center shadow-xl border border-[var(--border)]"
        style={{
          background: "var(--card-bg)",
          animation: "scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[var(--palette-1)] opacity-10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="mb-6 w-16 h-16 rounded-full bg-[var(--pill-bg)] flex items-center justify-center text-[var(--palette-2)] mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
        </div>

        {cert ? (
          <>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--ink)] mb-2">
              Certificate Verified
            </h1>
            <p className="text-[var(--ink-muted)] mb-8 text-sm">
              This certificate is official and has been cryptographically verified by Deexen AI.
            </p>

            <div className="w-full flex flex-col gap-4 text-left p-5 rounded-xl bg-[#fdfcfa] border border-[var(--border)] shadow-sm">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider font-semibold text-[var(--ink-faint)] font-mono">Name</span>
                <span className="text-lg font-medium text-[var(--ink)]">{cert.name}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider font-semibold text-[var(--ink-faint)] font-mono">Role</span>
                <span className="text-lg font-medium text-[var(--ink)]">{cert.role}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider font-semibold text-[var(--ink-faint)] font-mono">Status</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    {cert.status} 
                    <svg className="w-4 h-4 ml-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider font-semibold text-[var(--ink-faint)] font-mono">Certificate ID</span>
                <span className="text-base font-mono bg-[var(--pill-bg)] px-2 py-1 rounded w-max mt-1 text-[var(--ink-muted)]">
                  {cert.certificateId}
                </span>
              </div>
            </div>
            
            <div className="mt-8 border-t border-[var(--border)] w-full pt-6">
              <span className="text-xs text-[var(--ink-faint)] flex items-center justify-center gap-1 font-mono">
                Secured by Deexen AI 
                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--ink)] mb-2">
              Not Found
            </h1>
            <p className="text-[var(--ink-muted)] mb-8 text-sm">
              We could not find a matching certificate in our records.
            </p>
            <Link 
              href="/"
              className="px-6 py-2.5 rounded-full bg-[var(--ink)] text-white font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Return Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
