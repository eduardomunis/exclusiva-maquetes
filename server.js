const express = require("express");
const bodyParser = require("body-parser");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/enviar-email", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res
      .status(400)
      .json({ sucesso: false, erro: "Campos obrigatórios não preenchidos" });
  }

  try {
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.EMAIL_DESTINO,
      subject: "Mensagem do site",
      text: `${mensagem}\n\nNome: ${nome}\nEmail: ${email}`,
      reply_to: email,
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
