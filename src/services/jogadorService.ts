import prisma from "../db/prisma";
import { Jogador } from "@prisma/client";
import { CreateJogadorData, UpdateJogadorData } from "../schemas/validation";

export async function create(data: CreateJogadorData): Promise<Jogador> {
  return prisma.jogador.create({ data });
}

export async function getAll(): Promise<Jogador[]> {
  return prisma.jogador.findMany({ include: { time: true } });
}

export async function getById(id: number): Promise<Jogador | null> {
  return prisma.jogador.findUnique({
    where: { id },
    include: { time: true },
  });
}

export async function update(id: number, data: UpdateJogadorData): Promise<Jogador> {
  return prisma.jogador.update({ where: { id }, data });
}

export async function remove(id: number): Promise<Jogador> {
  return prisma.jogador.delete({ where: { id } });
}
