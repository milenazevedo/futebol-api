import { Router } from "express";
import * as jogadorController from "../controllers/jogadorController";
import { createJogadorSchema, updateJogadorSchema, idParamSchema } from "../schemas/validation";
import { validateBody, validateParams } from "../middlewares/validation";

const router = Router();

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
router.get("/:id", validateParams(idParamSchema), jogadorController.getJogadorById);

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
router.post("/", validateBody(createJogadorSchema), jogadorController.createJogador);

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
router.put(
  "/:id",
  validateParams(idParamSchema),
  validateBody(updateJogadorSchema),
  jogadorController.updateJogador
);

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
router.delete("/:id", validateParams(idParamSchema), jogadorController.deleteJogador);

export default router;
