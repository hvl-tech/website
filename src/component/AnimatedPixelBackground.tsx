import React, { useEffect, useRef, useState } from 'react';

interface AnimatedPixelBackgroundProps {
  imageSrc: string;
  pixelSize?: number;
  className?: string;
  height?: number;
}

// Circuit trace class for managing animated circuit paths
class CircuitTrace {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number = 0;
  lifetime: number = 0;
  maxLifetime: number;
  color: { r: number; g: number; b: number };
  pulsePosition: number = 0;
  path: { x: number; y: number }[] = [];
  isActive: boolean = true;
  fadeIn: number = 0;
  fadeOut: number = 1;

  constructor(startX: number, startY: number, endX: number, endY: number, color: { r: number; g: number; b: number }) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.color = color;
    this.maxLifetime = 2000 + Math.random() * 1000; // 2-3 seconds
    this.generatePath();
  }

  generatePath() {
    // Create L-shaped path (like PCB routing)
    this.path = [];
    
    if (Math.random() > 0.5) {
      // Horizontal then vertical
      const stepX = Math.sign(this.endX - this.startX) || 1;
      const stepY = Math.sign(this.endY - this.startY) || 1;
      
      // Horizontal segment
      for (let x = this.startX; stepX > 0 ? x <= this.endX : x >= this.endX; x += stepX * 2) {
        this.path.push({ x, y: this.startY });
      }
      
      // Vertical segment
      for (let y = this.startY; stepY > 0 ? y <= this.endY : y >= this.endY; y += stepY * 2) {
        this.path.push({ x: this.endX, y });
      }
    } else {
      // Vertical then horizontal
      const stepX = Math.sign(this.endX - this.startX) || 1;
      const stepY = Math.sign(this.endY - this.startY) || 1;
      
      // Vertical segment
      for (let y = this.startY; stepY > 0 ? y <= this.endY : y >= this.endY; y += stepY * 2) {
        this.path.push({ x: this.startX, y });
      }
      
      // Horizontal segment  
      for (let x = this.startX; stepX > 0 ? x <= this.endX : x >= this.endX; x += stepX * 2) {
        this.path.push({ x, y: this.endY });
      }
    }
    
    // Ensure we have at least some points
    if (this.path.length === 0) {
      this.path.push({ x: this.startX, y: this.startY });
      this.path.push({ x: this.endX, y: this.endY });
    }
  }

  update(deltaTime: number) {
    this.lifetime += deltaTime;
    
    // Fade in during first 200ms
    if (this.lifetime < 200) {
      this.fadeIn = this.lifetime / 200;
    } else {
      this.fadeIn = 1;
    }
    
    // Fade out during last 300ms
    if (this.lifetime > this.maxLifetime - 300) {
      this.fadeOut = (this.maxLifetime - this.lifetime) / 300;
    }
    
    // Update progress (how much of the trace is drawn)
    this.progress = Math.min(1, this.lifetime / 500); // Draw complete trace in 500ms
    
    // Update pulse position
    this.pulsePosition = (this.lifetime / 1000) % 1; // Pulse travels the path every second
    
    // Mark as inactive when lifetime expires
    if (this.lifetime >= this.maxLifetime) {
      this.isActive = false;
    }
  }
}

// Generate 256-color palette for more techie look
const generateExtendedPalette = () => {
  const palette = [];
  
  // Blues for water and sky (64 shades)
  for (let i = 0; i < 64; i++) {
    const factor = i / 63;
    palette.push({
      r: Math.floor(0 + factor * 100),
      g: Math.floor(50 + factor * 156),
      b: Math.floor(100 + factor * 155)
    });
  }
  
  // Greens for vegetation (48 shades)
  for (let i = 0; i < 48; i++) {
    const factor = i / 47;
    palette.push({
      r: Math.floor(20 + factor * 80),
      g: Math.floor(60 + factor * 140),
      b: Math.floor(20 + factor * 60)
    });
  }
  
  // Browns for ground (32 shades)
  for (let i = 0; i < 32; i++) {
    const factor = i / 31;
    palette.push({
      r: Math.floor(80 + factor * 100),
      g: Math.floor(40 + factor * 80),
      b: Math.floor(20 + factor * 40)
    });
  }
  
  // Grays for clouds and misc (32 shades)
  for (let i = 0; i < 32; i++) {
    const factor = i / 31;
    const gray = Math.floor(100 + factor * 155);
    palette.push({ r: gray, g: gray, b: gray });
  }
  
  // Cyans for water highlights (24 shades)
  for (let i = 0; i < 24; i++) {
    const factor = i / 23;
    palette.push({
      r: Math.floor(0 + factor * 100),
      g: Math.floor(150 + factor * 105),
      b: Math.floor(200 + factor * 55)
    });
  }
  
  // Teals for water depth (24 shades)
  for (let i = 0; i < 24; i++) {
    const factor = i / 23;
    palette.push({
      r: Math.floor(0 + factor * 50),
      g: Math.floor(100 + factor * 100),
      b: Math.floor(120 + factor * 100)
    });
  }
  
  // Additional mixed colors (32 shades)
  for (let i = 0; i < 32; i++) {
    const hue = (i / 31) * 360;
    const { r, g, b } = hslToRgb(hue, 0.5, 0.5);
    palette.push({ r, g, b });
  }
  
  return palette;
};

// Convert HSL to RGB
const hslToRgb = (h: number, s: number, l: number) => {
  h = h / 360;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

const COLOR_PALETTE = generateExtendedPalette();

const AnimatedPixelBackground: React.FC<AnimatedPixelBackgroundProps> = ({
  imageSrc,
  pixelSize = 20,
  className = '',
  height = 598
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationRef = useRef<number>();
  const pixelDataRef = useRef<{ color: any; isWater: boolean }[][]>([]);
  const startTimeRef = useRef<number>(Date.now());
  const columnCutoffRef = useRef<number[]>([]);
  const circuitTracesRef = useRef<CircuitTrace[]>([]);
  const lastTraceSpawnRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(Date.now());

  // Detect if a pixel is water based on color
  const isWaterPixel = (r: number, g: number, b: number) => {
    // Water detection: blue component dominant, and within certain ranges
    const isBlueish = b > r && b > g;
    const inWaterRange = (
      (r >= 0 && r <= 120) &&
      (g >= 80 && g <= 180) &&
      (b >= 120 && b <= 255)
    );
    return isBlueish && inWaterRange;
  };

  // Apply sparkle effect to water pixels (like light reflections)
  const applyWaterSparkle = (color: any, x: number, y: number, time: number, col: number, row: number, totalRows: number) => {
    if (!color) return color;
    
    // Skip water effect for top 10% of the image
    if (row < totalRows * 0.1) {
      return color;
    }
    
    // Add moving alpha gradient for non-uniform water effect
    const gradientSpeed = 0.0001; // Very slow movement
    const gradientX = Math.sin((x * 0.005) + (time * gradientSpeed)) * 0.5 + 0.5;
    const gradientY = Math.sin((y * 0.008) + (time * gradientSpeed * 0.7)) * 0.5 + 0.5;
    const alphaGradient = (gradientX + gradientY) * 0.5; // 0 to 1 gradient that moves
    
    // Create base wave for gentle water movement (4x slower)
    const waveSpeed = 0.0002; // Was 0.0008, now 4x slower
    const horizontalWave = Math.sin((x * 0.02) + (time * waveSpeed)) * 0.05; // Reduced amplitude
    const verticalWave = Math.sin((y * 0.015) + (time * waveSpeed * 0.7)) * 0.05; // Reduced amplitude
    const baseWave = (horizontalWave + verticalWave) / 2;
    
    // Sparkle effect - random bright spots that appear and fade like stars
    // Use position-based pseudo-random for consistent sparkle locations
    const sparkleHash = (col * 7919 + row * 6271) % 100;
    const sparkleChance = sparkleHash / 100;
    
    // Multiple sparkle layers with different timing (4x slower)
    const sparklePhase1 = Math.sin((time * 0.00075) + sparkleHash * 0.1) * 0.5 + 0.5; // Was 0.003
    const sparklePhase2 = Math.sin((time * 0.00125) + sparkleHash * 0.2) * 0.5 + 0.5; // Was 0.005
    const sparklePhase3 = Math.sin((time * 0.0005) + sparkleHash * 0.15) * 0.5 + 0.5; // Was 0.002
    
    let sparkleIntensity = 0;
    
    // Only some pixels sparkle (about 15% of water pixels) - reduced intensity to 30%
    if (sparkleChance < 0.15) {
      // Sharp sparkle (like a star twinkling) - 30% of original
      sparkleIntensity = Math.pow(sparklePhase1, 8) * 0.24; // Was 0.8, now 30% of that
    } else if (sparkleChance < 0.25) {
      // Medium sparkle - 30% of original
      sparkleIntensity = Math.pow(sparklePhase2, 6) * 0.18; // Was 0.6, now 30% of that
    } else if (sparkleChance < 0.35) {
      // Gentle sparkle - 30% of original
      sparkleIntensity = Math.pow(sparklePhase3, 4) * 0.12; // Was 0.4, now 30% of that
    }
    
    // Base color modulation (even more subtle wave effect)
    const baseIntensity = 0.97 + baseWave * 0.03; // Reduced modulation
    
    // Apply alpha gradient to modulate the effect intensity
    const effectStrength = alphaGradient * 1; // Max 30% opacity
    
    // Combine base wave with sparkle (reduced overall effect)
    const totalIntensity = baseIntensity + sparkleIntensity * effectStrength; // Modulated by gradient
    
    // Apply the effect - sparkles push toward white/bright cyan (reduced intensity)
    // Effect intensity is now modulated by the moving gradient
    const sparkleR = Math.min(255, Math.floor(color.r * baseIntensity + sparkleIntensity * 100 * effectStrength));
    const sparkleG = Math.min(255, Math.floor(color.g * baseIntensity + sparkleIntensity * 90 * effectStrength));
    const sparkleB = Math.min(255, Math.floor(color.b * (1 - effectStrength) + color.b * totalIntensity * effectStrength));
    
    return { r: sparkleR, g: sparkleG, b: sparkleB };
  };

  const findClosestColor = (r: number, g: number, b: number) => {
    let minDistance = Infinity;
    let closestColor = COLOR_PALETTE[0];
    
    for (const color of COLOR_PALETTE) {
      const distance = Math.sqrt(
        Math.pow(r - color.r, 2) +
        Math.pow(g - color.g, 2) +
        Math.pow(b - color.b, 2)
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closestColor = color;
      }
    }
    
    return closestColor;
  };

  // Generate a new circuit trace
  const generateNewTrace = (canvasWidth: number, canvasHeight: number) => {
    // Avoid water areas (bottom 40% of canvas) for cleaner look
    const maxY = Math.floor(canvasHeight * 0.6);
    
    // Random start and end points
    const startX = Math.floor(Math.random() * canvasWidth);
    const startY = Math.floor(Math.random() * maxY);
    const endX = Math.floor(Math.random() * canvasWidth);
    const endY = Math.floor(Math.random() * maxY);
    
    // Ensure minimum distance for visible traces
    const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    if (distance < 100) return null; // Too short, skip
    
    // Choose color from tech palette
    const colors = [
      { r: 0, g: 255, b: 255 },   // Cyan
      { r: 0, g: 255, b: 128 },   // Spring green
      { r: 255, g: 191, b: 0 },   // Amber
      { r: 128, g: 255, b: 255 }, // Light cyan
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return new CircuitTrace(startX, startY, endX, endY, color);
  };

  // Draw circuit traces
  const drawCircuitTraces = (ctx: CanvasRenderingContext2D, currentTime: number, deltaTime: number) => {
    const canvas = ctx.canvas;
    
    // Spawn new traces periodically
    if (currentTime - lastTraceSpawnRef.current > 800 && circuitTracesRef.current.length < 5) {
      const newTrace = generateNewTrace(canvas.width, canvas.height);
      if (newTrace) {
        circuitTracesRef.current.push(newTrace);
        lastTraceSpawnRef.current = currentTime;
      }
    }
    
    // Update and draw traces
    circuitTracesRef.current = circuitTracesRef.current.filter(trace => {
      trace.update(deltaTime);
      
      if (!trace.isActive) return false; // Remove inactive traces
      
      const opacity = trace.fadeIn * trace.fadeOut * 0.6; // Max 60% opacity
      
      // Draw the trace path
      const pathLength = Math.floor(trace.path.length * trace.progress);
      for (let i = 0; i < pathLength; i++) {
        const point = trace.path[i];
        
        // Base trace
        ctx.fillStyle = `rgba(${trace.color.r}, ${trace.color.g}, ${trace.color.b}, ${opacity * 0.3})`;
        ctx.fillRect(point.x, point.y, 2, 2);
        
        // Glow effect (larger, more transparent)
        ctx.fillStyle = `rgba(${trace.color.r}, ${trace.color.g}, ${trace.color.b}, ${opacity * 0.1})`;
        ctx.fillRect(point.x - 1, point.y - 1, 4, 4);
      }
      
      // Draw pulse
      if (pathLength > 0) {
        const pulseIndex = Math.floor(trace.pulsePosition * pathLength);
        const pulsePoint = trace.path[Math.min(pulseIndex, trace.path.length - 1)];
        
        // Bright pulse
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
        ctx.fillRect(pulsePoint.x - 1, pulsePoint.y - 1, 3, 3);
        
        // Pulse glow
        ctx.fillStyle = `rgba(${trace.color.r}, ${trace.color.g}, ${trace.color.b}, ${opacity * 0.3})`;
        ctx.fillRect(pulsePoint.x - 2, pulsePoint.y - 2, 5, 5);
      }
      
      // Draw connection nodes
      if (trace.progress > 0) {
        // Start node
        ctx.fillStyle = `rgba(${trace.color.r}, ${trace.color.g}, ${trace.color.b}, ${opacity * 0.5})`;
        ctx.fillRect(trace.startX - 2, trace.startY - 2, 5, 5);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
        ctx.fillRect(trace.startX - 1, trace.startY - 1, 3, 3);
      }
      
      if (trace.progress === 1) {
        // End node
        ctx.fillStyle = `rgba(${trace.color.r}, ${trace.color.g}, ${trace.color.b}, ${opacity * 0.5})`;
        ctx.fillRect(trace.endX - 2, trace.endY - 2, 5, 5);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
        ctx.fillRect(trace.endX - 1, trace.endY - 1, 3, 3);
      }
      
      return true; // Keep active traces
    });
  };

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    
    image.onload = () => {
      drawPixelatedImage(image);
      setIsLoaded(true);
      // Start animation immediately after drawing
      startTimeRef.current = Date.now();
      animate();
    };
    
    image.src = imageSrc;
  }, [imageSrc, pixelSize]);

  const drawPixelatedImage = (image: HTMLImageElement) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size to full viewport width
    canvas.width = window.innerWidth;
    canvas.height = height;

    // Create offscreen canvas for image processing
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;
    const offCtx = offscreenCanvas.getContext('2d');
    if (!offCtx) return;

    // Calculate image dimensions to cover the canvas
    const aspectRatio = image.width / image.height;
    let drawWidth = canvas.width;
    let drawHeight = canvas.width / aspectRatio;

    if (drawHeight < canvas.height) {
      drawHeight = canvas.height;
      drawWidth = canvas.height * aspectRatio;
    }

    const offsetX = (canvas.width - drawWidth) / 2;
    // Shift image up to show more of the water area (bottom part)
    const offsetY = (canvas.height - drawHeight) / 2 - (drawHeight * 0.15);

    // Draw image to offscreen canvas
    offCtx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    
    // Get image data
    const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Clear the main canvas with transparency
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw pixelated version and store pixel data
    const cols = Math.ceil(canvas.width / pixelSize);
    const rows = Math.ceil(canvas.height / pixelSize);
    
    // Initialize pixel data array
    pixelDataRef.current = [];
    
    for (let row = 0; row < rows; row++) {
      pixelDataRef.current[row] = [];
      for (let col = 0; col < cols; col++) {
        const x = col * pixelSize;
        const y = row * pixelSize;
        
        // Calculate average color for this pixel block
        let r = 0, g = 0, b = 0, a = 0;
        let count = 0;
        
        for (let dy = 0; dy < pixelSize && y + dy < canvas.height; dy++) {
          for (let dx = 0; dx < pixelSize && x + dx < canvas.width; dx++) {
            const index = ((y + dy) * canvas.width + (x + dx)) * 4;
            r += data[index];
            g += data[index + 1];
            b += data[index + 2];
            a += data[index + 3];
            count++;
          }
        }
        
        if (count > 0) {
          r = Math.floor(r / count);
          g = Math.floor(g / count);
          b = Math.floor(b / count);
          a = Math.floor(a / count);
        }
        
        // Quantize to color palette
        const quantizedColor = findClosestColor(r, g, b);
        
        // Check if this pixel is water
        const waterPixel = isWaterPixel(r, g, b);
        
        // Store pixel data for animation
        pixelDataRef.current[row][col] = {
          color: { ...quantizedColor, a },
          isWater: waterPixel
        };
        
        // Draw the pixel
        ctx.fillStyle = `rgba(${quantizedColor.r}, ${quantizedColor.g}, ${quantizedColor.b}, ${a / 255})`;
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    }
    
    // Animation will be started from the useEffect after image loads
  };

  // Animation loop
  const animate = () => {
    if (!canvasRef.current || pixelDataRef.current.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    const currentTime = Date.now() - startTimeRef.current;
    const frameTime = Date.now();
    const deltaTime = frameTime - lastFrameTimeRef.current;
    lastFrameTimeRef.current = frameTime;
    
    // Clear canvas with transparency
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const rows = pixelDataRef.current.length;
    const bottomRowsToAnimate = 5;
    const cols = pixelDataRef.current[0]?.length || 0;
    
    // Set static cutoff for each column (no animation)
    for (let col = 0; col < cols; col++) {
      // Create a subtle static wave pattern for visual interest
      const staticWave = Math.sin(col * 0.15) * 1.5;
      columnCutoffRef.current[col] = rows - bottomRowsToAnimate + Math.floor(staticWave);
    }
    
    for (let row = 0; row < rows; row++) {
      const cols = pixelDataRef.current[row].length;
      for (let col = 0; col < cols; col++) {
        const pixelData = pixelDataRef.current[row][col];
        if (!pixelData) continue;
        
        // Check if this pixel should be visible based on column cutoff
        if (row >= columnCutoffRef.current[col]) {
          continue; // Skip pixels below the cutoff line
        }
        
        const x = col * pixelSize;
        const y = row * pixelSize;
        
        // Apply fade effect near the cutoff
        let opacity = 1;
        const distanceFromCutoff = columnCutoffRef.current[col] - row;
        if (distanceFromCutoff <= 3) {
          opacity = distanceFromCutoff / 3;
        }
        
        if (pixelData.isWater) {
          // Apply sparkle effect to water pixels
          const sparkleColor = applyWaterSparkle(pixelData.color, x, y, currentTime, col, row, rows);
          ctx.fillStyle = `rgba(${sparkleColor.r}, ${sparkleColor.g}, ${sparkleColor.b}, ${(pixelData.color.a / 255) * opacity})`;
        } else {
          // Regular pixels
          ctx.fillStyle = `rgba(${pixelData.color.r}, ${pixelData.color.g}, ${pixelData.color.b}, ${(pixelData.color.a / 255) * opacity})`;
        }
        
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    }
    
    // Draw circuit traces on top of the pixelated background
    drawCircuitTraces(ctx, currentTime, deltaTime);
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const startAnimation = () => {
    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Reset start time and begin animation
    startTimeRef.current = Date.now();
    animate();
  };

  useEffect(() => {
    const handleResize = () => {
      if (isLoaded) {
        // Cancel existing animation before redrawing
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = undefined;
        }
        
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = () => {
          drawPixelatedImage(image);
          // Restart animation after redraw
          startTimeRef.current = Date.now();
          animate();
        };
        image.src = imageSrc;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      // Clean up animation on unmount
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoaded, imageSrc, pixelSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}
      style={{ display: 'block' }}
    />
  );
};

export default AnimatedPixelBackground;