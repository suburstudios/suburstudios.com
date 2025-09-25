const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

let currentIndex = 0;
let itemWidth;

// Clonar items para loop infinito
items.forEach(item => {
  const cloneFirst = item.cloneNode(true);
  const cloneLast = item.cloneNode(true);
  track.appendChild(cloneFirst);
  track.insertBefore(cloneLast, track.firstChild);
});

// Actualizar items y ancho
let allItems = Array.from(track.children);
function updateItemWidth() {
  itemWidth = allItems[0].getBoundingClientRect().width + 16; // gap
  track.style.transform = `translateX(-${itemWidth * (currentIndex + items.length)}px)`;
}
updateItemWidth();

// Mover carrusel
function moveCarousel(direction) {
  currentIndex += direction;
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(-${itemWidth * (currentIndex + items.length)}px)`;
  
  // Loop infinito
  track.addEventListener('transitionend', () => {
    if(currentIndex >= items.length) {
      currentIndex = 0;
      track.style.transition = 'none';
      track.style.transform = `translateX(-${itemWidth * (currentIndex + items.length)}px)`;
    }
    if(currentIndex < 0) {
      currentIndex = items.length - 1;
      track.style.transition = 'none';
      track.style.transform = `translateX(-${itemWidth * (currentIndex + items.length)}px)`;
    }
  }, { once: true });
}

// Botones
nextButton.addEventListener('click', () => moveCarousel(1));
prevButton.addEventListener('click', () => moveCarousel(-1));

// Responsive
window.addEventListener('resize', () => updateItemWidth());
