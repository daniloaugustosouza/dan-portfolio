export default function initBackgroundEffects() {
  const bg = document.getElementById("cathedral-bg");
  const glow = document.querySelector(".hero-glow");
  if (!bg) return;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) entry.target.classList.toggle("active", entry.isIntersecting);
    },
    { threshold: 0.15 }
  );
  reveals.forEach(el => observer.observe(el));

  bg.style.willChange = "transform";
  bg.style.transform = "translate3d(0,0,0) rotate(-2deg)";
  bg.style.backfaceVisibility = "hidden";
  bg.style.transformStyle = "preserve-3d";

  let lastScrollY = window.scrollY;
  let targetShift = 0;
  let currentShift = 0;
  let targetRotate = -2;
  let currentRotate = -2;

  let targetGlowOpacity = 1;
  let currentGlowOpacity = 1;
  let targetGlowScale = 1;
  let currentGlowScale = 1;

  const ease = isMobile ? 0.18 : 0.07;
  const glowEase = isMobile ? 0.22 : 0.08;

  if (glow) {
    glow.style.willChange = "transform, opacity";
    glow.style.transform = "translate3d(0,0,0) scale(1)";
    glow.style.backfaceVisibility = "hidden";
  }

  let rafId = 0;
  let ticking = false;
  let running = true;

  const apply = () => {
    if (!running) return;

    currentShift += (targetShift - currentShift) * ease;
    currentRotate += (targetRotate - currentRotate) * ease;

    bg.style.transform = `translate3d(0, ${currentShift}px, 0) rotate(${currentRotate}deg)`;

    if (glow) {
      currentGlowOpacity += (targetGlowOpacity - currentGlowOpacity) * glowEase;
      currentGlowScale += (targetGlowScale - currentGlowScale) * glowEase;

      glow.style.opacity = String(currentGlowOpacity);
      glow.style.transform = `translate3d(0,0,0) scale(${currentGlowScale})`;
    }

    ticking = false;
  };

  const onScroll = () => {
    const scroll = window.scrollY;
    const delta = scroll - lastScrollY;

    targetShift = scroll * (isMobile ? 0.02 : 0.035);
    targetRotate = -2 + Math.max(-0.6, Math.min(0.6, delta * 0.02));

    if (glow) {
      if (scroll > 80 && delta > 0) {
        targetGlowOpacity = 0;
        targetGlowScale = 0.88;
      } else {
        targetGlowOpacity = 1;
        targetGlowScale = 1;
      }
    }

    lastScrollY = scroll;

    if (!ticking) {
      ticking = true;
      rafId = requestAnimationFrame(apply);
    }
  };

  const stop = () => {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    ticking = false;
  };

  const start = () => {
    running = true;
    onScroll();
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  const onVisibility = () => {
    if (document.hidden) stop();
    else start();
  };
  document.addEventListener("visibilitychange", onVisibility);

  if (isMobile || reducedMotion) {
    if (glow) glow.remove();
    bg.style.transform = "translate3d(0,0,0) rotate(0deg)";
    bg.style.willChange = "auto";

    const cleanupMobile = () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      reveals.forEach(el => observer.unobserve(el));
      observer.disconnect();
      stop();
    };

    onScroll();
    return cleanupMobile;
  }

  const animate = () => {
    if (!running) return;
    apply();
    rafId = requestAnimationFrame(animate);
  };
  animate();

  const techItems = document.querySelectorAll(".tech-item");
  const onTechMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--x", `${x}%`);
    e.currentTarget.style.setProperty("--y", `${y}%`);
  };

  techItems.forEach(item => item.addEventListener("mousemove", onTechMove));

  return () => {
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("visibilitychange", onVisibility);
    techItems.forEach(item => item.removeEventListener("mousemove", onTechMove));
    reveals.forEach(el => observer.unobserve(el));
    observer.disconnect();
    stop();
  };
}
