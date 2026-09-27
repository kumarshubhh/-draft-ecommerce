"use client";

import Image from "next/image";
import { Star, Heart, TrendingUp, Package, Gift, LineChart, ChevronDown } from "lucide-react";
import { useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProduct() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feat-reveal",
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
  const images = [
    "/others/14411b388e42a556faf51faa50522971.jpg",
    "/others/146c86a67aec1b902ab4ecef836dfb04.jpg",
    "/others/669c6ab97e3cd98666f855a198ec26d1.jpg",
    "/others/517ffdbc33620528524824c768da0933.jpg",
  ];

  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <section ref={sectionRef} className="w-full bg-[#F9F9F9] py-16 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">
        
        {/* Left: Images */}
        <div className="feat-reveal w-full lg:w-1/2 flex flex-col gap-4">
          <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-[2rem] overflow-hidden bg-[#C9C9C9]">
            <Image 
              src={activeImage} 
              alt="Nike Air Main" 
              fill 
              className="object-cover object-top" 
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveImage(img)}
                className={`relative aspect-square rounded-[1.25rem] overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                  activeImage === img ? 'border-yellow-400 p-0.5' : 'border-transparent'
                } bg-white shadow-sm hover:shadow-md`}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover object-top" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center py-4 lg:py-8">
          <h2 className="feat-reveal text-6xl md:text-7xl font-bold text-ink mb-6 tracking-tight font-sans">
            Nike Air
          </h2>
          
          <p className="feat-reveal text-gray-500 text-lg leading-relaxed mb-8 max-w-xl">
            TOMS Aira, Designed For Comfort That Feels As Fresh As The Morning Air Lightweight Canvas, Soft Cushioning, And Effortless Style Made For Days That Move At Your Pace.
          </p>

          <div className="feat-reveal flex items-center gap-6 mb-10">
            <span className="text-4xl font-bold text-ink">$800.00</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  className={i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-yellow-400 text-yellow-400"} 
                  // Wait, the mockup shows 5 stars, maybe 4.5. I'll just color 5 stars but say 4.5.
                />
              ))}
              <span className="ml-2 font-bold text-lg text-ink">4.5</span>
            </div>
          </div>

          <div className="feat-reveal mb-8 max-w-xl">
            <h3 className="font-semibold text-lg text-ink mb-4">Available Options:</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* To Order Card */}
              <div className="flex-1 rounded-[1.5rem] bg-white p-5 flex items-center gap-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center shrink-0">
                  <Gift className="text-gray-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">To Order</p>
                  <p className="font-bold text-xl text-ink">$2,580</p>
                </div>
              </div>
              
              {/* In Stock Card */}
              <div className="flex-1 rounded-[1.5rem] bg-white p-5 flex items-center gap-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center shrink-0">
                  <LineChart className="text-gray-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">In Stock</p>
                  <p className="font-bold text-xl text-ink">$5,980</p>
                </div>
              </div>
            </div>
          </div>

          <div className="feat-reveal mb-10 max-w-xl">
            <h3 className="font-semibold text-lg text-ink mb-4">size Chart</h3>
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <select className="w-full h-14 rounded-full border border-gray-300 px-6 text-ink font-medium appearance-none bg-transparent outline-none focus:border-yellow-400 transition-colors cursor-pointer">
                  <option>Size</option>
                  <option>US 8</option>
                  <option>US 9</option>
                  <option>US 10</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
              </div>

              <div className="relative flex-1">
                <select className="w-full h-14 rounded-full border border-gray-300 px-6 text-ink font-medium appearance-none bg-transparent outline-none focus:border-yellow-400 transition-colors cursor-pointer">
                  <option>Color</option>
                  <option>Orange</option>
                  <option>Black</option>
                  <option>White</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
              </div>

              <button className="w-14 h-14 rounded-full bg-[#fceb20] flex items-center justify-center shrink-0 hover:bg-[#e6d61a] transition-colors shadow-sm">
                <Heart className="text-ink" size={20} />
              </button>
            </div>
          </div>

          <button className="feat-reveal w-full max-w-xl h-16 rounded-full bg-white border border-gray-200 shadow-sm font-bold text-lg text-ink hover:bg-gray-50 transition-colors">
            My Drip Bag
          </button>
        </div>
      </div>
    </section>
  );
}
