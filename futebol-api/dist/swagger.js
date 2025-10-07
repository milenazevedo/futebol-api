"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
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
// Gera a especificação Swagger a partir dos comentários
const specs = (0, swagger_jsdoc_1.default)(options);
// Função para configurar o Swagger na aplicação Express
const setupSwagger = (app) => {
    // Rota /docs serve a interface do Swagger UI
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
};
exports.setupSwagger = setupSwagger;
