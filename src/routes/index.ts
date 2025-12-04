import { Router } from "express";
import timeRoutes from "./timeRoutes";
import jogadorRoutes from "./jogadorRoutes";
import partidaRoutes from "./partidaRoutes";
import escalacaoRoutes from "./escalacaoRoutes";
import healthRoutes from "./healthRoutes";
import authRoutes from "./authRoutes";

const router = Router();

// CONFIGURAÇÃO DAS ROTAS PRINCIPAIS DA API
// Todas as rotas de times começam com /api/times
router.use("/times", timeRoutes);

// Rotas de jogadores: /api/jogadores
router.use("/jogadores", jogadorRoutes);

// Rotas de autenticação: /api/auth/login, /api/auth/register, /api/login (backward compat)
router.use("/auth", authRoutes);
router.use("/login", authRoutes);

// Rotas de partidas: /api/partidas
router.use("/partidas", partidaRoutes);

// Rotas de escalações: /api/escalacoes
router.use("/escalacoes", escalacaoRoutes);

// Health check: /api/health
router.use("/health", healthRoutes);

export default router;
