import { carouselImages } from './carousel/images.js';
import { trainingCards } from './training/trainingCards.js';


// Carousel DOM
const track = document.querySelector('.carousel__track');
const nav = document.querySelector('.carousel__nav');


track.innerHTML = '';
nav.innerHTML = '';


carouselImages.forEach((src, index) => {
  const li = document.createElement('li');
  li.className = 'carousel__slide';
  if (index === 0) li.classList.add('current-slide');
  li.innerHTML = `<img src="${src}" alt="">`;
  track.appendChild(li);


  const btn = document.createElement('button');
  btn.className = 'carousel__indicator';
  if (index === 0) btn.classList.add('current-slide');
  nav.appendChild(btn);
});


// Training Cards
const container = document.querySelector('.cards-container');
container.innerHTML = '';


trainingCards.forEach(card => {
  const article = document.createElement('article');
  article.classList.add('card');
  article.innerHTML = `
    <img src="${card.image}" alt="${card.alt}" />
    <h3>${card.title}</h3>
    <p>${card.description}</p>
  `;
  container.appendChild(article);
});
