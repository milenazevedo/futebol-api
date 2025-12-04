<<<<<<< HEAD
import { Request, Response } from "express";
import * as escalacaoService from "../services/escalacaoService";
import {
  createEscalacaoSchema,
  updateEscalacaoSchema,
  idParamSchema,
} from "../schemas/validation";

// CONTROLLER: Lida com as requisições HTTP para Escalações
export const createEscalacao = async (req: Request, res: Response) => {
  try {
    // Valida os dados do body usando Zod
    const payload = createEscalacaoSchema.parse(req.body);
    // Chama o serviço para criar a escalação
    const nova = await escalacaoService.create(payload);
    // Retorna resposta 201 (Created) com a escalação criada
    return res.status(201).json(nova);
  } catch (error: any) {
    // Se for erro de validação Zod, retorna 400
    // Se for erro de validação do Zod, retorna 400 com os detalhes
    if (error.errors) return res.status(400).json({ erros: error.errors });

    // Erro de chave estrangeira do Prisma (IDs inválidos)
    if (error?.code === "P2003")
  return res.status(400).json({ mensagem: "Violação de chave estrangeira", detalhe: error.message });

    // Caso genérico de registro não encontrado (ex.: update/delete em registro inexistente)
    if (error?.code === "P2025")
  return res.status(404).json({ mensagem: "Registro não encontrado", detalhe: error.message });

    // Outros erros retornam 500 com a mensagem original para debug
    return res.status(500).json({ mensagem: error.message });
  }
};

export const getAllEscalacoes = async (_req: Request, res: Response) => {
  try {
    // Busca todas as escalações
    const lista = await escalacaoService.getAll();
    // Retorna a lista de escalações
    return res.json(lista);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEscalacaoById = async (req: Request, res: Response) => {
  try {
    // Valida o ID nos parâmetros da URL
    const { id } = idParamSchema.parse(req.params);
    // Busca a escalação pelo ID
    const escalacao = await escalacaoService.getById(id);
    
    // Se escalação não foi encontrada, retorna 404
    if (!escalacao) return res.status(404).json({ mensagem: "Escalação não encontrada" });
    
    // Retorna a escalação encontrada
    return res.json(escalacao);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ erros: error.errors });
    return res.status(500).json({ mensagem: error.message });
  }
};

export const updateEscalacao = async (req: Request, res: Response) => {
  try {
    // Valida o ID e os dados do body
    const { id } = idParamSchema.parse(req.params);
    const payload = updateEscalacaoSchema.parse(req.body);
    // Chama o serviço para atualizar
    const atualizado = await escalacaoService.update(id, payload);
    return res.json(atualizado);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ erros: error.errors });
    // Erro específico do Prisma quando registro não existe
    if (error.code === "P2025")
      return res.status(404).json({ mensagem: "Escalação não encontrada" });
    return res.status(500).json({ mensagem: error.message });
  }
};

export const deleteEscalacao = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    // Remove a escalação
    await escalacaoService.remove(id);
    // Retorna 204 (No Content) - sucesso sem conteúdo na resposta
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ mensagem: "Escalação não encontrada" });
    return res.status(500).json({ mensagem: error.message });
  }
};
=======
import { Request, Response } from "express";
import * as escalacaoService from "../services/escalacaoService";
import {
  createEscalacaoSchema,
  updateEscalacaoSchema,
  idParamSchema,
} from "../schemas/validation";

// CONTROLLER: Lida com as requisições HTTP para Escalações
export const createEscalacao = async (req: Request, res: Response) => {
  try {
    // Valida os dados do body usando Zod
    const payload = createEscalacaoSchema.parse(req.body);
    // Chama o serviço para criar a escalação
    const nova = await escalacaoService.create(payload);
    // Retorna resposta 201 (Created) com a escalação criada
    return res.status(201).json(nova);
  } catch (error: any) {
    // Se for erro de validação Zod, retorna 400
    // Se for erro de validação do Zod, retorna 400 com os detalhes
    if (error.errors) return res.status(400).json({ erros: error.errors });

    // Erro de chave estrangeira do Prisma (IDs inválidos)
    if (error?.code === "P2003")
  return res.status(400).json({ mensagem: "Violação de chave estrangeira", detalhe: error.message });

    // Caso genérico de registro não encontrado (ex.: update/delete em registro inexistente)
    if (error?.code === "P2025")
  return res.status(404).json({ mensagem: "Registro não encontrado", detalhe: error.message });

    // Outros erros retornam 500 com a mensagem original para debug
    return res.status(500).json({ mensagem: error.message });
  }
};

export const getAllEscalacoes = async (_req: Request, res: Response) => {
  try {
    // Busca todas as escalações
    const lista = await escalacaoService.getAll();
    // Retorna a lista de escalações
    return res.json(lista);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEscalacaoById = async (req: Request, res: Response) => {
  try {
    // Valida o ID nos parâmetros da URL
    const { id } = idParamSchema.parse(req.params);
    // Busca a escalação pelo ID
    const escalacao = await escalacaoService.getById(id);
    
    // Se escalação não foi encontrada, retorna 404
    if (!escalacao) return res.status(404).json({ mensagem: "Escalação não encontrada" });
    
    // Retorna a escalação encontrada
    return res.json(escalacao);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ erros: error.errors });
    return res.status(500).json({ mensagem: error.message });
  }
};

export const updateEscalacao = async (req: Request, res: Response) => {
  try {
    // Valida o ID e os dados do body
    const { id } = idParamSchema.parse(req.params);
    const payload = updateEscalacaoSchema.parse(req.body);
    // Chama o serviço para atualizar
    const atualizado = await escalacaoService.update(id, payload);
    return res.json(atualizado);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ erros: error.errors });
    // Erro específico do Prisma quando registro não existe
    if (error.code === "P2025")
      return res.status(404).json({ mensagem: "Escalação não encontrada" });
    return res.status(500).json({ mensagem: error.message });
  }
};

export const deleteEscalacao = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    // Remove a escalação
    await escalacaoService.remove(id);
    // Retorna 204 (No Content) - sucesso sem conteúdo na resposta
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ mensagem: "Escalação não encontrada" });
    return res.status(500).json({ mensagem: error.message });
  }
};
>>>>>>> Parte-Milena
