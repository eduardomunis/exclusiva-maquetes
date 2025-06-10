const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/enviar-email", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res
      .status(400)
      .json({ sucesso: false, erro: "Campos obrigatórios não preenchidos" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "eduardomunis10@gmail.com",
      pass: "neqeimlptaophchr",
    },
  });

  try {
    await transporter.sendMail({
      from: `"${nome}" <${email}>`,
      to: process.env.EMAIL_DESTINO,
      subject: "Mensagem do site",
      text: mensagem,
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
