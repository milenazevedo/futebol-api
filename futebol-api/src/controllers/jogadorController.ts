import { Request, Response } from "express";
import * as jogadorService from "../services/jogadorService";
import {
  createJogadorSchema,
  updateJogadorSchema,
  idParamSchema,
} from "../schemas/validation";

// CONTROLLER: Lida com as requisições HTTP para Jogadores
export const createJogador = async (req: Request, res: Response) => {
  try {
    // Valida os dados do body usando Zod
    const payload = createJogadorSchema.parse(req.body);
    // Chama o serviço para criar o jogador
    const novo = await jogadorService.create(payload);
    // Retorna resposta 201 (Created) com o jogador criado
    return res.status(201).json(novo);
  } catch (error: any) {
  // Se for erro de validação Zod, retorna 400
  if (error.errors) return res.status(400).json({ erros: error.errors });
  // Outros erros retornam 500
  return res.status(500).json({ mensagem: error.message });
  }
};

export const getAllJogadores = async (_req: Request, res: Response) => {
  try {
    // Busca todos os jogadores
    const lista = await jogadorService.getAll();
    // Retorna a lista de jogadores
    return res.json(lista);
  } catch (error: any) {
    return res.status(500).json({ mensagem: error.message });
  }
};

export const getJogadorById = async (req: Request, res: Response) => {
  try {
    // Valida o ID nos parâmetros da URL
    const { id } = idParamSchema.parse(req.params);
    // Busca o jogador pelo ID
    const jogador = await jogadorService.getById(id);
    
  // Se jogador não foi encontrado, retorna 404
  if (!jogador) return res.status(404).json({ mensagem: "Jogador não encontrado" });
    
    // Retorna o jogador encontrado
    return res.json(jogador);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ erros: error.errors });
    return res.status(500).json({ mensagem: error.message });
  }
};

export const updateJogador = async (req: Request, res: Response) => {
  try {
    // Valida o ID e os dados do body
    const { id } = idParamSchema.parse(req.params);
    const payload = updateJogadorSchema.parse(req.body);
    // Chama o serviço para atualizar
    const atualizado = await jogadorService.update(id, payload);
    return res.json(atualizado);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ erros: error.errors });
    // Erro específico do Prisma quando registro não existe
    if (error.code === "P2025")
      return res.status(404).json({ mensagem: "Jogador não encontrado" });
    return res.status(500).json({ mensagem: error.message });
  }
};

export const deleteJogador = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    // Remove o jogador
    await jogadorService.remove(id);
    // Retorna 204 (No Content) - sucesso sem conteúdo na resposta
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ mensagem: "Jogador não encontrado" });
    return res.status(500).json({ mensagem: error.message });
  }
};