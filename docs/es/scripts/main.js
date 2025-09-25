// main.js - menú y carrusel (no duplicados, wrap al final -> inicio)

// menú móvil toggle
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('nav .menu');
if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}

// actualiza el año en footer
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Carrusel
(function () {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  const items = Array.from(track.children);
  const prevBtn = document.querySelector('.carousel-button.prev');
  const nextBtn = document.querySelector('.carousel-button.next');

  let index = 0;

  function getVisibleCount() {
    // calcula cuántos caben en el contenedor según ancho
    const containerWidth = track.parentElement.clientWidth;
    const item = items[0];
    if (!item) return 1;
    const style = getComputedStyle(item);
    const gap = parseFloat(getComputedStyle(track).gap) || 12;
    const itemWidth = item.getBoundingClientRect().width + gap;
    const visible = Math.max(1, Math.floor((containerWidth + gap) / itemWidth));
    return visible;
  }

  function update() {
    const gap = parseFloat(getComputedStyle(track).gap) || 12;
    const itemRect = items[0].getBoundingClientRect();
    const itemWidth = itemRect.width + gap;
    const visible = getVisibleCount();
    const maxIndex = Math.max(0, items.length - visible);
    // clamp index within 0..maxIndex, but if index > maxIndex wrap to 0
    if (index > maxIndex) index = 0;
    const translateX = -index * itemWidth;
    track.style.transform = `translateX(${translateX}px)`;
  }

  // botones next / prev: cuando llegues al final, vuelve al inicio (wrap)
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, items.length - visible);
      index = (index < maxIndex) ? index + 1 : 0;
      update();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const visible = getVisibleCount();
      const maxIndex = Math.max(0, items.length - visible);
      index = (index > 0) ? index - 1 : maxIndex;
      update();
    });
  }

  // recalcula en resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      update();
    }, 120);
  });

  // init
  setTimeout(update, 50);
})();
