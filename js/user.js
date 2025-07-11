document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const userType = document.getElementById("userType").value;
  const code = document.getElementById("code").value;

  if (
    (userType === "admin" && code === "1234") ||
    (userType === "adminUser" && code === "4321")
  ) {
    localStorage.setItem("userType", userType);

    Swal.fire({
      title: "¡Ingreso exitoso!",
      text: "Ahora podés ver tus productos en el carrito.",
      icon: "success",
      confirmButtonText: "Ir al carrito"
    }).then(() => {
      window.location.href = "/pages/cart.html";
    });

  } else {
    Swal.fire({
      title: "Código incorrecto",
      text: "Verificá el código y el tipo de usuario.",
      icon: "error",
      confirmButtonText: "Volver a intentar"
    });
  }
});
