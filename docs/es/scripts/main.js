// --- MENU RESPONSIVE ---
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}

// --- CAROUSEL ---
const track = document.querySelector(".carousel-track");
const items = document.querySelectorAll(".carousel-item");
const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");

let currentIndex = 0;

function updateCarousel() {
  const width = items[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * width}px)`;
}

if (nextButton) {
  nextButton.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= items.length) {
      currentIndex = 0; // vuelve al inicio
    }
    updateCarousel();
  });
}

if (prevButton) {
  prevButton.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = items.length - 1; // va al último
    }
    updateCarousel();
  });
}

// --- AUTO-SLIDE cada 8s ---
setInterval(() => {
  currentIndex++;
  if (currentIndex >= items.length) {
    currentIndex = 0;
  }
  updateCarousel();
}, 8000);

// --- Ajustar al redimensionar ---
window.addEventListener("resize", updateCarousel);

// Inicializar
updateCarousel();
