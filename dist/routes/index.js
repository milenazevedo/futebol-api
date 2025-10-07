"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const timeRoutes_1 = __importDefault(require("./timeRoutes"));
const jogadorRoutes_1 = __importDefault(require("./jogadorRoutes"));
const partidaRoutes_1 = __importDefault(require("./partidaRoutes"));
const escalacaoRoutes_1 = __importDefault(require("./escalacaoRoutes"));
const router = (0, express_1.Router)();
// CONFIGURAÇÃO DAS ROTAS PRINCIPAIS DA API
// Todas as rotas de times começam com /api/times
router.use("/times", timeRoutes_1.default);
// Rotas de jogadores: /api/jogadores
router.use("/jogadores", jogadorRoutes_1.default);
// Rotas de partidas: /api/partidas
router.use("/partidas", partidaRoutes_1.default);
// Rotas de escalações: /api/escalacoes
router.use("/escalacoes", escalacaoRoutes_1.default);
exports.default = router;
