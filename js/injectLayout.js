const injectPartials = async () => {
  const headerContainer = document.querySelector('header');
  const footerContainer = document.querySelector('footer');
  const reviewsContainer = document.getElementById('reviews-placeholder'); 


  if (headerContainer) {
    const navbar = await fetch('/partials/navbar.html').then(res => res.text());
    headerContainer.insertAdjacentHTML('beforeend', navbar);


    setTimeout(() => {
      const userLink = document.querySelector('.nav_link.user-link');
      if (userLink) {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        userLink.setAttribute("href", token ? "/user.html" : "/login.html");
        if (user) {
          userLink.innerHTML = `<span class="username">Hola, ${user.name}</span>`;
        }
      }


      const cartCount = document.getElementById("cart-count-number");
      if (cartCount) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartCount.textContent = cart.length;
      }
    }, 100);
  }


  if (footerContainer) {
    const footer = await fetch('/partials/footer.html').then(res => res.text());
    footerContainer.innerHTML = footer;
  }


  if (reviewsContainer) {
  const reviews = await fetch('/partials/reviews.html').then(res => res.text());
  reviewsContainer.innerHTML = reviews;


  // Esperar un momento para asegurar que el DOM de reviews esté listo
  setTimeout(() => {
    setupReviewCarousel();
  }, 50);
}

};


injectPartials();
