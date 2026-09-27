"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".test-reveal",
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
  const testimonials = [
    {
      text: "Real People Real Vibes Every Pair You See Here Has Already Hit The Streets And The Reviews Say It All Check Out What Our Crew Thinks About Their New Kicks.",
      name: "Bruce Frappier",
      role: "Brand Manager",
      avatar: "/others/14411b388e42a556faf51faa50522971.jpg",
    },
    {
      text: "Every Step Tells A Story Here's What Our Customers Have To Say About The Comfort, Fit, And Feel That Make Our Shoes Their Everyday Choice Just Honest Feedback From.",
      name: "Dorene Belair",
      role: "CEO Of Company",
      avatar: "/others/669c6ab97e3cd98666f855a198ec26d1.jpg",
    },
    {
      text: "We Could Talk About Comfort And Style All Day, But Our Community Says It Better. Read The Real Stories From People Who Live In Our Shoes Every Day.",
      name: "Bruce Frappier",
      role: "Brand Manager",
      avatar: "/others/7d04b9d6bb5a78082b38a6fa7ee18766.jpg",
    },
  ];

  return (
    <section ref={sectionRef} className="w-full bg-white py-24 px-6 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <h2 className="test-reveal text-5xl md:text-6xl lg:text-7xl font-bold text-ink leading-[1.05] tracking-tight max-w-2xl font-sans">
            Every Pair Tells A <br /> Story Here's Theirs
          </h2>

          <div className="test-reveal flex items-center gap-6 pb-2">
            <div className="flex -space-x-4">
              <div className="relative w-12 h-12 rounded-full border-[3px] border-white overflow-hidden shadow-sm">
                <Image src="/others/146c86a67aec1b902ab4ecef836dfb04.jpg" alt="Avatar 1" fill className="object-cover" />
              </div>
              <div className="relative w-12 h-12 rounded-full border-[3px] border-white overflow-hidden shadow-sm">
                <Image src="/others/38a22370fd90c4ec6b9f40ba1c0b0d01.jpg" alt="Avatar 2" fill className="object-cover" />
              </div>
              <div className="relative w-12 h-12 rounded-full border-[3px] border-white overflow-hidden shadow-sm">
                <Image src="/others/517ffdbc33620528524824c768da0933.jpg" alt="Avatar 3" fill className="object-cover" />
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-amber-400 text-amber-400" size={16} />
                ))}
                <span className="text-ink font-bold ml-1 text-sm">4.5/5</span>
              </div>
              <p className="text-sm font-semibold text-ink/50 tracking-wide">
                Trusted By 100+ Customer
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className={`test-reveal bg-[#F9F9F9] rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between relative shadow-sm border border-gray-50 h-full min-h-[380px] ${
                idx === 1 ? "md:translate-y-12" : ""
              }`}
            >
              <div>
                {/* Large decorative quotes */}
                <span className="text-[100px] text-gray-200/60 font-serif leading-none absolute -top-4 left-8 select-none">
                  “
                </span>
                
                <div className="relative z-10 border-l-2 border-dashed border-gray-300/80 pl-6 ml-4 mt-16 mb-10">
                  <p className="text-ink/70 text-[17px] leading-[1.8] font-medium tracking-wide">
                    {item.text}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 shadow-sm">
                  <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-ink text-lg tracking-tight">{item.name}</h4>
                  <p className="text-sm font-semibold text-ink/40 tracking-wide">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
