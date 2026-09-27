"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import products from "@/data/products";
import TiltCard from "./TiltCard";

gsap.registerPlugin(ScrollTrigger);

const pickImages = {
  1: "/others/cc9c75a9eb7c6e5cee1975ceedb0d9a0.jpg",
  2: "/others/b25521ca27a0862a4f9a6218f48879a2.jpg",
  3: "/others/7d04b9d6bb5a78082b38a6fa7ee18766.jpg",
  4: "/others/8a375a79ddef3f5dd316f591ec2b2781.jpg",
  5: "/others/146c86a67aec1b902ab4ecef836dfb04.jpg",
  6: "/others/b52b380b08e44f972ce05856a7b9cc9f.jpg",
};

export default function PopularPicks() {
  const sectionRef = useRef(null);
  const scrollerRef = useRef(null);

  const scrollByCard = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50, rotateX: -40, transformPerspective: 1000 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-offwhite px-6 pb-10 pt-12 md:px-14 md:pb-12 md:pt-16">
      <div className="reveal-up mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-ink/40">SHOP THE DROP</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Popular Picks
          </h2>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll left"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-neu transition-transform hover:scale-105"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Scroll right"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white transition-transform hover:scale-105"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="reveal-up flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.slice(0, 5).map((product) => (
          <TiltCard
            key={product.id}
            className="flex w-[260px] shrink-0 snap-start flex-col rounded-3xl bg-white p-5 shadow-neu"
            tiltAmount={8}
          >
            <div className="relative h-64 overflow-hidden rounded-2xl bg-[#EFEEEA]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pickImages[product.id]}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover object-top"
                draggable={false}
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-ink">{product.name}</p>
                <p className="mt-1 text-sm text-ink/50">${product.price.toFixed(2)}</p>
              </div>
              <button
                type="button"
                aria-label={`Add ${product.name} to cart`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EFEEEA] text-ink transition-colors hover:bg-ink hover:text-white"
              >
                <ShoppingBag size={15} strokeWidth={1.75} />
              </button>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
