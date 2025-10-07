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
// SERVIÇO: Contém a lógica de negócio para operações com Times
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // Cria um novo time no banco de dados
        return prisma_1.default.time.create({ data });
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        // Busca todos os times do banco
        return prisma_1.default.time.findMany();
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        // Busca um time específico pelo ID
        return prisma_1.default.time.findUnique({ where: { id } });
    });
}
function update(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        // Atualiza um time existente
        return prisma_1.default.time.update({
            where: { id }, // Identifica o time pelo ID
            data, // Dados que serão atualizados
        });
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        // Remove um time do banco
        return prisma_1.default.time.delete({ where: { id } });
    });
}
