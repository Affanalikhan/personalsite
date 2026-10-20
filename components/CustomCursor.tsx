"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  // Only render on fine-pointer (mouse) devices — avoids wasted work on touch
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    setIsFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
    let animId: number;
    let hasMoved = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top  = `${mouseY}px`;
      if (!hasMoved) {
        hasMoved = true;
        dot.style.opacity  = "1";
        ring.style.opacity = "1";
        ringX = mouseX;
        ringY = mouseY;
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top  = `${ringY}px`;
      animId = requestAnimationFrame(animateRing);
    };

    const onEnter = () => document.body.classList.add("cursor-hover");
    const onLeave = () => document.body.classList.remove("cursor-hover");

    const attachHover = () => {
      document.querySelectorAll<Element>(
        "a, button, [role='button'], input, textarea, select"
      ).forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    document.addEventListener("mousemove", onMove);
    attachHover();

    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    animId = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <>
      <div id="cursor-dot"  ref={dotRef}  aria-hidden="true" style={{ opacity: 0 }} />
      <div id="cursor-ring" ref={ringRef} aria-hidden="true" style={{ opacity: 0 }} />
    </>
  );
}
