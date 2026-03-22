"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      w: number;
      h: number;
      angle: number;
      color: string;
      opacity: number;
      speed: number;
      drift: number;
    }> = [];
    let w = 0;
    let h = 0;

    const colors = ["#447794", "#2D5B75", "#123249", "#a78bfa", "#f472b6", "#34d399"];

    function randomColor() {
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function resize() {
      if (!canvas) return;
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }

    function initParticles() {
      particles = [];
      const count = Math.floor((w * h) / 14000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          w: 2 + Math.random() * 4,
          h: 6 + Math.random() * 10,
          angle: (Math.random() - 0.5) * Math.PI * 0.6,
          color: randomColor(),
          opacity: 0.12 + Math.random() * 0.25,
          speed: 0.08 + Math.random() * 0.15,
          drift: (Math.random() - 0.5) * 0.03,
        });
      }
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, p.w / 2);
        ctx.fill();
        ctx.restore();

        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -20) {
          p.y = h + 20;
          p.x = Math.random() * w;
        }
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
      }
      requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();

    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });

    return () => {
      window.removeEventListener("resize", () => {
        resize();
        initParticles();
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

function RevealWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${isVisible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleOpenModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsModalOpen(true);
    setIsSubmitted(false);
    setEmail("");
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
  // Scroll reveal effect
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>

      {/* HERO */}
      <section id="home" className="hero relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
        <ParticleCanvas />

        <div className="hero-eyebrow inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-[#447794] border border-[rgba(68,119,148,0.12)] px-3.5 py-1.5 rounded-full bg-[rgba(68,119,148,0.05)] mb-10 opacity-0 translate-y-3 animate-[fadeUp_0.7s_ease_0.2s_forwards]">
          <span className="w-1.5 h-1.5 bg-[#447794] rounded-full animate-[pulse_2s_ease-in-out_infinite]"></span>
          Intelligent Development Platform
        </div>

        <h1 className="font-serif text-[clamp(52px,7vw,96px)] font-normal leading-[1.05] tracking-[-0.02em] text-[#0e0d0b] max-w-[820px] mb-7 opacity-0 translate-y-4 animate-[fadeUp_0.8s_ease_0.35s_forwards]">
          The IDE that thinks<br /><em className="italic text-[#447794]">while you build</em>
        </h1>

        <p className="text-[18px] font-light text-[#52525b] max-w-[480px] leading-[1.65] mb-12 opacity-0 translate-y-4 animate-[fadeUp_0.8s_ease_0.5s_forwards]">
          Code, debug, deploy — all inside one intelligent environment. AI that observes your work in real time and guides you exactly when you need it.
        </p>

        <div className="flex items-center gap-3 opacity-0 translate-y-4 animate-[fadeUp_0.8s_ease_0.65s_forwards]">
          <button onClick={handleOpenModal} className="btn-primary bg-[#447794] text-white px-7 py-3.5 rounded-full text-[15px] font-medium no-underline inline-flex items-center gap-2 hover:opacity-85 hover:-translate-y-0.5 transition-all tracking-[-0.01em] border-none cursor-pointer">
            Request Early Access
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <a href="#how" className="btn-secondary bg-transparent text-[#52525b] px-6 py-3.5 rounded-full text-[15px] font-normal no-underline border border-[rgba(68,119,148,0.12)] hover:text-[#0e0d0b] hover:border-[rgba(68,119,148,0.25)] transition-all tracking-[-0.01em]">See how it works</a>
        </div>

        {/* IDE MOCKUP */}
        <div className="hero-mockup mt-20 w-full max-w-[1100px] rounded-2xl border border-[rgba(68,119,148,0.12)] bg-[#111110] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.05)] opacity-0 translate-y-6 animate-[fadeUp_1s_ease_0.8s_forwards]">
          <div className="mockup-bar bg-[#1a1918] px-5 py-3.5 flex items-center gap-3 border-b border-[rgba(255,255,255,0.05)]">
            <div className="traffic-lights flex gap-1.5">
              <div className="tl w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
              <div className="tl w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
              <div className="tl w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
            </div>
            <span className="mockup-file font-mono text-[12px] text-[rgba(255,255,255,0.35)]">src / api / handler.ts</span>
            <div className="mockup-tabs flex gap-0 ml-auto">
              <div className="mtab active font-mono text-[11px] text-[rgba(255,255,255,0.7)] bg-[rgba(255,255,255,0.07)] px-3.5 py-1 rounded">handler.ts</div>
              <div className="mtab font-mono text-[11px] text-[rgba(255,255,255,0.3)] px-3.5 py-1 rounded">routes.ts</div>
              <div className="mtab font-mono text-[11px] text-[rgba(255,255,255,0.3)] px-3.5 py-1 rounded">deploy.yml</div>
            </div>
          </div>
          <div className="mockup-body grid grid-cols-[200px_1fr_260px] h-[580px]">
            <div className="mockup-sidebar bg-[#161614] border-r border-[rgba(255,255,255,0.04)] py-4 text-left">
              <div className="sidebar-section px-4 mb-4">
                <div className="sidebar-label font-mono text-[10px] tracking-[0.1em] uppercase text-[rgba(255,255,255,0.2)] mb-2">Explorer</div>
                <div className="sidebar-item active flex items-center gap-2 font-mono text-[12px] text-[rgba(255,255,255,0.75)] px-2 py-1 rounded cursor-pointer bg-[rgba(255,255,255,0.05)]">
                  <div className="file-dot ts w-1.5 h-1.5 rounded-sm bg-[#3178c6]"></div>handler.ts
                </div>
                <div className="sidebar-item flex items-center gap-2 font-mono text-[12px] text-[rgba(255,255,255,0.4)] px-2 py-1 rounded cursor-pointer hover:bg-[rgba(255,255,255,0.05)] hover:text-[rgba(255,255,255,0.75)] transition-all">
                  <div className="file-dot ts w-1.5 h-1.5 rounded-sm bg-[#3178c6]"></div>routes.ts
                </div>
                <div className="sidebar-item flex items-center gap-2 font-mono text-[12px] text-[rgba(255,255,255,0.4)] px-2 py-1 rounded cursor-pointer hover:bg-[rgba(255,255,255,0.05)] hover:text-[rgba(255,255,255,0.75)] transition-all">
                  <div className="file-dot jsx w-1.5 h-1.5 rounded-sm bg-[#61dafb]"></div>App.tsx
                </div>
                <div className="sidebar-item flex items-center gap-2 font-mono text-[12px] text-[rgba(255,255,255,0.4)] px-2 py-1 rounded cursor-pointer hover:bg-[rgba(255,255,255,0.05)] hover:text-[rgba(255,255,255,0.75)] transition-all">
                  <div className="file-dot json w-1.5 h-1.5 rounded-sm bg-[#f7df1e]"></div>package.json
                </div>
                <div className="sidebar-item flex items-center gap-2 font-mono text-[12px] text-[rgba(255,255,255,0.4)] px-2 py-1 rounded cursor-pointer hover:bg-[rgba(255,255,255,0.05)] hover:text-[rgba(255,255,255,0.75)] transition-all">
                  <div className="file-dot css w-1.5 h-1.5 rounded-sm bg-[#ff6b9d]"></div>global.css
                </div>
              </div>
              <div className="sidebar-section px-4">
                <div className="sidebar-label font-mono text-[10px] tracking-[0.1em] uppercase text-[rgba(255,255,255,0.2)] mb-2">Git</div>
                <div className="sidebar-item flex items-center gap-2 font-mono text-[12px] text-[rgba(255,255,255,0.4)] px-2 py-1 rounded cursor-pointer hover:bg-[rgba(255,255,255,0.05)] hover:text-[rgba(255,255,255,0.75)] transition-all">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                    <circle cx="6" cy="6" r="2" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
                    <path d="M6 1v3M6 8v3M1 6h3M8 6h3" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
                  </svg>
                  main · 3 changes
                </div>
              </div>
            </div>

            <div className="mockup-editor px-6 py-5 font-mono text-[13px] leading-[1.7] text-[rgba(255,255,255,0.75)] overflow-hidden relative text-left">
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">1</span> <span className="cm text-[rgba(255,255,255,0.25)]">// Deexen AI — analyzing structure...</span></div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">2</span></div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">3</span> <span className="kw text-[#c792ea]">import</span> <span className="op text-[#89ddff]">{'{'} Request, Response {'}'}</span> <span className="kw text-[#c792ea]">from</span> <span className="str text-[#c3e88d]">{'express'}</span></div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">4</span> <span className="kw text-[#c792ea]">import</span> <span className="op text-[#89ddff]">{'{'} db {'}'}</span> <span className="kw text-[#c792ea]">from</span> <span className="str text-[#c3e88d]">{'../db'}</span></div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">5</span></div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">6</span> <span className="kw text-[#c792ea]">export async function</span> <span className="fn text-[#82aaff]">createUser</span>(</div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">7</span> &nbsp; req<span className="op text-[#89ddff]">:</span> <span className="tp text-[#ffcb6b]">Request</span>, res<span className="op text-[#89ddff]">:</span> <span className="tp text-[#ffcb6b]">Response</span></div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">8</span> ) <span className="op text-[#89ddff]">{'{'}</span></div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">9</span> &nbsp; <span className="kw text-[#c792ea]">const</span> <span className="op text-[#89ddff]">{'{'} email, name {'}'}</span> = req.body</div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">10</span></div>
              <div style={{ paddingLeft: 0 }}>
                <div className="ai-suggestion mt-1.5 bg-[rgba(45,91,117,0.12)] border-l-2 border-[rgba(45,91,117,0.6)] px-2.5 py-1.5 rounded-r relative">
                  <div className="ai-tag absolute -top-2.25 right-2 text-[9px] font-mono tracking-[0.08em] uppercase text-[rgba(45,91,117,0.8)] bg-[#111110] px-1.5 py-0.5 rounded border border-[rgba(45,91,117,0.2)]">Deexen AI</div>
                  <span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">11</span> &nbsp; <span className="kw text-[#c792ea]">const</span> exists = <span className="kw text-[#c792ea]">await</span> db.<span className="fn text-[#82aaff]">user</span>.<span className="fn text-[#82aaff]">findUnique</span>(<span className="op text-[#89ddff]">{'{'} where{'{'}</span> email <span className="op text-[#89ddff]">{'}'} {'}'}</span>)
                </div>
              </div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">12</span> &nbsp; <span className="kw text-[#c792ea]">if</span> (exists) <span className="kw text-[#c792ea]">return</span> res.<span className="fn text-[#82aaff]">status</span>(<span className="num text-[#f78c6c]">409</span>).<span className="fn text-[#82aaff]">json</span>(<span className="op text-[#89ddff]">{'{'}…{'}'}</span>)</div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">13</span></div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">14</span> &nbsp; <span className="kw text-[#c792ea]">try</span> <span className="op text-[#89ddff]">{'{'}</span></div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">15</span> &nbsp; &nbsp; <span className="kw text-[#c792ea]">const</span> newUser = <span className="kw text-[#c792ea]">await</span> db.<span className="fn text-[#82aaff]">user</span>.<span className="fn text-[#82aaff]">create</span>(<span className="op text-[#89ddff]">{'{'}</span></div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">16</span> &nbsp; &nbsp; &nbsp; data<span className="op text-[#89ddff]">:</span> <span className="op text-[#89ddff]">{'{'}</span> email, name <span className="op text-[#89ddff]">{'}'}</span></div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">17</span> &nbsp; &nbsp; <span className="op text-[#89ddff]">{'}'}</span>)</div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">18</span></div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">19</span> &nbsp; &nbsp; <span className="kw text-[#c792ea]">return</span> res.<span className="fn text-[#82aaff]">status</span>(<span className="num text-[#f78c6c]">201</span>).<span className="fn text-[#82aaff]">json</span>(newUser)</div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">20</span> &nbsp; <span className="op text-[#89ddff]">{'}'}</span> <span className="kw text-[#c792ea]">catch</span> (error) <span className="op text-[#89ddff]">{'{'}</span></div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">21</span> &nbsp; &nbsp; <span className="kw text-[#c792ea]">return</span> res.<span className="fn text-[#82aaff]">status</span>(<span className="num text-[#f78c6c]">500</span>).<span className="fn text-[#82aaff]">json</span>(<span className="op text-[#89ddff]">{'{'}</span> message<span className="op text-[#89ddff]">:</span> <span className="str text-[#c3e88d]">{'Internal Error'}</span> <span className="op text-[#89ddff]">{'}'}</span>)</div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">22</span> &nbsp; <span className="op text-[#89ddff]">{'}'}</span></div>
              <div><span className="ln text-[rgba(255,255,255,0.15)] inline-block w-6 select-none">23</span> <span className="op text-[#89ddff]">{'}'}</span></div>
            </div>

            <div className="mockup-ai-panel bg-[#131312] border-l border-[rgba(255,255,255,0.04)] flex flex-col p-4 gap-2.5 overflow-hidden">
              <div className="ai-panel-header font-mono text-[10px] tracking-[0.1em] uppercase text-[rgba(45,91,117,0.7)] flex items-center gap-1.5 mb-1">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" fill="rgba(45,91,117,0.6)" /></svg>
                Deexen Intelligence
              </div>
              <div className="ai-bubble bg-[rgba(255,255,255,0.04)] rounded-lg p-3 text-[12px] text-[rgba(255,255,255,0.6)] leading-[1.55] border border-[rgba(255,255,255,0.04)]">
                Detected duplicate email scenario — added uniqueness check before insert.
              </div>
              <div className="ai-bubble assistant bg-[rgba(45,91,117,0.1)] rounded-lg p-3 text-[12px] text-[rgba(255,255,255,0.75)] leading-[1.55] border border-[rgba(45,91,117,0.15)]">
                <strong className="text-[rgba(45,91,117,0.9)] font-medium">Suggestion:</strong> Add rate limiting to this endpoint. High-frequency signups can indicate abuse. Want me to scaffold it?<span className="typing-cursor inline-block w-1.5 h-3 bg-[#2D5B75] align-middle ml-0.5 rounded-sm animate-[blink_1s_step-end_infinite]"></span>
              </div>
              <div className="ai-bubble assistant bg-[rgba(45,91,117,0.1)] rounded-lg p-3 text-[12px] text-[rgba(255,255,255,0.75)] leading-[1.55] border border-[rgba(45,91,117,0.15)]">
                <strong className="text-[rgba(45,91,117,0.9)] font-medium">Performance:</strong> The query on line 11 could be optimized with a selective index on the `email` field.
              </div>
              <div className="ai-bubble mt-auto bg-[rgba(255,255,255,0.02)] rounded-lg p-3 border border-[rgba(255,255,255,0.04)]">
                <span className="text-[rgba(255,255,255,0.2)] text-[11px] font-mono tracking-[0.06em]">DEPLOY READY · 0 errors · 1 warning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how bg-white border-t border-b border-[rgba(68,119,148,0.12)] py-30 px-12" id="how">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex justify-between items-end mb-18 reveal">
            <div>
              <p className="section-label font-mono text-[11px] tracking-[0.12em] uppercase text-[#8fb6cc] mb-4">How it works</p>
              <h2 className="section-title font-serif text-[clamp(36px,4.5vw,58px)] font-normal leading-[1.1] tracking-[-0.02em] text-[#0e0d0b] max-w-[640px]">
                From code to deploy,<br /><em className="italic text-[#447794]">without switching tabs</em>
              </h2>
            </div>
            <p className="how-desc text-[16px] text-[#52525b] max-w-[360px] leading-[1.65] font-light">Deexen AI unifies every layer of your development workflow into a single intelligent environment. No more tool-hopping.</p>
          </div>

          <div className="steps grid grid-cols-3 gap-px bg-[rgba(68,119,148,0.12)] border border-[rgba(68,119,148,0.12)] rounded-2xl overflow-hidden reveal">
            <div className="step bg-white p-10 relative hover:bg-[#f8f7f4] transition-colors">
              <div className="step-num font-mono text-[11px] text-[#8fb6cc] tracking-[0.08em] mb-6">01</div>
              <div className="step-icon w-10 h-10 rounded-[10px] bg-[rgba(68,119,148,0.05)] border border-[rgba(68,119,148,0.12)] flex items-center justify-center mb-5">
                <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="w-4.5 h-4.5 text-[#0e0d0b]">
                  <polyline points="3,6 7,10 3,14" /><line x1="10" y1="14" x2="15" y2="14" />
                </svg>
              </div>
              <h3 className="font-sans text-[17px] font-medium text-[#0e0d0b] tracking-[-0.02em] mb-2.5">Write code naturally</h3>
              <p className="text-[14px] text-[#52525b] leading-[1.65] font-light">Open your project and write code as you normally would. Deexen observes your logic, structure, and patterns in real time — no prompting required.</p>
            </div>
            <div className="step bg-white p-10 relative hover:bg-[#f8f7f4] transition-colors">
              <div className="step-num font-mono text-[11px] text-[#8fb6cc] tracking-[0.08em] mb-6">02</div>
              <div className="step-icon w-10 h-10 rounded-[10px] bg-[rgba(68,119,148,0.05)] border border-[rgba(68,119,148,0.12)] flex items-center justify-center mb-5">
                <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="w-4.5 h-4.5 text-[#0e0d0b]">
                  <circle cx="9" cy="9" r="6" /><path d="M9 6v3l2 2" />
                </svg>
              </div>
              <h3 className="font-sans text-[17px] font-medium text-[#0e0d0b] tracking-[-0.02em] mb-2.5">AI guides in context</h3>
              <p className="text-[14px] text-[#52525b] leading-[1.65] font-light">Contextual suggestions, error explanations, and architectural guidance appear inline — tied directly to what you&apos;re building right now.</p>
            </div>
            <div className="step bg-white p-10 relative hover:bg-[#f8f7f4] transition-colors">
              <div className="step-num font-mono text-[11px] text-[#8fb6cc] tracking-[0.08em] mb-6">03</div>
              <div className="step-icon w-10 h-10 rounded-[10px] bg-[rgba(68,119,148,0.05)] border border-[rgba(68,119,148,0.12)] flex items-center justify-center mb-5">
                <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="w-4.5 h-4.5 text-[#0e0d0b]">
                  <path d="M3 12l3-3 3 3 6-6" /><circle cx="15" cy="6" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <h3 className="font-sans text-[17px] font-medium text-[#0e0d0b] tracking-[-0.02em] mb-2.5">Commit, deploy, ship</h3>
              <p className="text-[14px] text-[#52525b] leading-[1.65] font-light">Push to Git and deploy your project with a single action. Connect your domain without touching a separate dashboard or config file.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-30 px-12 bg-[#f8f7f4]">
        <div className="features max-w-[1100px] mx-auto">
          <div className="features-header mb-18 reveal">
            <p className="section-label font-mono text-[11px] tracking-[0.12em] uppercase text-[#8fb6cc] mb-4">Capabilities</p>
            <h2 className="section-title font-serif text-[clamp(36px,4.5vw,58px)] font-normal leading-[1.1] tracking-[-0.02em] text-[#0e0d0b] max-w-[640px]">
              One platform.<br /><em className="italic text-[#447794]">Every tool you need.</em>
            </h2>
          </div>

          <div className="feat-grid grid grid-cols-3 gap-6">
            {/* Large card */}
            <div className="feat-card large col-span-3 grid grid-cols-2 gap-10 bg-white border border-[rgba(68,119,148,0.12)] rounded-2xl p-10 relative overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all before:content-[''] before:absolute before:top-0 before:right-0 before:w-30 before:h-30 before:bg-[radial-gradient(circle_at_top_right,rgba(74,108,247,0.06),transparent_70%)] before:pointer-events-none reveal">
              <div>
                <div className="feat-icon w-11 h-11 rounded-[11px] bg-[rgba(68,119,148,0.05)] border border-[rgba(68,119,148,0.12)] flex items-center justify-center mb-5">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="w-5 h-5 text-[#0e0d0b]">
                    <circle cx="10" cy="10" r="7" /><path d="M10 7v3l2 2" />
                  </svg>
                </div>
                <h3 className="text-[20px] font-medium tracking-[-0.025em] text-[#0e0d0b] mb-2.5">Real-Time AI Assistance</h3>
                <p className="text-[14px] text-[#52525b] leading-[1.65] font-light">Instead of asking questions and waiting for answers, Deexen watches your development process. It understands context, detects patterns, and surfaces guidance exactly when it&apos;s relevant — not before, not after.</p>
                <span className="feat-tag inline-flex items-center gap-1.5 font-mono text-[11px] text-[#2D5B75] bg-[rgba(45,91,117,0.07)] px-2.5 py-1 rounded-full mt-4 border border-[rgba(45,91,117,0.12)]">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="3" /></svg>
                  Live contextual analysis
                </span>
              </div>
              <div className="analytics-viz bg-[#0e0d0b] rounded-xl p-6 flex flex-col gap-3 border border-[rgba(255,255,255,0.05)]">
                <div className="viz-header font-mono text-[10px] tracking-[0.1em] uppercase text-[rgba(255,255,255,0.3)] mb-1">Live code analysis</div>
                <div className="skill-bar-row flex items-center gap-3">
                  <span className="skill-label font-mono text-[11px] text-[rgba(255,255,255,0.4)] w-20 flex-shrink-0">Logic flow</span>
                  <div className="skill-track flex-1 h-1 bg-[rgba(255,255,255,0.06)] rounded overflow-hidden">
                    <div className="skill-fill h-full rounded bg-gradient-to-r from-[#2D5B75] to-[#447794] animate-[growBar_1.5s_ease_forwards] origin-left" style={{ width: "88%", animationDelay: "0.1s" }}></div>
                  </div>
                  <span className="skill-pct font-mono text-[11px] text-[rgba(255,255,255,0.35)] w-8 text-right">88%</span>
                </div>
                <div className="skill-bar-row flex items-center gap-3">
                  <span className="skill-label font-mono text-[11px] text-[rgba(255,255,255,0.4)] w-20 flex-shrink-0">Error risk</span>
                  <div className="skill-track flex-1 h-1 bg-[rgba(255,255,255,0.06)] rounded overflow-hidden">
                    <div className="skill-fill h-full rounded bg-gradient-to-r from-[#f78c6c] to-[#ffb347] animate-[growBar_1.5s_ease_forwards] origin-left" style={{ width: "23%", animationDelay: "0.25s" }}></div>
                  </div>
                  <span className="skill-pct font-mono text-[11px] text-[rgba(255,255,255,0.35)] w-8 text-right">23%</span>
                </div>
                <div className="skill-bar-row flex items-center gap-3">
                  <span className="skill-label font-mono text-[11px] text-[rgba(255,255,255,0.4)] w-20 flex-shrink-0">Complexity</span>
                  <div className="skill-track flex-1 h-1 bg-[rgba(255,255,255,0.06)] rounded overflow-hidden">
                    <div className="skill-fill h-full rounded bg-gradient-to-r from-[#2D5B75] to-[#447794] animate-[growBar_1.5s_ease_forwards] origin-left" style={{ width: "61%", animationDelay: "0.4s" }}></div>
                  </div>
                  <span className="skill-pct font-mono text-[11px] text-[rgba(255,255,255,0.35)] w-8 text-right">61%</span>
                </div>
                <div className="skill-bar-row flex items-center gap-3">
                  <span className="skill-label font-mono text-[11px] text-[rgba(255,255,255,0.4)] w-20 flex-shrink-0">Perf score</span>
                  <div className="skill-track flex-1 h-1 bg-[rgba(255,255,255,0.06)] rounded overflow-hidden">
                    <div className="skill-fill h-full rounded bg-gradient-to-r from-[#28c840] to-[#5dde6a] animate-[growBar_1.5s_ease_forwards] origin-left" style={{ width: "94%", animationDelay: "0.55s" }}></div>
                  </div>
                  <span className="skill-pct font-mono text-[11px] text-[rgba(255,255,255,0.35)] w-8 text-right">94%</span>
                </div>
                <div className="mt-2 pt-3 border-t border-[rgba(255,255,255,0.05)] font-mono text-[10px] text-[rgba(255,255,255,0.2)] tracking-[0.06em]">
                  ANALYZING · handler.ts · 247ms
                </div>
              </div>
            </div>

            <div className="feat-card bg-white border border-[rgba(68,119,148,0.12)] rounded-2xl p-10 hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all relative overflow-hidden before:content-[''] before:absolute before:top-0 before:right-0 before:w-30 before:h-30 before:bg-[radial-gradient(circle_at_top_right,rgba(74,108,247,0.06),transparent_70%)] before:pointer-events-none reveal">
              <div className="feat-icon w-11 h-11 rounded-[11px] bg-[rgba(68,119,148,0.05)] border border-[rgba(68,119,148,0.12)] flex items-center justify-center mb-5">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="w-5 h-5 text-[#0e0d0b]">
                  <path d="M10 2C5.6 2 2 5.6 2 10s3.6 8 8 8 8-3.6 8-8" /><path d="M14 2l4 4-4 4M18 6h-6" />
                </svg>
              </div>
              <h3 className="text-[20px] font-medium tracking-[-0.025em] text-[#0e0d0b] mb-2.5">GitHub Integration</h3>
              <p className="text-[14px] text-[#52525b] leading-[1.65] font-light">Your entire repository list, inside the IDE. Clone, commit, push, pull, and merge — all with simplified one-click actions. No terminal gymnastics.</p>
              <span className="feat-tag inline-flex items-center gap-1.5 font-mono text-[11px] text-[#2D5B75] bg-[rgba(45,91,117,0.07)] px-2.5 py-1 rounded-full mt-4 border border-[rgba(45,91,117,0.12)]">One-click operations</span>
            </div>

            <div className="feat-card bg-white border border-[rgba(68,119,148,0.12)] rounded-2xl p-10 hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all relative overflow-hidden before:content-[''] before:absolute before:top-0 before:right-0 before:w-30 before:h-30 before:bg-[radial-gradient(circle_at_top_right,rgba(74,108,247,0.06),transparent_70%)] before:pointer-events-none reveal">
              <div className="feat-icon w-11 h-11 rounded-[11px] bg-[rgba(68,119,148,0.05)] border border-[rgba(68,119,148,0.12)] flex items-center justify-center mb-5">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="w-5 h-5 text-[#0e0d0b]">
                  <rect x="3" y="3" width="14" height="14" rx="2" /><path d="M7 10h6M10 7v6" />
                </svg>
              </div>
              <h3 className="text-[20px] font-medium tracking-[-0.025em] text-[#0e0d0b] mb-2.5">One-Click Deploy</h3>
              <p className="text-[14px] text-[#52525b] leading-[1.65] font-light">From dev to live in a single action. Connect your own domain directly to your project — no separate hosting dashboard, no YAML deep dives.</p>
              <span className="feat-tag inline-flex items-center gap-1.5 font-mono text-[11px] text-[#2D5B75] bg-[rgba(45,91,117,0.07)] px-2.5 py-1 rounded-full mt-4 border border-[rgba(45,91,117,0.12)]">Domain connection included</span>
            </div>

            <div className="feat-card bg-white border border-[rgba(68,119,148,0.12)] rounded-2xl p-10 hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all relative overflow-hidden before:content-[''] before:absolute before:top-0 before:right-0 before:w-30 before:h-30 before:bg-[radial-gradient(circle_at_top_right,rgba(74,108,247,0.06),transparent_70%)] before:pointer-events-none reveal">
              <div className="feat-icon w-11 h-11 rounded-[11px] bg-[rgba(68,119,148,0.05)] border border-[rgba(68,119,148,0.12)] flex items-center justify-center mb-5">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="w-5 h-5 text-[#0e0d0b]">
                  <path d="M4 16l4-4 3 3 5-7" /><circle cx="16" cy="5" r="2" />
                </svg>
              </div>
              <h3 className="text-[20px] font-medium tracking-[-0.025em] text-[#0e0d0b] mb-2.5">Developer Growth Tracking</h3>
              <p className="text-[14px] text-[#52525b] leading-[1.65] font-light">Deexen tracks your patterns over time — spotting strengths, highlighting gaps, and building a portfolio that shows your actual engineering journey.</p>
              <span className="feat-tag inline-flex items-center gap-1.5 font-mono text-[11px] text-[#2D5B75] bg-[rgba(45,91,117,0.07)] px-2.5 py-1 rounded-full mt-4 border border-[rgba(45,91,117,0.12)]">Skill profile · Progress metrics</span>
            </div>
          </div>
        </div>
      </section>

      {/* VISION / CTA */}
      <section className="cta-section bg-[#0e0d0b] text-center py-30 px-12 relative overflow-hidden" id="cta">
        <div className="cta-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(80px,14vw,200px)] font-normal text-[rgba(255,255,255,0.03)] whitespace-nowrap pointer-events-none select-none tracking-[-0.04em]">Deexen</div>
        <div className="cta-inner relative z-10 max-w-[680px] mx-auto">
          <p className="cta-label font-mono text-[11px] tracking-[0.12em] uppercase text-[rgba(255,255,255,0.3)] mb-6">The long-term vision</p>
          <h2 className="cta-title font-serif text-[clamp(40px,5vw,64px)] font-normal leading-[1.1] tracking-[-0.02em] text-white mb-5">
            Tools should adapt<br /><em className="italic text-[rgba(255,255,255,0.5)]">to developers</em>
          </h2>
          <p className="cta-sub text-[16px] font-light text-[rgba(255,255,255,0.45)] leading-[1.65] mb-12">
            We&apos;re building towards a fully intelligent development ecosystem — where coding, learning, version control, and deployment all live inside one connected platform. AI as an active partner, not a passive chatbot.
          </p>
          <div className="cta-actions flex items-center justify-center gap-3">
            <button onClick={handleOpenModal} className="btn-primary-alt bg-[#447794] text-white px-7 py-3.5 rounded-full text-[15px] font-medium no-underline inline-flex items-center gap-2 hover:opacity-90 transition-all tracking-[-0.01em] border-none cursor-pointer shadow-[0_4px_12px_rgba(68,119,148,0.25)]">
              Request Early Access
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <a href="#" className="btn-ghost bg-transparent text-[rgba(255,255,255,0.7)] px-6 py-3.5 rounded-full text-[15px] font-normal no-underline border border-[rgba(255,255,255,0.15)] hover:text-white hover:border-[#447794] hover:bg-[rgba(68,119,148,0.05)] transition-all tracking-[-0.01em]">For teams & enterprises</a>
          </div>
        </div>
      </section>


      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div 
            className="absolute inset-0 bg-[#0e0d0b]/40 backdrop-blur-sm animate-[fadeIn_0.3s_ease_forwards]"
            onClick={() => setIsModalOpen(false)}
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
                  onClick={() => setIsModalOpen(false)}
                  className="w-full h-12 border border-[rgba(68,119,148,0.2)] text-[#0e0d0b] rounded-full text-[15px] font-medium hover:bg-[#f8f7f4] transition-all"
                >
                  Close
                </button>
              </div>
            )}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-[#8fb6cc] hover:text-[#0e0d0b] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
