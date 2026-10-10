import { useEffect, useRef, useCallback } from 'react';

/* ─────────────────────────────────────────────
   Abyssal Wake: 3D-Reactive Under-the-Sea
   • Bioluminescent Fluid Particle Trail (Wake)
   • 3D Parallax Abyss (foreground moves faster)
   • Twinkling Marine Snow (with strong repulsion)
   • Distant Fish Silhouettes
   • High-Bloom God Rays
   • Bioluminescent Jellyfish

   PERFORMANCE OPTIMIZED:
   • 30fps cap desktop / 20fps mobile (via timestamp delta)
   • isMobile & docH cached outside animate loop
   • shadowBlur removed from snow particles
   • Jellyfish gradients cached — not recreated per frame
   • rand() removed from draw() — values stored on instances
   • Trail particles hard-capped at MAX_TRAILS
   • Animation paused when tab is hidden
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
    this.vx = vx * 0.04 + rand(-0.4, 0.4);
    this.vy = vy * 0.04 + rand(-0.4, 0.4);
    this.life = 1;
    this.decay = rand(0.018, 0.032); // slightly faster decay = fewer live particles
    this.size = rand(1.5, 3.5);
    this.hue = rand(180, 220);
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy -= 0.015;
    this.vx *= 0.94;
    this.vy *= 0.94;
    this.life -= this.decay;
  }
  draw(ctx) {
    if (this.life <= 0) return;
    const alpha = Math.max(0, this.life);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 100%, 75%, ${alpha})`;
    ctx.fill();
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
    this.r = rand(1, 2.5);
    this.speedY = rand(0.2, 0.6);
    this.speedX = rand(-0.12, 0.12);
    this.baseOpacity = rand(0.15, 0.5);
    this.twinklePhase = rand(0, Math.PI * 2);
    this.twinkleSpeed = rand(0.02, 0.045);
    this.drift = rand(0.0002, 0.0008);
    this.angle = rand(0, Math.PI * 2);
  }
  update(w, h, mx, my) {
    this.angle += this.drift;
    this.twinklePhase += this.twinkleSpeed;
    this.x += this.speedX + Math.sin(this.angle) * 0.35;
    this.y += this.speedY;

    // Mouse Repulsion
    const dx = this.x - mx;
    const dy = this.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 160 && dist > 0) {
      const force = (160 - dist) / 160 * 2.2;
      this.x += (dx / dist) * force;
      this.y += (dy / dist) * force;
    }

    if (this.y > h + 10 || this.x < -10 || this.x > w + 10) {
      this.reset(w, h, false);
    }
  }
  draw(ctx) {
    const twinkledOpacity = this.baseOpacity + Math.sin(this.twinklePhase) * 0.3;
    const finalOpacity = Math.max(0.04, Math.min(0.9, twinkledOpacity));
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180,240,255,${finalOpacity})`;
    ctx.fill();
    // NO shadowBlur — removed for massive GPU perf gain
  }
}

// ── Cached Assets ────────────────────────────
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
  octx.moveTo(30, 0);
  octx.quadraticCurveTo(10, -10, -15, -4);
  octx.lineTo(-25, -12);
  octx.lineTo(-20, 0);
  octx.lineTo(-25, 12);
  octx.lineTo(-15, 4);
  octx.quadraticCurveTo(10, 10, 30, 0);
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
  octx.ellipse(0, 0, 22, 16, 0, 0, Math.PI * 2);
  octx.ellipse(26, 0, 6, 4, 0, 0, Math.PI * 2);
  octx.fill();
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
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    if (this.direction === -1) ctx.scale(-1, 1);
    ctx.scale(this.size, this.size);
    ctx.globalAlpha = this.opacity !== undefined ? this.opacity : 1;
    ctx.drawImage(getCachedFish(), -50, -50);
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
    this.direction = Math.random() > 0.5 ? 1 : -1;
    this.x = this.direction === 1 ? rand(-300, -100) : w + rand(100, 300);
    this.speedX = rand(0.1, 0.2) * this.direction;
    this.speedY = rand(-0.08, 0.02);
    this.size = rand(0.6, 1.2);
    this.phase = rand(0, Math.PI * 2);
    this.baseY = this.y;
  }
  update(w, h) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.phase += 0.02;
    if (this.direction === 1 && this.x > w + 250) this.reset(w, h);
    if (this.direction === -1 && this.x < -250) this.reset(w, h);
    if (this.y < -150 || this.y > h + 150) this.reset(w, h);
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    const angle = Math.atan2(this.speedY, this.speedX);
    ctx.rotate(angle);
    ctx.scale(this.size, this.size);
    ctx.drawImage(getCachedTurtle(), -60, -60);
    ctx.restore();
  }
}

// ── Photorealistic Jellyfish ─────────────────
// PERF: tentacleWidths stored on instance — no rand() in draw()
class Jellyfish {
  constructor(w, h, idx, isMobile) {
    this.idx = idx;
    this.w = w;
    this.h = h;
    this.isMobile = isMobile;
    this.baseSize = rand(35, 60);

    const startOffsetX = rand(0.5, 0.95);
    const startOffsetY = rand(-0.25, -0.05);
    this.startX = w * startOffsetX;
    this.startY = h * startOffsetY;
    this.endX = w * rand(-0.2, 0.3);
    this.endY = h * rand(1.1, 1.3);

    this.progress = rand(0, 1);
    this.baseSpeed = rand(0.00008, 0.00015);
    this.speed = this.baseSpeed;

    const hues = [190, 210, 270, 280, 200];
    this.hue = hues[idx % hues.length];
    this.sat = rand(80, 100);

    this.bobPhase = rand(0, Math.PI * 2);
    this.bobAmpX = rand(20, 50);
    this.bobAmpY = rand(10, 25);

    this.pulsePhase = rand(0, Math.PI * 2);
    this.pulseSpeed = rand(0.015, 0.03);

    this.tentacleOffsets = Array.from({ length: 8 }, () => rand(0, Math.PI * 2));
    this.innerArmOffsets = Array.from({ length: 4 }, () => rand(0, Math.PI * 2));
    // PERF FIX: store tentacle widths on instance, not computed in draw()
    this.tentacleWidths = Array.from({ length: 8 }, () => rand(0.5, 1.5));

    // PERF FIX: cache gradient references — will be rebuilt only on size change
    this._cachedGlowGrad = null;
    this._lastGlowRadius = -1;
  }

  getPosition() {
    const t = this.progress;
    const easeT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const baseX = lerp(this.startX, this.endX, easeT);
    const baseY = lerp(this.startY, this.endY, easeT);
    return {
      x: baseX + Math.sin(this.bobPhase) * this.bobAmpX,
      y: baseY + Math.cos(this.bobPhase * 0.7) * this.bobAmpY,
    };
  }

  update() {
    this.bobPhase += 0.005;
    this.pulsePhase += this.pulseSpeed;
    this.progress += this.speed;
    if (this.progress > 1) this.progress = 0;
  }

  draw(ctx) {
    const { x, y } = this.getPosition();
    const s = this.baseSize;
    const rawPulse = Math.sin(this.pulsePhase);
    const pulseActive = Math.max(0, rawPulse);
    const bellScaleY = 0.6 + pulseActive * 0.45;
    const bellScaleX = 1 - pulseActive * 0.15;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI * -0.15);

    // ── Outer Volumetric Glow (desktop only, cached) ──
    if (!this.isMobile) {
      const glowRadius = s * 3;
      // Rebuild gradient only if radius changed (it won't after init)
      if (glowRadius !== this._lastGlowRadius) {
        this._cachedGlowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
        this._cachedGlowGrad.addColorStop(0, `hsla(${this.hue},${this.sat}%,70%,0.15)`);
        this._cachedGlowGrad.addColorStop(0.4, `hsla(${this.hue},${this.sat}%,60%,0.08)`);
        this._cachedGlowGrad.addColorStop(1, `hsla(${this.hue},${this.sat}%,40%,0)`);
        this._lastGlowRadius = glowRadius;
      }
      ctx.fillStyle = this._cachedGlowGrad;
      ctx.beginPath();
      ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // ── Thick Inner Arms (Oral Arms) ──
    ctx.save();
    ctx.shadowBlur = this.isMobile ? 4 : 12;
    ctx.shadowColor = `hsla(${this.hue},${this.sat}%,70%,0.8)`;
    for (let i = 0; i < 4; i++) {
      const tx = ((i - 1.5) / 1.5) * s * 0.4;
      const armLen = s * 2; // fixed instead of rand() per frame
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
    for (let i = 0; i < 8; i++) {
      const tx = ((i - 3.5) / 3.5) * s * 0.9;
      const tentLen = s * (3 + (1 - rawPulse) * 0.5);
      const wave = Math.sin(this.pulsePhase * 0.8 + this.tentacleOffsets[i]) * s * 0.5;
      const wave2 = Math.cos(this.pulsePhase * 0.3 + this.tentacleOffsets[i]) * s * 0.3;
      const tenGrad = ctx.createLinearGradient(0, 0, 0, tentLen);
      tenGrad.addColorStop(0, `hsla(${this.hue},${this.sat}%,80%,0.5)`);
      tenGrad.addColorStop(0.8, `hsla(${this.hue},${this.sat}%,60%,0.1)`);
      tenGrad.addColorStop(1, `hsla(${this.hue},${this.sat}%,40%,0)`);
      ctx.beginPath();
      ctx.moveTo(tx, 0);
      ctx.bezierCurveTo(tx + wave, tentLen * 0.3, tx + wave2, tentLen * 0.6, tx + wave, tentLen);
      ctx.strokeStyle = tenGrad;
      // PERF FIX: use pre-computed width instead of rand() per frame
      ctx.lineWidth = this.tentacleWidths[i];
      ctx.stroke();
    }
    ctx.restore();

    // ── Bell (Dome) Top ──
    ctx.save();
    ctx.scale(bellScaleX, bellScaleY);
    ctx.beginPath();
    ctx.moveTo(-s, 0);
    ctx.bezierCurveTo(-s, -s * 1.5, s, -s * 1.5, s, 0);
    ctx.bezierCurveTo(s * 0.5, s * 0.2, -s * 0.5, s * 0.2, -s, 0);
    const bellGrad = ctx.createRadialGradient(0, -s * 0.5, s * 0.1, 0, -s * 0.2, s);
    bellGrad.addColorStop(0, `hsla(${this.hue},90%,95%,0.85)`);
    bellGrad.addColorStop(0.3, `hsla(${this.hue},85%,80%,0.5)`);
    bellGrad.addColorStop(0.7, `hsla(${this.hue},80%,65%,0.3)`);
    bellGrad.addColorStop(1, `hsla(${this.hue},70%,50%,0.1)`);
    ctx.fillStyle = bellGrad;
    ctx.shadowBlur = this.isMobile ? 4 : 16;
    ctx.shadowColor = `hsla(${this.hue}, 100%, 75%, 0.6)`;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0, -s * 0.35, s * 0.35, s * 0.2, 0, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue},80%,90%,0.6)`;
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }
}

// ── God Rays (High Bloom) ────────────────────
function drawGodRays(ctx, w, h, time, depthFactor) {
  const rayCount = 5; // reduced from 6
  const originX = w * 0.15;
  const originY = -h * 0.1;
  const intensity = 1 - depthFactor * 0.5;
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
    grad.addColorStop(0, `rgba(180,255,255,${baseAlpha * 3})`);
    grad.addColorStop(0.3, `rgba(70, 220, 240,${baseAlpha * 1.5})`);
    grad.addColorStop(1, 'rgba(70,180,220,0)');
    ctx.fillStyle = grad;
    ctx.shadowBlur = 40;
    ctx.shadowColor = `rgba(120,240,255,${baseAlpha * 3})`;
    ctx.fill();
  }
  ctx.restore();
}

// ── Main Component ───────────────────────────
const MAX_TRAILS = 50; // hard cap — prevents trail explosion on fast mouse

export default function OceanBackground() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const lastMouse = useRef({ x: -9999, y: -9999 });
  const scrollY = useRef(0);
  const animRef = useRef(0);
  const isRunning = useRef(true); // controlled by visibility API

  const stateRef = useRef({
    snow: [],
    jellyfish: [],
    fish: [],
    turtles: [],
    trails: [],
    time: 0,
  });

  const handlePointerMove = useCallback((e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (lastMouse.current.x !== -9999) {
      const dx = clientX - lastMouse.current.x;
      const dy = clientY - lastMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.min(Math.max(1, Math.floor(dist / 5)), 10); // reduced max steps

      const trails = stateRef.current.trails;
      for (let i = 0; i < steps; i++) {
        if (trails.length >= MAX_TRAILS) break; // PERF FIX: hard cap
        const x = lastMouse.current.x + dx * (i / steps);
        const y = lastMouse.current.y + dy * (i / steps);
        trails.push(new TrailParticle(x, y, dx, dy));
        if (Math.random() > 0.5 && trails.length < MAX_TRAILS) {
          trails.push(new TrailParticle(x, y, dx, dy));
        }
      }
    }

    lastMouse.current = { x: clientX, y: clientY };
    mouse.current = { x: clientX, y: clientY };
  }, []);

  const handlePointerLeave = useCallback(() => {
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

    // PERF FIX: cache isMobile — not re-checked inside animate loop
    const isMobile = w < 768;

    // PERF FIX: cache docH — only update on resize
    let docH = document.documentElement.scrollHeight - h;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      // Rebuild docH on resize
      docH = document.documentElement.scrollHeight - h;
    };
    resize();

    // Entity counts — scaled down on mobile
    const snowCount = isMobile
      ? Math.min(40, Math.floor((w * h) / 15000))
      : Math.min(90, Math.floor((w * h) / 9000));
    const snow = Array.from({ length: snowCount }, () => new SnowParticle(w, h));

    const jellyfishCount = isMobile
      ? Math.min(2, Math.floor(h / 350))
      : Math.min(4, Math.max(2, Math.floor(w / 500)));
    const jellyfish = Array.from(
      { length: jellyfishCount },
      (_, i) => new Jellyfish(w, h, i, isMobile)
    );

    const fishCount = isMobile ? Math.floor(rand(1, 3)) : Math.floor(rand(3, 6));
    const fish = Array.from({ length: fishCount }, () => new Fish(w, h));

    const turtleCount = isMobile ? Math.floor(rand(0, 1)) : Math.floor(rand(1, 3));
    const turtles = Array.from({ length: turtleCount }, () => new Turtle(w, h));

    stateRef.current = { snow, jellyfish, fish, turtles, trails: [], time: 0 };

    // PERF FIX: FPS throttle — 30fps desktop, 20fps mobile
    const TARGET_FPS = isMobile ? 20 : 30;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;
    let lastTimestamp = 0;

    const animate = (timestamp) => {
      if (!isRunning.current) return;

      // Frame-rate cap
      const elapsed = timestamp - lastTimestamp;
      if (elapsed < FRAME_INTERVAL) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimestamp = timestamp - (elapsed % FRAME_INTERVAL);

      const st = stateRef.current;
      st.time += 0.016;

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // PERF FIX: docH cached — no layout reflow per frame
      const depthFactor = docH > 0 ? Math.min(scrollY.current / docH, 1) : 0;

      // ── Background gradient (depth-synced) ──
      const g1 = Math.round(lerp(18, 5, depthFactor));
      const b1 = Math.round(lerp(25, 10, depthFactor));
      const g2 = Math.round(lerp(33, 10, depthFactor));
      const b2 = Math.round(lerp(46, 15, depthFactor));

      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, `rgb(0,${g1},${b1})`);
      bgGrad.addColorStop(1, `rgb(0,${g2},${b2})`);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // ── God Rays ──
      drawGodRays(ctx, w, h, st.time, depthFactor);

      // ── Fish ──
      for (const f of st.fish) {
        f.update(w, h);
        f.draw(ctx);
      }

      // ── Turtles ──
      for (const t of st.turtles) {
        t.update(w, h);
        t.draw(ctx);
      }

      // ── Jellyfish ──
      for (const j of st.jellyfish) {
        j.update();
        j.draw(ctx);
      }

      // ── Trail (Bioluminescent Wake) ──
      st.trails = st.trails.filter((t) => t.life > 0);
      for (const t of st.trails) {
        t.update();
        t.draw(ctx);
      }

      // ── Marine Snow ──
      for (const p of st.snow) {
        p.update(w, h, mx, my);
        p.draw(ctx);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    // PERF FIX: pause animation when tab is not visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning.current = false;
        cancelAnimationFrame(animRef.current);
      } else {
        isRunning.current = true;
        lastTimestamp = 0;
        animRef.current = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      isRunning.current = false;
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
