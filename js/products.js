const container = document.querySelector('.cards-container');
let allProducts = [];


// Cargar productos desde JSON y LocalStorage
fetch('utils/data/data.json')
  .then(res => res.json())
  .then(products => {
    const custom = JSON.parse(localStorage.getItem("customProducts")) || [];
    allProducts = [...products, ...custom];
    renderProductList(allProducts);
  });


// Función para renderizar tarjetas
function renderProductList(productsToRender) {
  container.innerHTML = ''; // Limpiar contenido previo


  if (productsToRender.length === 0) {
    container.innerHTML = '<p>No se encontraron productos.</p>';
    return;
  }


  productsToRender.forEach(product => {
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
}


// Escuchar clics en los botones de "Agregar al carrito"
container.addEventListener('click', e => {
  if (e.target.matches('button[data-id]')) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    addToCart(productId);
  }
});


// Función para agregar producto al carrito
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


// Actualizar número del carrito
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.getElementById('cart-count-number');
  if (cartCount) cartCount.textContent = cart.length;
}



document.getElementById("search-input").addEventListener("input", e => {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm)
  );


  renderProductList(filtered);
});


document.getElementById('search-toggle').addEventListener('click', (e) => {
  e.preventDefault();
  const inputContainer = document.getElementById('search-container');
  inputContainer.style.display = inputContainer.style.display === 'none' ? 'block' : 'none';
});




setTimeout(updateCartCount, 200);
