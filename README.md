# ⚽ API de Escalação de Futebol

Uma API REST completa para gerenciamento de times de futebol, jogadores, partidas e escalações, construída com Node.js, TypeScript, Prisma e PostgreSQL.

# video da api aqui : https://youtu.be/6BmWTWB7tnI?si=Mqqe0E1dFvjgiuMR

## 📋 Funcionalidades

- ✅ **Gerenciamento de Times** – CRUD completo
- ✅ **Gerenciamento de Jogadores** – CRUD completo com relação ao Time
- ✅ **Gerenciamento de Partidas** – CRUD completo com relação a Times (mandante e visitante)
- ✅ **Gerenciamento de Escalações** – CRUD completo com relações (Jogador, Time, Partida)
- ✅ **Validações com Zod** – validação robusta de dados de entrada
- ✅ **Documentação Swagger** – API totalmente documentada e interativa
- ✅ **Banco PostgreSQL** – persistência de dados confiável
- ✅ **Docker** – containerização do banco de dados

## 🛠️ Tecnologias

- **Node.js** + **TypeScript**
- **Express.js** – framework web
- **Prisma** – ORM para banco de dados
- **PostgreSQL** – banco de dados
- **Zod** – validação de schemas
- **Swagger** – documentação interativa da API
- **Docker** – containerização do PostgreSQL

## 🚀 Como Rodar a Aplicação

### 📋 Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Docker** e **Docker Compose**
- **Git**

### 1️⃣ **Clone o Repositório**

```bash
git clone https://github.com/milenazevedo/futebol-api.git
cd clinica-api
```

### 2️⃣ **Instale as Dependências**

```bash
npm install
```

### 3️⃣ **Configure o Banco de Dados**

#### Inicie o PostgreSQL com Docker:

Você pode rodar o PostgreSQL de duas formas:

🔹 Usando Docker (sem docker-compose):

```bash
docker run --name futebol_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=futebol \
  -p 5432:5432 \
  -d postgres
```

Isso irá:
- Criar um container PostgreSQL chamado futebol_db
- Usuário: postgres
- Senha: postgres
- Banco: futebol
- Porta exposta: 5432

🔹 Ou usando PostgreSQL instalado localmente:

Certifique-se de que o serviço esteja rodando na porta 5432, e que o usuário/senha correspondam ao seu .env.


#### Verifique se o container está rodando:

```bash
docker ps
```

🔹 Ou usando Docker Compose (recomendado, já incluído no projeto):

```bash
docker compose up -d
```

Isso criará um container `futebol_db` com usuário `postgres` e senha `postgres` e exporá a porta 5432.

### 4️⃣ **Configure as Variáveis de Ambiente**

O arquivo `.env` já está configurado:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/futebol"
PORT=3000
```

### 5️⃣ **Execute as Migrações do Banco**

```bash
# Gerar o Prisma Client
npx prisma generate

# Executar migrações
npx prisma migrate dev
```

### 6️⃣ **Inicie a Aplicação**

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Build para produção
npm run build
npm start
```

A aplicação estará disponível em: **http://localhost:3000**

### Health check

Há um endpoint de checagem rápida:

- GET http://localhost:3000/api/health — retorna 200 quando o servidor e o banco estão acessíveis, ou 503 se o banco estiver inacessível.

### Script de verificação rápida

Incluí um script para testar a criação de um Time e um Jogador localmente:

```bash
node scripts/smokeTest.js
```

Ele espera que a API esteja rodando em `http://localhost:3000`.

## 📚 Documentação da API

### **Swagger UI**

Acesse a documentação interativa em:
**http://localhost:3000/docs**

OBS: Plataformas externas (como o SwaggerHub) não conseguem por padrão buscar `http://localhost:3000/docs` do seu computador — por isso você pode receber um erro como "Failed to download" ou status 403.

Opções para importar a especificação no SwaggerHub:

1) Baixar o JSON localmente e importar manualmente

  - Abra: http://localhost:3000/openapi.json ou http://localhost:3000/docs.json
  - Salve o conteúdo como `openapi.json` e faça upload no SwaggerHub (Import > File).

2) Expor temporariamente sua API para a internet (recomendado para testes rápidos)

  - Instale e execute ngrok (https://ngrok.com):

    ```bash
    ngrok http 3000
    ```

  - Copie o URL público (ex.: `https://abcd1234.ngrok.io`) e no SwaggerHub use a opção Import from URL com `https://abcd1234.ngrok.io/openapi.json`.

3) Use uma URL pública já hospedada (deploy) e aponte o SwaggerHub para `https://sua-url/openapi.json`.

Qualquer uma dessas opções permitirá que o SwaggerHub importe corretamente a especificação sem retornar 403.

### **Endpoints Principais**

#### **Times**
- POST /api/times – Criar time
- GET /api/times – Listar todos
- GET /api/times/:id – Buscar por ID
- PUT /api/times/:id – Atualizar
- DELETE /api/times/:id – Deletar

#### **Jogadores**
- POST /api/times – Criar jogador
- GET /api/times – Listar todos (com dados do Time via include)
- GET /api/times/:id – Buscar por ID
- PUT /api/times/:id – Atualizar
- DELETE /api/times/:id – Deletar

#### **Partidas**
- POST /api/times – Criar partidas
- GET /api/times – Listar todas as partidas
- GET /api/times/:id – Buscar por ID
- PUT /api/times/:id – Atualizar
- DELETE /api/times/:id – Deletar

#### **Escalações**
- POST /api/times – Criar escalação
- GET /api/times – Listar todas (com jogador, time e partida)
- GET /api/times/:id – Buscar por ID
- PUT /api/times/:id – Atualizar
- DELETE /api/times/:id – Deletar


## 🧪 Testando a API

### **1. Usando Swagger (Recomendado)**

1. Acesse: http://localhost:3000/docs
2. Clique em qualquer endpoint
3. Clique em "Try it out"
4. Preencha os dados e clique em "Execute"

### **2. Usando cURL**

#### Criar um Time:

```bash
curl -X POST http://localhost:3000/api/times \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Flamengo",
    "fundacao": "1895-11-17"
  }'
```

#### Criar um jogador:

```bash
curl -X POST http://localhost:3000/api/jogadores \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Gabriel Barbosa",
    "posicao": "Atacante",
    "numero": 9,
    "timeId": 1
  }'
```

#### Criar uma partida:

```bash
curl -X POST http://localhost:3000/api/partidas \
  -H "Content-Type: application/json" \
  -d '{
    "data": "2025-12-25T16:00:00Z",
    "mandanteId": 1,
    "visitanteId": 2
  }'
```

#### Criar uma escalação:

```bash
curl -X POST http://localhost:3000/api/escalacoes \
  -H "Content-Type: application/json" \
  -d '{
    "jogadorId": 1,
    "timeId": 1,
    "partidaId": 1
  }'
```

## **Esquema de Banco de Dados**

```prisma
model Time {
  id         Int        @id @default(autoincrement())
  nome       String
  fundacao   DateTime?
  jogadores  Jogador[]
  partidasMandante Partida[] @relation("PartidasMandante")
  partidasVisitante Partida[] @relation("PartidasVisitante")
  escalacoes Escalacao[]
}

model Jogador {
  id         Int        @id @default(autoincrement())
  nome       String
  posicao    String
  numero     Int
  timeId     Int
  time       Time       @relation(fields: [timeId], references: [id], onDelete: Cascade)
  escalacoes Escalacao[]
}

model Partida {
  id           Int        @id @default(autoincrement())
  data         DateTime
  mandanteId   Int
  visitanteId  Int
  mandante     Time       @relation("PartidasMandante", fields: [mandanteId], references: [id])
  visitante    Time       @relation("PartidasVisitante", fields: [visitanteId], references: [id])
  escalacoes   Escalacao[]
}

model Escalacao {
  id        Int      @id @default(autoincrement())
  jogadorId Int
  partidaId Int
  timeId    Int

  jogador   Jogador  @relation(fields: [jogadorId], references: [id], onDelete: Cascade)
  partida   Partida  @relation(fields: [partidaId], references: [id], onDelete: Cascade)
  time      Time     @relation(fields: [timeId], references: [id], onDelete: Cascade)
}
```

## ⚙️ Validações

A API possui validações robustas com **Zod**:

- **Nome do time**: mínimo 2 caracteres, máximo 100
- **Fundação**: deve ser uma data válida
- **Nome do jogador**: mínimo 2 caracteres
- **Número da camisa**: inteiro positivo
- **IDs**: números inteiros positivos
- **Data da partida**: data válida

## 🐛 Solução de Problemas

### **Erro: "Port 5432 already in use"**

O PostgreSQL local está rodando. Pare o serviço local ou altere a porta do container no docker-compose.yml.

### **Erro: "Cannot find module '../generated/prisma'"**

Execute: `npx prisma generate`

### **Erro de migração**

Execute: `npx prisma migrate dev`

### **Container não inicia**

```bash
docker-compose down
docker-compose up -d
```

## 📦 Scripts Disponíveis

```bash
npm run dev       # Inicia em modo desenvolvimento
npm run build     # Build para produção
npm start         # Inicia versão de produção
npm run prisma:generate  # Gera Prisma Client
npm run prisma:migrate   # Executa migrações
npm run prisma:studio    # Abre Prisma Studio
```

