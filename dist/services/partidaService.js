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
// SERVIÇO: Contém a lógica de negócio para operações com Partidas
async function create(data) {
    // Cria uma nova partida no banco de dados
    return prisma_1.default.partida.create({ data });
}
async function getAll() {
    // Busca todas as partidas incluindo dados dos times mandante e visitante
    return prisma_1.default.partida.findMany({
        include: { mandante: true, visitante: true },
    });
}
async function getById(id) {
    // Busca uma partida específica pelo ID incluindo dados dos times
    return prisma_1.default.partida.findUnique({
        where: { id },
        include: { mandante: true, visitante: true },
    });
}
async function update(id, data) {
    // Atualiza uma partida existente
    return prisma_1.default.partida.update({ where: { id }, data });
}
async function remove(id) {
    // Remove uma partida do banco
    return prisma_1.default.partida.delete({ where: { id } });
}
