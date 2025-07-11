const injectPartials = async () => {
  const headerContainer = document.querySelector('header');
  const footerContainer = document.querySelector('footer');


  if (headerContainer) {
    const navbar = await fetch('/partials/navbar.html').then(res => res.text());
    headerContainer.insertAdjacentHTML('beforeend', navbar);


    // 👇 Este bloque va ADENTRO del if (headerContainer)
    setTimeout(() => {
      const userLink = document.querySelector('.nav_link.user-link');


      if (userLink) {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));


        // Cambiar href según sesión
        userLink.setAttribute("href", token ? "/user.html" : "/login.html");


        // Cambiar ícono por saludo si hay usuario
        if (user) {
          userLink.innerHTML = `<span class="username">Hola, ${user.name}</span>`;
        }
      }
    }, 100);
  }


  if (footerContainer) {
    const footer = await fetch('/partials/footer.html').then(res => res.text());
    footerContainer.innerHTML = footer;
  }
};


injectPartials();
