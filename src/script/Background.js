
export default function initBackgroundEffects() {

  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach(el => observer.observe(el));

  let lastScrollY = window.scrollY;
  let targetShift = 0,
      currentShift = 0,
      targetRotate = 0,
      currentRotate = 0;
  const ease = 0.08;

  const onScroll = () => {
    const currentScroll = window.scrollY;
    const delta = currentScroll - lastScrollY;

    const shift = currentScroll * 0.04;
    const rotate = Math.max(-1.2, Math.min(1.2, delta * 0.01));

    document.body.style.setProperty("--cathedral-shift", `${shift}px`);
    document.body.style.setProperty("--cathedral-rotate", `${rotate}deg`);

    targetShift = currentScroll * 0.05;
    targetRotate = Math.min(currentScroll * 0.002, 2);

    lastScrollY = currentScroll;
  };

  window.addEventListener("scroll", onScroll);

  const animateBackground = () => {
    currentShift += (targetShift - currentShift) * ease;
    currentRotate += (targetRotate - currentRotate) * ease;

    document.body.style.setProperty("--cathedral-shift", `${currentShift}px`);
    document.body.style.setProperty("--cathedral-rotate", `${currentRotate}deg`);

    requestAnimationFrame(animateBackground);
  };
  animateBackground();

  let mouseX = 0, mouseY = 0;
  const onMouseMove = (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener("mousemove", onMouseMove);

  const techItems = document.querySelectorAll(".tech-item");
  const onTechMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--x", `${x}%`);
    e.currentTarget.style.setProperty("--y", `${y}%`);
  };
  techItems.forEach(item => item.addEventListener("mousemove", onTechMouseMove));

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("mousemove", onMouseMove);
    techItems.forEach(item => item.removeEventListener("mousemove", onTechMouseMove));
    reveals.forEach(el => observer.unobserve(el));
  };
}
