// ======================
// Scroll suave para âncoras
// ======================
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



// ======================
// Inicialização do GLightbox
// ======================
const lightbox = GLightbox({
  selector: ".glightbox",
});

// ======================
// Mostrar/Esconder imagens extras da galeria
// ======================
document.getElementById("mostrarMais").addEventListener("click", function () {
  const imagens = document.querySelectorAll(".hidden-img");
  let todasVisiveis = true;

  imagens.forEach(function (el) {
    if (el.style.display === "none" || el.style.display === "") {
      todasVisiveis = false;
    }
  });

  if (todasVisiveis) {
    imagens.forEach(function (el) {
      el.style.display = "none";
    });
    this.textContent = "Mostrar mais";
  } else {
    imagens.forEach(function (el) {
      el.style.display = "block";
    });
    this.textContent = "Mostrar menos";
  }
});

// ======================
// Função para envio
// ======================
const response = await fetch('/api/enviar-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ nome, email, mensagem }),
});

const contentType = response.headers.get("content-type");
if (!contentType || !contentType.includes("application/json")) {
  const textoErro = await response.text();
  console.error('Resposta não é JSON:', textoErro);
  throw new Error('Resposta inválida do servidor');
}

const data = await response.json();