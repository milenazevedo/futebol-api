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
} from "@mui/material";
import { Time } from "../types/time";
import { updateTime } from "../services/timeService";

interface EditarTimeModalProps {
  open: boolean;
  time: Time | null;
  onClose: () => void;
  onSave: (time: Time) => void;
}

const EditarTimeModal: React.FC<EditarTimeModalProps> = ({
  open,
  time,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({ nome: "", fundacao: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (time) {
      setFormData({
        nome: time.nome,
        fundacao: time.fundacao,
      });
    }
  }, [time, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!time) return;

    if (!formData.nome.trim()) {
      setError("Nome é obrigatório");
      return;
    }

    if (!formData.fundacao.trim()) {
      setError("Data de fundação é obrigatória");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const timeAtualizado = await updateTime(time.id, formData);
      onSave(timeAtualizado);
      onClose();
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Erro ao atualizar time"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Time</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          label="Nome"
          name="nome"
          value={formData.nome}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          disabled={isLoading}
        />
        <TextField
          label="Data de Fundação"
          name="fundacao"
          type="date"
          value={formData.fundacao}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          disabled={isLoading}
          InputLabelProps={{ shrink: true }}
        />
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

export default EditarTimeModal;
