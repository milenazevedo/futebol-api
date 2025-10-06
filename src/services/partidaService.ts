import prisma from "../db/prisma";
import { Partida } from "@prisma/client";
import { CreatePartidaData, UpdatePartidaData } from "../schemas/validation";

export async function create(data: CreatePartidaData): Promise<Partida> {
  return prisma.partida.create({ data });
}

export async function getAll(): Promise<Partida[]> {
  return prisma.partida.findMany({
    include: { mandante: true, visitante: true },
  });
}

export async function getById(id: number): Promise<Partida | null> {
  return prisma.partida.findUnique({
    where: { id },
    include: { mandante: true, visitante: true },
  });
}

export async function update(id: number, data: UpdatePartidaData): Promise<Partida> {
  return prisma.partida.update({ where: { id }, data });
}

export async function remove(id: number): Promise<Partida> {
  return prisma.partida.delete({ where: { id } });
}
