import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Alert,
  MenuItem,
} from "@mui/material";
import { Escalacao } from "../types/escalacao";
import { Jogador } from "../types/jogador";
import { Partida } from "../types/partida";
import { Time } from "../types/time";
import { createEscalacao } from "../services/escalacaoService";

interface CriarEscalacaoModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (escalacao: Escalacao) => void;
  jogadores: Jogador[];
  partidas: Partida[];
  times: Time[];
}

const CriarEscalacaoModal: React.FC<CriarEscalacaoModalProps> = ({
  open,
  onClose,
  onSave,
  jogadores,
  partidas,
  times,
}) => {
  const [formData, setFormData] = useState({
    jogadorId: "",
    partidaId: "",
    timeId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.jogadorId || !formData.partidaId || !formData.timeId) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const novaEscalacao = await createEscalacao({
        jogadorId: parseInt(formData.jogadorId),
        partidaId: parseInt(formData.partidaId),
        timeId: parseInt(formData.timeId),
      });
      onSave(novaEscalacao);
      setFormData({ jogadorId: "", partidaId: "", timeId: "" });
      onClose();
    } catch (error: any) {
      setError(error.response?.data?.message || "Erro ao criar escalação");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({ jogadorId: "", partidaId: "", timeId: "" });
      setError(null);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Criar Nova Escalação</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          select
          label="Jogador"
          name="jogadorId"
          value={formData.jogadorId}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          disabled={isLoading}
          autoFocus
        >
          {jogadores.map((jogador) => (
            <MenuItem key={jogador.id} value={jogador.id}>
              {jogador.nome} - {jogador.numero}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Partida"
          name="partidaId"
          value={formData.partidaId}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          disabled={isLoading}
        >
          {partidas.map((partida) => (
            <MenuItem key={partida.id} value={partida.id}>
              {new Date(partida.data).toLocaleDateString("pt-BR")} - {partida.local}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Time"
          name="timeId"
          value={formData.timeId}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          disabled={isLoading}
        >
          {times.map((time) => (
            <MenuItem key={time.id} value={time.id}>
              {time.nome}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Criar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CriarEscalacaoModal;
