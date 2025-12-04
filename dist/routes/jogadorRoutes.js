"use strict";
// src/routes/jogadorRoutes.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jogadorController = __importStar(require("../controllers/jogadorController"));
const validation_1 = require("../middlewares/validation");
const validation_2 = require("../schemas/validation");
const router = (0, express_1.Router)();
// ROTA: GET /api/jogadores - Lista todos os jogadores
router.get('/', jogadorController.getAllJogadores);
/**
 * @swagger
 * /jogadores/search:
 *   get:
 *     summary: Busca jogadores por posição e/ou subposição
 *     tags: [Jogadores]
 *     parameters:
 *       - in: query
 *         name: posicao
 *         schema:
 *           type: string
 *         description: Posição do jogador (ex: "Atacante")
 *       - in: query
 *         name: subposicao
 *         schema:
 *           type: string
 *         description: Subposição do jogador (ex: "Centroavante")
 *     responses:
 *       200:
 *         description: Lista de jogadores encontrados
 */
// ROTA: GET /api/jogadores/search - Busca jogadores por posição e/ou subposição
router.get('/search', (0, validation_1.validateQuery)(validation_2.searchJogadorSchema), jogadorController.searchJogadores);
// ROTA: GET /api/jogadores/:id - Busca jogador por ID
router.get('/:id', jogadorController.getJogadorById);
// ROTA: POST /api/jogadores - Cria novo jogador
router.post('/', jogadorController.createJogador);
// ROTA: PUT /api/jogadores/:id - Atualiza jogador existente
router.put('/:id', jogadorController.updateJogador);
// ROTA: DELETE /api/jogadores/:id - Remove jogador
router.delete('/:id', jogadorController.deleteJogador);
exports.default = router;
