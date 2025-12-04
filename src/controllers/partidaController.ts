<<<<<<< HEAD
import { Request, Response } from "express";
import * as partidaService from "../services/partidaService";
import {
  createPartidaSchema,
  updatePartidaSchema,
  idParamSchema,
} from "../schemas/validation";

// CONTROLLER: Lida com as requisições HTTP para Partidas
export const createPartida = async (req: Request, res: Response) => {
  try {
    // Valida os dados do body usando Zod
    const payload = createPartidaSchema.parse(req.body);
    // Chama o serviço para criar a partida
    const nova = await partidaService.create(payload);
    // Retorna resposta 201 (Created) com a partida criada
    return res.status(201).json(nova);
  } catch (error: any) {
  // Se for erro de validação Zod, retorna 400
  if (error.errors) return res.status(400).json({ erros: error.errors });
  // Outros erros retornam 500
  return res.status(500).json({ mensagem: error.message });
  }
};

export const getAllPartidas = async (_req: Request, res: Response) => {
  try {
    // Busca todas as partidas
    const lista = await partidaService.getAll();
    // Retorna a lista de partidas
    return res.json(lista);
  } catch (error: any) {
    return res.status(500).json({ mensagem: error.message });
  }
};

export const getPartidaById = async (req: Request, res: Response) => {
  try {
    // Valida o ID nos parâmetros da URL
    const { id } = idParamSchema.parse(req.params);
    // Busca a partida pelo ID
    const partida = await partidaService.getById(id);
    
  // Se partida não foi encontrada, retorna 404
  if (!partida) return res.status(404).json({ mensagem: "Partida não encontrada" });
    
    // Retorna a partida encontrada
    return res.json(partida);
  } catch (error: any) {
  if (error.errors) return res.status(400).json({ erros: error.errors });
  return res.status(500).json({ mensagem: error.message });
  }
};

export const updatePartida = async (req: Request, res: Response) => {
  try {
    // Valida o ID e os dados do body
    const { id } = idParamSchema.parse(req.params);
    const payload = updatePartidaSchema.parse(req.body);
    // Chama o serviço para atualizar
    const atualizado = await partidaService.update(id, payload);
    return res.json(atualizado);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ erros: error.errors });
    // Erro específico do Prisma quando registro não existe
    if (error.code === "P2025")
      return res.status(404).json({ mensagem: "Partida não encontrada" });
    return res.status(500).json({ mensagem: error.message });
  }
};

export const deletePartida = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    // Remove a partida
    await partidaService.remove(id);
    // Retorna 204 (No Content) - sucesso sem conteúdo na resposta
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ mensagem: "Partida não encontrada" });
    return res.status(500).json({ mensagem: error.message });
  }
};
=======
import { Request, Response } from "express";
import * as partidaService from "../services/partidaService";
import {
  createPartidaSchema,
  updatePartidaSchema,
  idParamSchema,
} from "../schemas/validation";

// CONTROLLER: Lida com as requisições HTTP para Partidas
export const createPartida = async (req: Request, res: Response) => {
  try {
    // Valida os dados do body usando Zod
    const payload = createPartidaSchema.parse(req.body);
    // Chama o serviço para criar a partida
    const nova = await partidaService.create(payload);
    // Retorna resposta 201 (Created) com a partida criada
    return res.status(201).json(nova);
  } catch (error: any) {
  // Se for erro de validação Zod, retorna 400
  if (error.errors) return res.status(400).json({ erros: error.errors });
  // Outros erros retornam 500
  return res.status(500).json({ mensagem: error.message });
  }
};

export const getAllPartidas = async (_req: Request, res: Response) => {
  try {
    // Busca todas as partidas
    const lista = await partidaService.getAll();
    // Retorna a lista de partidas
    return res.json(lista);
  } catch (error: any) {
    return res.status(500).json({ mensagem: error.message });
  }
};

export const getPartidaById = async (req: Request, res: Response) => {
  try {
    // Valida o ID nos parâmetros da URL
    const { id } = idParamSchema.parse(req.params);
    // Busca a partida pelo ID
    const partida = await partidaService.getById(id);
    
  // Se partida não foi encontrada, retorna 404
  if (!partida) return res.status(404).json({ mensagem: "Partida não encontrada" });
    
    // Retorna a partida encontrada
    return res.json(partida);
  } catch (error: any) {
  if (error.errors) return res.status(400).json({ erros: error.errors });
  return res.status(500).json({ mensagem: error.message });
  }
};

export const updatePartida = async (req: Request, res: Response) => {
  try {
    // Valida o ID e os dados do body
    const { id } = idParamSchema.parse(req.params);
    const payload = updatePartidaSchema.parse(req.body);
    // Chama o serviço para atualizar
    const atualizado = await partidaService.update(id, payload);
    return res.json(atualizado);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ erros: error.errors });
    // Erro específico do Prisma quando registro não existe
    if (error.code === "P2025")
      return res.status(404).json({ mensagem: "Partida não encontrada" });
    return res.status(500).json({ mensagem: error.message });
  }
};

export const deletePartida = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    // Remove a partida
    await partidaService.remove(id);
    // Retorna 204 (No Content) - sucesso sem conteúdo na resposta
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ mensagem: "Partida não encontrada" });
    return res.status(500).json({ mensagem: error.message });
  }
};

export const getEstatisticasBasicas = async (_req: Request, res: Response) => {
  try {
    const dados = await partidaService.getEstatisticasBasicas();
    return res.json(dados);
  } catch (error: any) {
    return res.status(500).json({ mensagem: error.message });
  }
};

export const getProximasPartidas = async (req: Request, res: Response) => {
  try {
    const raw = req.query.limit as string | undefined;
    const limit = raw ? Math.max(1, Math.min(50, Number(raw))) : 10; // 1..50

    const dados = await partidaService.getProximasPartidas(limit);
    return res.json(dados);
  } catch (error: any) {
    return res.status(500).json({ mensagem: error.message });
  }
};
>>>>>>> Parte-Milena
