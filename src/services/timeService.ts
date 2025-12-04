<<<<<<< HEAD
import prisma from "../db/prisma";
import { Time } from "@prisma/client";
import { CreateTimeData, UpdateTimeData } from "../schemas/validation";

// SERVIÇO: Contém a lógica de negócio para operações com Times
export async function create(data: CreateTimeData): Promise<Time> {
  // Cria um novo time no banco de dados
  return prisma.time.create({ data });
}

export async function getAll(): Promise<Time[]> {
  // Busca todos os times do banco
  return prisma.time.findMany();
}

export async function getById(id: number): Promise<Time | null> {
  // Busca um time específico pelo ID
  return prisma.time.findUnique({ where: { id } });
}

export async function update(id: number, data: UpdateTimeData): Promise<Time> {
  // Atualiza um time existente
  return prisma.time.update({
    where: { id }, // Identifica o time pelo ID
    data,         // Dados que serão atualizados
  });
}

export async function remove(id: number): Promise<Time> {
  // Remove um time do banco
  return prisma.time.delete({ where: { id } });
}
=======
import prisma from "../db/prisma";
import { Time } from "@prisma/client";
import { CreateTimeData, UpdateTimeData } from "../schemas/validation";

// SERVIÇO: Contém a lógica de negócio para operações com Times
export async function create(data: CreateTimeData): Promise<Time> {
  // Cria um novo time no banco de dados
  return prisma.time.create({ data });
}

export async function getAll(): Promise<Time[]> {
  // Busca todos os times do banco
  return prisma.time.findMany();
}

export async function getById(id: number): Promise<Time | null> {
  // Busca um time específico pelo ID
  return prisma.time.findUnique({ where: { id } });
}

export async function update(id: number, data: UpdateTimeData): Promise<Time> {
  // Atualiza um time existente
  return prisma.time.update({
    where: { id }, // Identifica o time pelo ID
    data,         // Dados que serão atualizados
  });
}

export async function remove(id: number): Promise<Time> {
  // Remove um time do banco
  return prisma.time.delete({ where: { id } });
}

>>>>>>> Parte-Milena
