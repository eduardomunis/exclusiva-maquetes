// Scroll suave para âncoras
document.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("href");
    const destino = document.querySelector(id);
    if (destino) {
      destino.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Simulação de envio de formulário
const form = document.getElementById("form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
    this.reset();
  });
}

const lightbox = GLightbox({
  selector: ".glightbox",
});
