import { useEffect, useRef, useCallback } from 'react';

/* ─────────────────────────────────────────────
   Abyssal Wake: 3D-Reactive Under-the-Sea
   • Bioluminescent Fluid Particle Trail (Wake)
   • 3D Parallax Abyss (foreground moves faster)
   • Twinkling Marine Snow (with strong repulsion)
   • Distant Fish Silhouettes
   • High-Bloom God Rays
   • Bioluminescent Jellyfish
   ───────────────────────────────────────────── */

// ── Helpers ──────────────────────────────────
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// ── Trail Particle (Bioluminescent Wake) ─────
class TrailParticle {
  constructor(x, y, vx, vy) {
    this.x = x + rand(-3, 3);
    this.y = y + rand(-3, 3);
    
    // Inherit slight velocity from mouse movement, plus some random scatter
    this.vx = vx * 0.04 + rand(-0.4, 0.4);
    this.vy = vy * 0.04 + rand(-0.4, 0.4);
    
    this.life = 1;
    this.decay = rand(0.015, 0.03); // Lives ~1-1.5 seconds at 60fps
    this.size = rand(1.5, 4);
    this.hue = rand(180, 220); // Cyan to electric blue
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy -= 0.015; // Gently float upwards (buoyancy)
    
    // Water friction
    this.vx *= 0.94;
    this.vy *= 0.94;
    
    this.life -= this.decay;
  }
  draw(ctx, parallaxOffsetX, parallaxOffsetY) {
    if (this.life <= 0) return;
    
    // Trail occurs at the "glass" layer (high parallax)
    const px = this.x + parallaxOffsetX * 0.15;
    const py = this.y + parallaxOffsetY * 0.15;
    
    const alpha = Math.max(0, this.life);
    
    ctx.beginPath();
    ctx.arc(px, py, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 100%, 75%, ${alpha})`;
    ctx.fill();
    
    // Bioluminescent glow
    ctx.shadowBlur = 12;
    ctx.shadowColor = `hsla(${this.hue}, 100%, 65%, ${alpha * 1.2})`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

// ── Marine Snow Particle ─────────────────────
class SnowParticle {
  constructor(w, h) {
    this.reset(w, h, true);
  }
  reset(w, h, randomY = false) {
    this.x = rand(0, w);
    this.y = randomY ? rand(0, h) : -10;
    this.r = rand(1, 3);
    this.speedY = rand(0.2, 0.7);
    this.speedX = rand(-0.15, 0.15);
    this.baseOpacity = rand(0.2, 0.6); // Boosted opacity
    this.twinklePhase = rand(0, Math.PI * 2);
    this.twinkleSpeed = rand(0.02, 0.05); // Faster twinkle
    this.drift = rand(0.0002, 0.001);
    this.angle = rand(0, Math.PI * 2);
  }
  update(w, h, mx, my) {
    this.angle += this.drift;
    this.twinklePhase += this.twinkleSpeed;
    
    // Base movement
    this.x += this.speedX + Math.sin(this.angle) * 0.4;
    this.y += this.speedY;

    // Strong Mouse Repulsion
    const dx = this.x - mx;
    const dy = this.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 180) {
      const force = (180 - dist) / 180 * 2.5; // Pushes away smoothly
      this.x += (dx / dist) * force;
      this.y += (dy / dist) * force;
    }

    if (this.y > h + 10 || this.x < -10 || this.x > w + 10) {
      this.reset(w, h, false);
    }
  }
  draw(ctx, parallaxOffsetX, parallaxOffsetY) {
    // Snow is foreground: moves 10%
    const px = this.x + parallaxOffsetX * 0.1;
    const py = this.y + parallaxOffsetY * 0.1;
    
    // Enhanced twinkle opacity
    const twinkledOpacity = this.baseOpacity + Math.sin(this.twinklePhase) * 0.4;
    const finalOpacity = Math.max(0.05, Math.min(1, twinkledOpacity));

    ctx.beginPath();
    ctx.arc(px, py, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180,240,255,${finalOpacity})`;
    ctx.fill();
    
    // Bloom on larger flakes
    if (this.r > 2) {
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(180,240,255,${finalOpacity})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
}

// ── Cached Assets ──────────────────────────
let cachedFishCanvas = null;
let cachedTurtleCanvas = null;

function getCachedFish() {
  if (cachedFishCanvas) return cachedFishCanvas;
  const offCanvas = document.createElement('canvas');
  offCanvas.width = 100;
  offCanvas.height = 100;
  const octx = offCanvas.getContext('2d');
  
  octx.translate(50, 50);
  octx.fillStyle = 'rgba(0, 30, 50, 0.4)';
  octx.filter = 'blur(1.5px)';
  
  octx.beginPath();
  octx.moveTo(30, 0); // nose
  octx.quadraticCurveTo(10, -10, -15, -4); // top body
  octx.lineTo(-25, -12); // top tail
  octx.lineTo(-20, 0); // tail center
  octx.lineTo(-25, 12); // bottom tail
  octx.lineTo(-15, 4); // bottom body connect
  octx.quadraticCurveTo(10, 10, 30, 0); // bottom body
  octx.closePath();
  octx.fill();
  
  cachedFishCanvas = offCanvas;
  return offCanvas;
}

function getCachedTurtle() {
  if (cachedTurtleCanvas) return cachedTurtleCanvas;
  const offCanvas = document.createElement('canvas');
  offCanvas.width = 120;
  offCanvas.height = 120;
  const octx = offCanvas.getContext('2d');
  
  octx.translate(60, 60);
  octx.fillStyle = 'rgba(0, 30, 45, 0.25)';
  octx.filter = 'blur(2.5px)';
  
  octx.beginPath();
  octx.ellipse(0, 0, 22, 16, 0, 0, Math.PI * 2); // Shell
  octx.ellipse(26, 0, 6, 4, 0, 0, Math.PI * 2);  // Head
  octx.fill();

  // Basic static flippers for the cached version
  octx.beginPath();
  octx.moveTo(12, 12);
  octx.quadraticCurveTo(0, 35, -15, 40);
  octx.quadraticCurveTo(5, 25, 0, 12);
  octx.fill();

  octx.beginPath();
  octx.moveTo(12, -12);
  octx.quadraticCurveTo(0, -35, -15, -40);
  octx.quadraticCurveTo(5, -25, 0, -12);
  octx.fill();

  octx.beginPath();
  octx.moveTo(-15, 8);
  octx.quadraticCurveTo(-25, 20, -30, 18);
  octx.quadraticCurveTo(-25, 10, -18, 5);
  octx.fill();

  octx.beginPath();
  octx.moveTo(-15, -8);
  octx.quadraticCurveTo(-25, -20, -30, -18);
  octx.quadraticCurveTo(-25, -10, -18, -5);
  octx.fill();
  
  cachedTurtleCanvas = offCanvas;
  return offCanvas;
}

// ── Distant Fish Silhouette ──────────────────
class Fish {
  constructor(w, h) {
    this.reset(w, h);
  }
  reset(w, h) {
    this.y = rand(h * 0.2, h * 0.8);
    this.direction = Math.random() > 0.5 ? 1 : -1;
    this.x = this.direction === 1 ? -100 : w + 100;
    this.speed = rand(0.2, 0.4) * this.direction;
    this.size = rand(0.6, 1.2);
    this.phase = rand(0, Math.PI * 2);
    this.baseY = this.y;
  }
  update(w, h) {
    this.x += this.speed;
    this.phase += 0.05;
    this.y = this.baseY + Math.sin(this.phase) * 15;

    if (this.direction === 1 && this.x > w + 150) this.reset(w, h);
    if (this.direction === -1 && this.x < -150) this.reset(w, h);
  }
  draw(ctx, parallaxOffsetX, parallaxOffsetY) {
    // Fish are far background: moves -2%
    const px = this.x + parallaxOffsetX * -0.02;
    const py = this.y + parallaxOffsetY * -0.02;
    
    ctx.save();
    ctx.translate(px, py);
    if (this.direction === -1) {
      ctx.scale(-1, 1);
    }
    ctx.scale(this.size, this.size);
    ctx.globalAlpha = this.opacity !== undefined ? this.opacity : 1;

    // Use cached optimized canvas drawing
    const img = getCachedFish();
    ctx.drawImage(img, -50, -50);

    ctx.restore();
  }
}

// ── Blended Sea Turtle Silhouette ────────────
class Turtle {
  constructor(w, h) {
    this.reset(w, h);
  }
  reset(w, h) {
    this.y = rand(h * 0.25, h * 0.85);
    // Moves slowly across screen
    this.direction = Math.random() > 0.5 ? 1 : -1;
    this.x = this.direction === 1 ? rand(-300, -100) : w + rand(100, 300);
    this.speedX = rand(0.1, 0.2) * this.direction;
    this.speedY = rand(-0.08, 0.02); // Tends to drift slightly upward
    this.size = rand(0.6, 1.2); // Small to medium
    this.phase = rand(0, Math.PI * 2); // Flipper animation phase
    this.baseY = this.y;
  }
  update(w, h) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.phase += 0.02; // Slow flapped swim

    if (this.direction === 1 && this.x > w + 250) this.reset(w, h);
    if (this.direction === -1 && this.x < -250) this.reset(w, h);
    if (this.y < -150 || this.y > h + 150) this.reset(w, h);
  }
  draw(ctx, parallaxOffsetX, parallaxOffsetY) {
    // Turtles are far background: moves -1% string
    const px = this.x + parallaxOffsetX * -0.01;
    const py = this.y + parallaxOffsetY * -0.01;
    
    ctx.save();
    ctx.translate(px, py);
    
    // Orient the turtle smoothly in direction of movement
    const angle = Math.atan2(this.speedY, this.speedX);
    ctx.rotate(angle);
    ctx.scale(this.size, this.size);

    // Use predefined cached turtle (huge optimization, removes blur logic from frame loops)
    const img = getCachedTurtle();
    ctx.drawImage(img, -60, -60);

    ctx.restore();
  }
}

// ── Photorealistic Jellyfish ─────────────────
class Jellyfish {
  constructor(w, h, idx) {
    this.idx = idx;
    this.w = w;
    this.h = h;
    this.baseSize = rand(35, 60);

    const startOffsetX = rand(0.5, 0.95);
    const startOffsetY = rand(-0.25, -0.05);
    this.startX = w * startOffsetX;
    this.startY = h * startOffsetY;
    this.endX = w * rand(-0.2, 0.3);
    this.endY = h * rand(1.1, 1.3);

    this.progress = rand(0, 1);
    this.baseSpeed = rand(0.00008, 0.00015); // Slow, dramatic drift
    this.speed = this.baseSpeed;

    // Deep sea bioluminescence colors: Cyan, Violet, Blue
    const hues = [190, 210, 270, 280, 200];
    this.hue = hues[idx % hues.length];
    this.sat = rand(80, 100);

    this.bobPhase = rand(0, Math.PI * 2);
    this.bobAmpX = rand(20, 50);
    this.bobAmpY = rand(10, 25);

    this.pulsePhase = rand(0, Math.PI * 2);
    this.pulseSpeed = rand(0.015, 0.03); // Natural slow pulse

    // Detail parameters
    this.tentacleOffsets = Array.from({ length: 8 }, () => rand(0, Math.PI * 2));
    this.innerArmOffsets = Array.from({ length: 4 }, () => rand(0, Math.PI * 2));
  }

  getPosition() {
    const t = this.progress;
    // Slight easing for organic path
    const easeT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const baseX = lerp(this.startX, this.endX, easeT);
    const baseY = lerp(this.startY, this.endY, easeT);
    const x = baseX + Math.sin(this.bobPhase) * this.bobAmpX;
    const y = baseY + Math.cos(this.bobPhase * 0.7) * this.bobAmpY;
    return { x, y };
  }

  update() {
    this.bobPhase += 0.005;
    this.pulsePhase += this.pulseSpeed;
    this.progress += this.speed;

    if (this.progress > 1) {
      this.progress = 0;
    }
  }

  draw(ctx, parallaxOffsetX, parallaxOffsetY) {
    const { x, y } = this.getPosition();
    const px = x + parallaxOffsetX * 0.04;
    const py = y + parallaxOffsetY * 0.04;

    const s = this.baseSize;
    // Pulse animation: bell contracts rapidly and expands slowly
    const rawPulse = Math.sin(this.pulsePhase);
    const pulseActive = Math.max(0, rawPulse); // 0 to 1
    const bellScaleY = 0.6 + pulseActive * 0.45; // bell height stretches during pulse
    const bellScaleX = 1 - pulseActive * 0.15; // bell width squeezes slightly

    ctx.save();
    ctx.translate(px, py);
    
    // Rotation based on movement to bottom left
    ctx.rotate(Math.PI * -0.15); // Slight tilt

    // ── Outer Volumetric Glow ──
    const glowRadius = s * 3;
    const isMobile = window.innerWidth < 768;
    
    // Skip heavy glow rendering on mobile to boost FPS
    if (!isMobile) {
      const gradGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
      gradGlow.addColorStop(0, `hsla(${this.hue},${this.sat}%,70%,0.15)`);
      gradGlow.addColorStop(0.4, `hsla(${this.hue},${this.sat}%,60%,0.08)`);
      gradGlow.addColorStop(1, `hsla(${this.hue},${this.sat}%,40%,0)`);
      ctx.fillStyle = gradGlow;
      ctx.beginPath();
      ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // ── Thick Inner Arms (Oral Arms) ──
    ctx.save();
    // Use blur purely on desktop
    ctx.filter = isMobile ? 'none' : 'blur(1.5px)';
    ctx.shadowBlur = isMobile ? 5 : 15;
    ctx.shadowColor = `hsla(${this.hue},${this.sat}%,70%,0.8)`;
    
    for (let i = 0; i < 4; i++) {
      const tx = ((i - 1.5) / 1.5) * s * 0.4;
      const armLen = s * rand(1.5, 2.5);
      const wave = Math.sin(this.pulsePhase * 0.5 + this.innerArmOffsets[i]) * s * 0.4;
      
      const armGrad = ctx.createLinearGradient(0, 0, 0, armLen);
      armGrad.addColorStop(0, `hsla(${this.hue},${this.sat}%,85%,0.7)`);
      armGrad.addColorStop(0.5, `hsla(${this.hue},${this.sat}%,70%,0.3)`);
      armGrad.addColorStop(1, `hsla(${this.hue},${this.sat}%,50%,0)`);
      
      ctx.beginPath();
      ctx.moveTo(tx, 0);
      ctx.quadraticCurveTo(tx + wave, armLen * 0.5, tx + wave * 0.5, armLen);
      ctx.strokeStyle = armGrad;
      ctx.lineWidth = s * 0.15;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
    ctx.restore();

    // ── Thin Long Trailing Tentacles ──
    ctx.save();
    ctx.filter = isMobile ? 'none' : 'blur(0.5px)';
    for (let i = 0; i < 8; i++) {
      const tx = ((i - 3.5) / 3.5) * s * 0.9;
      // Tendrils stretch behind as bell pulses forward
      const tentLen = s * (3 + (1 - rawPulse) * 0.5); 
      const wave = Math.sin(this.pulsePhase * 0.8 + this.tentacleOffsets[i]) * s * 0.5;
      const wave2 = Math.cos(this.pulsePhase * 0.3 + this.tentacleOffsets[i]) * s * 0.3;

      const tenGrad = ctx.createLinearGradient(0, 0, 0, tentLen);
      tenGrad.addColorStop(0, `hsla(${this.hue},${this.sat}%,80%,0.5)`);
      tenGrad.addColorStop(0.8, `hsla(${this.hue},${this.sat}%,60%,0.1)`);
      tenGrad.addColorStop(1, `hsla(${this.hue},${this.sat}%,40%,0)`);

      ctx.beginPath();
      ctx.moveTo(tx, 0);
      // Complex bezier for natural flow
      ctx.bezierCurveTo(
        tx + wave, tentLen * 0.3,
        tx + wave2, tentLen * 0.6,
        tx + wave, tentLen
      );
      ctx.strokeStyle = tenGrad;
      ctx.lineWidth = rand(0.5, 1.5);
      ctx.stroke();
    }
    ctx.restore();

    // ── Bell (Dome) Top ──
    ctx.save();
    ctx.scale(bellScaleX, bellScaleY);
    ctx.beginPath();
    // High-def bell shape
    ctx.moveTo(-s, 0);
    ctx.bezierCurveTo(-s, -s * 1.5, s, -s * 1.5, s, 0);
    ctx.bezierCurveTo(s * 0.5, s * 0.2, -s * 0.5, s * 0.2, -s, 0);
    
    // Multi-layer gradient for photorealistic translucency
    const bellGrad = ctx.createRadialGradient(0, -s * 0.5, s * 0.1, 0, -s * 0.2, s);
    bellGrad.addColorStop(0, `hsla(${this.hue},90%,95%,0.85)`); // Brightest core
    bellGrad.addColorStop(0.3, `hsla(${this.hue},85%,80%,0.5)`);
    bellGrad.addColorStop(0.7, `hsla(${this.hue},80%,65%,0.3)`);
    bellGrad.addColorStop(1, `hsla(${this.hue},70%,50%,0.1)`);
    
    ctx.fillStyle = bellGrad;
    ctx.shadowBlur = isMobile ? 5 : 20;
    ctx.shadowColor = `hsla(${this.hue}, 100%, 75%, 0.6)`;
    ctx.fill();

    // ── Internal Organs (Gonads) inside the translucent bell ──
    ctx.filter = isMobile ? 'none' : 'blur(2px)';
    ctx.beginPath();
    ctx.ellipse(0, -s * 0.35, s * 0.35, s * 0.2, 0, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue},80%,90%,0.6)`;
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }
}

// ── God Rays (High Bloom) ────────────────────
function drawGodRays(ctx, w, h, time, depthFactor, parallaxOffsetX, parallaxOffsetY) {
  const rayCount = 6;
  // Background layer: -3% parallax
  const originX = w * 0.15 + parallaxOffsetX * -0.03;
  const originY = -h * 0.1 + parallaxOffsetY * -0.03;
  
  const intensity = 1 - depthFactor * 0.5;
  // Significantly boosted brightness
  const baseAlpha = (0.15 + Math.sin(time * 0.4) * 0.05) * intensity; 

  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  
  for (let i = 0; i < rayCount; i++) {
    const angle = -0.15 + (i / rayCount) * 0.6 + Math.sin(time * 0.2 + i) * 0.04;
    const spread = 0.05 + Math.sin(time * 0.3 + i * 1.5) * 0.03;
    const len = h * (1.5 + Math.sin(time * 0.1 + i * 0.9) * 0.3);

    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(
      originX + Math.cos(angle - spread) * len,
      originY + Math.sin(angle - spread) * len + len
    );
    ctx.lineTo(
      originX + Math.cos(angle + spread) * len,
      originY + Math.sin(angle + spread) * len + len
    );
    ctx.closePath();

    const grad = ctx.createLinearGradient(originX, originY, originX, originY + len);
    // VIBGYOR hinted god rays (teal/blue with strong bloom)
    grad.addColorStop(0, `rgba(180,255,255,${baseAlpha * 3})`); // Intense core
    grad.addColorStop(0.3, `rgba(70, 220, 240,${baseAlpha * 1.5})`);
    grad.addColorStop(1, 'rgba(70,180,220,0)');
    
    ctx.fillStyle = grad;
    
    // Massive Bloom
    ctx.shadowBlur = 50;
    ctx.shadowColor = `rgba(120,240,255,${baseAlpha * 4})`;
    ctx.fill();
  }
  ctx.restore();
}

// ── Main Component ───────────────────────────
export default function OceanBackground() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const lastMouse = useRef({ x: -9999, y: -9999 });
  const smoothedMouse = useRef({ x: 0, y: 0 }); // for parallax
  const scrollY = useRef(0);
  const animRef = useRef(0);
  
  const stateRef = useRef({ 
    snow: [], 
    jellyfish: [], 
    fish: [], 
    trails: [], 
    time: 0 
  });

  const handlePointerMove = useCallback((e) => {
    // Handling both mouse and touch if needed
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    // Smooth trail spawning between last frame and current position
    if (lastMouse.current.x !== -9999) {
      const dx = clientX - lastMouse.current.x;
      const dy = clientY - lastMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Spawn tiny glowing particles proportional to distance moved (fluid dynamics)
      const steps = Math.min(Math.max(1, Math.floor(dist / 4)), 15);
      
      for (let i = 0; i < steps; i++) {
        const x = lastMouse.current.x + dx * (i / steps);
        const y = lastMouse.current.y + dy * (i / steps);
        stateRef.current.trails.push(new TrailParticle(x, y, dx, dy));
        
        // Spawn extra for wider trail
        if (Math.random() > 0.4) {
          stateRef.current.trails.push(new TrailParticle(x, y, dx, dy));
        }
      }
    }
    
    lastMouse.current = { x: clientX, y: clientY };
    mouse.current = { x: clientX, y: clientY };
    
    // Initialize smoothed mouse if first movement
    if (smoothedMouse.current.x === 0 && smoothedMouse.current.y === 0) {
      smoothedMouse.current = { x: clientX, y: clientY };
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    // Reset trail so it doesn't jump when re-entering
    lastMouse.current = { x: -9999, y: -9999 };
    mouse.current = { x: -9999, y: -9999 };
  }, []);

  const handleScroll = useCallback(() => {
    scrollY.current = window.scrollY;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();

    // Create entities - Scale down massively on mobile for buttery smooth performance
    const isMobile = w < 768;
    const snowCount = isMobile ? Math.min(50, Math.floor((w * h) / 12000)) : Math.min(120, Math.floor((w * h) / 7500));
    const snow = Array.from({ length: snowCount }, (_, i) => new SnowParticle(w, h, i));
    
    const jellyfishCount = isMobile ? Math.min(2, Math.floor(h / 300)) : Math.min(5, Math.max(3, Math.floor(w / 400)));
    const jellyfish = Array.from({ length: jellyfishCount }, (_, i) => new Jellyfish(w, h, i));
    
    // 2-6 distant fish
    const fishCount = isMobile ? Math.floor(rand(2, 4)) : Math.floor(rand(4, 7));
    const fish = Array.from({ length: fishCount }, () => new Fish(w, h));

    // 0-2 distant turtles
    const turtleCount = isMobile ? Math.floor(rand(0, 2)) : Math.floor(rand(1, 4));
    const turtles = Array.from({ length: turtleCount }, () => new Turtle(w, h));

    stateRef.current = { snow, jellyfish, fish, turtles, trails: [], time: 0 };

    const animate = () => {
      const st = stateRef.current;
      st.time += 0.016;
      
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Removed heavy mouse parallax shift to keep the background still and professional
      // We only apply very minimal shift if at all, or zero.
      const parallaxOffsetX = 0;
      const parallaxOffsetY = 0;

      // scroll depth factor (0 = top, 1 = far down)
      const docH = document.documentElement.scrollHeight - h;
      const depthFactor = docH > 0 ? Math.min(scrollY.current / docH, 1) : 0;

      // ── Background gradient (depth-synced) ──
      const r1 = Math.round(lerp(0, 0, depthFactor));
      const g1 = Math.round(lerp(18, 5, depthFactor));
      const b1 = Math.round(lerp(25, 10, depthFactor));
      const r2 = Math.round(lerp(0, 0, depthFactor));
      const g2 = Math.round(lerp(33, 10, depthFactor));
      const b2 = Math.round(lerp(46, 15, depthFactor));

      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, `rgb(${r1},${g1},${b1})`);
      bgGrad.addColorStop(1, `rgb(${r2},${g2},${b2})`);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // ── God Rays ──
      drawGodRays(ctx, w, h, st.time, depthFactor, parallaxOffsetX, parallaxOffsetY);

      // ── Fish (Far Background) ──
      for (const f of st.fish) {
        f.update(w, h);
        f.draw(ctx, parallaxOffsetX, parallaxOffsetY);
      }

      // ── Turtles (Far Background) ──
      for (const t of st.turtles) {
        t.update(w, h);
        t.draw(ctx, parallaxOffsetX, parallaxOffsetY);
      }

      // ── Jellyfish (Midground) ──
      for (const j of st.jellyfish) {
        j.update(); // Removed mouse and parallax parameters
        j.draw(ctx, parallaxOffsetX, parallaxOffsetY);
      }

      // ── Trail (Bioluminescent Wake) ──
      st.trails = st.trails.filter(t => t.life > 0);
      for (const t of st.trails) {
        t.update();
        t.draw(ctx, parallaxOffsetX, parallaxOffsetY);
      }

      // ── Marine Snow (Foreground) ──
      for (const p of st.snow) {
        p.update(w, h, mx, my);
        p.draw(ctx, parallaxOffsetX, parallaxOffsetY);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resize);
    
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resize);
    };
  }, [handlePointerMove, handlePointerLeave, handleScroll]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
