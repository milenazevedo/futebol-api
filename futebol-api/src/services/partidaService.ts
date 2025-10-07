import prisma from "../db/prisma";
import { Partida } from "@prisma/client";
import { CreatePartidaData, UpdatePartidaData } from "../schemas/validation";

// SERVIÇO: Contém a lógica de negócio para operações com Partidas
export async function create(data: CreatePartidaData): Promise<Partida> {
  // Cria uma nova partida no banco de dados
  return prisma.partida.create({ data });
}

export async function getAll(): Promise<Partida[]> {
  // Busca todas as partidas incluindo dados dos times mandante e visitante
  return prisma.partida.findMany({
    include: { mandante: true, visitante: true },
  });
}

export async function getById(id: number): Promise<Partida | null> {
  // Busca uma partida específica pelo ID incluindo dados dos times
  return prisma.partida.findUnique({
    where: { id },
    include: { mandante: true, visitante: true },
  });
}

export async function update(id: number, data: UpdatePartidaData): Promise<Partida> {
  // Atualiza uma partida existente
  return prisma.partida.update({ where: { id }, data });
}

export async function remove(id: number): Promise<Partida> {
  // Remove uma partida do banco
  return prisma.partida.delete({ where: { id } });
}