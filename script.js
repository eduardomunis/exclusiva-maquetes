import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Scroll suave para âncoras
document.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});

// Simulação de envio de formulário
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Mensagem enviada com sucesso!");
  this.reset();
});
