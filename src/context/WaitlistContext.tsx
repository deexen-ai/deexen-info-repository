"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import confetti from "canvas-confetti";

interface WaitlistContextType {
  isModalOpen: boolean;
  submitting: boolean;
  isSubmitted: boolean;
  email: string;
  setEmail: (email: string) => void;
  openModal: (e?: React.MouseEvent) => void;
  closeModal: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const openModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsModalOpen(true);
    setIsSubmitted(false);
    setEmail("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch("/api/notion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitting(false);
        setIsSubmitted(true);
        confetti();
      } else {
        const data = await response.json();
        alert(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to join waitlist. Please check your connection.");
      setSubmitting(false);
    }
  };

  return (
    <WaitlistContext.Provider value={{
      isModalOpen,
      submitting,
      isSubmitted,
      email,
      setEmail,
      openModal,
      closeModal,
      handleSubmit
    }}>
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (context === undefined) {
    throw new Error("useWaitlist must be used within a WaitlistProvider");
  }
  return context;
}
