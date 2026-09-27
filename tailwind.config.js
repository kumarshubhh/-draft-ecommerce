/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        offwhite: "#F5F5F3",
        ink: "#111111",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        neu: "0 1px 2px rgba(17,17,17,0.04), 0 12px 32px -8px rgba(17,17,17,0.10)",
        "neu-lg": "0 2px 4px rgba(17,17,17,0.05), 0 24px 48px -12px rgba(17,17,17,0.14)",
        "neu-inset": "inset 0 1px 2px rgba(17,17,17,0.06)",
      },
      letterSpacing: {
        tightest: "-0.05em",
        tighter: "-0.03em",
      },
      borderRadius: {
        "4xl": "32px",
      },
      animation: {
        "spin-slow": "spin 14s linear infinite",
        marquee: "marquee 38s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
