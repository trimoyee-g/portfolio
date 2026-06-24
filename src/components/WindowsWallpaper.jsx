import { useEffect, useRef } from "react";

export default function WindowsWallpaper() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    const STARS = Array.from({ length: 100 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.005,
    }));

    // Windows 11 Bloom-style: blue, teal, cyan
    const ORBS = [
      { cx: 0.25, cy: 0.35, r: 0.38, color: [0, 120, 200], speed: 0.0007 },
      { cx: 0.75, cy: 0.6,  r: 0.32, color: [0, 180, 155], speed: 0.001  },
      { cx: 0.5,  cy: 0.82, r: 0.28, color: [80, 200, 230], speed: 0.0013 },
    ];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      t += 1;
      const W = canvas.width, H = canvas.height;

      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#010e1c");
      bg.addColorStop(0.5, "#04101e");
      bg.addColorStop(1, "#020c18");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      ORBS.forEach((orb, i) => {
        const ox = orb.cx + Math.cos(t * orb.speed + i) * 0.1;
        const oy = orb.cy + Math.sin(t * orb.speed * 1.3 + i) * 0.08;
        const grad = ctx.createRadialGradient(
          ox * W, oy * H, 0,
          ox * W, oy * H, orb.r * Math.min(W, H)
        );
        const [r, g, b] = orb.color;
        grad.addColorStop(0, `rgba(${r},${g},${b},0.18)`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      });

      STARS.forEach((s) => {
        const a = 0.4 + 0.6 * Math.abs(Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,220,255,${a * 0.7})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, display: "block" }}
    />
  );
}
