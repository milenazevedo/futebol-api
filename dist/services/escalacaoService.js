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
// SERVIÇO: Contém a lógica de negócio para operações com Escalações
async function create(data) {
    // Cria uma nova escalação no banco de dados
    return prisma_1.default.escalacao.create({ data });
}
async function getAll() {
    // Busca todas as escalações incluindo dados relacionados
    return prisma_1.default.escalacao.findMany({
        include: { jogador: true, partida: true, time: true }, // Inclui todos os relacionamentos
    });
}
async function getById(id) {
    // Busca uma escalação específica pelo ID incluindo todos os relacionamentos
    return prisma_1.default.escalacao.findUnique({
        where: { id },
        include: { jogador: true, partida: true, time: true },
    });
}
async function update(id, data) {
    // Atualiza uma escalação existente
    return prisma_1.default.escalacao.update({ where: { id }, data });
}
async function remove(id) {
    // Remove uma escalação do banco
    return prisma_1.default.escalacao.delete({ where: { id } });
}
