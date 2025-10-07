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
const escalacaoController = __importStar(require("../controllers/escalacaoController"));
const validation_1 = require("../schemas/validation");
const validation_2 = require("../middlewares/validation");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Escalações
 *   description: Endpoints de gerenciamento de escalações
 */
/**
 * @swagger
 * /escalacoes:
 *   get:
 *     summary: Retorna todas as escalações
 *     tags: [Escalações]
 *     responses:
 *       200:
 *         description: Lista de escalações
 */
// ROTA: GET /api/escalacoes - Lista todas as escalações
router.get("/", escalacaoController.getAllEscalacoes);
/**
 * @swagger
 * /escalacoes/{id}:
 *   get:
 *     summary: Retorna uma escalação pelo ID
 *     tags: [Escalações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Escalação encontrada
 *       404:
 *         description: Escalação não encontrada
 */
// ROTA: GET /api/escalacoes/:id - Busca escalação por ID
router.get("/:id", (0, validation_2.validateParams)(validation_1.idParamSchema), escalacaoController.getEscalacaoById);
/**
 * @swagger
 * /escalacoes:
 *   post:
 *     summary: Cria uma nova escalação
 *     tags: [Escalações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jogadorId:
 *                 type: integer
 *               partidaId:
 *                 type: integer
 *               timeId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Escalação criada com sucesso
 */
// ROTA: POST /api/escalacoes - Cria nova escalação
router.post("/", (0, validation_2.validateBody)(validation_1.createEscalacaoSchema), escalacaoController.createEscalacao);
/**
 * @swagger
 * /escalacoes/{id}:
 *   put:
 *     summary: Atualiza uma escalação existente
 *     tags: [Escalações]
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
 *               jogadorId:
 *                 type: integer
 *               partidaId:
 *                 type: integer
 *               timeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Escalação atualizada
 *       404:
 *         description: Escalação não encontrada
 */
// ROTA: PUT /api/escalacoes/:id - Atualiza escalação existente
router.put("/:id", (0, validation_2.validateParams)(validation_1.idParamSchema), (0, validation_2.validateBody)(validation_1.updateEscalacaoSchema), escalacaoController.updateEscalacao);
/**
 * @swagger
 * /escalacoes/{id}:
 *   delete:
 *     summary: Remove uma escalação
 *     tags: [Escalações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Escalação removida com sucesso
 *       404:
 *         description: Escalação não encontrada
 */
// ROTA: DELETE /api/escalacoes/:id - Remove escalação
router.delete("/:id", (0, validation_2.validateParams)(validation_1.idParamSchema), escalacaoController.deleteEscalacao);
exports.default = router;
