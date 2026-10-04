'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 1/3 of the total document height
      const scrollThreshold = document.documentElement.scrollHeight / 3;
      if (window.scrollY > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-8 right-8 md:bottom-12 md:right-12 p-3.5 rounded-full bg-white/80 backdrop-blur-md border border-rule text-slate shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] z-50 flex items-center justify-center group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'
      }`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="22" 
        height="22" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </button>
  );
}
