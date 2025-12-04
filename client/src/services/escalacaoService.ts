import axios from "axios";
import { Escalacao } from "../types/escalacao";

export async function getEscalacoes(): Promise<Escalacao[]> {
  const response = await axios.get<Escalacao[]>("/api/escalacoes");
  return response.data;
}

export async function createEscalacao(dados: {
  jogadorId: number;
  partidaId: number;
  timeId: number;
}): Promise<Escalacao> {
  const response = await axios.post<Escalacao>("/api/escalacoes", dados);
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
  const response = await axios.put<Escalacao>(`/api/escalacoes/${id}`, dados);
  return response.data;
}

export async function deleteEscalacao(id: number): Promise<void> {
  await axios.delete(`/api/escalacoes/${id}`);
}
