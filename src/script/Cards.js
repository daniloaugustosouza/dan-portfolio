export function initCards() {

  
  const cards = document.querySelectorAll(".card");
  const mobileCards = document.querySelectorAll('.card');


  const container = document.querySelector('.cards');

const indicator = document.createElement('div');
indicator.classList.add('scroll-indicator');
container.appendChild(indicator);

function updateSlider() {
  const containerRect = container.getBoundingClientRect();
  let closest = 0;
  let minDistance = Infinity;

  cards.forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    const distance = Math.abs(rect.left - containerRect.left);
    if (distance < minDistance) {
      minDistance = distance;
      closest = i;
    }
  });

  cards.forEach(c => c.classList.remove('active'));
  const activeCard = cards[closest];
  activeCard.classList.add('active');

  const progressWidth = container.offsetWidth * 0.6;
  const segment = progressWidth / cards.length;

  indicator.style.width = segment + "px";
  indicator.style.left = (container.offsetWidth * 0.2) + (segment * closest) + "px";
}

container.addEventListener('scroll', () => {
  requestAnimationFrame(updateSlider);
});

updateSlider();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.5 });




mobileCards.forEach(card => observer.observe(card));

  cards.forEach(card => {
    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.04)
      `;
      card.style.setProperty("--x", (x / rect.width) * 100 + "%");
      card.style.setProperty("--y", (y / rect.height) * 100 + "%");
    };

    const reset = () => {
      card.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", reset);
  });
}