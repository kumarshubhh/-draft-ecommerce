"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const promos = [
  {
    key: "sale",
    title: ["Spring Sale", "Up to 50% Off"],
    cta: "Shop the Sale",
    image: "/offer/18c0af0c-f4a1-484f-9141-297401d80cbf.png",
    focus: "center",
  },
  {
    key: "fresh",
    // Pre-composed banner (already has its own "Modern Essentials" copy +
    // CTA baked into the image), so it renders standalone below with no
    // extra text/gradient overlay to avoid duplicating the messaging.
    image: "/offer/88aceedf-f810-49a7-bc62-9bfa426ae26e.png",
    focus: "center",
    selfContained: true,
  },
];

export default function StyleCategories() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".style-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.05,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white px-6 py-24 md:px-14 md:py-32">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {promos.map((promo) => (
          <div
            key={promo.key}
            className="style-reveal group relative h-64 overflow-hidden rounded-2xl bg-black/20 md:h-80"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={promo.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              style={{ objectPosition: promo.focus }}
              draggable={false}
            />
            {!promo.selfContained && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
                <div className="relative flex h-full flex-col justify-center gap-4 p-7 md:p-9">
                  <h3 className="text-2xl font-bold leading-tight text-white md:text-3xl">
                    {promo.title[0]}
                    <br />
                    {promo.title[1]}
                  </h3>
                  <button
                    type="button"
                    className="flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-ink transition-transform hover:scale-105"
                  >
                    {promo.cta}
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
