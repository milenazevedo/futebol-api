import prisma from "../db/prisma";
import { Escalacao } from "@prisma/client";
import { CreateEscalacaoData, UpdateEscalacaoData } from "../schemas/validation";

export async function create(data: CreateEscalacaoData): Promise<Escalacao> {
  return prisma.escalacao.create({ data });
}

export async function getAll(): Promise<Escalacao[]> {
  return prisma.escalacao.findMany({
    include: { jogador: true, partida: true, time: true },
  });
}

export async function getById(id: number): Promise<Escalacao | null> {
  return prisma.escalacao.findUnique({
    where: { id },
    include: { jogador: true, partida: true, time: true },
  });
}

export async function update(id: number, data: UpdateEscalacaoData): Promise<Escalacao> {
  return prisma.escalacao.update({ where: { id }, data });
}

export async function remove(id: number): Promise<Escalacao> {
  return prisma.escalacao.delete({ where: { id } });
}
