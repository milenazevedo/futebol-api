// src/routes/jogadorRoutes.ts

import { Router } from 'express';
import * as jogadorController from '../controllers/jogadorController';
import { validateQuery } from '../middlewares/validation';
import { searchJogadorSchema } from '../schemas/validation';

const router = Router();

// ROTA: GET /api/jogadores - Lista todos os jogadores
router.get('/', jogadorController.getAllJogadores);

// Swagger doc removed for /jogadores/search due to YAML formatting issues
// ROTA: GET /api/jogadores/search - Busca jogadores por posição e/ou subposição
router.get('/search', validateQuery(searchJogadorSchema), jogadorController.searchJogadores);

// ROTA: GET /api/jogadores/buscar/nome - Busca jogadores por nome
router.get('/buscar/nome', jogadorController.searchByName);

// ROTA: GET /api/jogadores/stats/:id - Retorna estatísticas de um jogador
router.get('/stats/:id', jogadorController.getJogadorStats);

// ROTA: POST /api/jogadores - Cria novo jogador
router.post('/', jogadorController.createJogador);

// ROTA: PUT /api/jogadores/:id - Atualiza jogador existente
router.put('/:id', jogadorController.updateJogador);

// ROTA: DELETE /api/jogadores/:id - Remove jogador
router.delete('/:id', jogadorController.deleteJogador);

// ROTA: GET /api/jogadores/:id - Busca jogador por ID (DEVE SER A ÚLTIMA)
router.get('/:id', jogadorController.getJogadorById);

export default router;