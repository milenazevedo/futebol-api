import { prisma } from "../db/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");

  // Limpar dados existentes (opcional - comente se não quiser limpar)
  console.log("🗑️  Limpando dados antigos...");
  await prisma.escalacao.deleteMany();
  await prisma.partida.deleteMany();
  await prisma.jogador.deleteMany();
  await prisma.time.deleteMany();
  await prisma.usuario.deleteMany();

  // Criar usuário administrador
  console.log("👤 Criando usuário admin...");
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.usuario.create({
    data: {
      email: "admin@futebol.com",
      senha: hashedPassword,
      nome: "Administrador",
    },
  });

  // Criar times
  console.log("⚽ Criando times...");
  const time1 = await prisma.time.create({
    data: {
      nome: "Flamengo",
      fundacao: new Date("1895-11-15"),
    },
  });

  const time2 = await prisma.time.create({
    data: {
      nome: "Corinthians",
      fundacao: new Date("1910-09-01"),
    },
  });

  const time3 = await prisma.time.create({
    data: {
      nome: "Palmeiras",
      fundacao: new Date("1914-08-26"),
    },
  });

  // Criar jogadores
  console.log("🏃 Criando jogadores...");
  const jogador1 = await prisma.jogador.create({
    data: {
      nome: "Gabriel Barbosa",
      posicao: "Atacante",
      subposicao: "Centroavante",
      numero: 9,
      timeId: time1.id,
    },
  });

  const jogador2 = await prisma.jogador.create({
    data: {
      nome: "Everton Ribeiro",
      posicao: "Meio-campo",
      subposicao: "Meia",
      numero: 7,
      timeId: time1.id,
    },
  });

  const jogador3 = await prisma.jogador.create({
    data: {
      nome: "Yuri Alberto",
      posicao: "Atacante",
      subposicao: "Centroavante",
      numero: 9,
      timeId: time2.id,
    },
  });

  const jogador4 = await prisma.jogador.create({
    data: {
      nome: "Raphael Veiga",
      posicao: "Meio-campo",
      subposicao: "Meia",
      numero: 23,
      timeId: time3.id,
    },
  });

  // Criar partidas
  console.log("🏟️  Criando partidas...");
  const partida1 = await prisma.partida.create({
    data: {
      data: new Date("2025-12-15T19:00:00"),
      local: "Maracanã",
      mandanteId: time1.id,
      visitanteId: time2.id,
    },
  });

  const partida2 = await prisma.partida.create({
    data: {
      data: new Date("2025-12-20T16:00:00"),
      local: "Allianz Parque",
      mandanteId: time3.id,
      visitanteId: time1.id,
    },
  });

  // Criar escalações
  console.log("📋 Criando escalações...");
  await prisma.escalacao.create({
    data: {
      jogadorId: jogador1.id,
      partidaId: partida1.id,
      timeId: time1.id,
    },
  });

  await prisma.escalacao.create({
    data: {
      jogadorId: jogador2.id,
      partidaId: partida1.id,
      timeId: time1.id,
    },
  });

  await prisma.escalacao.create({
    data: {
      jogadorId: jogador3.id,
      partidaId: partida1.id,
      timeId: time2.id,
    },
  });

  console.log("✅ Seed concluído com sucesso!");
  console.log(`   - 1 usuário criado (admin@futebol.com / admin123)`);
  console.log(`   - 3 times criados`);
  console.log(`   - 4 jogadores criados`);
  console.log(`   - 2 partidas criadas`);
  console.log(`   - 3 escalações criadas`);
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
