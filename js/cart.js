// js/cart.js

const userType = localStorage.getItem("userType");
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.querySelector(".cart-container");

// ✅ Mostrar contador también en carrito.html
const countEl = document.getElementById("count");
if (countEl) countEl.textContent = cart.length;

// ✅ Si no hay usuario o carrito vacío, redirigimos
if (!userType || cart.length === 0) {
  Swal.fire({
    title: "¡Bienvenida!",
    text: "Parece que es tu primera vez aquí. Por favor iniciá sesión antes de continuar.",
    icon: "info",
    confirmButtonText: "Iniciar sesión",
    allowOutsideClick: false
  }).then(() => {
    window.location.href = "/pages/user.html";
  });
} else {
  // ✅ Mostrar productos del carrito
  fetch("/utils/data/data.json")
    .then((res) => res.json())
    .then((products) => {
      const selectedProducts = products.filter((p) => cart.includes(p.id));

      if (selectedProducts.length === 0) {
        cartContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
        return;
      }

      let total = 0;

      selectedProducts.forEach((product, i) => {
        const item = document.createElement("div");
        item.classList.add("cart-item");
        item.innerHTML = `
          <h3>${product.title}</h3>
          <img src="/${product.image}" alt="${product.alt}" width="120" />
          <p>${product.description}</p>
          <p class="price">Precio: $${product.price.toFixed(2)}</p>
          <button class="btn-rounded" onclick="removeItem(${i})">Eliminar</button>
          <hr />
        `;
        cartContainer.appendChild(item);
        total += product.price;
      });

      const totalEl = document.createElement("p");
      totalEl.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
      cartContainer.appendChild(totalEl);

      const checkoutBtn = document.createElement("button");
      checkoutBtn.textContent = "Finalizar compra";
      checkoutBtn.classList.add("btn-rounded");

      checkoutBtn.onclick = () => {
        Swal.fire({
          title: "¡Gracias por tu compra!",
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          localStorage.removeItem("cart");
          location.reload();
        });
      };

      cartContainer.appendChild(checkoutBtn);
    });
}

// ✅ Función para eliminar productos
window.removeItem = function (index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
};
