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
const timeController = __importStar(require("../controllers/timeController"));
const validation_1 = require("../schemas/validation");
const validation_2 = require("../middlewares/validation");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Times
 *   description: Endpoints de gerenciamento de times
 */
/**
 * @swagger
 * /times:
 *   get:
 *     summary: Retorna todos os times
 *     tags: [Times]
 *     responses:
 *       200:
 *         description: Lista de times
 */
// ROTA: GET /api/times - Lista todos os times
router.get("/", timeController.getAllTimes);
/**
 * @swagger
 * /times/{id}:
 *   get:
 *     summary: Retorna um time pelo ID
 *     tags: [Times]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Time encontrado
 *       404:
 *         description: Time não encontrado
 */
// ROTA: GET /api/times/:id - Busca time por ID
router.get("/:id", (0, validation_2.validateParams)(validation_1.idParamSchema), timeController.getTimeById);
/**
 * @swagger
 * /times:
 *   post:
 *     summary: Cria um novo time
 *     tags: [Times]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               fundacao:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Time criado com sucesso
 */
// ROTA: POST /api/times - Cria novo time
router.post("/", (0, validation_2.validateBody)(validation_1.createTimeSchema), timeController.createTime);
/**
 * @swagger
 * /times/{id}:
 *   put:
 *     summary: Atualiza um time existente
 *     tags: [Times]
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
 *               fundacao:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Time atualizado
 *       404:
 *         description: Time não encontrado
 */
// ROTA: PUT /api/times/:id - Atualiza time existente
router.put("/:id", (0, validation_2.validateParams)(validation_1.idParamSchema), // Valida o ID na URL
(0, validation_2.validateBody)(validation_1.updateTimeSchema), // Valida o body da requisição
timeController.updateTime);
/**
 * @swagger
 * /times/{id}:
 *   delete:
 *     summary: Remove um time
 *     tags: [Times]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Time removido com sucesso
 *       404:
 *         description: Time não encontrado
 */
// ROTA: DELETE /api/times/:id - Remove time
router.delete("/:id", (0, validation_2.validateParams)(validation_1.idParamSchema), timeController.deleteTime);
exports.default = router;
