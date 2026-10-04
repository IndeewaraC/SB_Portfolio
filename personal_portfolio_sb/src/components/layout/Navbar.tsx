'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavLink { href: string; label: string; }

export default function Navbar({
  navLinks = [],
  lastUpdated,
  cvUrl,
}: {
  navLinks?: NavLink[];
  lastUpdated?: string | null;
  cvUrl?: string;
}) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);

  // Scroll shadow
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    if (!navLinks.length) return;
    const ids = navLinks.map((l) => l.href.replace('#', ''));
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = ids.indexOf(e.target.id);
            if (i !== -1) setActiveIdx(i);
          }
        }
      },
      { rootMargin: '-20% 0px -40% 0px', threshold: 0 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [navLinks]);

  // Close drawer on resize
  useEffect(() => {
    const h = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  return (
    <>
      {/* ── Main bar ───────────────────────────────────────────────────── */}
      <nav className={[
        'fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg',
        'flex items-center justify-between',
        'px-8 md:px-12 h-[72px]',
        'transition-all duration-300',
        scrolled || menuOpen ? 'shadow-sm border-b border-white/20' : 'border-b border-transparent',
      ].join(' ')}>

        {/* Logo — full name, serif */}
        <Link
          href="#hero"
          onClick={() => setMenuOpen(false)}
          className="font-display text-[17px] font-semibold text-ink
            hover:text-navy transition-colors duration-200 tracking-tight"
        >
          Sulalitha Bowala
        </Link>

        {/* ── Desktop links ─────────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              className={[
                'text-[12px] font-[700] tracking-[0.1em] uppercase transition-colors duration-300',
                activeIdx === i
                  ? 'text-[#B5653A]'
                  : 'text-slate-500 hover:text-[#B5653A]',
              ].join(' ')}
            >
              {label}
            </Link>
          ))}

          {/* Last updated badge */}
          {lastUpdated && (
            <span className="text-[11px] text-slate/60 font-[400] ml-2
              border border-rule px-2 py-[3px] rounded-sm hidden lg:block">
              Updated {lastUpdated}
            </span>
          )}

        </div>

        {/* ── Mobile hamburger ──────────────────────────────────────────── */}
        <button
          className="md:hidden flex flex-col gap-[5px] w-8 h-8 items-center justify-center"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`block w-5 h-[1px] bg-slate transition-all duration-250
            ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-5 h-[1px] bg-slate transition-all duration-250
            ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1px] bg-slate transition-all duration-250
            ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </nav>

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      <div className={[
        'fixed top-[58px] left-0 right-0 z-40 md:hidden bg-white',
        'border-b border-rule overflow-hidden transition-all duration-300',
        menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0',
      ].join(' ')}>
        <div className="flex flex-col py-3">
          {navLinks.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={[
                'flex items-center gap-4 px-8 py-[13px]',
                'text-[13px] tracking-[0.01em] border-b border-rule/50',
                'hover:bg-mist transition-colors duration-150',
                activeIdx === i ? 'text-navy font-[500]' : 'text-slate',
              ].join(' ')}
            >
              <span className="font-display text-[13px] text-navy/30 w-6">
                {String(i + 1).padStart(2, '0')}
              </span>
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Backdrop ──────────────────────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden bg-ink/5"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
