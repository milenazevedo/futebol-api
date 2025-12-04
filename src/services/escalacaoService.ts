<<<<<<< HEAD
import prisma from "../db/prisma";
import { Escalacao } from "@prisma/client";
import { CreateEscalacaoData, UpdateEscalacaoData } from "../schemas/validation";

// SERVIÇO: Contém a lógica de negócio para operações com Escalações
export async function create(data: CreateEscalacaoData): Promise<Escalacao> {
  // Cria uma nova escalação no banco de dados
  return prisma.escalacao.create({ data });
}

export async function getAll(): Promise<Escalacao[]> {
  // Busca todas as escalações incluindo dados relacionados
  return prisma.escalacao.findMany({
    include: { jogador: true, partida: true, time: true }, // Inclui todos os relacionamentos
  });
}

export async function getById(id: number): Promise<Escalacao | null> {
  // Busca uma escalação específica pelo ID incluindo todos os relacionamentos
  return prisma.escalacao.findUnique({
    where: { id },
    include: { jogador: true, partida: true, time: true },
  });
}

export async function update(id: number, data: UpdateEscalacaoData): Promise<Escalacao> {
  // Atualiza uma escalação existente
  return prisma.escalacao.update({ where: { id }, data });
}

export async function remove(id: number): Promise<Escalacao> {
  // Remove uma escalação do banco
  return prisma.escalacao.delete({ where: { id } });
}
=======
import prisma from "../db/prisma";
import { Escalacao } from "@prisma/client";
import { CreateEscalacaoData, UpdateEscalacaoData } from "../schemas/validation";

// SERVIÇO: Contém a lógica de negócio para operações com Escalações
export async function create(data: CreateEscalacaoData): Promise<Escalacao> {
  // Cria uma nova escalação no banco de dados
  return prisma.escalacao.create({ data });
}

export async function getAll(): Promise<Escalacao[]> {
  // Busca todas as escalações incluindo dados relacionados
  return prisma.escalacao.findMany({
    include: { jogador: true, partida: true, time: true }, // Inclui todos os relacionamentos
  });
}

export async function getById(id: number): Promise<Escalacao | null> {
  // Busca uma escalação específica pelo ID incluindo todos os relacionamentos
  return prisma.escalacao.findUnique({
    where: { id },
    include: { jogador: true, partida: true, time: true },
  });
}

export async function update(id: number, data: UpdateEscalacaoData): Promise<Escalacao> {
  // Atualiza uma escalação existente
  return prisma.escalacao.update({ where: { id }, data });
}

export async function remove(id: number): Promise<Escalacao> {
  // Remove uma escalação do banco
  return prisma.escalacao.delete({ where: { id } });
}
>>>>>>> Parte-Milena
