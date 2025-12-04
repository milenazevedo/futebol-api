import axios from "axios";
import { Partida } from "../types/partida";
import { API_BASE } from "../config/api";

export async function getPartidas(): Promise<Partida[]> {
  const response = await axios.get<Partida[]>(`${API_BASE}/partidas`);
  return response.data;
}

export async function getFuturePartidas(): Promise<Partida[]> {
  const response = await axios.get<Partida[]>(`${API_BASE}/partidas/futuras`);
  return response.data;
}

export async function getPartidaStats(): Promise<any> {
  const response = await axios.get(`${API_BASE}/partidas/stats`);
  return response.data;
}

export async function createPartida(dados: {
  data: string;
  local: string;
  mandanteId: number;
  visitanteId: number;
}): Promise<Partida> {
  const response = await axios.post<Partida>(`${API_BASE}/partidas`, dados);
  return response.data;
}

export async function updatePartida(
  id: number,
  dados: {
    data: string;
    local: string;
    mandanteId: number;
    visitanteId: number;
  }
): Promise<Partida> {
  const response = await axios.put<Partida>(`${API_BASE}/partidas/${id}`, dados);
  return response.data;
}

export async function deletePartida(id: number): Promise<void> {
  await axios.delete(`${API_BASE}/partidas/${id}`);
}
