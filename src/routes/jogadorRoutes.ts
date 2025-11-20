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