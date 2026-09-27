"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function PromoBanners() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 py-8 md:grid-cols-2 md:px-6">
      {/* Card 1 — Spring Sale */}
      <div
        className="group relative overflow-hidden rounded-2xl"
        style={{ aspectRatio: "16/7" }}
      >
        <Image
          src="/offer/18c0af0c-f4a1-484f-9141-297401d80cbf.png"
          alt="Spring Sale – Up to 50% Off"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-8">
          <span className="mb-1.5 inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Limited Time
          </span>
          <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
            Spring Sale
          </h2>
          <p className="mt-1 text-lg font-semibold text-white/90">
            Up to 50% Off
          </p>
          <button
            type="button"
            className="mt-5 group/btn inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/90 px-5 py-2.5 text-sm font-semibold text-ink backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-lg"
          >
            Shop the Sale
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            />
          </button>
        </div>
      </div>

      {/* Card 2 — Modern Essentials */}
      <div
        className="group relative overflow-hidden rounded-2xl"
        style={{ aspectRatio: "16/7" }}
      >
        <Image
          src="/offer/88aceedf-f810-49a7-bc62-9bfa426ae26e.png"
          alt="Modern Essentials – Elevate Your Style"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

      </div>
    </div>
  );
}
