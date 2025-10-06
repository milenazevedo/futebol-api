import { Request, Response } from "express";
import * as jogadorService from "../services/jogadorService";
import {
  createJogadorSchema,
  updateJogadorSchema,
  idParamSchema,
} from "../schemas/validation";

export const createJogador = async (req: Request, res: Response) => {
  try {
    const payload = createJogadorSchema.parse(req.body);
    const novo = await jogadorService.create(payload);
    return res.status(201).json(novo);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ errors: error.errors });
    return res.status(500).json({ message: error.message });
  }
};

export const getAllJogadores = async (_req: Request, res: Response) => {
  try {
    const lista = await jogadorService.getAll();
    return res.json(lista);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getJogadorById = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const jogador = await jogadorService.getById(id);
    if (!jogador) return res.status(404).json({ message: "Jogador não encontrado" });
    return res.json(jogador);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ errors: error.errors });
    return res.status(500).json({ message: error.message });
  }
};

export const updateJogador = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const payload = updateJogadorSchema.parse(req.body);
    const atualizado = await jogadorService.update(id, payload);
    return res.json(atualizado);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ errors: error.errors });
    if (error.code === "P2025")
      return res.status(404).json({ message: "Jogador não encontrado" });
    return res.status(500).json({ message: error.message });
  }
};

export const deleteJogador = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    await jogadorService.remove(id);
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Jogador não encontrado" });
    return res.status(500).json({ message: error.message });
  }
};
