<<<<<<< HEAD
import prisma from '../db/prisma';

// Usaremos 'any' por enquanto para evitar mais erros de tipo.
// Depois que a API estiver funcionando, podemos voltar e corrigir os tipos.

export async function search(posicao?: string, subposicao?: string): Promise<any[]> {
  const where: any = {};

  if (posicao) {
    where.posicao = { contains: posicao, mode: 'insensitive' };
  }

  if (subposicao) {
    where.subposicao = { contains: subposicao, mode: 'insensitive' };
  }

  return prisma.jogador.findMany({
    where,
    include: { time: true },
  });
}

export async function create(data: any): Promise<any> {
  return prisma.jogador.create({ data });
}

export async function getAll(): Promise<any[]> {
  return prisma.jogador.findMany({ include: { time: true } });
}

export async function getById(id: number): Promise<any | null> {
  return prisma.jogador.findUnique({
    where: { id },
    include: { time: true },
  });
}

export async function update(id: number, data: any): Promise<any> {
  return prisma.jogador.update({ where: { id }, data });
}

export async function remove(id: number): Promise<any> {
  return prisma.jogador.delete({ where: { id } });
}
=======
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

export async function getEstatisticas(id: number) {
  // Verifica se o jogador existe
  const jogador = await prisma.jogador.findUnique({
    where: { id },
  });

  if (!jogador) return null;

  // Busca as escalações do jogador, com a partida incluída
  const escalacoes = await prisma.escalacao.findMany({
    where: { jogadorId: id },
    include: { partida: true },
  });

  const totalPartidas = escalacoes.length;

  // Como não existe campo "titular", deixamos nulo ou zero
  const partidasTitular = null;
  const partidasReserva = null;

  // Contar quantos times diferentes o jogador já representou
  const timesDiferentes = new Set(escalacoes.map((e) => e.timeId)).size;

  // Datas das partidas
  const datas = escalacoes
    .map((e) => e.partida.data)
    .sort((a, b) => a.getTime() - b.getTime());

  const primeiraPartida = datas[0] || null;
  const ultimaPartida = datas[datas.length - 1] || null;

  return {
    jogadorId: id,
    nome: jogador.nome,
    totalPartidas,
    partidasTitular,
    partidasReserva,
    timesDiferentes,
    primeiraPartida,
    ultimaPartida,
  };
}

export async function buscarPorNome(nome: string) {
  return prisma.jogador.findMany({
    where: {
      nome: {
        contains: nome,
        mode: "insensitive", // não diferencia maiúsculas/minúsculas
      },
    },
    include: {
      time: true, // opcional - se quiser retornar info do time também
    },
  });
}
>>>>>>> Parte-Milena
