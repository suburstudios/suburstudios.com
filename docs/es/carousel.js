// Selección de elementos
const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

// Definir el ancho de cada item (incluyendo margen)
const itemStyle = getComputedStyle(items[0]);
const itemMargin = parseInt(itemStyle.marginLeft) + parseInt(itemStyle.marginRight);
const itemWidth = items[0].offsetWidth + itemMargin;

// Posicionar cada item
items.forEach((item, index) => {
  item.style.left = `${index * itemWidth}px`;
});

let currentIndex = 0;

// Función para mover el track
function moveToIndex(index) {
  track.style.transform = `translateX(-${index * itemWidth}px)`;
  currentIndex = index;
  checkButtons();
}

// Función para habilitar/deshabilitar botones
function checkButtons() {
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex >= items.length - Math.floor(track.parentElement.offsetWidth / itemWidth);
}

// Eventos de botones
prevButton.addEventListener('click', () => {
  if (currentIndex > 0) moveToIndex(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
  if (currentIndex < items.length - 1) moveToIndex(currentIndex + 1);
});

// Inicializar
checkButtons();

// Opcional: Reajustar al cambiar el tamaño de ventana
window.addEventListener('resize', () => {
  const newItemWidth = items[0].offsetWidth + itemMargin;
  items.forEach((item, index) => {
    item.style.left = `${index * newItemWidth}px`;
  });
  moveToIndex(currentIndex);
});
