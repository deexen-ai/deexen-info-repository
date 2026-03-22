"use client";

import { useWaitlist } from "@/context/WaitlistContext";

export default function WaitlistPopup() {
  const { isModalOpen, closeModal, submitting, isSubmitted, email, setEmail, handleSubmit } = useWaitlist();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div 
        className="absolute inset-0 bg-[#0e0d0b]/40 backdrop-blur-sm animate-[fadeIn_0.3s_ease_forwards]"
        onClick={closeModal}
      />
      <div className="relative w-full max-w-[440px] bg-white rounded-3xl p-10 shadow-[0_24px_64px_rgba(0,0,0,0.15)] overflow-hidden animate-[scaleIn_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]">
        {!isSubmitted ? (
          <div className="text-center">
            <div className="w-14 h-14 bg-[#f8f7f4] border border-[rgba(68,119,148,0.12)] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0e0d0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </div>
            <h3 className="font-serif text-[32px] font-normal leading-tight text-[#0e0d0b] mb-3">Request Early Access</h3>
            <p className="text-[15px] text-[#52525b] mb-8 font-light">Be the first to build with the most intelligent development ecosystem. We&apos;ll notify you locally.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input 
                type="email" 
                required 
                placeholder="Enter your email" 
                className="w-full h-12 px-5 rounded-full bg-[#f8f7f4] border border-[rgba(68,119,148,0.2)] text-[15px] focus:outline-none focus:border-[#2D5B75]/40 focus:ring-4 focus:ring-[#2D5B75]/5 transition-all text-[#0e0d0b]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                disabled={submitting}
                className="w-full h-12 bg-[#447794] text-white rounded-full text-[15px] font-medium hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Join waitlist"
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center animate-[fadeUp_0.5s_ease_forwards]">
            <div className="w-16 h-16 bg-[#28c840]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#28c840" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-serif text-[32px] font-normal leading-tight text-[#0e0d0b] mb-3">You&apos;re on the list!</h3>
            <p className="text-[15px] text-[#52525b] mb-8 font-light">Thank you for your interest. We&apos;ll reach out to <strong>{email}</strong> when we&apos;re ready to onboard you.</p>
            <button 
              onClick={closeModal}
              className="w-full h-12 border border-[rgba(68,119,148,0.2)] text-[#0e0d0b] rounded-full text-[15px] font-medium hover:bg-[#f8f7f4] transition-all"
            >
              Close
            </button>
          </div>
        )}
        <button 
          onClick={closeModal}
          className="absolute top-6 right-6 p-2 text-[#8fb6cc] hover:text-[#0e0d0b] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
