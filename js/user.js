document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const userType = document.getElementById("userType").value;
  const code = document.getElementById("code").value;

 if (userType === "admin" && code === "1234") {
  localStorage.setItem("userType", userType);
  window.location.href = "/pages/createProduct.html";
} else if (userType === "adminUser" && code === "4321") {
  localStorage.setItem("userType", userType);
  window.location.href = "/cart.html";


  } else {
    alert("Código incorrecto");
  }
});
