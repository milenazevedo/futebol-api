"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../db/prisma"));
const router = (0, express_1.Router)();
// GET /health - verifica se o servidor e o banco estão funcionando
router.get("/", async (req, res) => {
    try {
        // Executa uma consulta simples para confirmar conectividade com o banco
        await prisma_1.default.$queryRaw `SELECT 1`;
        // Retorna 200 quando tudo estiver OK
        res.status(200).json({ status: "ok", db: "conectado" });
    }
    catch (err) {
        // Loga o erro no servidor e retorna 503 quando o BD estiver inacessível
        console.error("Erro na checagem de saúde do BD:", err);
        res.status(503).json({ status: "erro", db: "inacessível" });
    }
});
exports.default = router;
