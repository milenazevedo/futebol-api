# 🚀 Deploy no Render - Futebol API

Este guia mostra como fazer deploy do backend e frontend no Render gratuitamente.

---

## 📋 Pré-requisitos

1. Conta no [Render](https://render.com) (gratuita)
2. Repositório no GitHub com o código
3. Git instalado localmente

---

## 🗄️ PASSO 1: Criar PostgreSQL Database no Render

### 1.1 Acessar Render Dashboard
- Acesse [dashboard.render.com](https://dashboard.render.com)
- Faça login com sua conta

### 1.2 Criar PostgreSQL Database
1. Clique em **"New +"** → **"PostgreSQL"**
2. Preencha os campos:
   - **Name**: `futebol-db`
   - **Database Name**: `futebol`
   - **User**: `admin`
   - **Region**: Selecione mais próximo (ex: São Paulo, se disponível)
   - **Plan**: **Free**
3. Clique em **"Create Database"**
4. ⏳ Aguarde 3-5 minutos para o banco ser provisionado

### 1.3 Guardar Connection String
Após criado, você verá uma página com informações de conexão:

```
postgresql://admin:SENHA_GERADA@dpg-xxxxx-xxxxx.oregon-postgres.render.com/futebol
```

⚠️ **COPIE ESSA STRING** - você usará como `DATABASE_URL` no backend

---

## 🔧 PASSO 2: Deploy do Backend (API)

### 2.1 Criar Web Service
1. No Dashboard do Render, clique em **"New +"** → **"Web Service"**
2. Conecte seu repositório GitHub:
   - Se primeira vez: clique em **"Connect GitHub"** e autorize
   - Selecione o repositório **futebol-api**

### 2.2 Configurar o Web Service
Preencha os campos:

| Campo | Valor |
|-------|-------|
| **Name** | `futebol-api` (ou nome de sua escolha) |
| **Region** | Same as database (mesma região do banco) |
| **Branch** | `Parte-Jhonas` (ou `main`) |
| **Root Directory** | (deixe vazio - raiz do projeto) |
| **Runtime** | **Node** |
| **Build Command** | `npm run render:build` |
| **Start Command** | `npx prisma migrate deploy && npx tsx src/scripts/seed.ts && node dist/index.js` |
| **Plan** | **Free** |

⚠️ **Importante**: O Start Command executa migrations, popula o banco e inicia o servidor automaticamente!

**O que esse comando faz:**
1. `npx prisma migrate deploy` - Aplica migrations ao banco
2. `npx tsx src/scripts/seed.ts` - Popula o banco com dados iniciais (times, jogadores, usuário admin)
3. `node dist/index.js` - Inicia a aplicação

✅ **Vantagem**: Banco é inicializado e populado automaticamente no Free Plan!

### 2.3 Adicionar Variáveis de Ambiente
Na seção **Environment Variables**, clique em **"Add Environment Variable"** e adicione:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Cole a connection string do PostgreSQL (passo 1.3) |
| `PORT` | `10000` |
| `NODE_ENV` | `production` |
| `CORS_ORIGIN` | `https://seu-frontend.onrender.com` (você atualizará depois) |
| `SWAGGER_HOST` | `futebol-api.onrender.com` (seu domínio da API) |
| `SWAGGER_SCHEMES` | `https` |

⚠️ **Nota**: Por enquanto, deixe `CORS_ORIGIN` como `*` (todos) ou com um placeholder. Atualizaremos depois que o frontend estiver no ar.

### 2.4 Deploy
1. Clique em **"Create Web Service"**
2. ⏳ Aguarde o build (10-15 minutos na primeira vez)
3. Durante o deploy, você verá nos logs:
   ```
   🚀 Starting application...
   🗄️ Running migrations...
   🌱 Iniciando seed do banco de dados...
   👤 Criando usuário admin...
   ⚽ Criando times...
   🏃 Criando jogadores...
   🏟️ Criando partidas...
   📋 Criando escalações...
   ✅ Seed concluído com sucesso!
   🚀 Server is running on port 10000
   ```
4. Após sucesso, você verá: ✅ **Live** com URL: `https://futebol-api.onrender.com`

✅ **Banco já estará populado com:**
- 1 usuário admin (admin@futebol.com / admin123)
- 3 times (Flamengo, Corinthians, Palmeiras)
- 4 jogadores
- 2 partidas futuras
- 3 escalações

### 2.5 Verificar API
Teste se está funcionando:
```bash
curl https://futebol-api.onrender.com/api/times
# Deve retornar JSON com 3 times

curl https://futebol-api.onrender.com/api/jogadores
# Deve retornar JSON com 4 jogadores
```

Ou acesse no navegador:
- **Swagger Docs**: `https://futebol-api.onrender.com/docs`

---

## 🌐 PASSO 3: Deploy do Frontend (React)

### 3.1 Criar Variável de Ambiente Local
No diretório `client/`, crie o arquivo `.env`:

```env
VITE_API_URL=https://futebol-api.onrender.com
```

⚠️ **Importante**: Substitua `futebol-api.onrender.com` pela URL real da sua API

### 3.2 Commit e Push
```bash
git add client/.env
git commit -m "Add production API URL"
git push origin Parte-Jhonas
```

### 3.3 Criar Static Site no Render
1. No Dashboard, clique em **"New +"** → **"Static Site"**
2. Conecte o mesmo repositório GitHub
3. Configure:

| Campo | Valor |
|-------|-------|
| **Name** | `futebol-app` |
| **Branch** | `Parte-Jhonas` |
| **Root Directory** | `client` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

### 3.4 Adicionar Variável de Ambiente
Na seção **Environment Variables**:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://futebol-api.onrender.com` |

### 3.5 Deploy
1. Clique em **"Create Static Site"**
2. ⏳ Aguarde o build (3-5 minutos)
3. Após sucesso: ✅ **Live** com URL: `https://futebol-app.onrender.com`

---

## 🔄 PASSO 4: Atualizar CORS no Backend

Agora que temos a URL do frontend, precisamos atualizar o CORS:

### 4.1 Atualizar Variável de Ambiente
1. Volte ao serviço **futebol-api** no Render
2. Vá em **"Environment"** → Edite a variável `CORS_ORIGIN`
3. Altere para: `https://futebol-app.onrender.com`
4. Clique em **"Save Changes"**
5. O serviço será automaticamente re-deployado

---

## ✅ PASSO 5: Testar Aplicação

1. Acesse: `https://futebol-app.onrender.com`
2. Faça login/cadastro
3. Teste as funcionalidades (Jogadores, Times, Partidas, Escalações)

### 🔑 Credenciais de Teste (Seed)
Após o seed, você pode fazer login com:

| Email | Senha | Descrição |
|-------|-------|-----------|
| `admin@futebol.com` | `admin123` | Usuário administrador criado pelo seed |

### 🧪 Testando Endpoints Manualmente

```bash
# Listar todos os times
curl https://futebol-api.onrender.com/api/times

# Listar todos os jogadores
curl https://futebol-api.onrender.com/api/jogadores

# Listar todas as partidas
curl https://futebol-api.onrender.com/api/partidas

# Partidas futuras
curl https://futebol-api.onrender.com/api/partidas/futuras

# Estatísticas de partidas
curl https://futebol-api.onrender.com/api/partidas/stats

# Buscar jogador por nome
curl "https://futebol-api.onrender.com/api/jogadores/buscar/nome?nome=Gabriel"

# Swagger Documentation
# Acesse: https://futebol-api.onrender.com/docs
```

### ✅ Checklist de Testes

- [ ] Login com credenciais do seed funciona
- [ ] Criação de novo usuário (registro) funciona
- [ ] Listagem de times carrega 3 times
- [ ] Listagem de jogadores carrega 4 jogadores  
- [ ] Listagem de partidas carrega 2 partidas
- [ ] Criar novo jogador funciona
- [ ] Editar jogador existente funciona
- [ ] Deletar jogador funciona
- [ ] Criar nova partida funciona
- [ ] Filtro de partidas futuras funciona
- [ ] Criar escalação funciona
- [ ] Dashboard sidebar navega entre páginas
- [ ] Logout funciona corretamente

---

## 🐛 Troubleshooting

### ❌ Erro: "Network Error" ou CORS
**Sintomas**: Frontend não consegue se comunicar com backend

**Soluções**:
1. Verifique se `CORS_ORIGIN` no backend está com a URL **EXATA** do frontend (sem barra final)
2. Verifique se `VITE_API_URL` no frontend está com a URL **EXATA** da API
3. Limpe cache do navegador (Ctrl+Shift+Del)
4. Teste direto na API: `curl https://futebol-api.onrender.com/api/times`

### ❌ Erro: "Database connection failed"
**Soluções**:
1. Verifique se `DATABASE_URL` está correto (copie novamente do PostgreSQL)
2. Verifique se o banco PostgreSQL está **Active** no Render Dashboard
3. No Shell da API, teste conexão:
   ```bash
   npx prisma db push
   ```

### ❌ Erro: "Module not found" ou "@prisma/client"
**Soluções**:
1. No Shell da API:
   ```bash
   npm install --save @prisma/client
   npx prisma generate
   ```
2. Verifique se `render:build` está no package.json
3. Faça redeploy manual

### ❌ Erro: Seed falhou ou banco vazio
**Soluções**:
1. No Shell da API, execute manualmente:
   ```bash
   npx prisma migrate deploy
   npx tsx src/scripts/seed.ts
   ```
2. Verifique os logs do deploy para ver o erro específico

### ❌ Frontend não conecta à API
**Soluções**:
1. Abra DevTools (F12) → Console
2. Verifique qual URL está tentando acessar
3. Confirme que `VITE_API_URL` está correto nas variáveis de ambiente do frontend
4. Redeploy frontend:
   - No Render Dashboard → Frontend → Manual Deploy → "Clear build cache & deploy"

### ⚠️ API lenta ou timeout na primeira requisição
**Explicação**: Plano Free hiberna após 15 minutos de inatividade

**Soluções**:
- Primeira requisição demora 30-60 segundos (spin up)
- Considere upgrade para plano Starter ($7/mês) para evitar hibernação
- Use serviço externo como [UptimeRobot](https://uptimerobot.com/) para ping a cada 10min (mantém ativo)

---

## 📝 Resumo das URLs

| Serviço | URL | Exemplo |
|---------|-----|---------|
| **Backend API** | `https://[nome].onrender.com` | `https://futebol-api.onrender.com` |
| **Frontend** | `https://[nome].onrender.com` | `https://futebol-app.onrender.com` |
| **PostgreSQL** | `dpg-xxxxx.oregon-postgres.render.com` | (interno) |
| **Swagger Docs** | `https://[api]/docs` | `https://futebol-api.onrender.com/docs` |

---

## 🎉 Pronto!

Seu sistema de gerenciamento de futebol está no ar! 🚀⚽

Para atualizações futuras, basta fazer `git push` que o Render detecta automaticamente e faz re-deploy.
