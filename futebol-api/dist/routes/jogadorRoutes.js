"use strict";
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
const validation_1 = require("../schemas/validation");
const validation_2 = require("../middlewares/validation");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Jogadores
 *   description: Endpoints de gerenciamento de jogadores
 */
/**
 * @swagger
 * /jogadores:
 *   get:
 *     summary: Retorna todos os jogadores
 *     tags: [Jogadores]
 *     responses:
 *       200:
 *         description: Lista de jogadores
 */
// ROTA: GET /api/jogadores - Lista todos os jogadores
router.get("/", jogadorController.getAllJogadores);
/**
 * @swagger
 * /jogadores/{id}:
 *   get:
 *     summary: Retorna um jogador pelo ID
 *     tags: [Jogadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jogador encontrado
 *       404:
 *         description: Jogador não encontrado
 */
// ROTA: GET /api/jogadores/:id - Busca jogador por ID
router.get("/:id", (0, validation_2.validateParams)(validation_1.idParamSchema), jogadorController.getJogadorById);
/**
 * @swagger
 * /jogadores:
 *   post:
 *     summary: Cria um novo jogador
 *     tags: [Jogadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               posicao:
 *                 type: string
 *               numero:
 *                 type: integer
 *               timeId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Jogador criado com sucesso
 */
// ROTA: POST /api/jogadores - Cria novo jogador
router.post("/", (0, validation_2.validateBody)(validation_1.createJogadorSchema), jogadorController.createJogador);
/**
 * @swagger
 * /jogadores/{id}:
 *   put:
 *     summary: Atualiza um jogador existente
 *     tags: [Jogadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               posicao:
 *                 type: string
 *               numero:
 *                 type: integer
 *               timeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Jogador atualizado
 *       404:
 *         description: Jogador não encontrado
 */
// ROTA: PUT /api/jogadores/:id - Atualiza jogador existente
router.put("/:id", (0, validation_2.validateParams)(validation_1.idParamSchema), (0, validation_2.validateBody)(validation_1.updateJogadorSchema), jogadorController.updateJogador);
/**
 * @swagger
 * /jogadores/{id}:
 *   delete:
 *     summary: Remove um jogador
 *     tags: [Jogadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Jogador removido com sucesso
 *       404:
 *         description: Jogador não encontrado
 */
// ROTA: DELETE /api/jogadores/:id - Remove jogador
router.delete("/:id", (0, validation_2.validateParams)(validation_1.idParamSchema), jogadorController.deleteJogador);
exports.default = router;
