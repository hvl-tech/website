import React, { useEffect, useRef, useState } from 'react';

interface AnimatedPixelBackgroundProps {
  imageSrc: string;
  pixelSize?: number;
  className?: string;
  height?: number;
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