// server.js
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static('public'));

// Importar a função de envio de email
const enviarEmail = require('./api/enviar-email.js');

// Rota da API
app.post('/api/enviar-email', enviarEmail);

// Servir arquivos estáticos
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});