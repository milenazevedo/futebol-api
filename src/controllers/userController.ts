import { Request, Response } from "express";
import * as userService from "../services/userService";
import {
  createUserSchema,
  updateUserSchema,
  idParamSchema,
} from "../schemas/validation";

// CONTROLLER: Lida com as requisições HTTP para Usuários
export const createUser = async (req: Request, res: Response) => {
  try {
    // Valida os dados do body usando Zod
    const payload = createUserSchema.parse(req.body);
    // Chama o serviço para criar o usuário
    const novo = await userService.create(payload);
    // Retorna resposta 201 (Created) com o usuário criado
    return res.status(201).json(novo);
  } catch (error: any) {
    // Se for erro de validação Zod, retorna 400
    if (error.errors) return res.status(400).json({ erros: error.errors });
    // Outros erros retornam 500
    return res.status(500).json({ mensagem: error.message });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    // Busca todos os usuários
    const lista = await userService.getAll();
    // Retorna a lista de usuários
    return res.json(lista);
  } catch (error: any) {
    return res.status(500).json({ mensagem: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    // Valida o ID nos parâmetros da URL
    const { id } = idParamSchema.parse(req.params);
    // Busca o usuário pelo ID
    const usuario = await userService.getById(id);

    // Se usuário não foi encontrado, retorna 404
    if (!usuario)
      return res.status(404).json({ mensagem: "Usuário não encontrado" });

    // Retorna o usuário encontrado
    return res.json(usuario);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ erros: error.errors });
    return res.status(500).json({ mensagem: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    // Valida o ID e os dados do body
    const { id } = idParamSchema.parse(req.params);
    const payload = updateUserSchema.parse(req.body);

    // Chama o serviço para atualizar
    const atualizado = await userService.update(id, payload);
    return res.json(atualizado);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ erros: error.errors });
    // Erro específico do Prisma quando o registro não existe
    if (error.code === "P2025")
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    return res.status(500).json({ mensagem: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    // Remove o usuário
    await userService.remove(id);
    // Retorna 204 (No Content)
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    return res.status(500).json({ mensagem: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const usuario = await userService.getByLogin(email, senha);

    if (!usuario) {
      return res.status(404).json({ message: "Credenciais inválidas" });
    }

    return res.json({
      success: true,
      message: "Login realizado com sucesso!",
      user: usuario, // já retorna id, nome, email
    });

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};