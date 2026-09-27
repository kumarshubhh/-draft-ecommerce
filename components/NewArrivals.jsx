"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "./TiltCard";

gsap.registerPlugin(ScrollTrigger);

const arrivals = [
  {
    key: "sage-linen",
    image: "/others/8028e4627b84d16f84581f0bc379e0ad.jpg",
    name: "Sage Linen Shirt",
    blurb: "Band-collar linen shirt in soft sage, paired with wide white trousers.",
    price: 78.0,
    originalPrice: 96.0,
  },
  {
    key: "teal-camp-shirt",
    image: "/others/f3ad03722e2a8cdb3bfbd672040769f5.jpg",
    name: "Teal Camp Shirt",
    blurb: "Retro camp-collar shirt in teal, layered over cream wide-leg pants.",
    price: 82.0,
    originalPrice: null,
  },
  {
    key: "shadow-denim-set",
    image: "/others/146c86a67aec1b902ab4ecef836dfb04.jpg",
    name: "Shadow Tank Denim Set",
    blurb: "Fitted black tank paired with light-wash wide-leg denim.",
    price: 88.0,
    originalPrice: 104.0,
  },
  {
    key: "ivory-corset",
    image: "/others/9e63a89253fd2a7372e9e4732a586374.jpg",
    name: "Ivory Corset Top",
    blurb: "Structured corset top styled with light-wash straight denim.",
    price: 74.0,
    originalPrice: null,
  },
];

export default function NewArrivals() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".arrival-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50, rotateX: -40, transformPerspective: 1000 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            delay: i * 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-offwhite px-6 pt-12 pb-24 md:px-14 md:pt-16 md:pb-32">
      <div className="arrival-reveal mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-ink/40">JUST ARRIVED</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">
            New Arrivals
          </h2>
        </div>
        <a
          href="#shop"
          className="hidden text-xs font-semibold tracking-wide text-ink/60 underline underline-offset-4 transition-colors hover:text-ink sm:block"
        >
          View All Products
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {arrivals.map((item) => (
          <div key={item.key} className="arrival-reveal group flex flex-col">
            <TiltCard tiltAmount={10} className="relative flex aspect-[3/4] items-end overflow-hidden rounded-3xl bg-white shadow-neu">
              <span className="absolute left-4 top-4 z-10 rounded-full bg-ink px-3 py-1 text-[10px] font-semibold tracking-wide text-white">
                NEW
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                draggable={false}
              />
            </TiltCard>
            <p className="mt-4 text-sm font-semibold text-ink">{item.name}</p>
            <p className="mt-1 text-xs leading-snug text-ink/50">{item.blurb}</p>
            <p className="mt-2 text-sm font-semibold text-ink">
              ${item.price.toFixed(2)}
              {item.originalPrice && (
                <span className="ml-2 text-ink/35 line-through">
                  ${item.originalPrice.toFixed(2)}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
