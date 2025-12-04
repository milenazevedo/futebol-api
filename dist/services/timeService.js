"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
exports.getAll = getAll;
exports.getById = getById;
exports.update = update;
exports.remove = remove;
const prisma_1 = __importDefault(require("../db/prisma"));
// SERVIÇO: Contém a lógica de negócio para operações com Times
async function create(data) {
    // Cria um novo time no banco de dados
    return prisma_1.default.time.create({ data });
}
async function getAll() {
    // Busca todos os times do banco
    return prisma_1.default.time.findMany();
}
async function getById(id) {
    // Busca um time específico pelo ID
    return prisma_1.default.time.findUnique({ where: { id } });
}
async function update(id, data) {
    // Atualiza um time existente
    return prisma_1.default.time.update({
        where: { id }, // Identifica o time pelo ID
        data, // Dados que serão atualizados
    });
}
async function remove(id) {
    // Remove um time do banco
    return prisma_1.default.time.delete({ where: { id } });
}
