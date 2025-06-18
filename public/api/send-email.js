const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ sucesso: false, erro: "Método não permitido" });
  }

  const { nome, email, mensagem } = req.body || {};

  if (!nome || !email || !mensagem) {
    return res
      .status(400)
      .json({ sucesso: false, erro: "Campos obrigatórios não preenchidos" });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 587,
    secure: false,
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
    res.status(500).json({ sucesso: false, erro: error.message });
  }
};
