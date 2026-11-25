'use client';

import { useEffect, useRef } from 'react';

type Props = {
  /** Waterline as fraction of canvas height (0–1). */
  seaLine?: number;
};

type Critter = {
  x: number;
  y: number;
  dir: number;
  speed: number;
  scale: number;
  phase: number;
  body: string;
  belly: string;
  accent: string;
};

/**
 * Pixel-art ocean backdrop only (this pass).
 * Matches the KrillionPro lobby sea: moon sky band, silhouette boat,
 * blocky fish/coral/kelp/bubbles in deep navy–purple water.
 */
export default function LiveOceanCanvas({ seaLine = 0.2 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    /** Logical pixel cell size for chunky art */
    let cell = 4;

    const clouds = [
      { x: 0.08, y: 0.22, s: 1 },
      { x: 0.28, y: 0.12, s: 1.3 },
      { x: 0.52, y: 0.28, s: 0.9 },
      { x: 0.72, y: 0.16, s: 1.15 },
      { x: 0.9, y: 0.3, s: 0.75 },
    ];

    const palettes = [
      { body: '#a78bfa', belly: '#ddd6fe', accent: '#7c3aed' },
      { body: '#60a5fa', belly: '#bfdbfe', accent: '#2563eb' },
      { body: '#c084fc', belly: '#f3e8ff', accent: '#9333ea' },
      { body: '#34d399', belly: '#a7f3d0', accent: '#059669' },
      { body: '#f472b6', belly: '#fbcfe8', accent: '#db2777' },
      { body: '#22d3ee', belly: '#a5f3fc', accent: '#0891b2' },
    ];

    const critters: Critter[] = [];
    const spots = [
      [0.12, 0.4], [0.26, 0.56], [0.36, 0.7], [0.46, 0.46],
      [0.56, 0.64], [0.7, 0.5], [0.8, 0.72], [0.2, 0.78],
      [0.64, 0.38], [0.86, 0.58], [0.08, 0.62], [0.42, 0.84],
      [0.74, 0.8], [0.32, 0.44], [0.52, 0.76],
    ];
    spots.forEach(([x, y], i) => {
      const p = palettes[i % palettes.length];
      critters.push({
        x,
        y,
        dir: i % 2 === 0 ? 1 : -1,
        speed: 0.00014 + (i % 5) * 0.000045,
        scale: 0.75 + (i % 4) * 0.22,
        phase: i * 0.85,
        body: p.body,
        belly: p.belly,
        accent: p.accent,
      });
    });
    // soft school
    for (let i = 0; i < 8; i++) {
      const p = palettes[0];
      critters.push({
        x: 0.58 + (i % 4) * 0.04 + Math.random() * 0.01,
        y: 0.54 + Math.floor(i / 4) * 0.05 + (i % 2) * 0.02,
        dir: 1,
        speed: 0.00022,
        scale: 0.55 + Math.random() * 0.15,
        phase: i * 0.6,
        body: p.body,
        belly: p.belly,
        accent: p.accent,
      });
    }

    const bubbles = Array.from({ length: 36 }, () => ({
      x: Math.random(),
      y: 0.35 + Math.random() * 0.6,
      r: 1 + Math.floor(Math.random() * 3),
      speed: 0.00025 + Math.random() * 0.00055,
      wobble: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = Math.max(3, Math.round(Math.min(w, h) / 180));
    };

    const px = (x: number, y: number, cw: number, ch: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(Math.round(x), Math.round(y), Math.round(cw), Math.round(ch));
    };

    const drawPixelCloud = (cx: number, cy: number, s: number) => {
      const u = cell * s;
      const c = 'rgba(148,163,184,0.55)';
      const c2 = 'rgba(203,213,225,0.4)';
      px(cx - 3 * u, cy, 2 * u, u, c);
      px(cx - 2 * u, cy - u, 5 * u, u, c);
      px(cx - 4 * u, cy, 9 * u, u, c2);
      px(cx - 3 * u, cy + u, 6 * u, u, c);
    };

    const drawMoon = (cx: number, cy: number) => {
      const u = cell;
      // glow
      const glow = ctx.createRadialGradient(cx, cy, u, cx, cy, u * 10);
      glow.addColorStop(0, 'rgba(254,240,138,0.35)');
      glow.addColorStop(1, 'rgba(254,240,138,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, u * 10, 0, Math.PI * 2);
      ctx.fill();
      // block moon
      const body = '#fde68a';
      const shade = '#fbbf24';
      px(cx - 2 * u, cy - 3 * u, 4 * u, u, body);
      px(cx - 3 * u, cy - 2 * u, 6 * u, u, body);
      px(cx - 3 * u, cy - u, 6 * u, u, body);
      px(cx - 3 * u, cy, 6 * u, u, body);
      px(cx - 3 * u, cy + u, 6 * u, u, shade);
      px(cx - 2 * u, cy + 2 * u, 4 * u, u, shade);
      // crater dots
      px(cx - u, cy - u, u, u, shade);
      px(cx + u, cy, u, u, '#f59e0b');
    };

    const drawBoat = (cx: number, waterY: number, t: number) => {
      const bob = reduced ? 0 : Math.sin(t * 1.6) * 2;
      const y = waterY + bob;
      const u = cell;
      // hull
      px(cx - 5 * u, y, 10 * u, u, '#020617');
      px(cx - 4 * u, y + u, 8 * u, u, '#0f172a');
      px(cx - 3 * u, y + 2 * u, 6 * u, u, '#020617');
      // cabin
      px(cx - u, y - 2 * u, 3 * u, 2 * u, '#1e293b');
      px(cx, y - u, u, u, '#38bdf8');
      // mast + sail
      px(cx + u, y - 6 * u, u, 5 * u, '#020617');
      px(cx + 2 * u, y - 5 * u, 3 * u, 2 * u, '#fb7185');
      // wake pixels
      px(cx - 7 * u, y + 2 * u, u, u, 'rgba(186,230,253,0.45)');
      px(cx - 9 * u, y + 2 * u, u, u, 'rgba(186,230,253,0.25)');
    };

    const drawFish = (
      cx: number,
      cy: number,
      dir: number,
      scale: number,
      body: string,
      belly: string,
      accent: string,
      t: number,
      phase: number
    ) => {
      const s = 6.5 * scale;
      const swim = reduced ? 0 : Math.sin(t * 5.5 + phase);
      const tail = swim * 0.35;
      const bob = reduced ? 0 : Math.sin(t * 2.2 + phase) * 1.2;

      ctx.save();
      ctx.translate(cx, cy + bob);
      ctx.scale(dir, 1);
      ctx.rotate(swim * 0.06);

      // soft shadow
      ctx.fillStyle = 'rgba(2,6,23,0.25)';
      ctx.beginPath();
      ctx.ellipse(0, s * 0.55, s * 1.1, s * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();

      // tail
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.moveTo(-s * 0.85, 0);
      ctx.quadraticCurveTo(-s * 1.15, -s * 0.55 + tail * s, -s * 1.55, -s * 0.15 + tail * s);
      ctx.quadraticCurveTo(-s * 1.25, 0, -s * 1.55, s * 0.15 + tail * s);
      ctx.quadraticCurveTo(-s * 1.15, s * 0.55 + tail * s, -s * 0.85, 0);
      ctx.fill();

      // dorsal fin
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.moveTo(-s * 0.1, -s * 0.35);
      ctx.quadraticCurveTo(s * 0.15, -s * 0.95, s * 0.45, -s * 0.3);
      ctx.quadraticCurveTo(s * 0.15, -s * 0.45, -s * 0.1, -s * 0.35);
      ctx.fill();

      // body gradient
      const grad = ctx.createLinearGradient(0, -s * 0.5, 0, s * 0.55);
      grad.addColorStop(0, body);
      grad.addColorStop(0.45, body);
      grad.addColorStop(1, belly);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(0, 0, s, s * 0.52, 0, 0, Math.PI * 2);
      ctx.fill();

      // belly highlight
      ctx.fillStyle = 'rgba(255,255,255,0.22)';
      ctx.beginPath();
      ctx.ellipse(s * 0.15, s * 0.12, s * 0.55, s * 0.18, -0.15, 0, Math.PI * 2);
      ctx.fill();

      // pectoral fin
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.75;
      ctx.beginPath();
      ctx.moveTo(s * 0.05, s * 0.05);
      ctx.quadraticCurveTo(s * 0.2, s * 0.45 + swim * 2, s * 0.55, s * 0.35);
      ctx.quadraticCurveTo(s * 0.25, s * 0.2, s * 0.05, s * 0.05);
      ctx.fill();
      ctx.globalAlpha = 1;

      // eye
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(s * 0.55, -s * 0.08, s * 0.16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(s * 0.6, -s * 0.08, s * 0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(s * 0.63, -s * 0.11, s * 0.03, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawKelp = (x: number, baseY: number, segs: number, t: number, seed: number, color: string) => {
      const u = cell;
      let xx = x;
      for (let i = 0; i < segs; i++) {
        const sway = reduced ? 0 : Math.round(Math.sin(t * 1.3 + seed + i * 0.6) * 1.2) * u;
        xx = x + sway;
        const yy = baseY - i * u;
        px(xx, yy, u, u, color);
        if (i % 2 === 0) px(xx + u, yy, u, u, color);
        if (i % 3 === 0) px(xx - u, yy, u, u, color);
      }
    };

    const drawCoralCluster = (x: number, baseY: number, variant: number) => {
      const u = cell;
      const colors = ['#6d28d9', '#7e22ce', '#5b21b6', '#4c1d95', '#312e81'];
      const c = colors[variant % colors.length];
      const c2 = colors[(variant + 2) % colors.length];
      // trunk
      px(x, baseY - 4 * u, 2 * u, 4 * u, c);
      px(x - u, baseY - 6 * u, 2 * u, 3 * u, c2);
      px(x + 2 * u, baseY - 5 * u, 2 * u, 3 * u, c);
      // tips
      px(x - 2 * u, baseY - 7 * u, 2 * u, 2 * u, c2);
      px(x + 3 * u, baseY - 6 * u, 2 * u, 2 * u, '#a855f7');
      px(x, baseY - 8 * u, 2 * u, 2 * u, '#c084fc');
      // side mound
      px(x + 5 * u, baseY - 2 * u, 3 * u, 2 * u, '#3730a3');
      px(x + 6 * u, baseY - 4 * u, 2 * u, 2 * u, '#4c1d95');
    };

    const drawSeagrass = (x: number, baseY: number, t: number, seed: number) => {
      const u = cell;
      for (let i = 0; i < 5; i++) {
        const sway = reduced ? 0 : Math.round(Math.sin(t * 1.8 + seed + i) * 1) * u;
        px(x + sway, baseY - i * u, u, u, i % 2 ? '#166534' : '#14532d');
      }
    };

    const frame = (now: number) => {
      if (!running) return;
      const t = reduced ? 0 : now / 1000;
      const base = h * seaLine;

      // —— SKY BAND (night, moon) ——
      const sky = ctx.createLinearGradient(0, 0, 0, base);
      sky.addColorStop(0, '#0b1228');
      sky.addColorStop(0.55, '#12203d');
      sky.addColorStop(1, '#1a3358');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, base + cell * 2);

      // stars
      ctx.fillStyle = 'rgba(226,232,240,0.55)';
      for (let i = 0; i < 18; i++) {
        const sx = ((i * 97) % 100) / 100 * w;
        const sy = ((i * 53) % 100) / 100 * (base * 0.7);
        if ((i + Math.floor(t * 2)) % 7 !== 0) {
          px(sx, sy, Math.max(1, cell * 0.4), Math.max(1, cell * 0.4), 'rgba(226,232,240,0.5)');
        }
      }

      drawMoon(w * 0.82, base * 0.38);

      for (const c of clouds) {
        const drift = reduced ? 0 : ((t * 6 + c.x * 200) % (w + 80)) - 40;
        drawPixelCloud(c.x * w * 0.15 + drift + c.x * w * 0.7, c.y * base, c.s);
      }

      // —— OCEAN BODY ——
      const deep = ctx.createLinearGradient(0, base, 0, h);
      deep.addColorStop(0, '#0e4a7a');
      deep.addColorStop(0.2, '#0a3560');
      deep.addColorStop(0.45, '#071e3d');
      deep.addColorStop(0.75, '#050f24');
      deep.addColorStop(1, '#020617');
      ctx.fillStyle = deep;
      ctx.fillRect(0, base, w, h - base);

      // surface light band
      const lip = ctx.createLinearGradient(0, base, 0, base + cell * 8);
      lip.addColorStop(0, 'rgba(56,189,248,0.28)');
      lip.addColorStop(1, 'rgba(56,189,248,0)');
      ctx.fillStyle = lip;
      ctx.fillRect(0, base, w, cell * 8);

      // pixel waterline crest
      for (let x = 0; x < w; x += cell) {
        const rise = reduced ? 0 : Math.round(Math.sin(x * 0.04 + t * 2.2) + Math.sin(x * 0.09 - t * 1.4));
        px(x, base + rise * (cell * 0.35), cell, cell, 'rgba(186,230,253,0.85)');
        px(x, base + cell + rise * (cell * 0.35), cell, cell, 'rgba(34,211,238,0.35)');
      }

      // boat on waterline
      drawBoat(w * 0.36, base - cell * 2, t);
      // distant smaller boat
      ctx.globalAlpha = 0.45;
      drawBoat(w * 0.62, base - cell, t + 1.5);
      ctx.globalAlpha = 1;

      // god rays (soft, under UI)
      ctx.save();
      ctx.globalAlpha = 0.1;
      for (let i = 0; i < 5; i++) {
        const rx = w * (0.15 + i * 0.15) + Math.sin(t * 0.3 + i) * 10;
        const ray = ctx.createLinearGradient(rx, base, rx - 40, h * 0.85);
        ray.addColorStop(0, 'rgba(125,211,252,0.9)');
        ray.addColorStop(1, 'rgba(125,211,252,0)');
        ctx.fillStyle = ray;
        ctx.beginPath();
        ctx.moveTo(rx, base);
        ctx.lineTo(rx + 40, base);
        ctx.lineTo(rx - 20, h);
        ctx.lineTo(rx - 80, h);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // floor coral / kelp (left)
      drawCoralCluster(cell * 3, h, 0);
      drawCoralCluster(cell * 12, h, 2);
      drawCoralCluster(cell * 22, h, 1);
      drawKelp(cell * 8, h - cell, 10, t, 0.2, '#166534');
      drawKelp(cell * 18, h - cell, 14, t, 1.1, '#14532d');
      drawSeagrass(cell * 28, h - cell, t, 0.5);
      drawSeagrass(cell * 32, h - cell, t, 1.2);

      // floor (right)
      drawCoralCluster(w - cell * 28, h, 3);
      drawCoralCluster(w - cell * 16, h, 4);
      drawCoralCluster(w - cell * 8, h, 0);
      drawKelp(w - cell * 22, h - cell, 12, t, 2.4, '#166534');
      drawKelp(w - cell * 12, h - cell, 9, t, 3.1, '#14532d');
      drawSeagrass(w - cell * 34, h - cell, t, 2);
      drawSeagrass(w - cell * 4, h - cell, t, 2.7);

      // mid sparse coral
      drawCoralCluster(w * 0.42, h, 1);
      drawKelp(w * 0.48, h - cell, 8, t, 4, '#15803d');

      // fish — smooth organic shapes (not pixel boxes)
      for (const f of critters) {
        if (!reduced) {
          f.x += f.dir * f.speed;
          if (f.x > 0.96) f.dir = -1;
          if (f.x < 0.04) f.dir = 1;
        }
        const fy = Math.max(base + cell * 4, f.y * h + Math.sin(t * 1.8 + f.phase) * cell * 0.8);
        drawFish(f.x * w, fy, f.dir, f.scale, f.body, f.belly, f.accent, t, f.phase);
      }

      // bubbles (pixel squares / rings)
      for (const b of bubbles) {
        if (!reduced) {
          b.y -= b.speed;
          b.wobble += 0.04;
          if (b.y < seaLine + 0.02) {
            b.y = 0.95;
            b.x = Math.random();
          }
        }
        const bx = b.x * w + Math.sin(b.wobble) * cell * 1.5;
        const by = b.y * h;
        if (by > base) {
          const s = b.r * (cell * 0.45);
          px(bx, by, s, s, 'rgba(186,230,253,0.15)');
          ctx.strokeStyle = 'rgba(186,230,253,0.55)';
          ctx.lineWidth = 1;
          ctx.strokeRect(Math.round(bx), Math.round(by), Math.round(s), Math.round(s));
        }
      }

      // bottom vignette for readability
      const vig = ctx.createLinearGradient(0, h * 0.55, 0, h);
      vig.addColorStop(0, 'rgba(2,6,23,0)');
      vig.addColorStop(1, 'rgba(2,6,23,0.45)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, h * 0.55, w, h * 0.45);

      raf = requestAnimationFrame(frame);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [seaLine]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
