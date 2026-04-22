"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";
import { GLSLHills } from "./glsl-hills";
import { Calendar, ArrowRight } from "lucide-react";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  -webkit-font-smoothing: antialiased;
  
  /* Fixed colors for dark footer context to ensure premium glassy look as in template */
  --pill-bg-1: rgba(255, 255, 255, 0.1);
  --pill-bg-2: rgba(255, 255, 255, 0.05);
  --pill-shadow: rgba(0, 0, 0, 0.5);
  --pill-highlight: rgba(255, 255, 255, 0.1);
  --pill-inset-shadow: rgba(0, 0, 0, 0.8);
  --pill-border: rgba(255, 255, 255, 0.1);
  
  --pill-bg-1-hover: rgba(255, 255, 255, 0.12);
  --pill-bg-2-hover: rgba(255, 255, 255, 0.04);
  --pill-border-hover: rgba(255, 255, 255, 0.25);
  --pill-shadow-hover: rgba(0, 0, 0, 0.7);
  --pill-highlight-hover: rgba(255, 255, 255, 0.2);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.5)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.8)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Theme-adaptive Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    color-mix(in oklch, var(--primary) 15%, transparent) 0%, 
    color-mix(in oklch, var(--secondary) 15%, transparent) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--foreground) 15%, transparent));
}

.curtain-wrapper {
  clip-path: polygon(0% 0, 100% 0%, 100% 100%, 0 100%);
}

@media (max-width: 767px) {
  .curtain-wrapper {
    clip-path: none !important;
    height: auto !important;
    min-height: 80vh;
  }
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (Zero Dependency)
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

export const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span className="text-primary/60">✦</span> <span>UNLIMITED SCALABILITY</span> 
    <span className="text-secondary/60">✦</span> <span>24/7 AUTONOMOUS OPERATIONS</span> 
    <span className="text-primary/60">✦</span> <span>CUSTOM AGENTIC WORKFLOWS</span> 
    <span className="text-secondary/60">✦</span> <span>DATA SECURED</span>
  </div>
);

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    // gsap.matchMedia for clean breakpoint-specific logic
    const mm = gsap.matchMedia();
    
    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isDesktop } = context.conditions as any;

      if (isDesktop) {
        // Background Parallax (Desktop Only)
        gsap.fromTo(
          giantTextRef.current,
          { y: "10vh", scale: 0.8, opacity: 0 },
          {
            y: "0vh",
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 80%",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );

        // Staggered Content Reveal
        gsap.fromTo(
          [headingRef.current, linksRef.current],
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 40%",
              end: "bottom bottom",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Switch footer from fixed → relative when curtain is fully open (Desktop Only)
        ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: "top top",
          anticipatePin: 1,
          onEnter: () => {
            const el = footerRef.current;
            if (el) {
              gsap.set(el, { position: "relative", bottom: "auto", left: "auto" });
            }
          },
          onLeaveBack: () => {
            const el = footerRef.current;
            if (el) {
              gsap.set(el, { position: "fixed", bottom: 0, left: 0 });
            }
          },
        });
      } else {
        // Mobile simple logic: Normal Flow
        gsap.set(footerRef.current, { position: "relative", bottom: "auto", left: "auto", height: "auto", minHeight: "80vh" });
        
        // Simple reveal for mobile
        gsap.fromTo(
          [headingRef.current, linksRef.current],
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => mm.revert();
  }, []);



  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* 
        The "Curtain Reveal" Wrapper:
        It sits in standard flow. Because it has clip-path, its contents
        are ONLY visible within its bounding box. 
      */}
      <div
        ref={wrapperRef}
        className="relative h-screen w-full curtain-wrapper"
      >
        {/* Fixed footer revealed via curtain — switches to relative after full reveal */}
        <footer
          ref={footerRef}
          className="md:fixed relative bottom-0 left-0 flex h-screen md:h-screen w-full flex-col justify-between overflow-hidden bg-black text-foreground cinematic-footer-wrapper"
        >

          {/* Background Layers */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
             <GLSLHills />
             {/* Additional ambient overlay for depth */}
             <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-80 z-10" />
          </div>
          
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            WAIV
          </div>

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="absolute top-24 left-0 w-full overflow-hidden border-y border-border/50 bg-background/60 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-muted-foreground uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="text-5xl md:text-8xl font-black text-zinc-200 tracking-tighter mb-12 text-center"
            >
              Ready to automate?
            </h2>

            {/* Interactive Magnetic Pills Layout */}
            <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
              {/* App Store Links (Primary) */}
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton as="a" href="#" className="footer-glass-pill px-10 py-5 rounded-full text-white font-bold text-sm md:text-base flex items-center gap-3 group">
                  <Calendar className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                  Book a Demo
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href="#contact"
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="footer-glass-pill px-10 py-5 rounded-full text-foreground font-bold text-sm md:text-base flex items-center gap-3 group"
                >
                  <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                  Get Started
                </MagneticButton>
              </div>


            </div>
          </div>


        </footer>
      </div>
    </>
  );
}
