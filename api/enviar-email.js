// IMPORTANTE: Este arquivo substitui completamente qualquer código do Nodemailer
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Responder OPTIONS para preflight CORS
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ sucesso: false, erro: "Método não permitido" });
  }

  const { nome, email, mensagem } = req.body || {};

  // Validação dos campos
  if (!nome || !email || !mensagem) {
    return res.status(400).json({
      sucesso: false,
      erro: "Todos os campos são obrigatórios",
    });
  }

  // Validação simples de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      sucesso: false,
      erro: "Email inválido",
    });
  }

  try {
    console.log("Tentando enviar email para:", process.env.EMAIL_DESTINO);

    const emailRes = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.EMAIL_DESTINO,
      subject: `Nova mensagem de ${nome} - Site Exclusiva Maquetes`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nova mensagem do site</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensagem:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${mensagem.replace(/\n/g, "<br>")}
            </div>
          </div>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Esta mensagem foi enviada através do formulário de contato do site Exclusiva Maquetes.
          </p>
        </div>
      `,
      reply_to: email,
    });

    console.log("Email enviado com sucesso:", emailRes.id);

    return res.status(200).json({
      sucesso: true,
      mensagem: "Email enviado com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao enviar email:", error);

    return res.status(500).json({
      sucesso: false,
      erro: "Erro interno do servidor ao enviar mail",
      detalhes: error.message,
    });
  }
};
