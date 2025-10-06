-- CreateTable
CREATE TABLE "Time" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "fundacao" TIMESTAMP(3),

    CONSTRAINT "Time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jogador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "posicao" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "timeId" INTEGER NOT NULL,

    CONSTRAINT "Jogador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partida" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "local" TEXT NOT NULL,
    "mandanteId" INTEGER NOT NULL,
    "visitanteId" INTEGER NOT NULL,

    CONSTRAINT "Partida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Escalacao" (
    "id" SERIAL NOT NULL,
    "jogadorId" INTEGER NOT NULL,
    "partidaId" INTEGER NOT NULL,
    "timeId" INTEGER NOT NULL,

    CONSTRAINT "Escalacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Jogador" ADD CONSTRAINT "Jogador_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_mandanteId_fkey" FOREIGN KEY ("mandanteId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_visitanteId_fkey" FOREIGN KEY ("visitanteId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escalacao" ADD CONSTRAINT "Escalacao_jogadorId_fkey" FOREIGN KEY ("jogadorId") REFERENCES "Jogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escalacao" ADD CONSTRAINT "Escalacao_partidaId_fkey" FOREIGN KEY ("partidaId") REFERENCES "Partida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escalacao" ADD CONSTRAINT "Escalacao_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
