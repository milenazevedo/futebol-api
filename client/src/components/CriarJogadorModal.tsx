import React, { useState, useEffect } from "react";
import type { Jogador } from "../types/jogador";
import type { Time } from "../types/time";
import { createJogador } from "../services/jogadorService";
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

interface CriarJogadorModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (jogador: Jogador) => void;
}

const CriarJogadorModal: React.FC<CriarJogadorModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    nome: "",
    posicao: "",
    subposicao: "",
    numero: "",
    timeId: "",
  });
  const [times, setTimes] = useState<Time[]>([]);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

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
      [name]: value,
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
      const novoJogador = await createJogador({
        nome: formData.nome,
        posicao: formData.posicao,
        subposicao: formData.subposicao || undefined,
        numero: parseInt(formData.numero),
        timeId: parseInt(formData.timeId),
      });
      onSave(novoJogador);
      setFormData({
        nome: "",
        posicao: "",
        subposicao: "",
        numero: "",
        timeId: "",
      });
      onClose();
    } catch (error: any) {
      console.error("Erro ao criar jogador:", error);
      setErro(error.response?.data?.message || "Erro ao criar jogador. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  const handleClose = () => {
    setFormData({
      nome: "",
      posicao: "",
      subposicao: "",
      numero: "",
      timeId: "",
    });
    setErro("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
        Novo Jogador
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
            placeholder="Digite o nome do jogador"
            required
          />

          <TextField
            fullWidth
            label="Posição"
            name="posicao"
            value={formData.posicao}
            onChange={handleInputChange}
            placeholder="Ex: Goleiro, Lateral, Zagueiro, Meia, Atacante"
            required
          />

          <TextField
            fullWidth
            label="Subposição (opcional)"
            name="subposicao"
            value={formData.subposicao}
            onChange={handleInputChange}
            placeholder="Ex: Lateral direito, Meia ofensivo"
          />

          <TextField
            fullWidth
            label="Número"
            name="numero"
            type="number"
            value={formData.numero}
            onChange={handleInputChange}
            placeholder="Ex: 10"
            required
          />

          <TextField
            select
            fullWidth
            label="Time"
            name="timeId"
            value={formData.timeId}
            onChange={handleInputChange}
            placeholder="Selecione um time"
            required
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
        <Button onClick={handleClose} color="inherit" disabled={salvando}>
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
              Criando...
            </>
          ) : (
            "Criar"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CriarJogadorModal;
