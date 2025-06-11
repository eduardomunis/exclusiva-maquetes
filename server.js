const { Resend } = require("resend");
const express = require("express");
<<<<<<< HEAD
=======
const { Resend } = require("resend");
>>>>>>> 473fedc619235492b667bab6b2255865381c37b6
const bodyParser = require("body-parser");

const app = express();
const resend = new Resend("SUA_API_KEY_AQUI");

app.use(bodyParser.json());
app.use(express.static("public"));

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/enviar-email", async (req, res) => {
  const { nome, email, mensagem } = req.body;

<<<<<<< HEAD
  try {
    const data = await resend.emails.send({
      from: "contato@seudominio.com", // ou use domínio do resend
      to: "emaildestino@empresa.com",
      subject: "Mensagem do site",
      text: `Nome: ${nome}\nEmail: ${email}\nMensagem:\n${mensagem}`,
=======
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
>>>>>>> 473fedc619235492b667bab6b2255865381c37b6
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
