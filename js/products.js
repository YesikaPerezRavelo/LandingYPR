const container = document.querySelector('.cards-container');

fetch('utils/data/data.json')
  .then(res => res.json())
  .then(products => {
    // Agregar los personalizados desde localStorage
    const custom = JSON.parse(localStorage.getItem("customProducts")) || [];
    const allProducts = [...products, ...custom];


    allProducts.forEach(product => {
  // Crea el slide
  const slide = document.createElement('div');
  slide.classList.add('swiper-slide');


  // Crea la card dentro del slide
  const card = document.createElement('article');
  card.classList.add('card');


  card.innerHTML = `
    <img src="${product.image}" alt="${product.alt}" />
    <h3>${product.title}</h3>
    <p>${product.description}</p>
    <p class="price">$${product.price.toFixed(2)}</p>
    <button class="btn-rounded" data-id="${product.id}">Agregar al carrito</button>
  `;


  slide.appendChild(card);
  container.appendChild(slide);
});



    container.addEventListener('click', e => {
      if (e.target.matches('button[data-id]')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        addToCart(productId);
      }
    });
  });


function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(id);
  localStorage.setItem('cart', JSON.stringify(cart));

  Swal.fire({
    title: 'Producto agregado',
    icon: 'success',
    timer: 1200,
    showConfirmButton: false
  });

  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.getElementById('cart-count-number');
  if (cartCount) cartCount.textContent = cart.length;
}

// Inicializar Swiper después de renderizar las tarjetas
setTimeout(() => {
  new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}, 300); 



setTimeout(updateCartCount, 200);

