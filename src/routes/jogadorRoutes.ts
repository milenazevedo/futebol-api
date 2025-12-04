<<<<<<< HEAD
// src/routes/jogadorRoutes.ts

import { Router } from 'express';
import * as jogadorController from '../controllers/jogadorController';
import { validateQuery } from '../middlewares/validation';
import { searchJogadorSchema } from '../schemas/validation';

const router = Router();

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
router.get('/search', validateQuery(searchJogadorSchema), jogadorController.searchJogadores);

// ROTA: GET /api/jogadores/:id - Busca jogador por ID
router.get('/:id', jogadorController.getJogadorById);

// ROTA: POST /api/jogadores - Cria novo jogador
router.post('/', jogadorController.createJogador);

// ROTA: PUT /api/jogadores/:id - Atualiza jogador existente
router.put('/:id', jogadorController.updateJogador);

// ROTA: DELETE /api/jogadores/:id - Remove jogador
router.delete('/:id', jogadorController.deleteJogador);

export default router;
=======
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
// ROTA: GET /api/jogadores - Lista todos os jogadores
router.get("/", jogadorController.getAllJogadores);

/**
 * @swagger
 * /jogadores:
 *   get:
 *     summary: Busca jogadores por nome (parâmetro ?nome=)
 *     tags: [Jogadores]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Lista de jogadores filtrada
 */
router.get("/buscar", jogadorController.buscarJogadoresPorNome);

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
router.get("/:id", validateParams(idParamSchema), jogadorController.getJogadorById);

/**
 * @swagger
 * /jogadores/{id}/estatisticas:
 *   get:
 *     summary: Retorna estatísticas de um jogador
 *     tags: [Jogadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estatísticas encontradas
 *       404:
 *         description: Jogador não encontrado
 */
router.get(
  "/:id/estatisticas",
  validateParams(idParamSchema),
  jogadorController.getEstatisticasJogador
);

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
// ROTA: PUT /api/jogadores/:id - Atualiza jogador existente
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
// ROTA: DELETE /api/jogadores/:id - Remove jogador
router.delete("/:id", validateParams(idParamSchema), jogadorController.deleteJogador);

export default router;
>>>>>>> Parte-Milena
