"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTimeSchema = exports.createTimeSchema = exports.updatePartidaSchema = exports.createPartidaSchema = exports.updateEscalacaoSchema = exports.createEscalacaoSchema = exports.searchJogadorSchema = exports.updateJogadorSchema = exports.createJogadorSchema = exports.idParamSchema = void 0;
const zod_1 = require("zod");
exports.idParamSchema = zod_1.z.object({
    id: zod_1.z.coerce.number(),
});
exports.createJogadorSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1),
    posicao: zod_1.z.string().min(1),
    subposicao: zod_1.z.string().optional(),
    numero: zod_1.z.number(),
    timeId: zod_1.z.number(),
});
exports.updateJogadorSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1).optional(),
    posicao: zod_1.z.string().min(1).optional(),
    subposicao: zod_1.z.string().optional(),
    numero: zod_1.z.number().optional(),
    timeId: zod_1.z.number().optional(),
});
exports.searchJogadorSchema = zod_1.z.object({
    posicao: zod_1.z.string().optional(),
    subposicao: zod_1.z.string().optional(),
});
// Escalação
exports.createEscalacaoSchema = zod_1.z.object({
    jogadorId: zod_1.z.number(),
    partidaId: zod_1.z.number(),
    timeId: zod_1.z.number(),
});
exports.updateEscalacaoSchema = zod_1.z.object({
    jogadorId: zod_1.z.number().optional(),
    partidaId: zod_1.z.number().optional(),
    timeId: zod_1.z.number().optional(),
});
// Partida
exports.createPartidaSchema = zod_1.z.object({
    data: zod_1.z.coerce.date(),
    local: zod_1.z.string().min(1),
    mandanteId: zod_1.z.number(),
    visitanteId: zod_1.z.number(),
});
exports.updatePartidaSchema = zod_1.z.object({
    data: zod_1.z.coerce.date().optional(),
    local: zod_1.z.string().min(1).optional(),
    mandanteId: zod_1.z.number().optional(),
    visitanteId: zod_1.z.number().optional(),
});
// Time
exports.createTimeSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1),
    fundacao: zod_1.z.coerce.date().optional(),
});
exports.updateTimeSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1).optional(),
    fundacao: zod_1.z.coerce.date().optional(),
});
