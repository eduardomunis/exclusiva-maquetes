const express = require("express");
const path = require("path");
const enviarEmail = require("./api/enviar-email"); // Importe sua função de envio

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para ler JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, "../public")));

// Rota para envio de e-mail (ajuste conforme seu arquivo)
app.post("/api/enviar-email", enviarEmail);

// Rota fallback para SPA (opcional)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
