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

document.addEventListener("DOMContentLoaded", function () {
  const btnMostrarMais = document.getElementById("mostrarMais");
  const imagensOcultas = document.querySelectorAll(".hidden-img");

  let mostrando = false;

  if (btnMostrarMais && imagensOcultas.length > 0) {
    btnMostrarMais.addEventListener("click", function () {
      mostrando = !mostrando;
      imagensOcultas.forEach(function (img) {
        img.style.display = mostrando ? "block" : "none";
      });
      btnMostrarMais.textContent = mostrando ? "Mostrar menos" : "Mostrar mais";
    });

    // Inicialmente, esconde as imagens
    imagensOcultas.forEach(function (img) {
      img.style.display = "none";
    });
  }
});
