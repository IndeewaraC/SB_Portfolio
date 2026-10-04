"use client";
// ─────────────────────────────────────────────────────────────────────────────
//  components/ui/RevealWrapper.jsx
//  Wraps any child in a scroll-triggered fade-up animation.
//  Use delay prop to stagger sibling elements.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";

/**
 * @param {object}  props
 * @param {React.ReactNode} props.children
 * @param {string}  [props.className]
 * @param {number}  [props.delay=0]   - transition-delay in seconds
 */
export default function RevealWrapper({ children, className = "", delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transitionDelay = `${delay}s`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
