const form = document.getElementById("productForm");


form.addEventListener("submit", (e) => {
  e.preventDefault();


  const custom = JSON.parse(localStorage.getItem("customProducts")) || [];
  const nextId = 4 + custom.length + 1;


  const newProduct = {
    id: nextId,
    title: document.getElementById("title").value,
    image: "/images/default.jpg",
    alt: document.getElementById("alt").value || "Entrenamiento personalizado",
    description: document.getElementById("description").value || "Descripción creada por el profesor.",
    price: parseFloat(document.getElementById("price").value) || 0
  };


  custom.push(newProduct);
  localStorage.setItem("customProducts", JSON.stringify(custom));


  Swal.fire({
    title: "Producto agregado",
    icon: "success",
    confirmButtonText: "OK"
  });


  form.reset();
});
