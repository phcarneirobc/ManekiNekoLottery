function checkPassword() {
  const password = document.getElementsByName("password")[0].value
  if (password === "UniforADS2023") {
    window.location.href = "public/index.html"
  } else {
    alert("Senha incorreta! Verifique no cartão!")
  }
}
