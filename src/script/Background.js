export default function initBackgroundEffects() {
  const bg = document.getElementById("cathedral-bg");
  const glow = document.querySelector(".hero-glow");
  if (!bg) return;

  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry =>
        entry.target.classList.toggle("active", entry.isIntersecting)
      );
    },
    { threshold: 0.15 }
  );
  reveals.forEach(el => observer.observe(el));

  const isMobile = () => window.innerWidth <= 768;

  if (isMobile()) {
    bg.style.transform = "none";
    if (glow) {
      glow.style.opacity = 1;
      glow.style.transform = "scale(1)";
    }
    return () => {
      reveals.forEach(el => observer.unobserve(el));
    };
  }

  let lastScrollY = window.scrollY;
  let targetShift = 0;
  let currentShift = 0;
  let targetRotate = -2;
  let currentRotate = -2;
  let targetGlowOpacity = 1;
  let currentGlowOpacity = 1;
  let targetGlowScale = 1;
  let currentGlowScale = 1;

  const ease = 0.07;
  const glowEase = 0.08;

  const onScroll = () => {
    const scroll = window.scrollY;
    const delta = scroll - lastScrollY;

    targetShift = scroll * 0.035;
    targetRotate = -2 + Math.max(-0.6, Math.min(0.6, delta * 0.02));

    if (scroll > 80 && delta > 0) {
      targetGlowOpacity = 0;
      targetGlowScale = 0.85;
    } else {
      targetGlowOpacity = 1;
      targetGlowScale = 1;
    }

    lastScrollY = scroll;
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  const animate = () => {
    currentShift += (targetShift - currentShift) * ease;
    currentRotate += (targetRotate - currentRotate) * ease;

    bg.style.transform = `translateY(${currentShift}px) rotate(${currentRotate}deg)`;

    if (glow) {
      currentGlowOpacity += (targetGlowOpacity - currentGlowOpacity) * glowEase;
      currentGlowScale += (targetGlowScale - currentGlowScale) * glowEase;

      glow.style.opacity = currentGlowOpacity;
      glow.style.transform = `scale(${currentGlowScale})`;
    }

    requestAnimationFrame(animate);
  };
  animate();

  const techItems = document.querySelectorAll(".tech-item");
  const onTechMouseMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--x", `${x}%`);
    e.currentTarget.style.setProperty("--y", `${y}%`);
  };

  techItems.forEach(item =>
    item.addEventListener("mousemove", onTechMouseMove)
  );

  return () => {
    window.removeEventListener("scroll", onScroll);
    techItems.forEach(item =>
      item.removeEventListener("mousemove", onTechMouseMove)
    );
    reveals.forEach(el => observer.unobserve(el));
  };
}
