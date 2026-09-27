"use client";

import { useEffect, useRef } from "react";

const LOW_THRESHOLD = 30;
const HIGH_THRESHOLD = 85;
const LOW_THRESHOLD_SQ = LOW_THRESHOLD * LOW_THRESHOLD;
const HIGH_THRESHOLD_SQ = HIGH_THRESHOLD * HIGH_THRESHOLD;
// Full source resolution — the canvas is displayed stretched to the full
// hero size via CSS, so downscaling here (as before, at 0.5) softened the
// whole background noticeably once the browser upscaled it back up.
const PROCESS_SCALE = 1;

export default function VideoCutout({ src, className }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const bgColorRef = useRef(null);
  const keyingRef = useRef(true);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    video.muted = true;
    video.defaultMuted = true;

    const sampleBackground = () => {
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (!vw || !vh) return;
      const w = Math.round(vw * PROCESS_SCALE);
      const h = Math.round(vh * PROCESS_SCALE);
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(video, 0, 0, w, h);

      try {
        const samplePoints = [
          [4, 4],
          [w - 5, 4],
          [4, h - 5],
          [w - 5, h - 5],
          [Math.floor(w / 2), 4],
        ];
        let r = 0;
        let g = 0;
        let b = 0;
        samplePoints.forEach(([x, y]) => {
          const d = ctx.getImageData(x, y, 1, 1).data;
          r += d[0];
          g += d[1];
          b += d[2];
        });
        const n = samplePoints.length;
        bgColorRef.current = [r / n, g / n, b / n];
      } catch (err) {
        keyingRef.current = false;
      }
    };

    const draw = () => {
      if (video.readyState >= 2) {
        const expectedWidth = Math.round(video.videoWidth * PROCESS_SCALE);
        if (!canvas.width || canvas.width !== expectedWidth) {
          sampleBackground();
        }

        const w = canvas.width;
        const h = canvas.height;

        if (w && h) {
          ctx.drawImage(video, 0, 0, w, h);

          if (keyingRef.current && bgColorRef.current) {
            try {
              const frame = ctx.getImageData(0, 0, w, h);
              const data = frame.data;
              const [br, bgc, bb] = bgColorRef.current;

              for (let i = 0; i < data.length; i += 4) {
                const dr = data[i] - br;
                const dg = data[i + 1] - bgc;
                const db = data[i + 2] - bb;
                const distSq = dr * dr + dg * dg + db * db;

                let alpha;
                if (distSq <= LOW_THRESHOLD_SQ) alpha = 0;
                else if (distSq >= HIGH_THRESHOLD_SQ) alpha = 255;
                else {
                  const dist = Math.sqrt(distSq);
                  alpha = ((dist - LOW_THRESHOLD) / (HIGH_THRESHOLD - LOW_THRESHOLD)) * 255;
                }

                data[i + 3] = alpha;
              }
              ctx.putImageData(frame, 0, 0);
            } catch (err) {
              keyingRef.current = false;
            }
          }
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Autoplay blocked; draw() will still render whatever frame is available.
        });
      }
    };

    video.addEventListener("loadeddata", sampleBackground);
    video.addEventListener("canplay", tryPlay);
    tryPlay();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener("loadeddata", sampleBackground);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [src]);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className="hidden"
      />
      <canvas ref={canvasRef} className={className} />
    </>
  );
}
