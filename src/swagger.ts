<<<<<<< HEAD
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Configuração do Swagger
const options = {
  definition: {
    openapi: "3.0.0", // Versão do OpenAPI
    info: {
      title: "API de Futebol", // Título da API
      version: "1.0.0", // Versão da API
      description: "API para gerenciar times, jogadores, partidas e escalações",
    },
    servers: [
      {
        url: "http://localhost:3000/api", // URL base da API
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Onde encontrar os comentários JSDoc
};

// Gera a especificação Swagger (OpenAPI) a partir dos comentários
const specs = swaggerJsdoc(options);

// Função para configurar o Swagger na aplicação Express
export const setupSwagger = (app: Express) => {
  // Rota /docs serve a interface do Swagger UI
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

  // Expor o JSON do OpenAPI em endpoints úteis para download/import
  // /openapi.json e /docs.json retornam a especificação gerada
  app.get("/openapi.json", (_req, res) => res.json(specs));
  app.get("/docs.json", (_req, res) => res.json(specs));
};
=======
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Configuração do Swagger
const options = {
  definition: {
    openapi: "3.0.0", // Versão do OpenAPI
    info: {
      title: "API de Futebol", // Título da API
      version: "1.0.0", // Versão da API
      description: "API para gerenciar times, jogadores, partidas e escalações",
    },
    servers: [
      {
        url: "http://localhost:3000/api", // URL base da API
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Onde encontrar os comentários JSDoc
};

// Gera a especificação Swagger (OpenAPI) a partir dos comentários
const specs = swaggerJsdoc(options);

// Função para configurar o Swagger na aplicação Express
export const setupSwagger = (app: Express) => {
  // Rota /docs serve a interface do Swagger UI
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

  // Expor o JSON do OpenAPI em endpoints úteis para download/import
  // /openapi.json e /docs.json retornam a especificação gerada
  app.get("/openapi.json", (_req, res) => res.json(specs));
  app.get("/docs.json", (_req, res) => res.json(specs));
};
>>>>>>> Parte-Milena
