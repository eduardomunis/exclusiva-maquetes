const { Resend } = require("resend");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const resend = new Resend("SUA_API_KEY_AQUI");

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/enviar-email", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  try {
    const data = await resend.emails.send({
      from: "contato@seudominio.com", // ou use domínio do resend
      to: "emaildestino@empresa.com",
      subject: "Mensagem do site",
      text: `Nome: ${nome}\nEmail: ${email}\nMensagem:\n${mensagem}`,
    });

    res.status(200).json({ sucesso: true, data });
  } catch (error) {
    console.error("Erro ao enviar:", error);
    res.status(500).json({ sucesso: false, erro: error.message });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
