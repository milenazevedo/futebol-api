"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamSchema = exports.updateEscalacaoSchema = exports.createEscalacaoSchema = exports.updatePartidaSchema = exports.createPartidaSchema = exports.updateJogadorSchema = exports.createJogadorSchema = exports.updateTimeSchema = exports.createTimeSchema = void 0;
const zod_1 = require("zod");
// ESQUEMA DE VALIDAÇÃO PARA TIME
exports.createTimeSchema = zod_1.z.object({
    nome: zod_1.z
        .string()
        .min(2, "Nome deve ter pelo menos 2 caracteres") // Validação de tamanho mínimo
        .max(100, "Nome deve ter no máximo 100 caracteres"), // Validação de tamanho máximo
    fundacao: zod_1.z.coerce.date().optional(), // Data opcional que será convertida para Date
});
// Esquema para atualização (todos os campos são opcionais)
exports.updateTimeSchema = exports.createTimeSchema.partial();
// ESQUEMA DE VALIDAÇÃO PARA JOGADOR
exports.createJogadorSchema = zod_1.z.object({
    nome: zod_1.z
        .string()
        .min(2, "Nome do jogador é obrigatório")
        .max(100, "Nome deve ter no máximo 100 caracteres"),
    posicao: zod_1.z
        .string()
        .min(2, "Posição é obrigatória")
        .max(50, "Posição deve ter no máximo 50 caracteres"),
    numero: zod_1.z.coerce.number().int().positive("Número deve ser positivo"), // Número inteiro positivo
    timeId: zod_1.z.coerce.number().int().positive("ID do time deve ser positivo"), // ID válido
});
exports.updateJogadorSchema = exports.createJogadorSchema.partial();
// ESQUEMA DE VALIDAÇÃO PARA PARTIDA
exports.createPartidaSchema = zod_1.z.object({
    data: zod_1.z.coerce.date(), // Converte string para Date
    local: zod_1.z
        .string()
        .min(2, "Local é obrigatório")
        .max(200, "Local deve ter no máximo 200 caracteres"),
    mandanteId: zod_1.z.coerce.number().int().positive("ID do mandante deve ser positivo"),
    visitanteId: zod_1.z.coerce.number().int().positive("ID do visitante deve ser positivo"),
});
exports.updatePartidaSchema = exports.createPartidaSchema.partial();
// ESQUEMA DE VALIDAÇÃO PARA ESCALAÇÃO
exports.createEscalacaoSchema = zod_1.z.object({
    jogadorId: zod_1.z.coerce.number().int().positive("ID do jogador deve ser positivo"),
    partidaId: zod_1.z.coerce.number().int().positive("ID da partida deve ser positivo"),
    timeId: zod_1.z.coerce.number().int().positive("ID do time deve ser positivo"),
});
exports.updateEscalacaoSchema = exports.createEscalacaoSchema.partial();
// ESQUEMA PARA VALIDAÇÃO DE ID NOS PARÂMETROS DA URL
exports.idParamSchema = zod_1.z.object({
    id: zod_1.z.coerce.number()
        .int("ID deve ser um número inteiro")
        .positive("ID deve ser positivo"),
});
