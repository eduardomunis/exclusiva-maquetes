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

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formContato");
  const resultado = document.getElementById("resultado");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    try {
      const response = await fetch("/api/enviar-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, mensagem }),
      });

      const data = await response.json();

      if (data.sucesso) {
        resultado.innerHTML =
          "<span style='color:green'>Mensagem enviada com sucesso!</span>";
        form.reset();
      } else {
        resultado.innerHTML = `<span style='color:red'>${
          data.erro || "Erro ao enviar."
        }</span>`;
      }
    } catch (err) {
      resultado.innerHTML = "<span style='color:red'>Erro ao enviar.</span>";
    }
  });
});
