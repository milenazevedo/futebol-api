<<<<<<< HEAD
import { Router } from "express";
import * as escalacaoController from "../controllers/escalacaoController";
import { createEscalacaoSchema, updateEscalacaoSchema, idParamSchema } from "../schemas/validation";
import { validateBody, validateParams } from "../middlewares/validation";

const router = Router();

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
router.get("/:id", validateParams(idParamSchema), escalacaoController.getEscalacaoById);

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
router.post("/", validateBody(createEscalacaoSchema), escalacaoController.createEscalacao);

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
router.put(
  "/:id",
  validateParams(idParamSchema),
  validateBody(updateEscalacaoSchema),
  escalacaoController.updateEscalacao
);

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
router.delete("/:id", validateParams(idParamSchema), escalacaoController.deleteEscalacao);

export default router;
=======
import { Router } from "express";
import * as escalacaoController from "../controllers/escalacaoController";
import { createEscalacaoSchema, updateEscalacaoSchema, idParamSchema } from "../schemas/validation";
import { validateBody, validateParams } from "../middlewares/validation";

const router = Router();

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
router.get("/:id", validateParams(idParamSchema), escalacaoController.getEscalacaoById);

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
router.post("/", validateBody(createEscalacaoSchema), escalacaoController.createEscalacao);

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
router.put(
  "/:id",
  validateParams(idParamSchema),
  validateBody(updateEscalacaoSchema),
  escalacaoController.updateEscalacao
);

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
router.delete("/:id", validateParams(idParamSchema), escalacaoController.deleteEscalacao);

export default router;
>>>>>>> Parte-Milena
