<<<<<<< HEAD
import prisma from "../db/prisma";
import { Partida } from "@prisma/client";
import { CreatePartidaData, UpdatePartidaData } from "../schemas/validation";

// SERVIÇO: Contém a lógica de negócio para operações com Partidas
export async function create(data: CreatePartidaData): Promise<Partida> {
  // Cria uma nova partida no banco de dados
  return prisma.partida.create({ data });
}

export async function getAll(): Promise<Partida[]> {
  // Busca todas as partidas incluindo dados dos times mandante e visitante
  return prisma.partida.findMany({
    include: { mandante: true, visitante: true },
  });
}

export async function getById(id: number): Promise<Partida | null> {
  // Busca uma partida específica pelo ID incluindo dados dos times
  return prisma.partida.findUnique({
    where: { id },
    include: { mandante: true, visitante: true },
  });
}

export async function update(id: number, data: UpdatePartidaData): Promise<Partida> {
  // Atualiza uma partida existente
  return prisma.partida.update({ where: { id }, data });
}

export async function remove(id: number): Promise<Partida> {
  // Remove uma partida do banco
  return prisma.partida.delete({ where: { id } });
=======
import prisma from "../db/prisma";
import { Partida } from "@prisma/client";
import { CreatePartidaData, UpdatePartidaData } from "../schemas/validation";

// SERVIÇO: Contém a lógica de negócio para operações com Partidas
export async function create(data: CreatePartidaData): Promise<Partida> {
  // Cria uma nova partida no banco de dados
  return prisma.partida.create({ data });
}

export async function getAll(): Promise<Partida[]> {
  // Busca todas as partidas incluindo dados dos times mandante e visitante
  return prisma.partida.findMany({
    include: { mandante: true, visitante: true },
  });
}

export async function getById(id: number): Promise<Partida | null> {
  // Busca uma partida específica pelo ID incluindo dados dos times
  return prisma.partida.findUnique({
    where: { id },
    include: { mandante: true, visitante: true },
  });
}

export async function update(id: number, data: UpdatePartidaData): Promise<Partida> {
  // Atualiza uma partida existente
  return prisma.partida.update({ where: { id }, data });
}

export async function remove(id: number): Promise<Partida> {
  // Remove uma partida do banco
  return prisma.partida.delete({ where: { id } });
}

export async function getEstatisticasBasicas() {
  const partidas = await prisma.partida.findMany({
    select: {
      id: true,
      data: true,
      local: true,
      mandanteId: true,
      visitanteId: true,
    },
    orderBy: { data: "asc" },
  });

  const totalPartidas = partidas.length;

  const agora = new Date();
  const partidasFuturas = partidas.filter(p => p.data > agora).length;
  const partidasPassadas = totalPartidas - partidasFuturas;

  // times únicos envolvidos (mandantes + visitantes)
  const times = new Set<number>();
  for (const p of partidas) {
    times.add(p.mandanteId);
    times.add(p.visitanteId);
  }
  const totalTimesEnvolvidos = times.size;

  // locais mais usados (top 5)
  const contagemLocais: Record<string, number> = {};
  for (const p of partidas) {
    const k = p.local || "indefinido";
    contagemLocais[k] = (contagemLocais[k] || 0) + 1;
  }
  const locaisMaisUsados = Object.entries(contagemLocais)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([local, quantidade]) => ({ local, quantidade }));

  // distribuição por mês (YYYY-MM)
  const porMes: Record<string, number> = {};
  for (const p of partidas) {
    const d = p.data;
    const chave = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    porMes[chave] = (porMes[chave] || 0) + 1;
  }
  const distribuicaoPorMes = Object.entries(porMes)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([mes, quantidade]) => ({ mes, quantidade }));

  // próximos 3 jogos (apenas datas futuras)
  const proximos3 = partidas
    .filter(p => p.data > agora)
    .slice(0, 3)
    .map(p => ({
      partidaId: p.id,
      data: p.data,
      local: p.local,
      mandanteId: p.mandanteId,
      visitanteId: p.visitanteId,
    }));

  // primeiro e último jogo cadastrados
  const primeiroJogo = partidas[0]?.data ?? null;
  const ultimoJogo = partidas[partidas.length - 1]?.data ?? null;

  // média de partidas por time (considerando presença como mandante ou visitante)
  // cada partida soma 1 para dois times; então "participações" = totalPartidas * 2
  const mediaPartidasPorTime =
    totalTimesEnvolvidos > 0 ? Number(((totalPartidas * 2) / totalTimesEnvolvidos).toFixed(2)) : 0;

  return {
    totalPartidas,
    partidasPassadas,
    partidasFuturas,
    totalTimesEnvolvidos,
    mediaPartidasPorTime,
    locaisMaisUsados,
    distribuicaoPorMes,
    proximos3,
    primeiroJogo,
    ultimoJogo,
  };
}

export async function getProximasPartidas(limit: number = 10) {
  const agora = new Date();

  const partidas = await prisma.partida.findMany({
    where: { data: { gt: agora } },
    orderBy: { data: "asc" },
    take: limit,
    include: {
      mandante: { select: { id: true, nome: true } },
      visitante: { select: { id: true, nome: true } },
    },
  });

  // Resposta “limpa” para o front
  return partidas.map(p => ({
    id: p.id,
    data: p.data,
    local: p.local,
    mandanteId: p.mandanteId,
    mandanteNome: p.mandante.nome,
    visitanteId: p.visitanteId,
    visitanteNome: p.visitante.nome,
  }));
>>>>>>> Parte-Milena
}