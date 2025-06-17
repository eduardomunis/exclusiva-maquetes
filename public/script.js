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
// Simulação de envio de formulário simples
// ======================
const form = document.getElementById("form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
    this.reset();

    // Se quiser usar o envio real com `fetch`, chame aqui:
    // const dados = { nome: 'teste', email: 'exemplo@email.com' }; // Exemplo
    // enviarEmail(dados);
  });
}

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
// Função para envio real com fetch (corrigido com async/await)
// ======================
document.getElementById("formulario").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const body = {
    nome: form.nome.value,
    email: form.email.value,
    mensagem: form.mensagem.value,
  };
  const res = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data.success) {
    alert("Mensagem enviada com sucesso!");
    form.reset();
  } else {
    alert("Erro ao enviar mensagem.");
    console.error(data.error);
  }
});
