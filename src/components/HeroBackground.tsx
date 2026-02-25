'use client';
import { useEffect, useRef } from 'react';

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;

    function resize() {
      W = canvas!.width = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Stars
    const stars: { x: number; y: number; r: number; b: number; sp: number }[] = [];
    for (let i = 0; i < 120; i++) {
      stars.push({ x: Math.random(), y: Math.random() * 0.65, r: Math.random() * 1.8 + 0.3, b: Math.random(), sp: Math.random() * 0.02 + 0.005 });
    }

    // Moon
    const moon = { x: 0.85, y: 0.08, r: 30 };

    // Fence posts
    const fencePosts: number[] = [];
    for (let i = 0; i < 30; i++) fencePosts.push(i / 29);

    // Cows
    interface Cow {
      x: number; groundY: number; y: number; phase: number;
      beamed: boolean; beamTimer: number; floatY: number; rotation: number;
      legPhase: number; respawnTimer: number; visible: boolean; scale: number;
    }
    const cows: Cow[] = [];
    for (let i = 0; i < 7; i++) {
      cows.push({
        x: 0.08 + Math.random() * 0.75, groundY: 0, y: 0, phase: Math.random() * Math.PI * 2,
        beamed: false, beamTimer: Math.random() * 400 + 200, floatY: 0, rotation: 0,
        legPhase: 0, respawnTimer: 0, visible: true, scale: 0.7 + Math.random() * 0.4
      });
    }

    // UFO
    const ufo = { x: 0.5, y: 0.1, targetX: 0.5, bobPhase: 0, lights: 0 };

    // Farmer state
    interface Farmer {
      state: 'idle' | 'running_out' | 'aiming' | 'shooting' | 'shaking_fist' | 'walking_back';
      x: number; targetX: number; timer: number;
      armAngle: number; muzzleFlash: number; porchLight: number;
      shotsFired: number; triggered: boolean;
    }
    const farmer: Farmer = {
      state: 'idle', x: 1.05, targetX: 0.85, timer: 0,
      armAngle: -0.8, muzzleFlash: 0, porchLight: 0,
      shotsFired: 0, triggered: false
    };

    // Porch / farmhouse position (right edge)
    const porch = { x: 0.97 };

    // Track abductions to trigger farmer
    let abductionCount = 0;
    let lastAbductionCount = 0;

    function drawMoon(ctx: CanvasRenderingContext2D) {
      const mx = moon.x * W, my = moon.y * H;
      // Glow
      const grd = ctx.createRadialGradient(mx, my, moon.r * 0.5, mx, my, moon.r * 3);
      grd.addColorStop(0, 'rgba(255,255,220,0.15)');
      grd.addColorStop(1, 'rgba(255,255,220,0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(mx, my, moon.r * 3, 0, Math.PI * 2);
      ctx.fill();
      // Moon body
      ctx.fillStyle = '#ffffdd';
      ctx.beginPath();
      ctx.arc(mx, my, moon.r, 0, Math.PI * 2);
      ctx.fill();
      // Craters
      ctx.fillStyle = 'rgba(200,200,180,0.4)';
      ctx.beginPath(); ctx.arc(mx - 8, my - 5, 6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(mx + 10, my + 7, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(mx + 3, my - 10, 3, 0, Math.PI * 2); ctx.fill();
    }

    function drawFence(ctx: CanvasRenderingContext2D, groundY: number) {
      const fenceY = groundY - 18;
      const postH = 28;
      ctx.strokeStyle = '#3a2a1a';
      ctx.lineWidth = 2;
      // Rails
      ctx.beginPath();
      ctx.moveTo(0, fenceY - 8);
      ctx.lineTo(W, fenceY - 8);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, fenceY - 18);
      ctx.lineTo(W, fenceY - 18);
      ctx.stroke();
      // Posts
      ctx.lineWidth = 3;
      for (const px of fencePosts) {
        const fx = px * W;
        ctx.beginPath();
        ctx.moveTo(fx, fenceY + 5);
        ctx.lineTo(fx, fenceY - postH);
        ctx.stroke();
      }
    }

    function drawCow(ctx: CanvasRenderingContext2D, cow: Cow, time: number) {
      if (!cow.visible) return;
      const cx = cow.x * W;
      const cy = cow.y;
      const s = cow.scale * 0.6;
      const rot = cow.rotation;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.scale(s, s);

      // Shadow on ground if being beamed
      if (cow.beamed && cow.floatY < 80) {
        ctx.save();
        ctx.translate(0, cow.groundY - cy);
        const shadowScale = 1 - cow.floatY / 120;
        ctx.scale(shadowScale, shadowScale * 0.3);
        ctx.fillStyle = 'rgba(0,255,200,0.15)';
        ctx.beginPath();
        ctx.ellipse(0, 0, 25, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Body
      ctx.fillStyle = '#f5f5f0';
      ctx.beginPath();
      ctx.ellipse(0, 0, 22, 14, 0, 0, Math.PI * 2);
      ctx.fill();

      // Spots
      ctx.fillStyle = '#222';
      ctx.beginPath(); ctx.ellipse(-8, -4, 7, 5, 0.3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(6, 3, 5, 4, -0.2, 0, Math.PI * 2); ctx.fill();

      // Head
      ctx.fillStyle = '#f5f5f0';
      ctx.beginPath(); ctx.ellipse(24, -6, 9, 8, 0.1, 0, Math.PI * 2); ctx.fill();
      // Eye
      ctx.fillStyle = '#222';
      ctx.beginPath(); ctx.arc(28, -8, 2, 0, Math.PI * 2); ctx.fill();
      // Nose
      ctx.fillStyle = '#ffcccc';
      ctx.beginPath(); ctx.ellipse(32, -4, 4, 3, 0, 0, Math.PI * 2); ctx.fill();
      // Horns
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(22, -13); ctx.lineTo(19, -20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(26, -13); ctx.lineTo(29, -20); ctx.stroke();

      // Legs (kicking if beamed)
      ctx.strokeStyle = '#f5f5f0';
      ctx.lineWidth = 3;
      const kick = cow.beamed ? Math.sin(cow.legPhase) * 0.5 : 0;
      const kick2 = cow.beamed ? Math.cos(cow.legPhase * 1.3) * 0.4 : 0;

      // Front legs
      ctx.beginPath(); ctx.moveTo(12, 10); ctx.lineTo(14 + kick * 10, 26 + kick2 * 5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(8, 10); ctx.lineTo(6 - kick * 8, 26 - kick2 * 5); ctx.stroke();
      // Back legs
      ctx.beginPath(); ctx.moveTo(-12, 10); ctx.lineTo(-10 - kick * 10, 26 + kick2 * 5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-16, 10); ctx.lineTo(-18 + kick * 8, 26 - kick2 * 5); ctx.stroke();

      // Tail
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 1.5;
      const tailWag = Math.sin(time * 0.003 + cow.phase) * 0.3;
      ctx.beginPath();
      ctx.moveTo(-22, -2);
      ctx.quadraticCurveTo(-32, -8 + tailWag * 10, -35, -15 + tailWag * 15);
      ctx.stroke();

      // Udder
      ctx.fillStyle = '#ffcccc';
      ctx.beginPath(); ctx.ellipse(-2, 13, 5, 4, 0, 0, Math.PI * 2); ctx.fill();

      ctx.restore();
    }

    function drawUFO(ctx: CanvasRenderingContext2D, time: number) {
      const ux = ufo.x * W;
      const uy = ufo.y * H + Math.sin(ufo.bobPhase) * 8;

      // UFO glow
      const grd = ctx.createRadialGradient(ux, uy, 10, ux, uy, 80);
      grd.addColorStop(0, 'rgba(0,255,200,0.12)');
      grd.addColorStop(1, 'rgba(0,255,200,0)');
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(ux, uy, 80, 0, Math.PI * 2); ctx.fill();

      // Saucer bottom
      ctx.fillStyle = '#556';
      ctx.beginPath();
      ctx.ellipse(ux, uy + 5, 40, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Dome
      ctx.fillStyle = '#99aabb';
      ctx.beginPath();
      ctx.ellipse(ux, uy - 5, 22, 15, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      // Dome glass
      ctx.fillStyle = 'rgba(100,255,220,0.3)';
      ctx.beginPath();
      ctx.ellipse(ux, uy - 6, 18, 12, 0, Math.PI, Math.PI * 2);
      ctx.fill();

      // Rotating lights
      ctx.fillStyle = '#ffdd00';
      for (let i = 0; i < 6; i++) {
        const a = ufo.lights + (i / 6) * Math.PI * 2;
        const lx = ux + Math.cos(a) * 35;
        const ly = uy + 5 + Math.sin(a) * 8;
        ctx.beginPath(); ctx.arc(lx, ly, 2.5, 0, Math.PI * 2); ctx.fill();
      }
    }

    function drawBeam(ctx: CanvasRenderingContext2D, cow: Cow) {
      if (!cow.beamed) return;
      const ux = ufo.x * W;
      const uy = ufo.y * H + 15;
      const cx = cow.x * W;
      const bw = 25;

      ctx.save();
      const grd = ctx.createLinearGradient(0, uy, 0, cow.groundY);
      grd.addColorStop(0, 'rgba(0,255,200,0.25)');
      grd.addColorStop(0.5, 'rgba(0,255,200,0.1)');
      grd.addColorStop(1, 'rgba(0,255,200,0.05)');
      ctx.fillStyle = grd;

      // Shimmer
      const shimmer = Math.sin(Date.now() * 0.01) * 5;

      ctx.beginPath();
      ctx.moveTo(ux - 15, uy);
      ctx.lineTo(cx - bw - shimmer, cow.groundY);
      ctx.lineTo(cx + bw + shimmer, cow.groundY);
      ctx.lineTo(ux + 15, uy);
      ctx.closePath();
      ctx.fill();

      // Beam particles
      ctx.fillStyle = 'rgba(0,255,200,0.5)';
      for (let i = 0; i < 8; i++) {
        const py = uy + ((Date.now() * 0.002 + i * 0.12) % 1) * (cow.groundY - uy);
        const frac = (py - uy) / (cow.groundY - uy);
        const bx = ux + (cx - ux) * frac + (Math.random() - 0.5) * bw * frac;
        ctx.beginPath(); ctx.arc(bx, py, 1.5, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    }

    function drawFarmer(ctx: CanvasRenderingContext2D, time: number, groundY: number) {
      if (farmer.state === 'idle') return;

      const fx = farmer.x * W;
      const fy = groundY - 20;
      const s = 1.2;

      ctx.save();
      ctx.translate(fx, fy);
      ctx.scale(s, s);

      // Farmer body (silhouette style)
      const col = '#1a1a1a';

      // Legs (walking animation)
      ctx.strokeStyle = col;
      ctx.lineWidth = 3;
      let legSwing = 0;
      if (farmer.state === 'running_out' || farmer.state === 'walking_back') {
        legSwing = Math.sin(time * 0.015) * 0.4;
      }
      ctx.beginPath(); ctx.moveTo(-3, 0); ctx.lineTo(-3 - Math.sin(legSwing) * 8, 18); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(3, 0); ctx.lineTo(3 + Math.sin(legSwing) * 8, 18); ctx.stroke();

      // Torso
      ctx.fillStyle = col;
      ctx.fillRect(-6, -18, 12, 20);

      // Head
      ctx.beginPath(); ctx.arc(0, -24, 7, 0, Math.PI * 2); ctx.fill();

      // Hat (cowboy/farmer hat)
      ctx.fillRect(-10, -30, 20, 3);
      ctx.fillRect(-5, -35, 10, 6);

      // Shotgun arm
      if (farmer.state === 'aiming' || farmer.state === 'shooting') {
        ctx.save();
        ctx.translate(-4, -12);
        ctx.rotate(farmer.armAngle);

        // Gun
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(35, 0); ctx.stroke();
        // Stock
        ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-8, 6); ctx.stroke();

        // Muzzle flash
        if (farmer.muzzleFlash > 0) {
          ctx.fillStyle = `rgba(255,200,50,${farmer.muzzleFlash})`;
          ctx.beginPath(); ctx.arc(37, 0, 8, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = `rgba(255,100,20,${farmer.muzzleFlash * 0.7})`;
          ctx.beginPath();
          ctx.moveTo(37, 0);
          ctx.lineTo(50, -8);
          ctx.lineTo(52, 0);
          ctx.lineTo(50, 8);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      } else if (farmer.state === 'shaking_fist') {
        // Fist shaking
        const fistShake = Math.sin(time * 0.03) * 0.3;
        ctx.save();
        ctx.translate(-4, -14);
        ctx.rotate(-1.2 + fistShake);
        ctx.fillStyle = '#2a1a0a';
        ctx.beginPath(); ctx.arc(18, 0, 4, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = col;
        ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(15, 0); ctx.stroke();
        ctx.restore();
      } else {
        // Arms at side or carrying gun
        ctx.strokeStyle = col;
        ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(-6, -12); ctx.lineTo(-10, 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(6, -12); ctx.lineTo(10, 2); ctx.stroke();
      }

      ctx.restore();
    }

    function drawPorchLight(ctx: CanvasRenderingContext2D, groundY: number) {
      if (farmer.porchLight <= 0) return;
      const px = porch.x * W;
      const py = groundY - 50;
      const alpha = farmer.porchLight;

      // Light splash from right side
      const grd = ctx.createRadialGradient(px + 20, py, 5, px - 80, py + 30, 200);
      grd.addColorStop(0, `rgba(255,220,130,${alpha * 0.25})`);
      grd.addColorStop(0.5, `rgba(255,200,100,${alpha * 0.08})`);
      grd.addColorStop(1, 'rgba(255,200,100,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(px - 250, groundY - 150, 300, 180);

      // Bulb glow
      const bgrd = ctx.createRadialGradient(px, py, 2, px, py, 20);
      bgrd.addColorStop(0, `rgba(255,240,180,${alpha})`);
      bgrd.addColorStop(1, `rgba(255,220,130,0)`);
      ctx.fillStyle = bgrd;
      ctx.beginPath(); ctx.arc(px, py, 20, 0, Math.PI * 2); ctx.fill();

      // Bulb
      ctx.fillStyle = `rgba(255,250,200,${alpha})`;
      ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();

      // Porch edge hint
      ctx.strokeStyle = `rgba(80,60,40,${alpha * 0.6})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(W, groundY - 70);
      ctx.lineTo(px - 10, groundY - 70);
      ctx.lineTo(px - 10, groundY);
      ctx.stroke();
    }

    function updateFarmer(dt: number) {
      // Trigger farmer when a cow gets beamed
      if (abductionCount > lastAbductionCount && farmer.state === 'idle') {
        lastAbductionCount = abductionCount;
        farmer.state = 'running_out';
        farmer.x = 1.05;
        farmer.targetX = 0.82 + Math.random() * 0.08;
        farmer.timer = 0;
        farmer.shotsFired = 0;
        farmer.porchLight = 0;
        farmer.triggered = true;
      }

      switch (farmer.state) {
        case 'running_out':
          farmer.porchLight = Math.min(1, farmer.porchLight + 0.03);
          farmer.x -= 0.003;
          if (farmer.x <= farmer.targetX) {
            farmer.state = 'aiming';
            farmer.timer = 0;
            farmer.armAngle = -0.8;
          }
          break;
        case 'aiming':
          farmer.timer++;
          farmer.armAngle = -0.8 - farmer.timer * 0.015;
          if (farmer.armAngle < -1.3) farmer.armAngle = -1.3;
          if (farmer.timer > 40) {
            farmer.state = 'shooting';
            farmer.timer = 0;
            farmer.muzzleFlash = 1;
            farmer.shotsFired++;
          }
          break;
        case 'shooting':
          farmer.timer++;
          farmer.muzzleFlash = Math.max(0, 1 - farmer.timer * 0.1);
          if (farmer.timer > 20) {
            if (farmer.shotsFired < 2) {
              farmer.state = 'aiming';
              farmer.timer = 0;
              farmer.armAngle = -0.8;
            } else {
              farmer.state = 'shaking_fist';
              farmer.timer = 0;
            }
          }
          break;
        case 'shaking_fist':
          farmer.timer++;
          if (farmer.timer > 120) {
            farmer.state = 'walking_back';
            farmer.timer = 0;
          }
          break;
        case 'walking_back':
          farmer.x += 0.002;
          farmer.porchLight = Math.max(0, farmer.porchLight - 0.01);
          if (farmer.x > 1.05) {
            farmer.state = 'idle';
            farmer.porchLight = 0;
            farmer.triggered = false;
          }
          break;
      }
    }

    function animate(time: number) {
      ctx!.clearRect(0, 0, W, H);
      const groundY = H * 0.78;

      // Sky gradient
      const sky = ctx!.createLinearGradient(0, 0, 0, groundY);
      sky.addColorStop(0, '#0a0a1a');
      sky.addColorStop(0.5, '#0f1028');
      sky.addColorStop(1, '#1a1a2e');
      ctx!.fillStyle = sky;
      ctx!.fillRect(0, 0, W, groundY);

      // Stars with twinkle
      for (const star of stars) {
        star.b += star.sp;
        const alpha = 0.3 + Math.sin(star.b) * 0.4 + 0.3;
        ctx!.fillStyle = `rgba(255,255,240,${alpha})`;
        ctx!.beginPath();
        ctx!.arc(star.x * W, star.y * H, star.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      drawMoon(ctx!);

      // Ground
      const ground = ctx!.createLinearGradient(0, groundY - 20, 0, H);
      ground.addColorStop(0, '#1a2a15');
      ground.addColorStop(0.3, '#152010');
      ground.addColorStop(1, '#0a1408');
      ctx!.fillStyle = ground;
      ctx!.fillRect(0, groundY - 10, W, H - groundY + 10);

      // Grass tufts
      ctx!.strokeStyle = '#2a3a20';
      ctx!.lineWidth = 1;
      for (let i = 0; i < 60; i++) {
        const gx = (i / 60) * W + Math.sin(i * 7) * 20;
        const sway = Math.sin(time * 0.001 + i) * 2;
        ctx!.beginPath();
        ctx!.moveTo(gx, groundY);
        ctx!.quadraticCurveTo(gx + sway, groundY - 10, gx + sway * 1.5, groundY - 14);
        ctx!.stroke();
      }

      // UFO movement
      const beamedCow = cows.find(c => c.beamed && c.visible);
      if (beamedCow) {
        ufo.targetX = beamedCow.x;
      }
      ufo.x += (ufo.targetX - ufo.x) * 0.02;
      ufo.bobPhase += 0.03;
      ufo.lights += 0.05;

      // Draw beams behind cows
      for (const cow of cows) drawBeam(ctx!, cow);

      // Update cows
      for (const cow of cows) {
        cow.groundY = groundY - 8;
        if (!cow.visible) {
          cow.respawnTimer--;
          if (cow.respawnTimer <= 0) {
            cow.visible = true;
            cow.beamed = false;
            cow.y = cow.groundY;
            cow.floatY = 0;
            cow.rotation = 0;
            cow.x = 0.08 + Math.random() * 0.75;
            cow.beamTimer = Math.random() * 500 + 200;
          }
          continue;
        }

        if (!cow.beamed) {
          cow.y = cow.groundY + Math.sin(time * 0.002 + cow.phase) * 1;
          cow.beamTimer--;
          if (cow.beamTimer <= 0 && !cows.some(c => c !== cow && c.beamed)) {
            cow.beamed = true;
            abductionCount++;
            cow.floatY = 0;
          }
        } else {
          cow.floatY += 0.35;
          cow.y = cow.groundY - cow.floatY;
          cow.rotation += 0.008;
          cow.legPhase += 0.15;

          if (cow.y < ufo.y * H + 20) {
            cow.visible = false;
            cow.respawnTimer = Math.random() * 200 + 150;
            cow.beamed = false;
          }
        }
        drawCow(ctx!, cow, time);
      }

      drawFence(ctx!, groundY);

      drawUFO(ctx!, time);

      // Farmer logic
      updateFarmer(1);
      drawPorchLight(ctx!, groundY);
      drawFarmer(ctx!, time, groundY);

      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.5 }}
    />
  );
}