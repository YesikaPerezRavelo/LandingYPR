const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.carousel__button--left');
const nextButton = document.querySelector('.carousel__button--right');
const nav = document.querySelector('.carousel__nav');
const indicators = Array.from(nav.children);


const slideWidth = slides[0].getBoundingClientRect().width;


const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);


const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};


const updateIndicators = (currentIndicator, targetIndicator) => {
  currentIndicator.classList.remove('current-slide');
  targetIndicator.classList.add('current-slide');
};


// Botón siguiente
nextButton.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling || slides[0];
  const currentIndicator = nav.querySelector('.current-slide');
  const nextIndicator = currentIndicator.nextElementSibling || indicators[0];


  moveToSlide(track, currentSlide, nextSlide);
  updateIndicators(currentIndicator, nextIndicator);
});


// Botón anterior
prevButton.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
  const currentIndicator = nav.querySelector('.current-slide');
  const prevIndicator = currentIndicator.previousElementSibling || indicators[indicators.length - 1];


  moveToSlide(track, currentSlide, prevSlide);
  updateIndicators(currentIndicator, prevIndicator);
});


// Indicadores clickeables (opcional)
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const currentIndicator = nav.querySelector('.current-slide');
    const targetSlide = slides[index];


    moveToSlide(track, currentSlide, targetSlide);
    updateIndicators(currentIndicator, indicator);
  });
});


// Autoplay
setInterval(() => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling || slides[0];
  const currentIndicator = nav.querySelector('.current-slide');
  const nextIndicator = currentIndicator.nextElementSibling || indicators[0];


  moveToSlide(track, currentSlide, nextSlide);
  updateIndicators(currentIndicator, nextIndicator);
}, 5000); // Cambia cada 5 segundos
