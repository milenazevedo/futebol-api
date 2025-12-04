# ⚽ API de Escalação de Futebol

Uma API REST completa para gerenciamento de times de futebol, jogadores, partidas e escalações, construída com Node.js, TypeScript, Prisma e PostgreSQL, totalmente containerizada com Docker.

# Video da API: https://youtu.be/6BmWTWB7tnI?si=Mqqe0E1dFvjgiuMR

## 📋 Funcionalidades

- ✅ **Gerenciamento de Times** – CRUD completo
- ✅ **Gerenciamento de Jogadores** – CRUD completo com relação ao Time
- ✅ **Gerenciamento de Partidas** – CRUD completo com relação a Times (mandante e visitante)
- ✅ **Gerenciamento de Escalações** – CRUD completo com relações (Jogador, Time, Partida)
- ✅ **Validações com Zod** – validação robusta de dados de entrada
- ✅ **Documentação Swagger** – API totalmente documentada e interativa
- ✅ **Banco PostgreSQL** – persistência de dados confiável
- ✅ **Docker** – containerização completa da aplicação

## 🛠️ Tecnologias

- **Node.js** + **TypeScript**
- **Express.js** – framework web
- **Prisma** – ORM para banco de dados
- **PostgreSQL** – banco de dados
- **Zod** – validação de schemas
- **Swagger** – documentação interativa da API
- **Docker** + **Docker Compose** – containerização completa

## 🚀 Como Rodar a Aplicação

### 📋 Pré-requisitos

- **Docker** e **Docker Compose**
- **Node.js 18+** e **npm** (para rodar frontend local)
- **Git**

### 1️⃣ **Clone o Repositório**

```bash
git clone https://github.com/milenazevedo/futebol-api.git
cd futebol-api
```

### 2️⃣ **Execute o Backend com Docker**

#### 🔹 Desenvolvimento (com hot-reload)

```bash
# Build e execução dos containers (backend + banco de dados)
docker-compose up --build

# Ou para rodar em background:
docker-compose up -d --build
```

#### 🔹 Produção

```bash
# Build para produção
docker-compose -f docker-compose.prod.yml up --build
```

### 3️⃣ **Execute o Frontend (Em outro terminal)**

```bash
# Navegue até a pasta do cliente
cd client

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

### 4️⃣ **Acesse a Aplicação**

- **Frontend**: http://localhost:5173 ou http://localhost:5174
- **Backend API**: http://localhost:3000
- **Documentação Swagger**: http://localhost:3000/docs

### 📊 Status dos Serviços

Verifique se todos os containers estão rodando:

```bash
docker-compose ps
```

## 🏗️ Estrutura do Projeto

```
futebol-api/
├── src/
│   ├── routes/          # Rotas da API
│   ├── swagger/         # Configuração do Swagger
│   └── index.ts         # Arquivo principal
├── prisma/
│   └── schema.prisma    # Schema do banco de dados
├── docker-compose.yml   # Configuração Docker
├── Dockerfile          # Imagem da aplicação
└── package.json        # Dependências do projeto
```

## 🗄️ Banco de Dados

### Esquema do Banco

```prisma
model Time {
  id         Int      @id @default(autoincrement())
  nome       String
  fundacao   DateTime?
  jogadores  Jogador[]
  partidasM  Partida[] @relation("Mandante")
  partidasV  Partida[] @relation("Visitante")
  escalacoes Escalacao[]
}

model Jogador {
  id         Int      @id @default(autoincrement())
  nome       String
  posicao    String
  subposicao String?
  numero     Int
  timeId     Int
  time       Time     @relation(fields: [timeId], references: [id])
  escalacoes Escalacao[]
}

model Partida {
  id         Int       @id @default(autoincrement())
  data       DateTime
  local      String
  mandanteId Int
  visitanteId Int
  mandante   Time      @relation("Mandante", fields: [mandanteId], references: [id])
  visitante  Time      @relation("Visitante", fields: [visitanteId], references: [id])
  escalacoes Escalacao[]
}

model Escalacao {
  id       Int
  jogadorId Int
  partidaId Int
  timeId    Int
  jogador   Jogador   @relation(fields: [jogadorId], references: [id])
  partida   Partida   @relation(fields: [partidaId], references: [id])
  time      Time      @relation(fields: [timeId], references: [id])

  @@id([jogadorId, partidaId, timeId])
}
```

## 📚 Documentação da API

### **Swagger UI**

Acesse a documentação interativa em:
**http://localhost:3000/docs**

### **Endpoints Disponíveis**

#### **🏟️ Times**
- `POST /api/times` – Criar time
- `GET /api/times` – Listar todos os times
- `GET /api/times/:id` – Buscar time por ID
- `PUT /api/times/:id` – Atualizar time
- `DELETE /api/times/:id` – Deletar time

#### **👤 Jogadores**
- `POST /api/jogadores` – Criar jogador
- `GET /api/jogadores` – Listar todos os jogadores
- `GET /api/jogadores/search` – Buscar jogadores por posição
- `GET /api/jogadores/buscar/nome` – Buscar jogador por nome
- `GET /api/jogadores/stats/:id` – Obter estatísticas do jogador
- `GET /api/jogadores/:id` – Buscar jogador por ID
- `PUT /api/jogadores/:id` – Atualizar jogador
- `DELETE /api/jogadores/:id` – Deletar jogador

#### **⚽ Partidas**
- `POST /api/partidas` – Criar partida
- `GET /api/partidas` – Listar todas as partidas
- `GET /api/partidas/futuras` – Listar partidas futuras
- `GET /api/partidas/stats` – Obter estatísticas das partidas
- `GET /api/partidas/:id` – Buscar partida por ID
- `PUT /api/partidas/:id` – Atualizar partida
- `DELETE /api/partidas/:id` – Deletar partida

#### **📋 Escalações**
- `POST /api/escalacoes` – Criar escalação
- `GET /api/escalacoes` – Listar todas as escalações
- `GET /api/escalacoes/:id` – Buscar escalação por ID
- `PUT /api/escalacoes/:id` – Atualizar escalação
- `DELETE /api/escalacoes/:id` – Deletar escalação

## 🧪 Testando a Aplicação

### **Frontend**

1. Acesse: **http://localhost:5173** ou **http://localhost:5174**
2. A aplicação carregará com as seguintes páginas:
   - **Home** – Botões de navegação para os módulos
   - **Jogadores** – CRUD completo, busca por nome e visualização de estatísticas
   - **Times** – CRUD completo
   - **Partidas** – CRUD completo, filtro de partidas futuras e estatísticas
   - **Escalações** – CRUD completo com seleção de jogadores, times e partidas

### **Backend via Swagger (Recomendado)**

1. Acesse: **http://localhost:3000/docs**
2. Clique em qualquer endpoint
3. Clique em "Try it out"
4. Preencha os dados e clique em "Execute"

### **Exemplos com cURL**

#### Criar Time:
```bash
curl -X POST http://localhost:3000/api/times \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Flamengo",
    "fundacao": "1895-11-17T00:00:00.000Z"
  }'
```

#### Criar Jogador:
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

#### Buscar Jogador por Nome:
```bash
curl http://localhost:3000/api/jogadores/buscar/nome?nome=Gabriel
```

#### Obter Estatísticas do Jogador:
```bash
curl http://localhost:3000/api/jogadores/stats/1
```

#### Listar Partidas Futuras:
```bash
curl http://localhost:3000/api/partidas/futuras
```

#### Obter Estatísticas de Partidas:
```bash
curl http://localhost:3000/api/partidas/stats
```

## ⚙️ Comandos Úteis

### **Docker (Backend + Banco de Dados)**

```bash
# Iniciar aplicação
docker-compose up --build

# Parar aplicação
docker-compose down

# Ver logs da aplicação
docker-compose logs app

# Ver logs do banco
docker-compose logs db

# Executar comandos no container
docker-compose exec app npm run prisma:studio
```

### **Frontend**

```bash
# Instalar dependências
npm install

# Desenvolvimento (com hot reload)
npm run dev

# Build para produção
npm run build

# Preview de produção
npm run preview
```

### **Banco de Dados**

```bash
# Executar migrações
docker-compose exec app npx prisma migrate dev

# Abrir Prisma Studio (interface visual do banco)
docker-compose exec app npx prisma studio

# Backup do banco
docker-compose exec db pg_dump -U postgres futebol > backup.sql
```

## 🔧 Desenvolvimento Local (Sem Docker)

### **Pré-requisitos Adicionais**
- Node.js 18+
- npm ou yarn
- PostgreSQL rodando localmente

### **Configuração Backend**

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações de banco de dados

# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev

# Desenvolvimento (hot reload)
npm run dev

# Produção
npm run build
npm start
```

### **Configuração Frontend**

```bash
# Navegue até a pasta do cliente
cd client

# Instale as dependências
npm install

# Desenvolvimento (hot reload)
npm run dev

# Build para produção
npm run build

# Preview
npm run preview
```

## 🐛 Solução de Problemas

### **Problemas Comuns**

#### **Container não inicia**
```bash
# Rebuild completo
docker-compose down
docker-compose up --build
```

#### **Erro de conexão com banco**
```bash
# Verificar se o banco está rodando
docker-compose ps

# Reiniciar apenas o banco
docker-compose restart db
```

#### **Porta já em uso**
```bash
# Parar serviços locais usando a porta
sudo lsof -ti:3000 | xargs kill -9
sudo lsof -ti:5432 | xargs kill -9
```

### **Comandos de Diagnóstico**

```bash
# Verificar saúde dos containers
docker-compose ps

# Ver logs em tempo real
docker-compose logs -f

# Testar conexão com banco
docker-compose exec db psql -U postgres -d futebol -c "SELECT version();"
```

## Scripts Disponíveis

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Build para produção
npm run build

# Produção
npm start

# Prisma
npx prisma generate    # Gerar cliente Prisma
npx prisma migrate dev # Executar migrações
npx prisma studio     # Interface visual do banco
```

## Variáveis de Ambiente

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/futebol"
PORT=3000
NODE_ENV=development
```

## Suporte

Se encontrar problemas:

1. Verifique os logs: `docker-compose logs`
2. Confirme se todas as portas estão livres
3. Execute migrações: `docker-compose exec app npx prisma migrate dev`
4. Verifique a documentação em: **http://localhost:3000/docs**
