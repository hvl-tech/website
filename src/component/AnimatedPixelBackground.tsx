import { useEffect, useRef, useState, useCallback } from 'react';

interface AnimatedPixelBackgroundProps {
  imageSrc: string;
  logoSrc?: string;
  pixelSize?: number;
  className?: string;
  height?: number;
}

interface LogoParticle {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
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

const findClosestColor = (r: number, g: number, b: number): RGB => {
  let minDist = Infinity;
  let closest = COLOR_PALETTE[0];
  for (const c of COLOR_PALETTE) {
    const d = (r - c.r) ** 2 + (g - c.g) ** 2 + (b - c.b) ** 2;
    if (d < minDist) { minDist = d; closest = c; }
  }
  return closest;
};

// ---------- Water Detection & Effects ----------

const isWaterPixel = (r: number, g: number, b: number) =>
  b > r && b > g && r <= 120 && g >= 80 && g <= 180 && b >= 120;

const applyWaterSparkle = (
  color: RGB, x: number, y: number, time: number,
  col: number, row: number, totalRows: number,
): RGB => {
  if (row < totalRows * 0.1) return color;

  const gradientX = Math.sin(x * 0.005 + time * 0.0001) * 0.5 + 0.5;
  const gradientY = Math.sin(y * 0.008 + time * 0.00007) * 0.5 + 0.5;
  const effectStrength = (gradientX + gradientY) * 0.5;

  const baseWave = (Math.sin(x * 0.02 + time * 0.0002) * 0.05 + Math.sin(y * 0.015 + time * 0.00014) * 0.05) / 2;
  const baseIntensity = 0.97 + baseWave * 0.03;

  const hash = (col * 7919 + row * 6271) % 100;
  const chance = hash / 100;
  let sparkle = 0;
  if (chance < 0.15) sparkle = Math.pow(Math.sin(time * 0.00075 + hash * 0.1) * 0.5 + 0.5, 8) * 0.24;
  else if (chance < 0.25) sparkle = Math.pow(Math.sin(time * 0.00125 + hash * 0.2) * 0.5 + 0.5, 6) * 0.18;
  else if (chance < 0.35) sparkle = Math.pow(Math.sin(time * 0.0005 + hash * 0.15) * 0.5 + 0.5, 4) * 0.12;

  return {
    r: Math.min(255, Math.floor(color.r * baseIntensity + sparkle * 100 * effectStrength)),
    g: Math.min(255, Math.floor(color.g * baseIntensity + sparkle * 90 * effectStrength)),
    b: Math.min(255, Math.floor(color.b * (1 - effectStrength) + color.b * (baseIntensity + sparkle * effectStrength) * effectStrength)),
  };
};

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
  const columnCutoffRef = useRef<number[]>([]);

  // Logo particle system
  const logoParticlesRef = useRef<LogoParticle[]>([]);
  const logoPosRef = useRef({ x: 0, y: 20, w: 0, h: 140 });

  // Automated water ripples
  const ripplesRef = useRef<Ripple[]>([]);
  const lastAutoRippleRef = useRef(0);
  // Store water pixel positions for spawning ripples
  const waterPixelCoordsRef = useRef<{ x: number; y: number }[]>([]);

  // Periodic glitch state
  const glitchRef = useRef({
    nextTime: 3000 + Math.random() * 5000,
    active: false,
    endTime: 0,
    sliceOffsets: [] as number[],
    bands: 8,
  });

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
    const step = 2; // finer particles for sharper logo

    for (let py = 0; py < targetH; py += step) {
      for (let px = 0; px < targetW; px += step) {
        const i = (py * targetW + px) * 4;
        if (data[i + 3] < 100) continue;

        particles.push({
          homeX: logoX + px,
          homeY: logoY + py,
          x: Math.random() * canvasWidth,
          y: Math.random() * height * 0.5,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          r: data[i],
          g: data[i + 1],
          b: data[i + 2],
          a: data[i + 3] / 255,
          size: step,
        });
      }
    }

    logoParticlesRef.current = particles;
  }, [height]);

  // ---------- Pixelate Source Image ----------

  const drawPixelatedImage = useCallback((image: HTMLImageElement) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

        // Collect water pixel positions for auto-ripples
        if (water) waterCoords.push({ x: x + pixelSize / 2, y: y + pixelSize / 2 });

        ctx.fillStyle = `rgba(${qc.r},${qc.g},${qc.b},${a / 255})`;
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    }

    waterPixelCoordsRef.current = waterCoords;
  }, [pixelSize, height]);

  // ---------- Animation Loop ----------

  const animate = useCallback(() => {
    if (!canvasRef.current || pixelDataRef.current.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const time = Date.now() - startTimeRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- Spawn automated ripples on water ---
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

    // --- Clean up expired ripples ---
    ripplesRef.current = ripplesRef.current.filter(r => time - r.startTime < r.duration);

    // --- 1. Draw pixelated background ---
    const rows = pixelDataRef.current.length;
    const cols = pixelDataRef.current[0]?.length || 0;
    const bottomCut = 5;

    for (let col = 0; col < cols; col++) {
      columnCutoffRef.current[col] = rows - bottomCut + Math.floor(Math.sin(col * 0.15) * 1.5);
    }

    // Number of rows before each column's cutoff to start fading to white
    const fadeRowCount = 18;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < pixelDataRef.current[row].length; col++) {
        const pd = pixelDataRef.current[row][col];
        if (!pd || row >= columnCutoffRef.current[col]) continue;

        const x = col * pixelSize;
        const y = row * pixelSize;

        let opacity = 1;
        const edgeDist = columnCutoffRef.current[col] - row;
        if (edgeDist <= 3) opacity = edgeDist / 3;

        let c: RGB;
        if (pd.isWater) {
          c = applyWaterSparkle(pd.color, x, y, time, col, row, rows);

          // Apply elliptical ripple brightness (2:1 horizontal stretch for perspective)
          let rippleBrightness = 0;
          for (const ripple of ripplesRef.current) {
            const elapsed = time - ripple.startTime;
            const progress = elapsed / ripple.duration;
            const curRadius = ripple.maxRadius * progress;
            const ringWidth = 14;
            const dx = (x + pixelSize / 2 - ripple.cx) * 0.5; // compress horizontal → 2x wider ellipse
            const dy = y + pixelSize / 2 - ripple.cy;
            const d = Math.sqrt(dx * dx + dy * dy);
            const ringDist = Math.abs(d - curRadius);
            if (ringDist < ringWidth) {
              rippleBrightness += (1 - ringDist / ringWidth) * (1 - progress) * 0.35;
            }
          }
          if (rippleBrightness > 0) {
            c = {
              r: Math.min(255, c.r + Math.floor(rippleBrightness * 120)),
              g: Math.min(255, c.g + Math.floor(rippleBrightness * 120)),
              b: Math.min(255, c.b + Math.floor(rippleBrightness * 80)),
            };
          }
        } else {
          c = pd.color;
        }

        // Fade to white near each column's cutoff for seamless page blend
        const colCutoff = columnCutoffRef.current[col];
        const fadeStart = colCutoff - fadeRowCount;
        if (row >= fadeStart) {
          const t = Math.min(1, (row - fadeStart) / fadeRowCount);
          c = {
            r: Math.round(c.r + (255 - c.r) * t),
            g: Math.round(c.g + (255 - c.g) * t),
            b: Math.round(c.b + (255 - c.b) * t),
          };
        }

        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${(pd.color.a / 255) * opacity})`;
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    }

    // Fill bottom of canvas with white (below cutoff) for clean page blend
    const lowestCutoff = Math.min(...columnCutoffRef.current) * pixelSize;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, lowestCutoff, canvas.width, canvas.height - lowestCutoff);

    // --- 2. Logo particle system with periodic glitch ---
    const particles = logoParticlesRef.current;
    if (particles.length > 0) {
      const g = glitchRef.current;
      const logoPos = logoPosRef.current;

      // Update glitch timing
      if (!g.active && time > g.nextTime) {
        g.active = true;
        g.endTime = time + 150 + Math.random() * 200;
        g.sliceOffsets = Array.from({ length: g.bands }, () => (Math.random() - 0.5) * 30);
      }
      if (g.active && time > g.endTime) {
        g.active = false;
        g.nextTime = time + 4000 + Math.random() * 6000;
        g.sliceOffsets = [];
      }

      // Soft dark radial gradient shadow behind the logo (no hard edges)
      const shCx = logoPos.x + logoPos.w / 2;
      const shCy = logoPos.y + logoPos.h / 2 + 4;
      const shR = Math.max(logoPos.w, logoPos.h) * 0.65;
      const shadow = ctx.createRadialGradient(shCx, shCy, 0, shCx, shCy, shR);
      shadow.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      shadow.addColorStop(0.35, 'rgba(0, 0, 0, 0.5)');
      shadow.addColorStop(0.65, 'rgba(0, 0, 0, 0.2)');
      shadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadow;
      ctx.fillRect(shCx - shR, shCy - shR, shR * 2, shR * 2);

      // Update particle physics first
      for (const p of particles) {
        const dx = p.homeX - p.x;
        const dy = p.homeY - p.y;
        p.vx += dx * 0.025;
        p.vy += dy * 0.025;
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;
      }

      // Shadow pass: draw all particles offset in black
      const shadowOff = 3;
      for (const p of particles) {
        let drawX = p.x;
        if (g.active) {
          const bandIdx = Math.floor(((p.homeY - logoPos.y) / logoPos.h) * g.bands);
          drawX += g.sliceOffsets[Math.min(bandIdx, g.bands - 1)] || 0;
        }
        ctx.fillStyle = `rgba(0,0,0,${p.a * 0.55})`;
        ctx.fillRect(drawX + shadowOff, p.y + shadowOff, p.size, p.size);
      }

      // Color pass: draw particles on top
      for (const p of particles) {
        let drawX = p.x;
        let pr = p.r, pg = p.g, pb = p.b;

        if (g.active) {
          const bandIdx = Math.floor(((p.homeY - logoPos.y) / logoPos.h) * g.bands);
          drawX += g.sliceOffsets[Math.min(bandIdx, g.bands - 1)] || 0;

          const glitchSeed = (p.homeX * 31 + p.homeY * 17 + Math.floor(time / 50)) % 100;
          if (glitchSeed < 20) {
            pr = Math.min(255, pr + 80); pg = Math.max(0, pg - 40);
          } else if (glitchSeed < 40) {
            pb = Math.min(255, pb + 80); pr = Math.max(0, pr - 40);
          }
        }

        ctx.fillStyle = `rgba(${pr},${pg},${pb},${p.a})`;
        ctx.fillRect(drawX, p.y, p.size, p.size);
      }

      // Static noise during glitch
      if (g.active) {
        for (let i = 0; i < 12; i++) {
          const nx = logoPos.x + (Math.random() - 0.2) * logoPos.w * 1.4;
          const ny = logoPos.y + (Math.random() - 0.1) * logoPos.h * 1.2;
          const brightness = Math.random() > 0.5 ? 255 : 0;
          ctx.fillStyle = `rgba(${brightness},${brightness},${brightness},${0.15 + Math.random() * 0.2})`;
          ctx.fillRect(nx, ny, 3 + Math.random() * 4, 2);
        }
      }
    }

    // --- 3. CRT scanline overlay (only above the fade zone) ---
    const scanlineLimit = (rows - bottomCut - fadeRowCount) * pixelSize;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    for (let y = 0; y < scanlineLimit; y += 3) {
      ctx.fillRect(0, y, canvas.width, 1);
    }

    // Subtle vignette (centered higher so bottom stays white)
    const vigCy = canvas.height * 0.4;
    const vignette = ctx.createRadialGradient(
      canvas.width / 2, vigCy, canvas.height * 0.3,
      canvas.width / 2, vigCy, canvas.height * 0.75,
    );
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignette.addColorStop(1, 'rgba(0, 0, 0, 0.12)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, canvas.width, scanlineLimit);

    animationRef.current = requestAnimationFrame(animate);
  }, [pixelSize]);

  // ---------- Load logo & init particles ----------

  useEffect(() => {
    if (!logoSrc || !isLoaded || !canvasRef.current) return;
    const img = new Image();
    img.onload = () => initLogoParticles(img, canvasRef.current!.width);
    img.src = logoSrc;
  }, [logoSrc, isLoaded, initLogoParticles]);

  // ---------- Load main image & start animation ----------

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      drawPixelatedImage(image);
      setIsLoaded(true);
      startTimeRef.current = Date.now();
      animationRef.current = requestAnimationFrame(animate);
    };
    image.src = imageSrc;
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [imageSrc, drawPixelatedImage, animate]);

  // ---------- Resize handler ----------

  useEffect(() => {
    const handleResize = () => {
      if (!isLoaded) return;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => {
        drawPixelatedImage(image);
        if (logoSrc) {
          const logoImg = new Image();
          logoImg.onload = () => initLogoParticles(logoImg, canvasRef.current!.width);
          logoImg.src = logoSrc;
        }
        startTimeRef.current = Date.now();
        animationRef.current = requestAnimationFrame(animate);
      };
      image.src = imageSrc;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, imageSrc, logoSrc, drawPixelatedImage, animate, initLogoParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}
      style={{ display: 'block' }}
    />
  );
};

export default AnimatedPixelBackground;
