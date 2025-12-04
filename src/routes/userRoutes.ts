import { Router } from "express";
import * as userController from "../controllers/userController";
import {
  createUserSchema,
  updateUserSchema,
  idParamSchema,
} from "../schemas/validation";
import { validateBody, validateParams } from "../middlewares/validation";
import { loginUser } from "../controllers/userController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints de gerenciamento de usuários
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
// ROTA: GET /api/usuarios - Lista todos os usuários
router.get("/", userController.getAllUsers);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
// ROTA: GET /api/usuarios/:id - Busca usuário por ID
router.get(
  "/:id",
  validateParams(idParamSchema),
  userController.getUserById
);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
// ROTA: POST /api/usuarios - Cria novo usuário
router.post(
  "/",
  validateBody(createUserSchema),
  userController.createUser
);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Realiza login de um usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: milena@example.com
 *               senha:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login realizado com sucesso!
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nome:
 *                       type: string
 *                       example: Milena
 *                     email:
 *                       type: string
 *                       example: milena@example.com
 * 
 *       404:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Credenciais inválidas
 *
 *       500:
 *         description: Erro interno no servidor
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Usuários]
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
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       404:
 *         description: Usuário não encontrado
 */
// ROTA: PUT /api/usuarios/:id - Atualiza usuário existente
router.put(
  "/:id",
  validateParams(idParamSchema),
  validateBody(updateUserSchema),
  userController.updateUser
);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
// ROTA: DELETE /api/usuarios/:id - Remove usuário
router.delete(
  "/:id",
  validateParams(idParamSchema),
  userController.deleteUser
);

export default router;
