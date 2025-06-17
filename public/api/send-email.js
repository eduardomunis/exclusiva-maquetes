import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Método não permitido" });
  }

  const { nome, email, mensagem } = req.body;

  // Configure o transport usando SMTP da Titan
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
      to: process.env.EMAIL_TITAN, // ou outro e-mail que vá receber
      subject: "Nova mensagem do site",
      html: `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong><br>${mensagem}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return res.status(500).json({ error: "Erro ao enviar e-mail" });
  }
}
