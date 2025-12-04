import axios from "axios";
import type { Jogador } from "../types/jogador";
import { API_BASE } from "../config/api";

export const getJogadores = async (): Promise<Jogador[]> => {
  const res = await axios.get<Jogador[]>(`${API_BASE}/jogadores`);
  return res.data;
};

export const searchJogadores = async (nome: string): Promise<Jogador[]> => {
  const res = await axios.get<Jogador[]>(`${API_BASE}/jogadores/buscar/nome`, {
    params: { nome },
  });
  return res.data;
};

export const getJogadorStats = async (id: number): Promise<any> => {
  const res = await axios.get(`${API_BASE}/jogadores/stats/${id}`);
  return res.data;
};

export const createJogador = async (
  dados: Omit<Jogador, "id">
): Promise<Jogador> => {
  const res = await axios.post<Jogador>(`${API_BASE}/jogadores`, dados);
  return res.data;
};

export const deleteJogador = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/jogadores/${id}`);
};

export const updateJogador = async (
  id: number,
  dados: Jogador
): Promise<Jogador> => {
  const res = await axios.put<Jogador>(`${API_BASE}/jogadores/${id}`, dados);
  return res.data;
};

export default {
  getJogadores,
  searchJogadores,
  getJogadorStats,
  createJogador,
  deleteJogador,
  updateJogador,
};
