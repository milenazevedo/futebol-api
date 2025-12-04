export interface Partida {
  id: number;
  data: Date | string;
  local: string;
  mandanteId: number;
  visitanteId: number;
  mandante?: {
    id: number;
    nome: string;
  };
  visitante?: {
    id: number;
    nome: string;
  };
}
