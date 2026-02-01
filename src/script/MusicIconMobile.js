export function enableMobileMusicAnimation(selector) {
  const musicIcons = document.querySelectorAll(selector);

  musicIcons.forEach(icon => {
    let touchTimeout;

    const addTouchActive = () => {
      icon.classList.add("touch-active");
      clearTimeout(touchTimeout);
      touchTimeout = setTimeout(() => {
        icon.classList.remove("touch-active");
      }, 500); 
    };

    icon.addEventListener("touchstart", addTouchActive);
  });
}
