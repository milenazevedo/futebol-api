import { Router, Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@example.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *               nome:
 *                 type: string
 *                 example: João Silva
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Erro na validação
 *       409:
 *         description: Email já registrado
 */
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, senha, nome } = req.body;

    const usuario = await registerUser(email, senha, nome);

    res.status(201).json(usuario);
  } catch (error: any) {
    const statusCode = error.message.includes("Email já registrado") ? 409 : 400;
    res.status(statusCode).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Fazer login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@example.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       400:
 *         description: Erro na validação
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const usuario = await loginUser(email, senha);

    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

// Also support the old /api/login endpoint for backward compatibility
router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const usuario = await loginUser(email, senha);

    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

export default router;

