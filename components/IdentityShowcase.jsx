"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const gallery = [
  "/others/669c6ab97e3cd98666f855a198ec26d1.jpg",
  "/others/14411b388e42a556faf51faa50522971.jpg",
  "/others/8028e4627b84d16f84581f0bc379e0ad.jpg",
  "/others/517ffdbc33620528524824c768da0933.jpg",
  "/others/f3ad03722e2a8cdb3bfbd672040769f5.jpg",
  "/others/146c86a67aec1b902ab4ecef836dfb04.jpg",
  "/others/b2f7544149fa722f719bf29e515c1de4.jpg",
  "/others/9e63a89253fd2a7372e9e4732a586374.jpg",
];

const loopedGallery = [...gallery, ...gallery];

function CurveBar({ flip }) {
  return (
    <svg
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 right-0 z-20 h-12 w-full sm:h-16 md:h-24 ${
        flip ? "bottom-0 rotate-180" : "top-0"
      }`}
      style={{ filter: "drop-shadow(0 6px 6px rgba(17,17,17,0.06))" }}
    >
      <path d="M0,0 L100,0 L100,11 Q50,-8 0,11 Z" fill="white" />
    </svg>
  );
}

export default function IdentityShowcase() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".identity-reveal",
        { opacity: 0, y: 50, rotateX: -40, transformPerspective: 1000 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full overflow-hidden bg-white pt-12 pb-24 md:pt-16 md:pb-32">
      <div className="identity-reveal mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-ink md:text-5xl">
          Express Your Identity
          <br />
          With Our Unique Style
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink/50 md:text-base">
          Showcase your true self with a collection built on bold silhouettes
          and honest craft — style that speaks before you do.
        </p>
      </div>

      <div className="identity-reveal relative mt-14 h-[280px] w-screen overflow-hidden sm:h-[340px] md:h-[460px]">
        <CurveBar />
        <div className="flex h-full w-max gap-2 animate-marquee md:gap-3">
          {loopedGallery.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-full w-[130px] shrink-0 sm:w-[170px] md:w-[210px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover object-top"
                draggable={false}
              />
            </div>
          ))}
        </div>
        <CurveBar flip />
      </div>

      <div className="identity-reveal mx-auto mt-12 flex max-w-5xl flex-col items-center justify-between gap-8 px-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {["#8C2B23", "#33422F", "#2C3A4B"].map((hex, i) => (
              <span
                key={hex}
                className="h-9 w-9 rounded-full border-2 border-white"
                style={{ backgroundColor: hex, zIndex: 3 - i }}
              />
            ))}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-ink">100+ Reviews</p>
            <p className="text-xs text-ink/50">Consistent and satisfied</p>
          </div>
        </div>

        <a
          href="#shop"
          className="text-xs font-semibold tracking-[0.2em] text-ink/70 underline underline-offset-4 transition-colors hover:text-ink"
        >
          EXPLORE MORE
        </a>

        <div className="relative flex h-20 w-20 items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow text-ink/40">
            <path
              id="scrollCirclePath"
              d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              fill="none"
            />
            <text fontSize="7.2" letterSpacing="1.5" fill="currentColor">
              <textPath href="#scrollCirclePath" startOffset="0%">
                SCROLL DOWN • SCROLL DOWN •
              </textPath>
            </text>
          </svg>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white">
            <ArrowDown size={13} />
          </span>
        </div>
      </div>
    </section>
  );
}
