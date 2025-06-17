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
document.getElementById('formContato').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nome = e.target.nome.value.trim();
  const email = e.target.email.value.trim();
  const mensagem = e.target.mensagem.value.trim();

  if (!nome || !email || !mensagem) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  try {
    const response = await fetch('/api/enviar-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, email, mensagem }),
    });

    const data = await response.json();

    const resultadoDiv = document.getElementById('resultado');

    if (data.sucesso) {
      resultadoDiv.textContent = 'Mensagem enviada com sucesso!';
      e.target.reset();
    } else {
      resultadoDiv.textContent = 'Erro ao enviar a mensagem: ' + (data.erro || 'Erro desconhecido');
    }
  } catch (error) {
    alert('Erro ao enviar: ' + error.message);
  }
});