import axios from "axios";
import { Partida } from "../types/partida";

export async function getPartidas(): Promise<Partida[]> {
  const response = await axios.get<Partida[]>("/api/partidas");
  return response.data;
}

export async function getFuturePartidas(): Promise<Partida[]> {
  const response = await axios.get<Partida[]>("/api/partidas/futuras");
  return response.data;
}

export async function getPartidaStats(): Promise<any> {
  const response = await axios.get("/api/partidas/stats");
  return response.data;
}

export async function createPartida(dados: {
  data: string;
  local: string;
  mandanteId: number;
  visitanteId: number;
}): Promise<Partida> {
  const response = await axios.post<Partida>("/api/partidas", dados);
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
  const response = await axios.put<Partida>(`/api/partidas/${id}`, dados);
  return response.data;
}

export async function deletePartida(id: number): Promise<void> {
  await axios.delete(`/api/partidas/${id}`);
}
