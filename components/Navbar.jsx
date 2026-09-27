"use client";

import { Search, ShoppingBag, Menu } from "lucide-react";

const heroLinks = [
  { label: "Home", href: "#home", active: true },
  { label: "Shop", href: "#shop" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const shopLinks = [
  { label: "HOME", href: "#home" },
  { label: "SHOP", href: "#shop", active: true },
  { label: "COLLECTIONS", href: "#collections" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

function LogoMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2 L13.8 9.2 21 11 13.8 12.8 12 20 10.2 12.8 3 11 10.2 9.2 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Navbar({ variant = "hero", cartCount = 2 }) {
  if (variant === "shop") {
    return (
      <nav className="flex items-center justify-between px-8 py-6 md:px-10">
        <span className="font-serif text-2xl font-semibold tracking-tight text-ink lowercase">
          drift.
        </span>

        <ul className="hidden items-center gap-9 text-sm font-medium tracking-wide text-ink/70 md:flex">
          {shopLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={
                  link.active
                    ? "text-ink underline decoration-2 underline-offset-8"
                    : "transition-colors hover:text-ink"
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-full bg-black/[0.04] px-4 py-2.5 text-sm text-ink/50 shadow-neu-inset sm:flex">
            <span>Search products...</span>
            <Search size={15} className="text-ink/40" />
          </div>
          <button
            aria-label="Cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-transform hover:scale-105"
          >
            <ShoppingBag size={20} strokeWidth={1.75} />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[10px] font-semibold text-white">
              {cartCount}
            </span>
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-between px-8 py-6 md:px-10">
      <div className="flex items-center gap-2 text-ink">
        <LogoMark />
        <span className="text-sm font-semibold tracking-[0.25em]">DRIFT</span>
      </div>

      <ul className="hidden items-center gap-8 text-sm font-medium text-ink/80 lg:flex">
        {heroLinks.map((link) => (
          <li key={link.label} className="relative flex flex-col items-center gap-1.5">
            <a
              href={link.href}
              className={link.active ? "text-ink" : "transition-colors hover:text-ink"}
            >
              {link.label}
            </a>
            {link.active && <span className="h-1 w-1 rounded-full bg-ink" />}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-1 rounded-full bg-white/70 p-1.5 shadow-neu backdrop-blur-md">
        <button
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink/80 transition-colors hover:bg-black/[0.04]"
        >
          <Search size={17} strokeWidth={1.75} />
        </button>
        <button
          aria-label="Cart"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink/80 transition-colors hover:bg-black/[0.04]"
        >
          <ShoppingBag size={17} strokeWidth={1.75} />
          <span className="absolute right-0.5 top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-ink text-[9px] font-semibold text-white">
            {cartCount}
          </span>
        </button>
        <button
          aria-label="Menu"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink/80 transition-colors hover:bg-black/[0.04]"
        >
          <Menu size={17} strokeWidth={1.75} />
        </button>
      </div>
    </nav>
  );
}
