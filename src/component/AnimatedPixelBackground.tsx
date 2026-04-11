import { useEffect, useRef, useState, useCallback } from 'react';

interface AnimatedPixelBackgroundProps {
  imageSrc: string;
  logoSrc?: string;
  pixelSize?: number;
  className?: string;
  height?: number;
}

interface LogoParticle {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  a: number;
  size: number;
}

interface Ripple {
  cx: number;
  cy: number;
  startTime: number;
  duration: number;
  maxRadius: number;
}

interface WaterCell {
  col: number;
  row: number;
  x: number;
  y: number;
  baseColor: RGB;
  alpha: number;
  opacity: number;
  fadeT: number;
}

type RGB = { r: number; g: number; b: number };
type RGBA = RGB & { a: number };

// ---------- Color Palette ----------

const generateExtendedPalette = () => {
  const palette: RGB[] = [];
  const add = (count: number, fn: (f: number) => RGB) => {
    for (let i = 0; i < count; i++) fn(i / (count - 1));
  };
  const push = (r: number, g: number, b: number) => { palette.push({ r, g, b }); };

  add(64, f => { push(Math.floor(f * 100), Math.floor(50 + f * 156), Math.floor(100 + f * 155)); return palette[palette.length-1]; });
  add(48, f => { push(Math.floor(20 + f * 80), Math.floor(60 + f * 140), Math.floor(20 + f * 60)); return palette[palette.length-1]; });
  add(32, f => { push(Math.floor(80 + f * 100), Math.floor(40 + f * 80), Math.floor(20 + f * 40)); return palette[palette.length-1]; });
  add(32, f => { const v = Math.floor(100 + f * 155); push(v, v, v); return palette[palette.length-1]; });
  add(24, f => { push(Math.floor(f * 100), Math.floor(150 + f * 105), Math.floor(200 + f * 55)); return palette[palette.length-1]; });
  add(24, f => { push(Math.floor(f * 50), Math.floor(100 + f * 100), Math.floor(120 + f * 100)); return palette[palette.length-1]; });

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  for (let i = 0; i < 32; i++) {
    const h = (i / 31) * 360 / 360;
    const q = 0.75, p = 0.25;
    push(Math.round(hue2rgb(p, q, h + 1/3) * 255), Math.round(hue2rgb(p, q, h) * 255), Math.round(hue2rgb(p, q, h - 1/3) * 255));
  }

  return palette;
};

const COLOR_PALETTE = generateExtendedPalette();

// Precomputed 5-bits-per-channel palette lookup table (32768 entries).
// Built once at module load; O(1) per lookup at runtime.
const PALETTE_LUT = (() => {
  const lut = new Uint16Array(32768);
  for (let r5 = 0; r5 < 32; r5++) {
    for (let g5 = 0; g5 < 32; g5++) {
      for (let b5 = 0; b5 < 32; b5++) {
        const r = (r5 << 3) | 4;
        const g = (g5 << 3) | 4;
        const b = (b5 << 3) | 4;
        let minDist = Infinity;
        let best = 0;
        for (let i = 0; i < COLOR_PALETTE.length; i++) {
          const c = COLOR_PALETTE[i];
          const d = (r - c.r) ** 2 + (g - c.g) ** 2 + (b - c.b) ** 2;
          if (d < minDist) { minDist = d; best = i; }
        }
        lut[(r5 << 10) | (g5 << 5) | b5] = best;
      }
    }
  }
  return lut;
})();

const findClosestColor = (r: number, g: number, b: number): RGB =>
  COLOR_PALETTE[PALETTE_LUT[((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3)]];

// ---------- Water Detection & Effects ----------

const isWaterPixel = (r: number, g: number, b: number) =>
  b > r && b > g && r <= 120 && g >= 80 && g <= 180 && b >= 120;

const FRAME_INTERVAL_MS = 100; // 10 fps

// ---------- Component ----------

const AnimatedPixelBackground: React.FC<AnimatedPixelBackgroundProps> = ({
  imageSrc,
  logoSrc,
  pixelSize = 20,
  className = '',
  height = 598,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);
  const pixelDataRef = useRef<{ color: RGBA; isWater: boolean }[][]>([]);
  const startTimeRef = useRef(Date.now());
  const lastFrameRef = useRef(0);
  const reducedMotionRef = useRef(false);

  // Logo particle system
  const logoParticlesRef = useRef<LogoParticle[]>([]);
  const logoPosRef = useRef({ x: 0, y: 20, w: 0, h: 140 });

  // Automated water ripples
  const ripplesRef = useRef<Ripple[]>([]);
  const lastAutoRippleRef = useRef(0);
  const waterPixelCoordsRef = useRef<{ x: number; y: number }[]>([]);

  // Cached layers — built once per (re)load, blitted per frame
  const bgCacheRef = useRef<HTMLCanvasElement | null>(null);
  const overlayCacheRef = useRef<HTMLCanvasElement | null>(null);
  const waterCellsRef = useRef<WaterCell[]>([]);

  // ---------- Logo Particle Init ----------

  const initLogoParticles = useCallback((logoImg: HTMLImageElement, canvasWidth: number) => {
    const targetH = 220;
    const aspect = logoImg.naturalWidth / logoImg.naturalHeight || 0.69;
    const targetW = Math.round(targetH * aspect);
    const logoX = Math.round((canvasWidth - targetW) / 2);
    const logoY = 56;

    logoPosRef.current = { x: logoX, y: logoY, w: targetW, h: targetH };

    const off = document.createElement('canvas');
    off.width = targetW;
    off.height = targetH;
    const ctx = off.getContext('2d')!;
    ctx.drawImage(logoImg, 0, 0, targetW, targetH);

    const data = ctx.getImageData(0, 0, targetW, targetH).data;
    const particles: LogoParticle[] = [];
    const step = 2;

    for (let py = 0; py < targetH; py += step) {
      for (let px = 0; px < targetW; px += step) {
        const i = (py * targetW + px) * 4;
        if (data[i + 3] < 100) continue;

        particles.push({
          x: logoX + px,
          y: logoY + py,
          r: data[i],
          g: data[i + 1],
          b: data[i + 2],
          a: data[i + 3] / 255,
          size: step,
        });
      }
    }

    logoParticlesRef.current = particles;
  }, []);

  // ---------- Pixelate Source Image (compute pixel data only) ----------

  const computePixelData = useCallback((image: HTMLImageElement) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = height;

    const off = document.createElement('canvas');
    off.width = canvas.width;
    off.height = canvas.height;
    const offCtx = off.getContext('2d')!;

    const aspect = image.width / image.height;
    let dw = canvas.width, dh = canvas.width / aspect;
    if (dh < canvas.height) { dh = canvas.height; dw = canvas.height * aspect; }
    const ox = (canvas.width - dw) / 2;
    const oy = (canvas.height - dh) / 2 - dh * 0.15;
    offCtx.drawImage(image, ox, oy, dw, dh);

    const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const cols = Math.ceil(canvas.width / pixelSize);
    const rows = Math.ceil(canvas.height / pixelSize);
    pixelDataRef.current = [];
    const waterCoords: { x: number; y: number }[] = [];

    for (let row = 0; row < rows; row++) {
      pixelDataRef.current[row] = [];
      for (let col = 0; col < cols; col++) {
        const x = col * pixelSize;
        const y = row * pixelSize;
        let r = 0, g = 0, b = 0, a = 0, count = 0;

        for (let dy = 0; dy < pixelSize && y + dy < canvas.height; dy++) {
          for (let dx = 0; dx < pixelSize && x + dx < canvas.width; dx++) {
            const i = ((y + dy) * canvas.width + (x + dx)) * 4;
            r += data[i]; g += data[i + 1]; b += data[i + 2]; a += data[i + 3];
            count++;
          }
        }
        if (count > 0) { r = Math.floor(r / count); g = Math.floor(g / count); b = Math.floor(b / count); a = Math.floor(a / count); }

        const qc = findClosestColor(r, g, b);
        const water = isWaterPixel(r, g, b);
        pixelDataRef.current[row][col] = { color: { ...qc, a }, isWater: water };

        if (water) waterCoords.push({ x: x + pixelSize / 2, y: y + pixelSize / 2 });
      }
    }

    waterPixelCoordsRef.current = waterCoords;
  }, [pixelSize, height]);

  // ---------- Render Static Cache Layers ----------

  const renderStaticCaches = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.width;
    const h = canvas.height;

    const bg = document.createElement('canvas');
    bg.width = w;
    bg.height = h;
    const bgCtx = bg.getContext('2d')!;

    const rows = pixelDataRef.current.length;
    const cols = pixelDataRef.current[0]?.length || 0;
    const bottomCut = 5;
    const fadeRowCount = 18;

    const cutoffs: number[] = [];
    for (let col = 0; col < cols; col++) {
      cutoffs[col] = rows - bottomCut + Math.floor(Math.sin(col * 0.15) * 1.5);
    }

    const waterCells: WaterCell[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const pd = pixelDataRef.current[row][col];
        if (!pd || row >= cutoffs[col]) continue;

        const x = col * pixelSize;
        const y = row * pixelSize;

        let opacity = 1;
        const edgeDist = cutoffs[col] - row;
        if (edgeDist <= 3) opacity = edgeDist / 3;

        const fadeStart = cutoffs[col] - fadeRowCount;
        const fadeT = row >= fadeStart ? Math.min(1, (row - fadeStart) / fadeRowCount) : 0;

        let c: RGB = pd.color;
        if (fadeT > 0) {
          c = {
            r: Math.round(c.r + (255 - c.r) * fadeT),
            g: Math.round(c.g + (255 - c.g) * fadeT),
            b: Math.round(c.b + (255 - c.b) * fadeT),
          };
        }
        bgCtx.fillStyle = `rgba(${c.r},${c.g},${c.b},${(pd.color.a / 255) * opacity})`;
        bgCtx.fillRect(x, y, pixelSize, pixelSize);

        if (pd.isWater) {
          waterCells.push({
            col, row, x, y,
            baseColor: { r: pd.color.r, g: pd.color.g, b: pd.color.b },
            alpha: pd.color.a / 255,
            opacity,
            fadeT,
          });
        }
      }
    }

    const lowestCutoff = Math.min(...cutoffs) * pixelSize;
    bgCtx.fillStyle = '#ffffff';
    bgCtx.fillRect(0, lowestCutoff, w, h - lowestCutoff);

    // Logo shadow + particles
    const particles = logoParticlesRef.current;
    if (particles.length > 0) {
      const logoPos = logoPosRef.current;
      const shCx = logoPos.x + logoPos.w / 2;
      const shCy = logoPos.y + logoPos.h / 2 + 4;
      const shR = Math.max(logoPos.w, logoPos.h) * 0.65;
      const shadow = bgCtx.createRadialGradient(shCx, shCy, 0, shCx, shCy, shR);
      shadow.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      shadow.addColorStop(0.35, 'rgba(0, 0, 0, 0.5)');
      shadow.addColorStop(0.65, 'rgba(0, 0, 0, 0.2)');
      shadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      bgCtx.fillStyle = shadow;
      bgCtx.fillRect(shCx - shR, shCy - shR, shR * 2, shR * 2);

      const shadowOff = 3;
      for (const p of particles) {
        bgCtx.fillStyle = `rgba(0,0,0,${p.a * 0.55})`;
        bgCtx.fillRect(p.x + shadowOff, p.y + shadowOff, p.size, p.size);
      }
      for (const p of particles) {
        bgCtx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a})`;
        bgCtx.fillRect(p.x, p.y, p.size, p.size);
      }
    }

    // Overlay: scanlines + vignette
    const fg = document.createElement('canvas');
    fg.width = w;
    fg.height = h;
    const fgCtx = fg.getContext('2d')!;

    const scanlineLimit = (rows - bottomCut - fadeRowCount) * pixelSize;
    fgCtx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    for (let y = 0; y < scanlineLimit; y += 3) {
      fgCtx.fillRect(0, y, w, 1);
    }

    const vigCy = h * 0.4;
    const vignette = fgCtx.createRadialGradient(
      w / 2, vigCy, h * 0.3,
      w / 2, vigCy, h * 0.75,
    );
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignette.addColorStop(1, 'rgba(0, 0, 0, 0.12)');
    fgCtx.fillStyle = vignette;
    fgCtx.fillRect(0, 0, w, scanlineLimit);

    bgCacheRef.current = bg;
    overlayCacheRef.current = fg;
    waterCellsRef.current = waterCells;
  }, [pixelSize]);

  // ---------- Draw Single Frame ----------

  const drawFrame = useCallback((time: number) => {
    const canvas = canvasRef.current;
    const bg = bgCacheRef.current;
    const fg = overlayCacheRef.current;
    if (!canvas || !bg || !fg) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, 0, 0);

    const ripples = ripplesRef.current;
    if (ripples.length > 0) {
      const waterCells = waterCellsRef.current;
      const half = pixelSize / 2;
      const ringWidth = 14;

      // Precompute per-ripple state + AABB bounds (y stretched 2x for elliptical perspective)
      const rippleState = ripples.map(ripple => {
        const progress = (time - ripple.startTime) / ripple.duration;
        const curRadius = ripple.maxRadius * progress;
        const reach = curRadius + ringWidth;
        return {
          cx: ripple.cx,
          cy: ripple.cy,
          curRadius,
          fade: 1 - progress,
          reachX: reach * 2, // dx is compressed 0.5x, so AABB in world space is 2x
          reachY: reach,
        };
      });

      for (const wc of waterCells) {
        const px = wc.x + half;
        const py = wc.y + half;

        let rippleBrightness = 0;
        for (const rs of rippleState) {
          const wdx = px - rs.cx;
          const wdy = py - rs.cy;
          if (Math.abs(wdx) > rs.reachX || Math.abs(wdy) > rs.reachY) continue;
          const dx = wdx * 0.5;
          const d = Math.sqrt(dx * dx + wdy * wdy);
          const ringDist = Math.abs(d - rs.curRadius);
          if (ringDist < ringWidth) {
            rippleBrightness += (1 - ringDist / ringWidth) * rs.fade * 0.35;
          }
        }
        if (rippleBrightness === 0) continue;

        let c: RGB = {
          r: Math.min(255, wc.baseColor.r + Math.floor(rippleBrightness * 120)),
          g: Math.min(255, wc.baseColor.g + Math.floor(rippleBrightness * 120)),
          b: Math.min(255, wc.baseColor.b + Math.floor(rippleBrightness * 80)),
        };
        c = findClosestColor(c.r, c.g, c.b);

        if (wc.fadeT > 0) {
          c = {
            r: Math.round(c.r + (255 - c.r) * wc.fadeT),
            g: Math.round(c.g + (255 - c.g) * wc.fadeT),
            b: Math.round(c.b + (255 - c.b) * wc.fadeT),
          };
        }

        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${wc.alpha * wc.opacity})`;
        ctx.fillRect(wc.x, wc.y, pixelSize, pixelSize);
      }
    }

    ctx.drawImage(fg, 0, 0);
  }, [pixelSize]);

  // ---------- Animation Loop ----------

  const animate = useCallback(() => {
    const now = Date.now();
    if (now - lastFrameRef.current < FRAME_INTERVAL_MS) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    lastFrameRef.current = now;

    const time = now - startTimeRef.current;

    // Spawn automated ripples on water
    const waterCoords = waterPixelCoordsRef.current;
    if (waterCoords.length > 0 && time - lastAutoRippleRef.current > 1200) {
      const spot = waterCoords[Math.floor(Math.random() * waterCoords.length)];
      ripplesRef.current.push({
        cx: spot.x,
        cy: spot.y,
        startTime: time,
        duration: 3000,
        maxRadius: 80 + Math.random() * 60,
      });
      lastAutoRippleRef.current = time;
      if (ripplesRef.current.length > 6) ripplesRef.current.shift();
    }
    ripplesRef.current = ripplesRef.current.filter(r => time - r.startTime < r.duration);

    drawFrame(time);

    animationRef.current = requestAnimationFrame(animate);
  }, [drawFrame]);

  // ---------- Load assets, build caches, start loop ----------

  useEffect(() => {
    reducedMotionRef.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const startAfterAssets = () => {
      renderStaticCaches();
      setIsLoaded(true);
      startTimeRef.current = Date.now();
      lastFrameRef.current = 0;

      if (reducedMotionRef.current) {
        drawFrame(0);
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      computePixelData(image);
      if (logoSrc) {
        const logoImg = new Image();
        logoImg.onload = () => {
          initLogoParticles(logoImg, canvasRef.current!.width);
          startAfterAssets();
        };
        logoImg.src = logoSrc;
      } else {
        startAfterAssets();
      }
    };
    image.src = imageSrc;

    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [imageSrc, logoSrc, computePixelData, initLogoParticles, renderStaticCaches, drawFrame, animate]);

  // ---------- Resize handler ----------

  useEffect(() => {
    const handleResize = () => {
      if (!isLoaded) return;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => {
        computePixelData(image);
        const finish = () => {
          renderStaticCaches();
          startTimeRef.current = Date.now();
          lastFrameRef.current = 0;
          ripplesRef.current = [];

          if (reducedMotionRef.current) {
            drawFrame(0);
          } else {
            animationRef.current = requestAnimationFrame(animate);
          }
        };

        if (logoSrc) {
          const logoImg = new Image();
          logoImg.onload = () => {
            initLogoParticles(logoImg, canvasRef.current!.width);
            finish();
          };
          logoImg.src = logoSrc;
        } else {
          finish();
        }
      };
      image.src = imageSrc;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, imageSrc, logoSrc, computePixelData, renderStaticCaches, initLogoParticles, drawFrame, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}
      style={{ display: 'block' }}
    />
  );
};

export default AnimatedPixelBackground;
