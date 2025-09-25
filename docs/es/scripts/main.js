// Menú desplegable
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('nav .menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// Carrusel
const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');

let currentIndex = 0;

function updateCarousel() {
  const itemWidth = items[0].getBoundingClientRect().width + 20; // margen
  track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

nextButton.addEventListener('click', () => {
  if(currentIndex < items.length - 3) { // mostrar 3 a la vez
    currentIndex++;
    updateCarousel();
  }
});

prevButton.addEventListener('click', () => {
  if(currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

// Ajustar carrusel al redimensionar
window.addEventListener('resize', updateCarousel);
