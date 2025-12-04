<<<<<<< HEAD
-- Cria a tabela Time
CREATE TABLE "Time" (
    "id" SERIAL NOT NULL,          -- ID único, auto incrementável
    "nome" TEXT NOT NULL,          -- Nome do time (obrigatório)
    "fundacao" TIMESTAMP(3),       -- Data de fundação (opcional)

    CONSTRAINT "Time_pkey" PRIMARY KEY ("id") -- Define id como chave primária
);

-- Cria a tabela Jogador
CREATE TABLE "Jogador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,          -- Nome do jogador
    "posicao" TEXT NOT NULL,       -- Posição em campo
    "numero" INTEGER NOT NULL,     -- Número da camisa
    "timeId" INTEGER NOT NULL,     -- Chave estrangeira para Time

    CONSTRAINT "Jogador_pkey" PRIMARY KEY ("id")
);

-- Cria a tabela Partida
CREATE TABLE "Partida" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,  -- Data e hora da partida
    "local" TEXT NOT NULL,         -- Local da partida
    "mandanteId" INTEGER NOT NULL, -- ID do time mandante
    "visitanteId" INTEGER NOT NULL, -- ID do time visitante

    CONSTRAINT "Partida_pkey" PRIMARY KEY ("id")
);

-- Cria a tabela Escalacao
CREATE TABLE "Escalacao" (
    "id" SERIAL NOT NULL,
    "jogadorId" INTEGER NOT NULL, -- ID do jogador
    "partidaId" INTEGER NOT NULL, -- ID da partida
    "timeId" INTEGER NOT NULL,    -- ID do time

    CONSTRAINT "Escalacao_pkey" PRIMARY KEY ("id")
);

-- ADICIONA AS CHAVES ESTRANGEIRAS:

-- Jogador referencia Time
ALTER TABLE "Jogador" ADD CONSTRAINT "Jogador_timeId_fkey" 
FOREIGN KEY ("timeId") REFERENCES "Time"("id") 
ON DELETE RESTRICT ON UPDATE CASCADE;

-- Partida referencia Time como mandante
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_mandanteId_fkey" 
FOREIGN KEY ("mandanteId") REFERENCES "Time"("id") 
ON DELETE RESTRICT ON UPDATE CASCADE;

-- Partida referencia Time como visitante
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_visitanteId_fkey" 
FOREIGN KEY ("visitanteId") REFERENCES "Time"("id") 
ON DELETE RESTRICT ON UPDATE CASCADE;

-- Escalacao referencia Jogador
ALTER TABLE "Escalacao" ADD CONSTRAINT "Escalacao_jogadorId_fkey" 
FOREIGN KEY ("jogadorId") REFERENCES "Jogador"("id") 
ON DELETE RESTRICT ON UPDATE CASCADE;

-- Escalacao referencia Partida
ALTER TABLE "Escalacao" ADD CONSTRAINT "Escalacao_partidaId_fkey" 
FOREIGN KEY ("partidaId") REFERENCES "Partida"("id") 
ON DELETE RESTRICT ON UPDATE CASCADE;

-- Escalacao referencia Time
ALTER TABLE "Escalacao" ADD CONSTRAINT "Escalacao_timeId_fkey" 
FOREIGN KEY ("timeId") REFERENCES "Time"("id") 
=======
-- Cria a tabela Time
CREATE TABLE "Time" (
    "id" SERIAL NOT NULL,          -- ID único, auto incrementável
    "nome" TEXT NOT NULL,          -- Nome do time (obrigatório)
    "fundacao" TIMESTAMP(3),       -- Data de fundação (opcional)

    CONSTRAINT "Time_pkey" PRIMARY KEY ("id") -- Define id como chave primária
);

-- Cria a tabela Jogador
CREATE TABLE "Jogador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,          -- Nome do jogador
    "posicao" TEXT NOT NULL,       -- Posição em campo
    "numero" INTEGER NOT NULL,     -- Número da camisa
    "timeId" INTEGER NOT NULL,     -- Chave estrangeira para Time

    CONSTRAINT "Jogador_pkey" PRIMARY KEY ("id")
);

-- Cria a tabela Partida
CREATE TABLE "Partida" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,  -- Data e hora da partida
    "local" TEXT NOT NULL,         -- Local da partida
    "mandanteId" INTEGER NOT NULL, -- ID do time mandante
    "visitanteId" INTEGER NOT NULL, -- ID do time visitante

    CONSTRAINT "Partida_pkey" PRIMARY KEY ("id")
);

-- Cria a tabela Escalacao
CREATE TABLE "Escalacao" (
    "id" SERIAL NOT NULL,
    "jogadorId" INTEGER NOT NULL, -- ID do jogador
    "partidaId" INTEGER NOT NULL, -- ID da partida
    "timeId" INTEGER NOT NULL,    -- ID do time

    CONSTRAINT "Escalacao_pkey" PRIMARY KEY ("id")
);

-- ADICIONA AS CHAVES ESTRANGEIRAS:

-- Jogador referencia Time
ALTER TABLE "Jogador" ADD CONSTRAINT "Jogador_timeId_fkey" 
FOREIGN KEY ("timeId") REFERENCES "Time"("id") 
ON DELETE RESTRICT ON UPDATE CASCADE;

-- Partida referencia Time como mandante
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_mandanteId_fkey" 
FOREIGN KEY ("mandanteId") REFERENCES "Time"("id") 
ON DELETE RESTRICT ON UPDATE CASCADE;

-- Partida referencia Time como visitante
ALTER TABLE "Partida" ADD CONSTRAINT "Partida_visitanteId_fkey" 
FOREIGN KEY ("visitanteId") REFERENCES "Time"("id") 
ON DELETE RESTRICT ON UPDATE CASCADE;

-- Escalacao referencia Jogador
ALTER TABLE "Escalacao" ADD CONSTRAINT "Escalacao_jogadorId_fkey" 
FOREIGN KEY ("jogadorId") REFERENCES "Jogador"("id") 
ON DELETE RESTRICT ON UPDATE CASCADE;

-- Escalacao referencia Partida
ALTER TABLE "Escalacao" ADD CONSTRAINT "Escalacao_partidaId_fkey" 
FOREIGN KEY ("partidaId") REFERENCES "Partida"("id") 
ON DELETE RESTRICT ON UPDATE CASCADE;

-- Escalacao referencia Time
ALTER TABLE "Escalacao" ADD CONSTRAINT "Escalacao_timeId_fkey" 
FOREIGN KEY ("timeId") REFERENCES "Time"("id") 
>>>>>>> Parte-Milena
ON DELETE RESTRICT ON UPDATE CASCADE;