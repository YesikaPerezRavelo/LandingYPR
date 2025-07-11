document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const userType = document.getElementById("userType").value;
  const code = document.getElementById("code").value;

  if (
    (userType === "admin" && code === "1234") ||
    (userType === "adminUser" && code === "4321")
  ) {
    localStorage.setItem("userType", userType);
    window.location.href = "/user.html"; // redirige a la página de perfil
  } else {
    alert("Código incorrecto");
  }
});
