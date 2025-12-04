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

// Escalação
export const createEscalacaoSchema = z.object({
  jogadorId: z.number(),
  partidaId: z.number(),
  timeId: z.number(),
});

export const updateEscalacaoSchema = z.object({
  jogadorId: z.number().optional(),
  partidaId: z.number().optional(),
  timeId: z.number().optional(),
});

// Partida
export const createPartidaSchema = z.object({
  data: z.coerce.date(),
  local: z.string().min(1),
  mandanteId: z.number(),
  visitanteId: z.number(),
});

export const updatePartidaSchema = z.object({
  data: z.coerce.date().optional(),
  local: z.string().min(1).optional(),
  mandanteId: z.number().optional(),
  visitanteId: z.number().optional(),
});

// Time
export const createTimeSchema = z.object({
  nome: z.string().min(1),
  fundacao: z.coerce.date().optional(),
});

export const updateTimeSchema = z.object({
  nome: z.string().min(1).optional(),
  fundacao: z.coerce.date().optional(),
});

// Types exported for services
export type CreateEscalacaoData = z.infer<typeof createEscalacaoSchema>;
export type UpdateEscalacaoData = z.infer<typeof updateEscalacaoSchema>;

export type CreatePartidaData = z.infer<typeof createPartidaSchema>;
export type UpdatePartidaData = z.infer<typeof updatePartidaSchema>;

export type CreateTimeData = z.infer<typeof createTimeSchema>;
export type UpdateTimeData = z.infer<typeof updateTimeSchema>;