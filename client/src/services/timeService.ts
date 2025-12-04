import axios from "axios";
import { Time } from "../types/time";

export async function getTimes(): Promise<Time[]> {
  const response = await axios.get<Time[]>("/api/times");
  return response.data;
}

export async function createTime(dados: { nome: string; fundacao: string }): Promise<Time> {
  const response = await axios.post<Time>("/api/times", dados);
  return response.data;
}

export async function updateTime(
  id: number,
  dados: { nome: string; fundacao: string }
): Promise<Time> {
  const response = await axios.put<Time>(`/api/times/${id}`, dados);
  return response.data;
}

export async function deleteTime(id: number): Promise<void> {
  await axios.delete(`/api/times/${id}`);
}
