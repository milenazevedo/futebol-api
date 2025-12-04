import React, { useEffect, useState } from "react";
import type { Time } from "../types/time";
import { getTimes, deleteTime } from "../services/timeService";
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
import TimesTable from "./TimesTable";
import EditarTimeModal from "./EditarTimeModal";
import CriarTimeModal from "./CriarTimeModal";
import UserHeader from "./UserHeader";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

const Times: React.FC = () => {
  const navigate = useNavigate();

  const [times, setTimes] = useState<Time[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });
  const [timeEditando, setTimeEditando] = useState<Time | null>(null);
  const [openCriarModal, setOpenCriarModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const times = await getTimes();
        setTimes(times);
      } catch (error: any) {
        console.error(error);
        setSnackbar({
          open: true,
          message: "Erro ao carregar times",
          severity: "error",
        });
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteTime(id);
      setTimes((prev) => prev.filter((p) => p.id !== id));
      setSnackbar({
        open: true,
        message: "Time deletado com sucesso",
        severity: "success",
      });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Erro ao deletar time",
        severity: "error",
      });
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleOpenEditModal = (time: Time) => {
    setTimeEditando(time);
  };

  const handleCloseEditModal = () => {
    setTimeEditando(null);
  };

  const handleSaveTime = (timeAtualizado: Time) => {
    setTimes((prev) => prev.map((p) => (p.id === timeAtualizado.id ? timeAtualizado : p)));
    setSnackbar({ open: true, message: "Time atualizado com sucesso.", severity: "success" });
  };

  const handleSaveNovoTime = (novoTime: Time) => {
    setTimes((prev) => [...prev, novoTime]);
    setSnackbar({ open: true, message: "Time criado com sucesso.", severity: "success" });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" bgcolor="background.default" p={3}>
      <UserHeader />
      <Paper elevation={3} sx={(theme) => ({ width: "100%", maxWidth: 1200, p: 3, position: "relative", bgcolor: theme.palette.mode === "dark" ? "#242424" : "background.paper", color: theme.palette.text.primary, borderRadius: 2 })}>
        <IconButton aria-label="voltar" onClick={() => navigate("/home")} size="small" sx={{ position: "absolute", left: 16, top: 16 }}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">Lista de Times</Typography>

        <TimesTable times={times} deletingId={deletingId} onDelete={handleDelete} onEdit={handleOpenEditModal} />

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={() => setOpenCriarModal(true)}>
            + Novo Time
          </Button>
        </Box>

        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
          <Alert onClose={() => setSnackbar((s) => ({ ...s, open: false }))} severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
        </Snackbar>
      </Paper>

      <EditarTimeModal open={timeEditando !== null} time={timeEditando} onClose={handleCloseEditModal} onSave={handleSaveTime} />
      <CriarTimeModal open={openCriarModal} onClose={() => setOpenCriarModal(false)} onSave={handleSaveNovoTime} />
    </Box>
  );
};

export default Times;
