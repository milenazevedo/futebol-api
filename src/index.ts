// src/index.ts

import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';
import { setupSwagger } from './swagger';

// Carrega variáveis de ambiente do arquivo .env o mais cedo possível
dotenv.config();

// Cria a aplicação Express
const app = express();

// MIDDLEWARE: Habilita parsing de JSON no body das requisições
app.use(express.json());

// Configura a documentação Swagger
setupSwagger(app);

// Define que todas as rotas começam com /api
app.use("/api", routes);

// Middleware de tratamento de erros (deve vir depois das rotas)
app.use((err: any, req: any, res: any, next: any) => {
  const message = err?.message || "Erro desconhecido";
  console.error("Erro não tratado:", err);

  if (err?.code === "P2025") {
    return res.status(404).json({ mensagem: "Registro não encontrado", detalhe: message });
  }

  return res.status(500).json({ mensagem: "Erro interno do servidor", detalhe: message });
});

// Define a porta do servidor (usa variável de ambiente ou padrão 3000)
const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Swagger em http://localhost:${PORT}/docs`);
});