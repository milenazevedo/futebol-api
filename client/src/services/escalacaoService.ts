import axios from "axios";
import { Escalacao } from "../types/escalacao";
import { API_BASE } from "../config/api";

export async function getEscalacoes(): Promise<Escalacao[]> {
  const response = await axios.get<Escalacao[]>(`${API_BASE}/escalacoes`);
  return response.data;
}

export async function createEscalacao(dados: {
  jogadorId: number;
  partidaId: number;
  timeId: number;
}): Promise<Escalacao> {
  const response = await axios.post<Escalacao>(`${API_BASE}/escalacoes`, dados);
  return response.data;
}

export async function updateEscalacao(
  id: number,
  dados: {
    jogadorId: number;
    partidaId: number;
    timeId: number;
  }
): Promise<Escalacao> {
  const response = await axios.put<Escalacao>(`${API_BASE}/escalacoes/${id}`, dados);
  return response.data;
}

export async function deleteEscalacao(id: number): Promise<void> {
  await axios.delete(`${API_BASE}/escalacoes/${id}`);
}
