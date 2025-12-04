export interface Escalacao {
  id: number;
  jogadorId: number;
  partidaId: number;
  timeId: number;
  jogador?: {
    id: number;
    nome: string;
    posicao: string;
    numero: number;
  };
  partida?: {
    id: number;
    data: string;
    local: string;
  };
  time?: {
    id: number;
    nome: string;
  };
}
