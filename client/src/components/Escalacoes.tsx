import React, { useEffect, useState } from "react";
import type { Escalacao } from "../types/escalacao";
import type { Jogador } from "../types/jogador";
import type { Partida } from "../types/partida";
import type { Time } from "../types/time";
import { getEscalacoes, deleteEscalacao } from "../services/escalacaoService";
import { getJogadores } from "../services/jogadorService";
import { getPartidas } from "../services/partidaService";
import { getTimes } from "../services/timeService";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import EscalacoesTable from "./EscalacoesTable";
import EditarEscalacaoModal from "./EditarEscalacaoModal";
import CriarEscalacaoModal from "./CriarEscalacaoModal";
import UserHeader from "./UserHeader";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

const Escalacoes: React.FC = () => {
  const navigate = useNavigate();

  const [escalacoes, setEscalacoes] = useState<Escalacao[]>([]);
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [times, setTimes] = useState<Time[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });
  const [escalacaoEditando, setEscalacaoEditando] = useState<Escalacao | null>(null);
  const [openCriarModal, setOpenCriarModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [escalacoes, jogadores, partidas, times] = await Promise.all([
          getEscalacoes(),
          getJogadores(),
          getPartidas(),
          getTimes(),
        ]);
        setEscalacoes(escalacoes);
        setJogadores(jogadores);
        setPartidas(partidas);
        setTimes(times);
      } catch (error: any) {
        console.error(error);
        setSnackbar({
          open: true,
          message: "Erro ao carregar dados",
          severity: "error",
        });
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteEscalacao(id);
      setEscalacoes((prev) => prev.filter((e) => e.id !== id));
      setSnackbar({
        open: true,
        message: "Escalação deletada com sucesso",
        severity: "success",
      });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Erro ao deletar escalação",
        severity: "error",
      });
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleOpenEditModal = (escalacao: Escalacao) => {
    setEscalacaoEditando(escalacao);
  };

  const handleCloseEditModal = () => {
    setEscalacaoEditando(null);
  };

  const handleSaveEscalacao = (escalacaoAtualizada: Escalacao) => {
    setEscalacoes((prev) => prev.map((e) => (e.id === escalacaoAtualizada.id ? escalacaoAtualizada : e)));
    setSnackbar({ open: true, message: "Escalação atualizada com sucesso.", severity: "success" });
  };

  const handleSaveNovaEscalacao = (novaEscalacao: Escalacao) => {
    setEscalacoes((prev) => [...prev, novaEscalacao]);
    setSnackbar({ open: true, message: "Escalação criada com sucesso.", severity: "success" });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" bgcolor="background.default" p={3}>
      <UserHeader />
      <Paper elevation={3} sx={(theme) => ({ width: "100%", maxWidth: 1200, p: 3, position: "relative", bgcolor: theme.palette.mode === "dark" ? "#242424" : "background.paper", color: theme.palette.text.primary, borderRadius: 2 })}>
        <IconButton aria-label="voltar" onClick={() => navigate("/home")} size="small" sx={{ position: "absolute", left: 16, top: 16 }}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">Lista de Escalações</Typography>

        <EscalacoesTable escalacoes={escalacoes} deletingId={deletingId} onDelete={handleDelete} onEdit={handleOpenEditModal} />

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={() => setOpenCriarModal(true)}>
            + Nova Escalação
          </Button>
        </Box>

        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <Alert onClose={() => setSnackbar((s) => ({ ...s, open: false }))} severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
        </Snackbar>
      </Paper>

      <EditarEscalacaoModal open={escalacaoEditando !== null} escalacao={escalacaoEditando} onClose={handleCloseEditModal} onSave={handleSaveEscalacao} jogadores={jogadores} partidas={partidas} times={times} />
      <CriarEscalacaoModal open={openCriarModal} onClose={() => setOpenCriarModal(false)} onSave={handleSaveNovaEscalacao} jogadores={jogadores} partidas={partidas} times={times} />
    </Box>
  );
};

export default Escalacoes;
