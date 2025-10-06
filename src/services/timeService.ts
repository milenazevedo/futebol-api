import prisma from "../db/prisma";
import { Time } from "@prisma/client";
import { CreateTimeData, UpdateTimeData } from "../schemas/validation";

export async function create(data: CreateTimeData): Promise<Time> {
  return prisma.time.create({ data });
}

export async function getAll(): Promise<Time[]> {
  return prisma.time.findMany();
}

export async function getById(id: number): Promise<Time | null> {
  return prisma.time.findUnique({ where: { id } });
}

export async function update(id: number, data: UpdateTimeData): Promise<Time> {
  return prisma.time.update({
    where: { id },
    data,
  });
}

export async function remove(id: number): Promise<Time> {
  return prisma.time.delete({ where: { id } });
}
