<<<<<<< HEAD
import { z } from 'zod';

export const idParamSchema = z.object({
  id: z.coerce.number(),
});

export const createJogadorSchema = z.object({
  nome: z.string().min(1),
  posicao: z.string().min(1),
  subposicao: z.string().optional(),
  numero: z.number(),
  timeId: z.number(),
});

export const updateJogadorSchema = z.object({
  nome: z.string().min(1).optional(),
  posicao: z.string().min(1).optional(),
  subposicao: z.string().optional(),
  numero: z.number().optional(),
  timeId: z.number().optional(),
});

export const searchJogadorSchema = z.object({
  posicao: z.string().optional(),
  subposicao: z.string().optional(),
});
=======
import { z } from "zod";

// ESQUEMA DE VALIDAÇÃO PARA TIME
export const createTimeSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres") // Validação de tamanho mínimo
    .max(100, "Nome deve ter no máximo 100 caracteres"), // Validação de tamanho máximo
  fundacao: z.coerce.date().optional(), // Data opcional que será convertida para Date
});

// Esquema para atualização (todos os campos são opcionais)
export const updateTimeSchema = createTimeSchema.partial();

// ESQUEMA DE VALIDAÇÃO PARA JOGADOR
export const createJogadorSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome do jogador é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  posicao: z
    .string()
    .min(2, "Posição é obrigatória")
    .max(50, "Posição deve ter no máximo 50 caracteres"),
  numero: z.coerce.number().int().positive("Número deve ser positivo"), // Número inteiro positivo
  timeId: z.coerce.number().int().positive("ID do time deve ser positivo"), // ID válido
});

export const updateJogadorSchema = createJogadorSchema.partial();

// ESQUEMA DE VALIDAÇÃO PARA PARTIDA
export const createPartidaSchema = z.object({
  data: z.coerce.date(), // Converte string para Date
  local: z
    .string()
    .min(2, "Local é obrigatório")
    .max(200, "Local deve ter no máximo 200 caracteres"),
  mandanteId: z.coerce.number().int().positive("ID do mandante deve ser positivo"),
  visitanteId: z.coerce.number().int().positive("ID do visitante deve ser positivo"),
});

export const updatePartidaSchema = createPartidaSchema.partial();

// ESQUEMA DE VALIDAÇÃO PARA ESCALAÇÃO
export const createEscalacaoSchema = z.object({
  jogadorId: z.coerce.number().int().positive("ID do jogador deve ser positivo"),
  partidaId: z.coerce.number().int().positive("ID da partida deve ser positivo"),
  timeId: z.coerce.number().int().positive("ID do time deve ser positivo"),
});

export const updateEscalacaoSchema = createEscalacaoSchema.partial();

// ESQUEMA PARA VALIDAÇÃO DE ID NOS PARÂMETROS DA URL
export const idParamSchema = z.object({
  id: z.coerce.number()
    .int("ID deve ser um número inteiro")
    .positive("ID deve ser positivo"),
});

// TIPOS TypeScript inferidos dos schemas Zod (para usar no código)
export type CreateTimeData = z.infer<typeof createTimeSchema>;
export type UpdateTimeData = z.infer<typeof updateTimeSchema>;

export type CreateJogadorData = z.infer<typeof createJogadorSchema>;
export type UpdateJogadorData = z.infer<typeof updateJogadorSchema>;

export type CreatePartidaData = z.infer<typeof createPartidaSchema>;
export type UpdatePartidaData = z.infer<typeof updatePartidaSchema>;

export type CreateEscalacaoData = z.infer<typeof createEscalacaoSchema>;
export type UpdateEscalacaoData = z.infer<typeof updateEscalacaoSchema>;

export type IdParam = z.infer<typeof idParamSchema>;

export const createUserSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),

  email: z
    .string()
    .email("Formato de e-mail inválido")
    .max(150, "E-mail deve ter no máximo 150 caracteres"),

  senha: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(100, "A senha deve ter no máximo 100 caracteres"),
});

export const updateUserSchema = createUserSchema.partial();

// Tipos TypeScript inferidos
export type CreateUserData = z.infer<typeof createUserSchema>;
export type UpdateUserData = z.infer<typeof updateUserSchema>;
>>>>>>> Parte-Milena
