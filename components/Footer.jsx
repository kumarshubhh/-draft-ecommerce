"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".foot-reveal",
        { opacity: 0, y: 50, rotateX: -40, transformPerspective: 1000 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 95%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return (
    <footer ref={sectionRef} className="w-full bg-ink relative pt-6 pb-2 overflow-hidden">
      {/* Background Section with large text */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-4 px-4 pointer-events-none">
        <div className="w-full max-w-[1400px] mx-auto relative flex justify-between items-start px-2 md:px-0">
          <span className="text-white/80 text-xs md:text-sm tracking-wide mt-4 ml-4 hidden md:block">
            The Vibe
          </span>
          
          <div className="foot-reveal relative text-center flex-1 flex justify-center">
            {/* The text */}
            <h1 
              className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-sans font-bold leading-none tracking-tighter"
              style={{
                background: 'linear-gradient(to bottom, #ffffff 25%, transparent 85%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              DRIFT
            </h1>
            
            {/* Floating image over 'z' / 'y' */}
            <div className="absolute top-[15%] sm:top-[20%] right-[5%] sm:right-[15%] lg:right-[18%] w-12 h-16 sm:w-16 sm:h-24 md:w-20 md:h-28 rounded-xl overflow-hidden border-2 border-white/20 transform rotate-12 shadow-2xl pointer-events-auto transition-transform hover:rotate-6">
              <Image 
                src="/others/9e63a89253fd2a7372e9e4732a586374.jpg" 
                alt="Brand Vibe" 
                fill 
                className="object-cover" 
              />
            </div>
          </div>

          <span className="text-white/80 text-xs md:text-sm tracking-wide mt-16 mr-4 hidden md:block">
            Brand
          </span>
        </div>
      </div>

      {/* The foreground box */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-6 mt-[4rem] sm:mt-[6rem] md:mt-[8rem] lg:mt-[10rem]">
        <div className="foot-reveal bg-white rounded-[1.5rem] md:rounded-[2rem] w-full p-5 md:p-8 lg:p-10 shadow-xl relative overflow-hidden">
          
          {/* Decorative holes */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 w-4 h-4 rounded-full bg-ink"></div>
          <div className="absolute top-4 right-4 md:top-6 md:right-6 w-4 h-4 rounded-full bg-ink"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-8 mt-6 md:mt-8 lg:mt-10 mb-8 md:mb-12">
            <h2 className="text-ink text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-bold leading-[1.05] tracking-tight max-w-[24rem]">
              Step Into Your<br />Best Style
            </h2>
            <p className="text-ink/80 text-xs md:text-sm font-medium max-w-[240px] md:text-right leading-snug">
              Premium Shoes Crafted For Comfort, Confidence, And Everyday Performance.
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-between items-center text-ink font-semibold text-sm border-b border-dashed border-ink/40 pb-4 mb-4 px-2 md:px-0">
            <a href="#" className="hover:opacity-60 transition-opacity">Home</a>
            <a href="#" className="hover:opacity-60 transition-opacity">About</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Drops</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Fresh In</a>
          </div>

          {/* Legal & Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center text-ink/80 text-xs font-medium gap-4 md:gap-4 px-2 md:px-0">
            <div className="flex items-center gap-2">
              <span className="text-lg">©</span>
              <p>2026 Drift. All rights reserved.</p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-ink transition-colors">Term & Condition</a>
              <a href="#" className="hover:text-ink transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
