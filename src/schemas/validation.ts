import { z } from "zod";

export const createTimeSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  fundacao: z.coerce.date().optional(), 
});

export const updateTimeSchema = createTimeSchema.partial();


export const createJogadorSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome do jogador é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  posicao: z
    .string()
    .min(2, "Posição é obrigatória")
    .max(50, "Posição deve ter no máximo 50 caracteres"),
  numero: z.coerce.number().int().positive("Número deve ser positivo"),
  timeId: z.coerce.number().int().positive("ID do time deve ser positivo"),
});

export const updateJogadorSchema = createJogadorSchema.partial();

export const createPartidaSchema = z.object({
  data: z.coerce.date(), // ✅ já vira Date
  local: z
    .string()
    .min(2, "Local é obrigatório")
    .max(200, "Local deve ter no máximo 200 caracteres"),
  mandanteId: z.coerce.number().int().positive("ID do mandante deve ser positivo"),
  visitanteId: z.coerce.number().int().positive("ID do visitante deve ser positivo"),
});

export const updatePartidaSchema = createPartidaSchema.partial();

export const createEscalacaoSchema = z.object({
  jogadorId: z.coerce.number().int().positive("ID do jogador deve ser positivo"),
  partidaId: z.coerce.number().int().positive("ID da partida deve ser positivo"),
  timeId: z.coerce.number().int().positive("ID do time deve ser positivo"),
});

export const updateEscalacaoSchema = createEscalacaoSchema.partial();


export const idParamSchema = z.object({
  id: z.coerce.number()
    .int("ID deve ser um número inteiro")
    .positive("ID deve ser positivo"),
});


export type CreateTimeData = z.infer<typeof createTimeSchema>;
export type UpdateTimeData = z.infer<typeof updateTimeSchema>;

export type CreateJogadorData = z.infer<typeof createJogadorSchema>;
export type UpdateJogadorData = z.infer<typeof updateJogadorSchema>;

export type CreatePartidaData = z.infer<typeof createPartidaSchema>;
export type UpdatePartidaData = z.infer<typeof updatePartidaSchema>;

export type CreateEscalacaoData = z.infer<typeof createEscalacaoSchema>;
export type UpdateEscalacaoData = z.infer<typeof updateEscalacaoSchema>;

export type IdParam = z.infer<typeof idParamSchema>;
