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

try {
  const resposta = await fetch("/enviar-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  const contentType = resposta.headers.get("Content-Type");
  if (!contentType || !contentType.includes("application/json")) {
    const texto = await resposta.text();
    throw new Error("Resposta inesperada: " + texto);
  }

  const resultado = await resposta.json();

  if (resultado.sucesso) {
    alert("Mensagem enviada com sucesso!");
    this.reset();
  } else {
    alert("Erro ao enviar: " + resultado.erro);
  }
} catch (err) {
  alert("Erro ao enviar: " + err.message);
}
