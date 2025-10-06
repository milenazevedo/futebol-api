import { Request, Response } from "express";
import * as escalacaoService from "../services/escalacaoService";
import {
  createEscalacaoSchema,
  updateEscalacaoSchema,
  idParamSchema,
} from "../schemas/validation";

export const createEscalacao = async (req: Request, res: Response) => {
  try {
    const payload = createEscalacaoSchema.parse(req.body);
    const nova = await escalacaoService.create(payload);
    return res.status(201).json(nova);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ errors: error.errors });
    return res.status(500).json({ message: error.message });
  }
};

export const getAllEscalacoes = async (_req: Request, res: Response) => {
  try {
    const lista = await escalacaoService.getAll();
    return res.json(lista);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEscalacaoById = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const escalacao = await escalacaoService.getById(id);
    if (!escalacao) return res.status(404).json({ message: "Escalação não encontrada" });
    return res.json(escalacao);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ errors: error.errors });
    return res.status(500).json({ message: error.message });
  }
};

export const updateEscalacao = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const payload = updateEscalacaoSchema.parse(req.body);
    const atualizado = await escalacaoService.update(id, payload);
    return res.json(atualizado);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ errors: error.errors });
    if (error.code === "P2025")
      return res.status(404).json({ message: "Escalação não encontrada" });
    return res.status(500).json({ message: error.message });
  }
};

export const deleteEscalacao = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    await escalacaoService.remove(id);
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Escalação não encontrada" });
    return res.status(500).json({ message: error.message });
  }
};
