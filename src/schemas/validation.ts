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