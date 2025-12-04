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
| **Start Command** | `npm start` |
| **Plan** | **Free** |

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
2. ⏳ Aguarde o build (5-10 minutos)
3. Após sucesso, você verá: ✅ **Live** com URL: `https://futebol-api.onrender.com`

### 2.5 Executar Migrations
Depois do deploy bem-sucedido:
1. No painel do serviço, vá em **"Shell"** (canto superior direito)
2. Execute:
   ```bash
   npm run prisma:migrate
   ```

### 2.6 (Opcional) Popular Banco com Dados Iniciais
Se tiver seed script:
```bash
npm run seed
```

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

---

## 🐛 Troubleshooting

### Erro: "Network Error" ou CORS
- Verifique se `CORS_ORIGIN` no backend está com a URL correta do frontend
- Verifique se `VITE_API_URL` no frontend está com a URL correta da API

### Erro: "Database connection failed"
- Verifique se `DATABASE_URL` está correto
- Verifique se o banco PostgreSQL está **Active** no Render

### Erro: "Module not found" no build
- Certifique-se que todas as dependências estão em `package.json`
- Execute `npm install` localmente para garantir `package-lock.json` atualizado

### API lenta ou timeout
- Plano Free do Render hiberna após inatividade
- Primeira requisição pode demorar 30-60 segundos (spin up)
- Considere upgrade para plano pago se precisar de performance

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
