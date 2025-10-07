"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Carrega variáveis de ambiente do arquivo .env o mais cedo possível
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const swagger_1 = require("./swagger");
// Cria a aplicação Express
const app = (0, express_1.default)();
// MIDDLEWARE: Habilita parsing de JSON no body das requisições
app.use(express_1.default.json());
// Configura a documentação Swagger
(0, swagger_1.setupSwagger)(app);
// Define que todas as rotas começam com /api
app.use("/api", routes_1.default);
// Define a porta do servidor (usa variável de ambiente ou padrão 3000)
const PORT = process.env.PORT || 3000;
// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Swagger em http://localhost:${PORT}/docs`);
});
