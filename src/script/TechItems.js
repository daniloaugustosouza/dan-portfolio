export function initTechItems() {
  const techItems = document.querySelectorAll(".tech-item");

  techItems.forEach(item => {
    const handleMove = (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      item.style.transform = `
        perspective(800px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.06)
      `;
      item.style.setProperty("--x", (x / rect.width) * 100 + "%");
      item.style.setProperty("--y", (y / rect.height) * 100 + "%");
    };

    const reset = () => {
      item.style.transform = `
        perspective(800px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
    };

    item.addEventListener("mousemove", handleMove);
    item.addEventListener("mouseleave", reset);
  });
}