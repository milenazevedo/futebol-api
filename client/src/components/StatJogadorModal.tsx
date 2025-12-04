import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Jogador } from "../types/jogador";
import { getJogadorStats } from "../services/jogadorService";

interface StatJogadorModalProps {
  open: boolean;
  jogador: Jogador | null;
  onClose: () => void;
}

const StatJogadorModal: React.FC<StatJogadorModalProps> = ({
  open,
  jogador,
  onClose,
}) => {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && jogador) {
      setIsLoading(true);
      setError(null);
      setStats(null);

      getJogadorStats(jogador.id)
        .then((data) => {
          setStats(data);
        })
        .catch((err) => {
          setError(
            err.response?.data?.message || "Erro ao carregar estatísticas"
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [open, jogador]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Estatísticas - {jogador?.nome}</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        {isLoading && (
          <Box display="flex" justifyContent="center" py={3}>
            <CircularProgress />
          </Box>
        )}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {stats && !isLoading && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Informações Gerais
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Nome:</strong> {stats.nome}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Número:</strong> {stats.numero}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Posição:</strong> {stats.posicao}
                  </Typography>
                  {stats.subposicao && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Subposição:</strong> {stats.subposicao}
                    </Typography>
                  )}
                  {stats.time && (
                    <Typography variant="body2">
                      <strong>Time:</strong> {stats.time.nome}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Estatísticas
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Total de Partidas:</strong> {stats.stats?.totalPartidas || 0}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Posição:</strong> {stats.stats?.posicao}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatJogadorModal;
