"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ShoppingBag } from "lucide-react";
import Navbar from "./Navbar";
import products from "@/data/products";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip, ScrollTrigger);
}

export default function ProductShowcase() {
  const N = products.length;
  const [mounted, setMounted] = useState(false);
  const [order, setOrder] = useState(products.map((_, i) => i)); // [0, 1, 2, 3, 4, 5]
  
  const [selectedSize, setSelectedSize] = useState(products[0].defaultSize);
  const [selectedColor, setSelectedColor] = useState(products[0].colors[0].hex);
  
  const detailsRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const directionRef = useRef(1); // 1 for next, -1 for prev
  const flipState = useRef(null);
  const mainImgRef = useRef(null);

  const activeProduct = products[order[0]];
  const q1Product = products[order[1]];
  const q2Product = products[order[2]];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSelectedSize(activeProduct.defaultSize);
    setSelectedColor(activeProduct.colors[0].hex);
  }, [activeProduct]);

  const createCloneAndAnimateOut = (dir) => {
    const mainImg = mainImgRef.current;
    if (!mainImg) return;

    const clone = mainImg.cloneNode(true);
    const rect = mainImg.getBoundingClientRect();
    const container = mainImg.closest('.main-img-container');
    const containerRect = container.getBoundingClientRect();

    clone.style.position = "absolute";
    clone.style.top = (rect.top - containerRect.top) + "px";
    clone.style.left = (rect.left - containerRect.left) + "px";
    clone.style.right = "auto";
    clone.style.bottom = "auto";
    clone.style.width = rect.width + "px";
    clone.style.height = rect.height + "px";
    clone.style.zIndex = 50;
    clone.style.margin = "0";
    clone.style.pointerEvents = "none";
    
    // Maintain filter/opacity visually if it had any, but it's the main image so it's 100% opacity
    clone.style.opacity = "1";
    clone.style.filter = "none";

    container.appendChild(clone);

    const moveDistance = containerRect.width * 0.8; // Move far enough to exit stage

    gsap.to(clone, {
      scale: 1.15,
      x: dir === 1 ? moveDistance : -moveDistance,
      opacity: 0,
      duration: 1,
      ease: "power3.inOut",
      onComplete: () => clone.remove(),
    });
  };

  const next = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    directionRef.current = 1;

    createCloneAndAnimateOut(1);
    flipState.current = Flip.getState(".flip-item");

    setOrder((prev) => {
      const newOrder = [...prev];
      newOrder.push(newOrder.shift());
      return newOrder;
    });
  };

  const prev = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    directionRef.current = -1;

    createCloneAndAnimateOut(-1);
    flipState.current = Flip.getState(".flip-item");

    setOrder((prev) => {
      const newOrder = [...prev];
      newOrder.unshift(newOrder.pop());
      return newOrder;
    });
  };

  useLayoutEffect(() => {
    if (!flipState.current) return;

    const outgoingId =
      directionRef.current === 1
        ? products[order[order.length - 1]].id
        : products[order[1]].id;

    // Filter out the old main image so it doesn't shrink back to queue
    const targets = gsap.utils
      .toArray(".flip-item")
      .filter((el) => el.dataset.flipId !== String(outgoingId));

    // Animate text details
    gsap.fromTo(
      detailsRef.current,
      { y: directionRef.current === 1 ? 20 : -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power2.out" }
    );

    Flip.from(flipState.current, {
      targets: targets,
      duration: 1,
      ease: "power3.inOut",
      absolute: true,
      props: "opacity", // removed filter to avoid heavy CPU stutter
      onEnter: (elements) => {
        elements.forEach((el) => {
          if (el.dataset.index === "main") {
            if (directionRef.current === -1) {
              gsap.fromTo(
                el,
                { opacity: 0, x: 200 },
                { opacity: 1, x: 0, duration: 1, ease: "power3.inOut" }
              );
            } else {
              gsap.fromTo(
                el,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 1, ease: "power3.inOut" }
              );
            }
          } else if (el.dataset.index === "q2") {
            gsap.fromTo(
              el,
              { opacity: 0 },
              { opacity: 0.32, duration: 1, ease: "power3.inOut" }
            );
          }
        });
      },
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    const outgoingEl = document.querySelector(`[data-flip-id='${outgoingId}']`);
    if (outgoingEl) {
      gsap.fromTo(
        outgoingEl,
        { opacity: 0 },
        { 
          opacity: outgoingEl.dataset.index === 'q1' ? 0.55 : 0.32, 
          duration: 0.6, 
          delay: 0.4 
        }
      );
    }

    flipState.current = null;
  }, [order]);

  // Set up an infinite interval for automatic carousel play
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimatingRef.current) {
        next();
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [order]);

  // Parallax effect on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".parallax-wrapper", {
        y: "8%",
        ease: "none",
        scrollTrigger: {
          trigger: ".showcase-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="shop" className="showcase-section relative h-screen w-full bg-white">
      <div className="grid h-full min-h-0 grid-cols-1 lg:grid-cols-[62%_38%]">
        <div className="relative flex min-h-0 flex-col bg-white">
          <Navbar variant="shop" />

          <div className="relative flex min-h-0 flex-1 items-end justify-center overflow-hidden px-6 py-6 main-img-container">
            <button
              type="button"
              onClick={prev}
              className="absolute left-6 top-1/2 z-40 -translate-y-1/2 text-sm font-semibold tracking-wide text-ink/60 transition-colors hover:text-ink md:left-10"
            >
              ‹ PREV
            </button>

            {/* Q2 Thumbnail */}
            <div className="pointer-events-none absolute bottom-6 left-6 z-10 h-[42%] w-[120px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={q2Product.image}
                alt=""
                className="flip-item h-full w-full object-contain object-bottom"
                style={{ opacity: 0.32, filter: "blur(6px)" }}
                draggable={false}
                data-flip-id={q2Product.id}
                data-index="q2"
              />
            </div>

            {/* Q1 Thumbnail */}
            <div className="pointer-events-none absolute bottom-6 left-[94px] z-20 h-[58%] w-[160px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={q1Product.image}
                alt=""
                className="flip-item h-full w-full object-contain object-bottom"
                style={{ opacity: 0.55, filter: "blur(3px)" }}
                draggable={false}
                data-flip-id={q1Product.id}
                data-index="q1"
              />
            </div>

            {/* Main Stage */}
            <div className="relative z-30 flex h-full w-full max-w-[480px] items-end justify-center">
              <div className="parallax-wrapper pointer-events-none absolute -top-[5%] left-0 w-full h-[110%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={mainImgRef}
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="flip-item absolute inset-0 h-full w-full object-contain object-bottom"
                  style={{ opacity: 1, filter: "blur(0px)" }}
                  draggable={false}
                  data-flip-id={activeProduct.id}
                  data-index="main"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={next}
              className="absolute right-6 top-1/2 z-40 -translate-y-1/2 text-sm font-semibold tracking-wide text-ink/60 transition-colors hover:text-ink md:right-10"
            >
              NEXT ›
            </button>
          </div>
        </div>

        <div className="relative flex flex-col justify-center overflow-hidden bg-white px-8 py-10 md:px-14">
          {/* Video as full bg — multiply blend strips the light studio background */}
          {mounted && (
            <video
              src="/videos/product.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              style={{ mixBlendMode: "multiply" }}
            />
          )}

          {/* White overlay to keep text legible over the video */}
          <div className="absolute inset-0 bg-white/75 backdrop-blur-[1px]" />

          {/* All text/controls sit above the video */}
          <div className="relative z-10">
            <div ref={detailsRef}>
              <p className="text-xs font-medium tracking-wide text-ink/40">
                HOME <span className="mx-1">›</span> {activeProduct.category.toUpperCase()}
              </p>

              <div className="mt-4 flex items-center gap-1.5 text-sm">
                <Star size={15} className="fill-amber-400 text-amber-400" />
                <span className="font-semibold text-ink">{activeProduct.rating}</span>
                <span className="text-ink/40">({activeProduct.reviews})</span>
              </div>

              <h2 className="mt-3 text-4xl font-bold uppercase leading-[1.05] tracking-tight text-ink md:text-5xl">
                {activeProduct.name}
              </h2>

              <p className="mt-4 text-2xl font-semibold text-ink">
                ${activeProduct.price.toFixed(2)}
              </p>

              <div className="mt-8">
                <p className="text-xs font-semibold tracking-wide text-ink/50">
                  SELECT SIZE (US)
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeProduct.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "border-2 border-ink text-ink"
                          : "border border-black/15 text-ink/60 hover:border-ink/40"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-7">
                <p className="text-xs font-semibold tracking-wide text-ink/50">
                  SELECT COLOR
                </p>
                <div className="mt-3 flex gap-3">
                  {activeProduct.colors.map((color) => (
                    <button
                      key={color.hex}
                      type="button"
                      aria-label={color.name}
                      onClick={() => setSelectedColor(color.hex)}
                      style={{ backgroundColor: color.hex }}
                      className={`h-9 w-9 rounded-lg transition-shadow ${
                        selectedColor === color.hex
                          ? "ring-2 ring-ink ring-offset-2"
                          : "shadow-neu"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="mt-7 max-w-md text-sm leading-relaxed text-ink/55">
                {activeProduct.description}
              </p>
            </div>

            <button
              type="button"
              className="mt-9 flex w-full items-center justify-between rounded-2xl bg-ink px-7 py-5 text-sm font-semibold tracking-wide text-white transition-transform hover:scale-[1.01]"
            >
              <span>ADD TO CART</span>
              <span className="flex items-center gap-3">
                ${activeProduct.price.toFixed(2)}
                <ShoppingBag size={18} strokeWidth={1.75} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
