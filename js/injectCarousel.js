const carouselContainer = document.getElementById("carouselContainer");

if (carouselContainer) {
  fetch('/partials/carousel.html')
    .then(res => res.text())
    .then(html => {
      carouselContainer.innerHTML = html;

      
      setTimeout(() => {
        const script = document.createElement('script');
        script.src = '/js/carousel.js';
        document.body.appendChild(script);
      }, 100); 
    });
}
