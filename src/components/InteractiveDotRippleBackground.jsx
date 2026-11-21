import React, { useEffect, useRef } from 'react';

/**
 * InteractiveDotRippleBackground
 * A calm, minimal dot-matrix grid of light silver dots.
 * When the mouse pointer hovers over the dots, it creates a subtle optical zoom lens:
 * dots remain perfectly in their grid positions and smoothly zoom/scale up slightly,
 * gently returning to normal size as the pointer moves away.
 */
export default function InteractiveDotRippleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = window.devicePixelRatio || 1;

    // Grid and Zoom Parameters
    const DOT_SPACING = 28;
    const BASE_RADIUS = 1.35;
    const MAX_ZOOM_RADIUS = 3.2; // Pronounced, crisp zoom at lens center
    const ZOOM_INFLUENCE_RADIUS = 175; // Expanded field so more dots around the pointer participate in zooming

    const mouse = {
      x: -1000,
      y: -1000,
    };

    let dots = [];

    const initDots = () => {
      dots = [];
      const cols = Math.ceil(width / DOT_SPACING) + 1;
      const rows = Math.ceil(height / DOT_SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: c * DOT_SPACING,
            y: r * DOT_SPACING,
            radius: BASE_RADIUS,
            glow: 0,
          });
        }
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initDots();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const dotCount = dots.length;
      for (let i = 0; i < dotCount; i++) {
        const d = dots[i];

        // Calculate distance from cursor to dot
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        let targetRadius = BASE_RADIUS;
        let targetGlow = 0;

        // Subtle Optical Zoom when mouse is nearby
        if (dist < ZOOM_INFLUENCE_RADIUS) {
          // Smooth cosine curve for a gentle, rounded zoom lens feel
          const factor = Math.cos((dist / ZOOM_INFLUENCE_RADIUS) * (Math.PI / 2));
          targetRadius = BASE_RADIUS + factor * (MAX_ZOOM_RADIUS - BASE_RADIUS);
          targetGlow = factor;
        }

        // Smooth interpolation for silky zoom transitions
        d.radius += (targetRadius - d.radius) * 0.16;
        d.glow += (targetGlow - d.glow) * 0.16;

        // Draw dot at its exact grid position (zero displacement)
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);

        if (d.glow > 0.05) {
          // Zoomed dot: illuminated silver-white with delicate cyan shimmer
          const alpha = 0.22 + d.glow * 0.55;
          ctx.fillStyle = `rgba(220, 240, 255, ${alpha})`;
          ctx.shadowColor = 'rgba(6, 182, 212, 0.4)';
          ctx.shadowBlur = d.glow * 3;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          // Normal resting dot: elegant light silver
          ctx.fillStyle = 'rgba(215, 225, 238, 0.22)';
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full"
    />
  );
}
