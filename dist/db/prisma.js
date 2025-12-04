"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
// Carrega variáveis de ambiente aqui também para garantir que, mesmo que
// algum módulo importe o Prisma antes de `src/index.ts`, o .env seja lido.
dotenv_1.default.config();
// Verifica se a variável de ambiente DATABASE_URL está disponível
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    // Lance um erro claro para que o erro seja legível no log do servidor
    throw new Error("Environment variable DATABASE_URL is not set. Create a .env file or set DATABASE_URL in your environment.");
}
// Cria uma única instância do Prisma Client para toda a aplicação
// Isso é importante para evitar múltiplas conexões com o banco
const prisma = new client_1.PrismaClient();
// Exporta a instância do Prisma para ser usada em outros arquivos
exports.default = prisma;
