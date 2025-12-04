"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = search;
exports.create = create;
exports.getAll = getAll;
exports.getById = getById;
exports.update = update;
exports.remove = remove;
const prisma_1 = __importDefault(require("../db/prisma"));
// Usaremos 'any' por enquanto para evitar mais erros de tipo.
// Depois que a API estiver funcionando, podemos voltar e corrigir os tipos.
async function search(posicao, subposicao) {
    const where = {};
    if (posicao) {
        where.posicao = { contains: posicao, mode: 'insensitive' };
    }
    if (subposicao) {
        where.subposicao = { contains: subposicao, mode: 'insensitive' };
    }
    return prisma_1.default.jogador.findMany({
        where,
        include: { time: true },
    });
}
async function create(data) {
    return prisma_1.default.jogador.create({ data });
}
async function getAll() {
    return prisma_1.default.jogador.findMany({ include: { time: true } });
}
async function getById(id) {
    return prisma_1.default.jogador.findUnique({
        where: { id },
        include: { time: true },
    });
}
async function update(id, data) {
    return prisma_1.default.jogador.update({ where: { id }, data });
}
async function remove(id) {
    return prisma_1.default.jogador.delete({ where: { id } });
}
