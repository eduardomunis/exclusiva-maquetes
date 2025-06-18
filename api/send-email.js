import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ sucesso: false, erro: "Método não permitido" });
  }

  const { nome, email, mensagem } = req.body || {};

  if (!nome || !email || !mensagem) {
    return res
      .status(400)
      .json({ sucesso: false, erro: "Campos obrigatórios não preenchidos." });
  }

  try {
    const emailRes = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.EMAIL_DESTINO,
      subject: `Nova mensagem de ${nome}`,
      html: `
        <h3>Nova mensagem do site</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem.replace(/\n/g, "<br>")}</p>
      `,
      reply_to: email,
    });

    return res.status(200).json({ sucesso: true, data: emailRes });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return res.status(500).json({ sucesso: false, erro: error.message });
  }
}
