import React, { useEffect, useState } from "react";
import type { Jogador } from "../types/jogador";
import { getJogadores, deleteJogador, searchJogadores } from "../services/jogadorService";
import {
  Box,
  Paper,
  Typography,
  Button,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import JogadoresTable from "./JogadoresTable";
import EditarJogadorModal from "./EditarJogadorModal";
import CriarJogadorModal from "./CriarJogadorModal";
import StatJogadorModal from "./StatJogadorModal";
import DashboardLayout from "./DashboardLayout";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

const Jogadores: React.FC = () => {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });
  const [jogadorEditando, setJogadorEditando] = useState<Jogador | null>(null);
  const [jogadorStats, setJogadorStats] = useState<Jogador | null>(null);
  const [openCriarModal, setOpenCriarModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getJogadores();
        setJogadores(data);
      } catch (e) {
        setSnackbar({ open: true, message: "Erro ao buscar jogadores.", severity: "error" });
        console.error(e);
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    setDeletingId(id);

    try {
      await deleteJogador(id);
      setJogadores((prev) => prev.filter((p) => p.id !== id));
      setSnackbar({ open: true, message: "Jogador removido com sucesso.", severity: "success" });
    } catch (e) {
      setSnackbar({ open: true, message: "Erro ao deletar jogador.", severity: "error" });
      console.error(e);
    } finally {
      setDeletingId(null);
    }
  };

  const handleOpenEditModal = (jogador: Jogador) => {
    setJogadorEditando(jogador);
  };

  const handleCloseEditModal = () => {
    setJogadorEditando(null);
  };

  const handleSaveJogador = (jogadorAtualizado: Jogador) => {
    setJogadores((prev) => prev.map((p) => (p.id === jogadorAtualizado.id ? jogadorAtualizado : p)));
    setSnackbar({ open: true, message: "Jogador atualizado com sucesso.", severity: "success" });
  };

  const handleSaveNovoJogador = (novoJogador: Jogador) => {
    setJogadores((prev) => [...prev, novoJogador]);
    setSnackbar({ open: true, message: "Jogador criado com sucesso.", severity: "success" });
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      try {
        const data = await getJogadores();
        setJogadores(data);
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        const data = await searchJogadores(term);
        setJogadores(data);
      } catch (e) {
        console.error(e);
        setSnackbar({ open: true, message: "Erro ao buscar jogadores.", severity: "error" });
      }
    }
  };

  return (
    <DashboardLayout>
      <Paper elevation={3} sx={(theme) => ({ width: "100%", maxWidth: 1200, mx: "auto", p: 3, bgcolor: theme.palette.mode === "dark" ? "#242424" : "background.paper", color: theme.palette.text.primary, borderRadius: 2 })}>
        <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">Lista de Jogadores</Typography>

        <TextField
          placeholder="Buscar por nome..."
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <JogadoresTable jogadores={jogadores} deletingId={deletingId} onDelete={handleDelete} onEdit={handleOpenEditModal} onStats={setJogadorStats} />

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={() => setOpenCriarModal(true)}>
            + Novo Jogador
          </Button>
        </Box>

        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <Alert onClose={() => setSnackbar((s) => ({ ...s, open: false }))} severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
        </Snackbar>
      </Paper>

      <EditarJogadorModal open={jogadorEditando !== null} jogador={jogadorEditando} onClose={handleCloseEditModal} onSave={handleSaveJogador} />
      <CriarJogadorModal open={openCriarModal} onClose={() => setOpenCriarModal(false)} onSave={handleSaveNovoJogador} />
      <StatJogadorModal open={jogadorStats !== null} jogador={jogadorStats} onClose={() => setJogadorStats(null)} />
    </DashboardLayout>
  );
};

export default Jogadores;
