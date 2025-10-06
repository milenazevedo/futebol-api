import { Router } from "express";
import * as timeController from "../controllers/timeController";
import { createTimeSchema, updateTimeSchema, idParamSchema } from "../schemas/validation";
import { validateBody, validateParams } from "../middlewares/validation";

const router = Router();

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
router.get("/:id", validateParams(idParamSchema), timeController.getTimeById);

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
router.post("/", validateBody(createTimeSchema), timeController.createTime);

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
router.put(
  "/:id",
  validateParams(idParamSchema),
  validateBody(updateTimeSchema),
  timeController.updateTime
);

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
router.delete("/:id", validateParams(idParamSchema), timeController.deleteTime);

export default router;
