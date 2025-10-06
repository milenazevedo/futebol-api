import { Request, Response } from "express";
import * as partidaService from "../services/partidaService";
import {
  createPartidaSchema,
  updatePartidaSchema,
  idParamSchema,
} from "../schemas/validation";

export const createPartida = async (req: Request, res: Response) => {
  try {
    const payload = createPartidaSchema.parse(req.body);
    const nova = await partidaService.create(payload);
    return res.status(201).json(nova);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ errors: error.errors });
    return res.status(500).json({ message: error.message });
  }
};

export const getAllPartidas = async (_req: Request, res: Response) => {
  try {
    const lista = await partidaService.getAll();
    return res.json(lista);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPartidaById = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const partida = await partidaService.getById(id);
    if (!partida) return res.status(404).json({ message: "Partida não encontrada" });
    return res.json(partida);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ errors: error.errors });
    return res.status(500).json({ message: error.message });
  }
};

export const updatePartida = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const payload = updatePartidaSchema.parse(req.body);
    const atualizado = await partidaService.update(id, payload);
    return res.json(atualizado);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ errors: error.errors });
    if (error.code === "P2025")
      return res.status(404).json({ message: "Partida não encontrada" });
    return res.status(500).json({ message: error.message });
  }
};

export const deletePartida = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    await partidaService.remove(id);
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Partida não encontrada" });
    return res.status(500).json({ message: error.message });
  }
};
