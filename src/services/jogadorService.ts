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