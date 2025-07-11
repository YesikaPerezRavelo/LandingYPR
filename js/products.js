const container = document.querySelector('.cards-container');

fetch('utils/data/data.json')
  .then(res => res.json())
  .then(products => {
    products.forEach(product => {
      const card = document.createElement('article');
      card.classList.add('card');

      card.innerHTML = `
        <img src="${product.image}" alt="${product.alt}" />
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button class="btn-rounded" data-id="${product.id}">Agregar al carrito</button>
      `;

      container.appendChild(card);
    });

    // Delegación de eventos para los botones
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
  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = cart.length;
}

setTimeout(updateCartCount, 200);

