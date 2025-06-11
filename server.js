const express = require("express");
const { Resend } = require("resend");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/enviar-email", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res
      .status(400)
      .json({ sucesso: false, erro: "Campos obrigatórios não preenchidos" });
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.EMAIL_DESTINO,
      subject: "Mensagem do site",
      text: `${mensagem}\n\nNome: ${nome}\nEmail: ${email}`,
      reply_to: email,
    });

    return res.status(200).json({ sucesso: true });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return res
      .status(500)
      .json({ sucesso: false, erro: "Falha no envio do e-mail" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
