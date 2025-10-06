import { Router } from "express";
import timeRoutes from "./timeRoutes";
import jogadorRoutes from "./jogadorRoutes";
import partidaRoutes from "./partidaRoutes";
import escalacaoRoutes from "./escalacaoRoutes";

const router = Router();

// Se quiser prefixo /api:
router.use("/times", timeRoutes);
router.use("/jogadores", jogadorRoutes);
router.use("/partidas", partidaRoutes);
router.use("/escalacoes", escalacaoRoutes);

export default router;
