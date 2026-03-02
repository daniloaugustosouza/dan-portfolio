import { createParticle, updateParticle, drawParticle, rand } from "./Particles.js";
import { initCards } from "./Cards.js";
import { initTechItems } from "./TechItems.js";

export default function initBackground() {
  
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle("active", entry.isIntersecting);
      }
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el) => revealObserver.observe(el));

  if (reducedMotion) {
    reveals.forEach((el) => el.classList.add("active"));
    return () => {
      reveals.forEach((el) => revealObserver.unobserve(el));
      revealObserver.disconnect();
    };
  }

  let canvas, ctx, particles = [], animId;

  if (!isMobile) {
    canvas = document.getElementById("re-particles");

    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "re-particles";
      Object.assign(canvas.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: "0",
      });
      document.body.appendChild(canvas);
    }
    ctx = canvas.getContext("2d");

    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    
    const resize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      canvas.width = newWidth;
      canvas.height = newHeight;

      const scaleX = newWidth / lastWidth;
      const scaleY = newHeight / lastHeight;

      for (let p of particles) {
        p.x *= scaleX;
        p.y *= scaleY;
      }

      lastWidth = newWidth;
      lastHeight = newHeight;
    };


    resize();

    window.addEventListener("resize", resize);

    const COUNT = 150;
    for (let i = 0; i < COUNT; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        updateParticle(p);
        drawParticle(p, ctx);
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
  }

  initCards();
  initTechItems();
}