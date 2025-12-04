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
} from "@mui/material";
import { Time } from "../types/time";
import { createTime } from "../services/timeService";

interface CriarTimeModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (time: Time) => void;
}

const CriarTimeModal: React.FC<CriarTimeModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({ nome: "", fundacao: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
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
      const novoTime = await createTime(formData);
      onSave(novoTime);
      setFormData({ nome: "", fundacao: "" });
      onClose();
    } catch (error: any) {
      setError(error.response?.data?.message || "Erro ao criar time");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({ nome: "", fundacao: "" });
      setError(null);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Criar Novo Time</DialogTitle>
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
          autoFocus
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

export default CriarTimeModal;
