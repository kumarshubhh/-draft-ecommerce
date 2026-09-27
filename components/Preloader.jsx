"use client";

import { useEffect, useRef, useState } from "react";

const FALLBACK_MS = 2400;

export default function Preloader() {
  const [hiding, setHiding] = useState(false);
  const [hidden, setHidden] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const finish = () => setHiding(true);
    const video = videoRef.current;
    video?.addEventListener("ended", finish);
    const fallback = setTimeout(finish, FALLBACK_MS);

    return () => {
      video?.removeEventListener("ended", finish);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!hiding) return;
    document.body.style.overflow = "";
    const timeout = setTimeout(() => setHidden(true), 600);
    return () => clearTimeout(timeout);
  }, [hiding]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-[600ms] ${
        hiding ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        src="/preloader/preloader.mp4"
        autoPlay
        muted
        playsInline
        className="h-auto w-[26rem] max-w-[85vw] sm:w-[34rem] md:w-[42rem]"
      />
    </div>
  );
}
