import prisma from "../db/prisma";
import { User } from "@prisma/client";
import { CreateUserData, UpdateUserData } from "../schemas/validation";

// SERVIÇO: Contém a lógica de negócio para operações com Usuários
export async function create(data: CreateUserData): Promise<User> {
  // Cria um novo usuário no banco de dados
  return prisma.user.create({ data });
}

export async function getAll(): Promise<User[]> {
  // Busca todos os usuários cadastrados
  return prisma.user.findMany();
}

export async function getById(id: number): Promise<User | null> {
  // Busca um usuário específico pelo ID
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function update(id: number, data: UpdateUserData): Promise<User> {
  // Atualiza um usuário existente
  return prisma.user.update({
    where: { id },
    data,
  });
}

export async function remove(id: number): Promise<User> {
  // Remove um usuário do banco
  return prisma.user.delete({
    where: { id },
  });
}

export async function getByLogin(email: string, senha: string) {
  return prisma.user.findFirst({
    where: {
      email,
      senha,
    },
    select: {
      id: true,
      nome: true,
      email: true,
      createdAt: true,
    }
  });
}
