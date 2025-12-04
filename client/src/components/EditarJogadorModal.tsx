import React, { useState, useEffect } from "react";
import type { Jogador } from "../types/jogador";
import type { Time } from "../types/time";
import { updateJogador } from "../services/jogadorService";
import { getTimes } from "../services/timeService";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
  MenuItem,
} from "@mui/material";

interface EditarJogadorModalProps {
  open: boolean;
  jogador: Jogador | null;
  onClose: () => void;
  onSave: (jogadorAtualizado: Jogador) => void;
}

const EditarJogadorModal: React.FC<EditarJogadorModalProps> = ({
  open,
  jogador,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Jogador>(
    jogador || {
      id: 0,
      nome: "",
      posicao: "",
      subposicao: "",
      numero: 0,
      timeId: 0,
    }
  );

  const [times, setTimes] = useState<Time[]>([]);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  React.useEffect(() => {
    if (jogador && open) {
      setFormData({ ...jogador });
      setErro("");
    }
  }, [jogador, open]);

  useEffect(() => {
    if (open) {
      loadTimes();
    }
  }, [open]);

  const loadTimes = async () => {
    try {
      const data = await getTimes();
      setTimes(data);
    } catch (error) {
      console.error("Erro ao carregar times:", error);
      setErro("Erro ao carregar lista de times");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "numero" || name === "timeId" ? (value ? parseInt(value) : 0) : value,
    }));
  };

  const handleSave = async () => {
    setErro("");
    
    if (!formData.nome || !formData.posicao || !formData.numero || !formData.timeId) {
      setErro("Todos os campos obrigatórios devem ser preenchidos");
      return;
    }

    setSalvando(true);
    try {
      await updateJogador(formData.id, formData);
      onSave(formData);
      onClose();
    } catch (error: any) {
      console.error("Erro ao salvar jogador:", error);
      setErro(error.response?.data?.message || "Erro ao salvar jogador. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
        Editar Jogador
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          {erro && (
            <Box sx={{ color: "error.main", fontSize: "0.875rem", p: 1, bgcolor: "error.light", borderRadius: 1 }}>
              {erro}
            </Box>
          )}
          <TextField
            fullWidth
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            placeholder="Digite o nome completo"
            disabled={salvando}
          />

          <TextField
            fullWidth
            label="Posição"
            name="posicao"
            value={formData.posicao}
            onChange={handleInputChange}
            placeholder="Ex: Goleiro, Lateral, Zagueiro, Meia, Atacante"
            disabled={salvando}
          />

          <TextField
            fullWidth
            label="Subposição (opcional)"
            name="subposicao"
            value={formData.subposicao || ""}
            onChange={handleInputChange}
            placeholder="Ex: Lateral direito, Meia ofensivo"
            disabled={salvando}
          />

          <TextField
            fullWidth
            label="Número"
            name="numero"
            type="number"
            value={formData.numero}
            onChange={handleInputChange}
            placeholder="Ex: 10"
            disabled={salvando}
          />

          <TextField
            select
            fullWidth
            label="Time"
            name="timeId"
            value={formData.timeId}
            onChange={handleInputChange}
            placeholder="Selecione um time"
            disabled={salvando}
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
        <Button onClick={onClose} color="inherit" disabled={salvando}>
          Cancelar
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          color="primary" 
          disabled={salvando}
        >
          {salvando ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Salvando...
            </>
          ) : (
            "Salvar"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarJogadorModal;
