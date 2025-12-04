import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Grid,
  MenuItem,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";
import { Partida } from "../types/partida";
import type { Time } from "../types/time";
import { getPartidas, getFuturePartidas, getPartidaStats } from "../services/partidaService";
import { getTimes } from "../services/timeService";
import DashboardLayout from "./DashboardLayout";

function Partidas() {
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [times, setTimes] = useState<Time[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<"todas" | "futuras">("todas");
  const [stats, setStats] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    data: "",
    local: "",
    mandanteId: "",
    visitanteId: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    loadPartidas();
    loadStats();
    loadTimes();
  }, []);

  useEffect(() => {
    loadPartidas();
  }, [filtro]);

  const loadTimes = async () => {
    try {
      const data = await getTimes();
      setTimes(data);
    } catch (error: any) {
      console.error("Erro ao carregar times:", error);
    }
  };

  const loadPartidas = async () => {
    try {
      setLoading(true);
      const data = filtro === "futuras" ? await getFuturePartidas() : await getPartidas();
      setPartidas(data);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: "Erro ao carregar partidas",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await getPartidaStats();
      setStats(data);
    } catch (error: any) {
      console.error("Erro ao carregar estatísticas:", error);
    }
  };

  const handleOpenDialog = () => {
    setEditingId(null);
    setFormData({ data: "", local: "", mandanteId: "", visitanteId: "" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
    setFormData({ data: "", local: "", mandanteId: "", visitanteId: "" });
    setSalvando(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.data || !formData.local || !formData.mandanteId || !formData.visitanteId) {
        setSnackbar({
          open: true,
          message: "Todos os campos são obrigatórios",
          severity: "error",
        });
        return;
      }

      setSalvando(true);

      if (editingId) {
        await axios.put(`/api/partidas/${editingId}`, {
          data: new Date(formData.data).toISOString(),
          local: formData.local,
          mandanteId: parseInt(formData.mandanteId),
          visitanteId: parseInt(formData.visitanteId),
        });
        setSnackbar({
          open: true,
          message: "Partida atualizada com sucesso",
          severity: "success",
        });
      } else {
        await axios.post("/api/partidas", {
          data: new Date(formData.data).toISOString(),
          local: formData.local,
          mandanteId: parseInt(formData.mandanteId),
          visitanteId: parseInt(formData.visitanteId),
        });
        setSnackbar({
          open: true,
          message: "Partida criada com sucesso",
          severity: "success",
        });
      }

      handleCloseDialog();
      loadPartidas();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Erro ao salvar partida",
        severity: "error",
      });
    } finally {
      setSalvando(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja deletar esta partida?")) {
      try {
        await axios.delete(`/api/partidas/${id}`);
        setSnackbar({
          open: true,
          message: "Partida deletada com sucesso",
          severity: "success",
        });
        loadPartidas();
      } catch (error: any) {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Erro ao deletar partida",
          severity: "error",
        });
      }
    }
  };

  return (
    <DashboardLayout>
      <Paper elevation={3} sx={(theme) => ({ width: "100%", maxWidth: 1200, mx: "auto", p: 3, bgcolor: theme.palette.mode === "dark" ? "#242424" : "background.paper", color: theme.palette.text.primary, borderRadius: 2 })}>
        <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
          Lista de Partidas
        </Typography>

        {stats && (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" variant="body2">
                    Total de Partidas
                  </Typography>
                  <Typography variant="h4">{stats.totalPartidas || 0}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" variant="body2">
                    Partidas Futuras
                  </Typography>
                  <Typography variant="h4">{stats.futureCount || 0}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" variant="body2">
                    Partidas Realizadas
                  </Typography>
                  <Typography variant="h4">{stats.pastCount || 0}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <ToggleButtonGroup
            value={filtro}
            exclusive
            onChange={(e, newValue) => {
              if (newValue !== null) setFiltro(newValue);
            }}
            aria-label="filtro de partidas"
            size="small"
          >
            <ToggleButton value="todas" aria-label="todas partidas">
              Todas
            </ToggleButton>
            <ToggleButton value="futuras" aria-label="partidas futuras">
              Futuras
            </ToggleButton>
          </ToggleButtonGroup>

          <Button variant="contained" color="primary" onClick={handleOpenDialog}>
            + Nova Partida
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={(theme) => ({ backgroundColor: theme.palette.mode === "dark" ? "#333" : "#f5f5f5" })}>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>Data</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>Local</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>Mandante</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>Visitante</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {partidas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      Nenhuma partida encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  partidas.map((partida) => (
                    <TableRow key={partida.id} hover>
                      <TableCell align="center">{new Date(partida.data).toLocaleDateString("pt-BR", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}</TableCell>
                      <TableCell align="center">{partida.local}</TableCell>
                      <TableCell align="center">{partida.mandante?.nome || "-"}</TableCell>
                      <TableCell align="center">{partida.visitante?.nome || "-"}</TableCell>
                      <TableCell align="center">
                        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => {
                              setEditingId(partida.id);
                              setFormData({
                                data: new Date(partida.data).toISOString().slice(0, 16),
                                local: partida.local,
                                mandanteId: partida.mandanteId.toString(),
                                visitanteId: partida.visitanteId.toString(),
                              });
                              setOpenDialog(true);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDelete(partida.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
          {editingId ? "Editar Partida" : "Nova Partida"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="Data e Hora"
              type="datetime-local"
              name="data"
              value={formData.data}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Local"
              name="local"
              value={formData.local}
              onChange={handleInputChange}
              fullWidth
              placeholder="Ex: Estádio do Morumbi"
            />
            <TextField
              select
              label="Time Mandante"
              name="mandanteId"
              value={formData.mandanteId}
              onChange={handleInputChange}
              fullWidth
              placeholder="Selecione o time mandante"
            >
              {times.length === 0 ? (
                <MenuItem disabled>Carregando times...</MenuItem>
              ) : (
                times.map((time) => (
                  <MenuItem key={time.id} value={time.id}>
                    {time.nome}
                  </MenuItem>
                ))
              )}
            </TextField>
            <TextField
              select
              label="Time Visitante"
              name="visitanteId"
              value={formData.visitanteId}
              onChange={handleInputChange}
              fullWidth
              placeholder="Selecione o time visitante"
            >
              {times.length === 0 ? (
                <MenuItem disabled>Carregando times...</MenuItem>
              ) : (
                times.map((time) => (
                  <MenuItem key={time.id} value={time.id}>
                    {time.nome}
                  </MenuItem>
                ))
              )}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit" disabled={salvando}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            disabled={salvando}
          >
            {salvando ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                {editingId ? "Atualizando..." : "Criando..."}
              </>
            ) : (
              editingId ? "Atualizar" : "Criar"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Partidas;
