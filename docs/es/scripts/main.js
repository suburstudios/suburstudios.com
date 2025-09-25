// main.js - Carrusel y menú (versión corregida y robusta)

// --- MENÚ DESPLEGABLE (móvil) ---
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('nav .menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}

// --- CARRUSEL ---
const track = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

// Si no hay carrusel, salimos
if (!track || !prevButton || !nextButton) {
  // No hay carrusel en la página
  console.warn('Carrusel no inicializado: faltan elementos DOM.');
} else {
  // Helpers
  const getItems = () => Array.from(track.children);
  const getGapPx = () => {
    const style = window.getComputedStyle(track);
    // 'gap' suele devolver "16px" o similar; parseFloat manejará "0" si no existe
    return parseFloat(style.gap) || 0;
  };

  // Decide cuántos elementos se muestran según ancho (puedes ajustar breakpoints)
  function getVisibleCount() {
    const w = window.innerWidth;
    if (w < 768) return 1;
    if (w < 1024) return 2;
    return 3;
  }

  let items = getItems();
  let visibleCount = getVisibleCount();
  let currentIndex = 0;

  function computeItemStep() {
    // recalcula el ancho efectivo de cada item (incluye gap)
    if (!items[0]) return 0;
    const itemWidth = items[0].getBoundingClientRect().width;
    const gap = getGapPx();
    return itemWidth + gap;
  }

  function updateButtonsState(maxIndex) {
    // Si hay menos o igual items visibles, desactivamos botones
    if (items.length <= visibleCount) {
      prevButton.disabled = true;
      nextButton.disabled = true;
      prevButton.classList.add('disabled');
      nextButton.classList.add('disabled');
    } else {
      prevButton.disabled = false;
      nextButton.disabled = false;
      prevButton.classList.remove('disabled');
      nextButton.classList.remove('disabled');
    }
  }

  function updateCarousel(animate = true) {
    // recalculamos por si ha cambiado layout/DOM
    items = getItems();
    visibleCount = getVisibleCount();

    const step = computeItemStep();
    const maxIndex = Math.max(0, items.length - visibleCount);

    // clamp currentIndex
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    // animación opcional
    track.style.transition = animate ? 'transform 0.45s ease' : 'none';
    track.style.transform = `translateX(${-currentIndex * step}px)`;

    updateButtonsState(maxIndex);
  }

  // Botones: avance con wrap-around (si llegas al final vuelve al principio)
  nextButton.addEventListener('click', () => {
    items = getItems();
    visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, items.length - visibleCount);

    if (items.length <= visibleCount) {
      // nada que hacer
      return;
    }

    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      // wrap to start
      currentIndex = 0;
    }
    updateCarousel();
  });

  prevButton.addEventListener('click', () => {
    items = getItems();
    visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, items.length - visibleCount);

    if (items.length <= visibleCount) {
      return;
    }

    if (currentIndex > 0) {
      currentIndex--;
    } else {
      // wrap to last "page"
      currentIndex = maxIndex;
    }
    updateCarousel();
  });

  // Reajusta al redimensionar (debounce ligero)
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // evitar saltos: recalcula sin animación, luego con animación
      updateCarousel(false);
      // forzar reflow y luego permitir animación en futuras actualizaciones
      void track.offsetWidth;
      updateCarousel(true);
    }, 120);
  });

  // Inicializar
  updateCarousel(false);

  // Opcional: soporte teclado (flechas)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextButton.click();
    if (e.key === 'ArrowLeft') prevButton.click();
  });
}
