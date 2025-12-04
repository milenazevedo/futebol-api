<<<<<<< HEAD
import { Router } from "express";
import prisma from "../db/prisma";

const router = Router();

// GET /health - verifica se o servidor e o banco estão funcionando
router.get("/", async (req, res) => {
  try {
    // Executa uma consulta simples para confirmar conectividade com o banco
    await prisma.$queryRaw`SELECT 1`;
    // Retorna 200 quando tudo estiver OK
    res.status(200).json({ status: "ok", db: "conectado" });
  } catch (err) {
    // Loga o erro no servidor e retorna 503 quando o BD estiver inacessível
    console.error("Erro na checagem de saúde do BD:", err);
    res.status(503).json({ status: "erro", db: "inacessível" });
  }
});

export default router;
=======
import { Router } from "express";
import prisma from "../db/prisma";

const router = Router();

// GET /health - verifica se o servidor e o banco estão funcionando
router.get("/", async (req, res) => {
  try {
    // Executa uma consulta simples para confirmar conectividade com o banco
    await prisma.$queryRaw`SELECT 1`;
    // Retorna 200 quando tudo estiver OK
    res.status(200).json({ status: "ok", db: "conectado" });
  } catch (err) {
    // Loga o erro no servidor e retorna 503 quando o BD estiver inacessível
    console.error("Erro na checagem de saúde do BD:", err);
    res.status(503).json({ status: "erro", db: "inacessível" });
  }
});

export default router;
>>>>>>> Parte-Milena
