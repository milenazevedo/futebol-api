import React, { useState, useEffect } from "react";
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
import { updateEscalacao } from "../services/escalacaoService";

interface EditarEscalacaoModalProps {
  open: boolean;
  escalacao: Escalacao | null;
  onClose: () => void;
  onSave: (escalacao: Escalacao) => void;
  jogadores: Jogador[];
  partidas: Partida[];
  times: Time[];
}

const EditarEscalacaoModal: React.FC<EditarEscalacaoModalProps> = ({
  open,
  escalacao,
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

  useEffect(() => {
    if (escalacao) {
      setFormData({
        jogadorId: escalacao.jogadorId.toString(),
        partidaId: escalacao.partidaId.toString(),
        timeId: escalacao.timeId.toString(),
      });
    }
  }, [escalacao, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!escalacao) return;

    if (!formData.jogadorId || !formData.partidaId || !formData.timeId) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const escalacaoAtualizada = await updateEscalacao(escalacao.id, {
        jogadorId: parseInt(formData.jogadorId),
        partidaId: parseInt(formData.partidaId),
        timeId: parseInt(formData.timeId),
      });
      onSave(escalacaoAtualizada);
      onClose();
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Erro ao atualizar escalação"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Escalação</DialogTitle>
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
        >
          {jogadores.map((jogador) => (
            <MenuItem key={jogador.id} value={jogador.id}>
              {jogador.nome}
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
        <Button onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarEscalacaoModal;
