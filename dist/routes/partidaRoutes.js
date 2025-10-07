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
const partidaController = __importStar(require("../controllers/partidaController"));
const validation_1 = require("../schemas/validation");
const validation_2 = require("../middlewares/validation");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Partidas
 *   description: Endpoints de gerenciamento de partidas
 */
/**
 * @swagger
 * /partidas:
 *   get:
 *     summary: Retorna todas as partidas
 *     tags: [Partidas]
 *     responses:
 *       200:
 *         description: Lista de partidas
 */
// ROTA: GET /api/partidas - Lista todas as partidas
router.get("/", partidaController.getAllPartidas);
/**
 * @swagger
 * /partidas/{id}:
 *   get:
 *     summary: Retorna uma partida pelo ID
 *     tags: [Partidas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Partida encontrada
 *       404:
 *         description: Partida não encontrada
 */
// ROTA: GET /api/partidas/:id - Busca partida por ID
router.get("/:id", (0, validation_2.validateParams)(validation_1.idParamSchema), partidaController.getPartidaById);
/**
 * @swagger
 * /partidas:
 *   post:
 *     summary: Cria uma nova partida
 *     tags: [Partidas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 format: date
 *               local:
 *                 type: string
 *               mandanteId:
 *                 type: integer
 *               visitanteId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Partida criada com sucesso
 */
// ROTA: POST /api/partidas - Cria nova partida
router.post("/", (0, validation_2.validateBody)(validation_1.createPartidaSchema), partidaController.createPartida);
/**
 * @swagger
 * /partidas/{id}:
 *   put:
 *     summary: Atualiza uma partida existente
 *     tags: [Partidas]
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
 *               data:
 *                 type: string
 *                 format: date
 *               local:
 *                 type: string
 *               mandanteId:
 *                 type: integer
 *               visitanteId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Partida atualizada
 *       404:
 *         description: Partida não encontrada
 */
// ROTA: PUT /api/partidas/:id - Atualiza partida existente
router.put("/:id", (0, validation_2.validateParams)(validation_1.idParamSchema), (0, validation_2.validateBody)(validation_1.updatePartidaSchema), partidaController.updatePartida);
/**
 * @swagger
 * /partidas/{id}:
 *   delete:
 *     summary: Remove uma partida
 *     tags: [Partidas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Partida removida com sucesso
 *       404:
 *         description: Partida não encontrada
 */
// ROTA: DELETE /api/partidas/:id - Remove partida
router.delete("/:id", (0, validation_2.validateParams)(validation_1.idParamSchema), partidaController.deletePartida);
exports.default = router;
