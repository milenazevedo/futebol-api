<<<<<<< HEAD
import { Request, Response } from "express";
import * as timeService from "../services/timeService";
import {
  createTimeSchema,
  updateTimeSchema,
  idParamSchema,
} from "../schemas/validation";

// CONTROLLER: Lida com as requisições HTTP para Times
export const createTime = async (req: Request, res: Response) => {
  try {
    // Valida os dados do body usando Zod
    const payload = createTimeSchema.parse(req.body);
    // Chama o serviço para criar o time
    const novo = await timeService.create(payload);
    // Retorna resposta 201 (Created) com o time criado
    return res.status(201).json(novo);
  } catch (error: any) {
  // Se for erro de validação Zod, retorna 400
  if (error.errors) return res.status(400).json({ erros: error.errors });
  // Outros erros retornam 500
  return res.status(500).json({ mensagem: error.message });
  }
};

export const getAllTimes = async (_req: Request, res: Response) => {
  try {
    // Busca todos os times
    const lista = await timeService.getAll();
    // Retorna a lista de times (status 200 padrão)
    return res.json(lista);
  } catch (error: any) {
    return res.status(500).json({ mensagem: error.message });
  }
};

export const getTimeById = async (req: Request, res: Response) => {
  try {
    // Valida o ID nos parâmetros da URL
    const { id } = idParamSchema.parse(req.params);
    // Busca o time pelo ID
    const time = await timeService.getById(id);
    
  // Se time não foi encontrado, retorna 404
  if (!time) return res.status(404).json({ mensagem: "Time não encontrado" });
    
    // Retorna o time encontrado
    return res.json(time);
  } catch (error: any) {
  if (error.errors) return res.status(400).json({ erros: error.errors });
  return res.status(500).json({ mensagem: error.message });
  }
};

export const updateTime = async (req: Request, res: Response) => {
  try {
    // Valida o ID e os dados do body
    const { id } = idParamSchema.parse(req.params);
    const payload = updateTimeSchema.parse(req.body);
    // Chama o serviço para atualizar
    const atualizado = await timeService.update(id, payload);
    return res.json(atualizado);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ erros: error.errors });
    // Erro específico do Prisma quando registro não existe
    if (error.code === "P2025")
      return res.status(404).json({ mensagem: "Time não encontrado" });
    return res.status(500).json({ mensagem: error.message });
  }
};

export const deleteTime = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    // Remove o time
    await timeService.remove(id);
    // Retorna 204 (No Content) - sucesso sem conteúdo na resposta
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ mensagem: "Time não encontrado" });
    return res.status(500).json({ mensagem: error.message });
  }
};
=======
import { Request, Response } from "express";
import * as timeService from "../services/timeService";
import {
  createTimeSchema,
  updateTimeSchema,
  idParamSchema,
} from "../schemas/validation";

// CONTROLLER: Lida com as requisições HTTP para Times
export const createTime = async (req: Request, res: Response) => {
  try {
    // Valida os dados do body usando Zod
    const payload = createTimeSchema.parse(req.body);
    // Chama o serviço para criar o time
    const novo = await timeService.create(payload);
    // Retorna resposta 201 (Created) com o time criado
    return res.status(201).json(novo);
  } catch (error: any) {
  // Se for erro de validação Zod, retorna 400
  if (error.errors) return res.status(400).json({ erros: error.errors });
  // Outros erros retornam 500
  return res.status(500).json({ mensagem: error.message });
  }
};

export const getAllTimes = async (_req: Request, res: Response) => {
  try {
    // Busca todos os times
    const lista = await timeService.getAll();
    // Retorna a lista de times (status 200 padrão)
    return res.json(lista);
  } catch (error: any) {
    return res.status(500).json({ mensagem: error.message });
  }
};

export const getTimeById = async (req: Request, res: Response) => {
  try {
    // Valida o ID nos parâmetros da URL
    const { id } = idParamSchema.parse(req.params);
    // Busca o time pelo ID
    const time = await timeService.getById(id);
    
  // Se time não foi encontrado, retorna 404
  if (!time) return res.status(404).json({ mensagem: "Time não encontrado" });
    
    // Retorna o time encontrado
    return res.json(time);
  } catch (error: any) {
  if (error.errors) return res.status(400).json({ erros: error.errors });
  return res.status(500).json({ mensagem: error.message });
  }
};

export const updateTime = async (req: Request, res: Response) => {
  try {
    // Valida o ID e os dados do body
    const { id } = idParamSchema.parse(req.params);
    const payload = updateTimeSchema.parse(req.body);
    // Chama o serviço para atualizar
    const atualizado = await timeService.update(id, payload);
    return res.json(atualizado);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ erros: error.errors });
    // Erro específico do Prisma quando registro não existe
    if (error.code === "P2025")
      return res.status(404).json({ mensagem: "Time não encontrado" });
    return res.status(500).json({ mensagem: error.message });
  }
};

export const deleteTime = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    // Remove o time
    await timeService.remove(id);
    // Retorna 204 (No Content) - sucesso sem conteúdo na resposta
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ mensagem: "Time não encontrado" });
    return res.status(500).json({ mensagem: error.message });
  }
};
>>>>>>> Parte-Milena
