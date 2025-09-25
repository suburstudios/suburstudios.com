// ===== MENU RESPONSIVO =====
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (toggle) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}

// ===== CARRUSEL =====
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-button.prev');
const nextBtn = document.querySelector('.carousel-button.next');
let index = 0;

function updateCarousel() {
  if (!track) return;
  const itemWidth = track.querySelector('.carousel-item').offsetWidth + 16;
  track.style.transform = `translateX(-${index * itemWidth}px)`;
}

if (prevBtn && nextBtn && track) {
  prevBtn.addEventListener('click', () => {
    if (index > 0) index--;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    const items = track.children.length;
    const visibleCount = window.innerWidth > 1100 ? 2 : 1;
    if (index < items - visibleCount) index++;
    updateCarousel();
  });

  window.addEventListener('resize', updateCarousel);
  updateCarousel();
}
