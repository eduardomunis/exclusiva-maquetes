# Exclusiva Maquetes

Projeto institucional para apresentação dos serviços da Exclusiva Maquetes, com formulário de contato integrado ao envio de e-mails via Gmail.

## Estrutura do Projeto

```
exclusiva-maquetes/
├── public/                # Arquivos estáticos (HTML, CSS, JS, imagens e API.)
│   └── index.html
├── src/                   # Arquivos para rodar o localhost:3000
│   ├── api/
│   │   └── enviar-email.js
│   └── server.js
├── .env                   # Variáveis de ambiente (NUNCA versionar)
├── package.json
└── README.md
```

## Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js, Nodemailer
- **Envio de e-mail:** Gmail (SMTP)
- **Gerenciamento de variáveis:** dotenv

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- Conta Gmail com [senha de app](https://support.google.com/accounts/answer/185833?hl=pt-BR) gerada

## Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/exclusiva-maquetes.git
   cd exclusiva-maquetes
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

   ```
   GMAIL_USER=
   GMAIL_PASS=       # Use a senha de app gerada no Google
   EMAIL_DESTINO=
   ```

   > **Atenção:** Use uma senha de app do Google, não sua senha normal.

## Como rodar localmente

1. Inicie o servidor:

   ```sh
   npm start
   ```

2. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Como funciona o envio de e-mail

- O formulário de contato do site faz um POST para `/api/enviar-email`.
- O backend (`src/api/enviar-email.js`) recebe os dados e envia o e-mail usando Nodemailer e Gmail.
- O destinatário do e-mail é o próprio endereço configurado em `GMAIL_USER`.

## Scripts disponíveis

- `npm start` — Inicia o servidor em modo produção.
- `npm run dev` — Inicia o servidor com [nodemon](https://nodemon.io/) para recarregar automaticamente em desenvolvimento.

## Estrutura dos arquivos principais

- `public/index.html` — Página principal do site e formulário de contato.
- `src/server.js` — Servidor Express que serve os arquivos estáticos e a API.
- `src/api/enviar-email.js` — Função responsável pelo envio de e-mails.

## Observações

- Não compartilhe seu arquivo `.env` ou suas credenciais.
- Para produção, considere usar um serviço de e-mail profissional (SendGrid, Mailgun, etc).

## Autor

Eduardo Munis  
[LinkedIn](https://www.linkedin.com/in/eduardomunis/) | [GitHub](https://github.com/eduardomunis)
