"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";

export default function TiltCard({ children, className = "", tiltAmount = 10, duration = 0.4 }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -tiltAmount;
    const rotateY = ((x - centerX) / centerX) * tiltAmount;
    
    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: duration,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center center"
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "power3.out"
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      {children}
    </div>
  );
}
