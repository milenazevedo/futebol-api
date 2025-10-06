import { Request, Response } from "express";
import * as timeService from "../services/timeService";
import {
  createTimeSchema,
  updateTimeSchema,
  idParamSchema,
} from "../schemas/validation";

export const createTime = async (req: Request, res: Response) => {
  try {
    const payload = createTimeSchema.parse(req.body); // valida body
    const novo = await timeService.create(payload);
    return res.status(201).json(novo);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ errors: error.errors });
    return res.status(500).json({ message: error.message });
  }
};

export const getAllTimes = async (_req: Request, res: Response) => {
  try {
    const lista = await timeService.getAll();
    return res.json(lista);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTimeById = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params); // valida params
    const time = await timeService.getById(id);
    if (!time) return res.status(404).json({ message: "Time não encontrado" });
    return res.json(time);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ errors: error.errors });
    return res.status(500).json({ message: error.message });
  }
};

export const updateTime = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    const payload = updateTimeSchema.parse(req.body); // valida body
    const atualizado = await timeService.update(id, payload);
    return res.json(atualizado);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ errors: error.errors });
    if (error.code === "P2025")
      return res.status(404).json({ message: "Time não encontrado" });
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTime = async (req: Request, res: Response) => {
  try {
    const { id } = idParamSchema.parse(req.params);
    await timeService.remove(id);
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Time não encontrado" });
    return res.status(500).json({ message: error.message });
  }
};
