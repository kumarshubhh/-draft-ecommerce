"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Play,
  Package,
  Globe,
  Heart,
  Instagram,
  Youtube,
} from "lucide-react";
import Navbar from "./Navbar";
import VideoCutout from "./VideoCutout";

gsap.registerPlugin(ScrollTrigger);

function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" {...props}>
      <path d="M16.6 5.82c-.85-.9-1.32-2.07-1.32-3.32h-3.05v13.6a3.13 3.13 0 0 1-3.13 3.03 3.13 3.13 0 0 1 0-6.26c.29 0 .58.04.85.12V9.9a6.2 6.2 0 0 0-.85-.06 6.19 6.19 0 1 0 6.19 6.19V9.28a8.29 8.29 0 0 0 4.84 1.55V7.78a4.85 4.85 0 0 1-3.53-1.96Z" />
    </svg>
  );
}

const infoCards = [
  {
    key: "premium",
    icon: Package,
    title: "Premium Quality",
    body: "Durable. Comfortable. Made to move.",
  },
  {
    key: "limited",
    icon: Globe,
    title: "Limited Edition",
    body: "Exclusive drops. Limited pieces.",
  },
];

const stats = [
  { icon: Package, value: "50+", label: "Collections" },
  { icon: Globe, value: "30+", label: "Countries" },
  { icon: Heart, value: "2.4K+", label: "Happy Customers" },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const navRef = useRef(null);
  const badgeRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subtextRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRefs = useRef([]);
  const cardRefs = useRef([]);
  ctaRefs.current = [];
  cardRefs.current = [];

  const addCtaRef = (el) => {
    if (el && !ctaRefs.current.includes(el)) ctaRefs.current.push(el);
  };
  const addCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(navRef.current, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo(
          badgeRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.35"
        )
        .fromTo(
          line1Ref.current,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: "power4.out" },
          "-=0.25"
        )
        .fromTo(
          line2Ref.current,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: "power4.out" },
          "-=0.65"
        )
        .fromTo(
          subtextRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.45"
        )
        .fromTo(
          ctaRefs.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
          "-=0.35"
        )
        .fromTo(
          cardRefs.current,
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, stagger: 0.15 },
          "-=0.5"
        )
        .fromTo(
          statsRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.3"
        );

      gsap.to(contentRef.current, {
        yPercent: -6,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      <VideoCutout
        src="/videos/hero.mp4"
        className="absolute inset-0 h-full w-full translate-x-[10%] object-cover"
      />

      <div ref={contentRef} className="relative z-10 flex h-full flex-col">
        <div ref={navRef}>
          <Navbar variant="hero" />
        </div>

        <div className="grid flex-1 grid-cols-12 items-center gap-8 px-8 md:px-14">
            <div className="col-span-12 flex flex-col gap-7 lg:col-span-7">
              <div
                ref={badgeRef}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold tracking-wider text-ink shadow-neu"
              >
                NEW DROP <span aria-hidden="true">✦</span>
              </div>

              <h1 className="flex flex-col text-[clamp(3rem,8.5vw,7.25rem)] font-bold leading-[0.92] tracking-tighter text-ink">
                <span className="overflow-hidden">
                  <span ref={line1Ref} className="block">
                    Streetwear.
                  </span>
                </span>
                <span className="overflow-hidden">
                  <span ref={line2Ref} className="block text-ink/50">
                    Redefined.
                  </span>
                </span>
              </h1>

              <p ref={subtextRef} className="max-w-sm text-base text-ink/60 md:text-lg">
                Bold looks. Clean fits. Built to stand out anywhere.
              </p>

              <div className="flex flex-wrap items-center gap-5">
                <button
                  ref={addCtaRef}
                  type="button"
                  className="group flex items-center gap-6 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-semibold text-ink shadow-neu-lg transition-transform hover:scale-[1.02]"
                >
                  Explore Collection
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-transform group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                </button>
                <button
                  ref={addCtaRef}
                  type="button"
                  className="flex items-center gap-3 text-sm font-semibold text-ink/70 transition-colors hover:text-ink"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-neu">
                    <Play size={13} fill="currentColor" className="ml-0.5" />
                  </span>
                  Watch Lookbook
                </button>
              </div>
            </div>

            <div className="col-span-12 hidden flex-col items-end gap-4 lg:col-span-5 lg:flex">
              {infoCards.map(({ key, icon: Icon, title, body }) => (
                <div
                  key={key}
                  ref={addCardRef}
                  className="flex w-full max-w-xs items-center gap-4 rounded-2xl border border-white/50 bg-white/60 p-4 shadow-neu backdrop-blur-md"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-ink shadow-neu">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{title}</p>
                    <p className="text-xs leading-snug text-ink/60">{body}</p>
                  </div>
                </div>
              ))}

              <div
                ref={addCardRef}
                className="w-full max-w-xs rounded-2xl border border-white/50 bg-white/60 p-4 shadow-neu backdrop-blur-md"
              >
                <div className="mb-3 flex items-center">
                  <div className="flex -space-x-3">
                    {["#8C2B23", "#33422F", "#2C3A4B", "#5A4636"].map((hex, i) => (
                      <span
                        key={hex}
                        className="h-8 w-8 rounded-full border-2 border-white"
                        style={{ backgroundColor: hex, zIndex: 4 - i }}
                      />
                    ))}
                  </div>
                  <span className="ml-2 flex h-7 items-center rounded-full bg-ink px-3 text-xs font-semibold text-white">
                    2.4K+
                  </span>
                </div>
                <p className="text-sm font-semibold text-ink">Loved by Thousands</p>
                <p className="mt-1 text-xs leading-snug text-ink/60">
                  Join thousands of trendsetters who trust Drify.
                </p>
              </div>

              <div
                ref={addCardRef}
                className="flex w-full max-w-xs items-center justify-between rounded-full border border-white/50 bg-white/60 px-5 py-3 shadow-neu backdrop-blur-md"
              >
                <span className="text-xs font-semibold text-ink/70">Follow Us</span>
                <div className="flex items-center gap-3 text-ink/70">
                  <Instagram size={16} strokeWidth={1.75} />
                  <TikTokIcon />
                  <Youtube size={16} strokeWidth={1.75} />
                </div>
              </div>
            </div>
          </div>

          <div ref={statsRef} className="px-8 pb-8 md:px-14">
            <div className="flex w-fit divide-x divide-black/10 rounded-3xl bg-white/85 shadow-neu-lg backdrop-blur-sm">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-3 px-6 py-4">
                  <Icon size={18} className="text-ink/70" strokeWidth={1.75} />
                  <div className="leading-tight">
                    <p className="text-sm font-bold text-ink">{value}</p>
                    <p className="text-xs text-ink/50">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}
