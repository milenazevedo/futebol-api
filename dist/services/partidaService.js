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
// SERVIÇO: Contém a lógica de negócio para operações com Partidas
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // Cria uma nova partida no banco de dados
        return prisma_1.default.partida.create({ data });
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        // Busca todas as partidas incluindo dados dos times mandante e visitante
        return prisma_1.default.partida.findMany({
            include: { mandante: true, visitante: true },
        });
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        // Busca uma partida específica pelo ID incluindo dados dos times
        return prisma_1.default.partida.findUnique({
            where: { id },
            include: { mandante: true, visitante: true },
        });
    });
}
function update(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        // Atualiza uma partida existente
        return prisma_1.default.partida.update({ where: { id }, data });
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        // Remove uma partida do banco
        return prisma_1.default.partida.delete({ where: { id } });
    });
}
