import React from "react";
import type { Jogador } from "../types/jogador";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BarChartIcon from "@mui/icons-material/BarChart";

interface JogadoresTableProps {
  jogadores: Jogador[];
  deletingId: number | null;
  onDelete: (id: number) => void;
  onEdit: (jogador: Jogador) => void;
  onStats: (jogador: Jogador) => void;
}

const JogadoresTable: React.FC<JogadoresTableProps> = ({
  jogadores,
  deletingId,
  onDelete,
  onEdit,
  onStats,
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={(theme) => ({ backgroundColor: theme.palette.mode === "dark" ? "#333" : "#f5f5f5" })}>
            {["Nome", "Posição", "Subposição", "Número", "Time", "Ações"].map(
              (header) => (
                <TableCell key={header} align="center" sx={{ fontWeight: 600 }}>
                  {header}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {jogadores.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                Nenhum jogador encontrado.
              </TableCell>
            </TableRow>
          ) : (
            jogadores.map((jogador) => (
              <TableRow key={jogador.id} hover>
                <TableCell align="center">{jogador.nome}</TableCell>
                <TableCell align="center">{jogador.posicao}</TableCell>
                <TableCell align="center">{jogador.subposicao || "-"}</TableCell>
                <TableCell align="center">{jogador.numero}</TableCell>
                <TableCell align="center">{jogador.time?.nome || `Time #${jogador.timeId}`}</TableCell>
                <TableCell align="center">
                  <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                    <Tooltip title="Estatísticas">
                      <IconButton color="info" size="small" onClick={() => onStats(jogador)}>
                        <BarChartIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton color="primary" size="small" onClick={() => onEdit(jogador)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remover">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => onDelete(jogador.id)}
                        disabled={deletingId === jogador.id}
                        aria-label={`remover-${jogador.id}`}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JogadoresTable;
