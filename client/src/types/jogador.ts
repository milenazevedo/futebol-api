export interface Jogador {
  id: number;
  nome: string;
  posicao: string;
  subposicao?: string;
  numero: number;
  timeId: number;
  time?: {
    id: number;
    nome: string;
  };
}
