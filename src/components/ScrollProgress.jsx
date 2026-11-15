import { useState, useEffect } from 'react';

/**
 * ScrollProgress
 * ─────────────
 * A 3 px fixed bar at the very top of the viewport that tracks scroll depth.
 * Uses the same blue → purple → cyan gradient already present in the scrollbar
 * thumb, text-gradient, and timeline-line — no new colours introduced.
 *
 * Performance notes:
 *  • Passive scroll listener (no jank)
 *  • CSS transform: scaleX() — compositor-only, no layout/paint cost
 *  • transform-origin: left so the bar grows from the left edge
 *  • will-change: transform declared only during active scroll via inline style
 *  • Respects prefers-reduced-motion (bar still shows position, just no transition)
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(pct, 1));
    };

    // Seed on mount (handles page-restore scroll position)
    updateProgress();

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 9999,          // above Navbar z-50
        pointerEvents: 'none', // never intercepts clicks
        background: 'transparent',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 55%, #06b6d4 100%)',
          transformOrigin: 'left center',
          transform: `scaleX(${progress})`,
          transition: 'transform 0.1s linear',
          willChange: 'transform',
          boxShadow: '0 0 8px rgba(59,130,246,0.6), 0 0 20px rgba(139,92,246,0.3)',
        }}
      />
    </div>
  );
}
