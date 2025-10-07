import prisma from "../db/prisma";
import { Jogador } from "@prisma/client";
import { CreateJogadorData, UpdateJogadorData } from "../schemas/validation";

// SERVIÇO: Contém a lógica de negócio para operações com Jogadores
export async function create(data: CreateJogadorData): Promise<Jogador> {
  // Cria um novo jogador no banco de dados
  return prisma.jogador.create({ data });
}

export async function getAll(): Promise<Jogador[]> {
  // Busca todos os jogadores incluindo os dados do time relacionado
  return prisma.jogador.findMany({ include: { time: true } });
}

export async function getById(id: number): Promise<Jogador | null> {
  // Busca um jogador específico pelo ID incluindo os dados do time
  return prisma.jogador.findUnique({
    where: { id },
    include: { time: true }, // Inclui dados do time na resposta
  });
}

export async function update(id: number, data: UpdateJogadorData): Promise<Jogador> {
  // Atualiza um jogador existente
  return prisma.jogador.update({ where: { id }, data });
}

export async function remove(id: number): Promise<Jogador> {
  // Remove um jogador do banco
  return prisma.jogador.delete({ where: { id } });
}