"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const swagger_1 = require("./swagger");
// Carrega variáveis de ambiente do arquivo .env o mais cedo possível
dotenv_1.default.config();
// Cria a aplicação Express
const app = (0, express_1.default)();
// MIDDLEWARE: Habilita parsing de JSON no body das requisições
app.use(express_1.default.json());
// Configura a documentação Swagger
(0, swagger_1.setupSwagger)(app);
// Define que todas as rotas começam com /api
app.use("/api", routes_1.default);
// Middleware de tratamento de erros (deve vir depois das rotas)
app.use((err, req, res, next) => {
    const message = (err === null || err === void 0 ? void 0 : err.message) || "Erro desconhecido";
    console.error("Erro não tratado:", err);
    if ((err === null || err === void 0 ? void 0 : err.code) === "P2025") {
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
