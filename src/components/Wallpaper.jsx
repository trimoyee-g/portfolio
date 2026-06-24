import { useEffect, useRef } from "react";

export default function Wallpaper() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let w, h;

    let bgGrad;
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, "#0a0a14");
      bgGrad.addColorStop(0.5, "#0d0d1f");
      bgGrad.addColorStop(1, "#0a0f1a");
    };
    resize();
    window.addEventListener("resize", resize);

    // Stars
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
    }));

    // Floating orbs
    const orbs = [
      { x: 0.15, y: 0.3, r: 180, color: "#6366f133" },
      { x: 0.75, y: 0.6, r: 220, color: "#a855f722" },
      { x: 0.5,  y: 0.85, r: 140, color: "#3b82f620" },
    ];

    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Orbs
      orbs.forEach((orb, i) => {
        const ox = orb.x * w + Math.sin(t * 0.4 + i) * 40;
        const oy = orb.y * h + Math.cos(t * 0.3 + i * 1.3) * 30;
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r);
        g.addColorStop(0, orb.color);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(ox, oy, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Stars
      stars.forEach((s) => {
        const a = 0.3 + 0.5 * Math.abs(Math.sin(t * s.speed * 60 + s.phase));
        ctx.globalAlpha = a;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
