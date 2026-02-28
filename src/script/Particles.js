export function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export function createParticle() {
  const isBlue = Math.random() < 0.15;

  return {
    x: rand(0, window.innerWidth),
    y: rand(0, window.innerHeight),
    vx: rand(-0.15, 0.15),
    vy: rand(-0.35, -0.08),
    size: rand(0.8, 2.2),
    opacity: rand(0.05, 0.35),
    opacityTarget: rand(0.05, 0.35),
    opacitySpeed: rand(0.003, 0.012),
    isBlue
  };
}

export function updateParticle(p) {
  p.x += p.vx;
  p.y += p.vy;

  if (p.x < 0) p.x = window.innerWidth;
  if (p.x > window.innerWidth) p.x = 0;

  if (p.y < 0) p.y = window.innerHeight;
  if (p.y > window.innerHeight) p.y = 0;

  p.opacity += (p.opacityTarget - p.opacity) * 0.04;

  if (Math.abs(p.opacity - p.opacityTarget) < 0.005) {
    p.opacityTarget = rand(0.05, 0.3);
  }
}

export function drawParticle(p, ctx) {
  if (p.isBlue) {
    ctx.fillStyle = `rgba(0, 120, 255, ${p.opacity})`;
  } else {
    const brightness = 150;
    ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${p.opacity})`;
  }

  ctx.beginPath();
  ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
  ctx.fill();
}