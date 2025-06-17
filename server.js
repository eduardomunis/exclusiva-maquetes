const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

// Rota para envio de e-mail
app.post("/enviar-email", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res
      .status(400)
      .json({ sucesso: false, erro: "Campos obrigatórios não preenchidos" });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 587,
    secure: false, // true se usar porta 465
    auth: {
      user: process.env.EMAIL_TITAN,
      pass: process.env.EMAIL_TITAN_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${nome}" <${process.env.EMAIL_TITAN}>`,
      to: process.env.EMAIL_DESTINO || process.env.EMAIL_TITAN,
      subject: "Mensagem do site",
      html: `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem}</p>
      `,
      replyTo: email,
    });

    res.status(200).json({ sucesso: true });
  } catch (error) {
    console.error("Erro ao enviar:", error);
    res.status(500).json({ sucesso: false, erro: error.message });
  }
});

app.use("/node_modules", express.static(__dirname + "/node_modules"));

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
