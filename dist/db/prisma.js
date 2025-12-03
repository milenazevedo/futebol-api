"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// Cria uma única instância do Prisma Client para toda a aplicação
// Isso é importante para evitar múltiplas conexões com o banco
const prisma = new client_1.PrismaClient();
// Exporta a instância do Prisma para ser usada em outros arquivos
exports.default = prisma;
