import { Router } from "express";
import * as partidaController from "../controllers/partidaController";
import { createPartidaSchema, updatePartidaSchema, idParamSchema } from "../schemas/validation";
import { validateBody, validateParams } from "../middlewares/validation";

const router = Router();

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
 * /partidas/futuras:
 *   get:
 *     summary: Retorna apenas partidas futuras
 *     tags: [Partidas]
 *     responses:
 *       200:
 *         description: Lista de partidas futuras
 */
// ROTA: GET /api/partidas/futuras - Lista partidas futuras
router.get("/futuras", partidaController.getFuturePartidas);

/**
 * @swagger
 * /partidas/stats:
 *   get:
 *     summary: Retorna estatísticas de partidas
 *     tags: [Partidas]
 *     responses:
 *       200:
 *         description: Estatísticas de partidas
 */
// ROTA: GET /api/partidas/stats - Estatísticas de partidas
router.get("/stats", partidaController.getPartidaStats);

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
router.post("/", validateBody(createPartidaSchema), partidaController.createPartida);

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
router.get("/:id", validateParams(idParamSchema), partidaController.getPartidaById);

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
router.put(
  "/:id",
  validateParams(idParamSchema),
  validateBody(updatePartidaSchema),
  partidaController.updatePartida
);

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
router.delete("/:id", validateParams(idParamSchema), partidaController.deletePartida);

export default router;
