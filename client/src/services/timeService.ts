import axios from "axios";
import { Time } from "../types/time";
import { API_BASE } from "../config/api";

export async function getTimes(): Promise<Time[]> {
  const response = await axios.get<Time[]>(`${API_BASE}/times`);
  return response.data;
}

export async function createTime(dados: { nome: string; fundacao: string }): Promise<Time> {
  const response = await axios.post<Time>(`${API_BASE}/times`, dados);
  return response.data;
}

export async function updateTime(
  id: number,
  dados: { nome: string; fundacao: string }
): Promise<Time> {
  const response = await axios.put<Time>(`${API_BASE}/times/${id}`, dados);
  return response.data;
}

export async function deleteTime(id: number): Promise<void> {
  await axios.delete(`${API_BASE}/times/${id}`);
}
