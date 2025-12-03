"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
// SERVIÇO: Contém a lógica de negócio para operações com Jogadores
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // Cria um novo jogador no banco de dados
        return prisma_1.default.jogador.create({ data });
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        // Busca todos os jogadores incluindo os dados do time relacionado
        return prisma_1.default.jogador.findMany({ include: { time: true } });
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        // Busca um jogador específico pelo ID incluindo os dados do time
        return prisma_1.default.jogador.findUnique({
            where: { id },
            include: { time: true }, // Inclui dados do time na resposta
        });
    });
}
function update(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        // Atualiza um jogador existente
        return prisma_1.default.jogador.update({ where: { id }, data });
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        // Remove um jogador do banco
        return prisma_1.default.jogador.delete({ where: { id } });
    });
}
