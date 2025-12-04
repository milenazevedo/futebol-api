import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Escalacao } from "../types/escalacao";

interface EscalacoesFTableProps {
  escalacoes: Escalacao[];
  deletingId: number | null;
  onDelete: (id: number) => void;
  onEdit: (escalacao: Escalacao) => void;
}

const EscalacoesTable: React.FC<EscalacoesFTableProps> = ({
  escalacoes,
  deletingId,
  onDelete,
  onEdit,
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow
            sx={(theme) => ({
              backgroundColor:
                theme.palette.mode === "dark" ? "#333" : "#f5f5f5",
            })}
          >
            <TableCell align="center" sx={{ fontWeight: 600 }}>
              Jogador
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 600 }}>
              Partida
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 600 }}>
              Time
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 600 }}>
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {escalacoes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                Nenhuma escalação encontrada
              </TableCell>
            </TableRow>
          ) : (
            escalacoes.map((escalacao) => (
              <TableRow key={escalacao.id} hover>
                <TableCell align="center">
                  {escalacao.jogador?.nome || `Jogador ${escalacao.jogadorId}`}
                </TableCell>
                <TableCell align="center">
                  {escalacao.partida ? (
                    <>
                      {new Date(escalacao.partida.data).toLocaleDateString("pt-BR")} -{" "}
                      {escalacao.partida.local}
                    </>
                  ) : (
                    `Partida ${escalacao.partidaId}`
                  )}
                </TableCell>
                <TableCell align="center">
                  {escalacao.time?.nome || `Time ${escalacao.timeId}`}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => onEdit(escalacao)}
                    disabled={deletingId === escalacao.id}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete(escalacao.id)}
                    disabled={deletingId === escalacao.id}
                  >
                    {deletingId === escalacao.id ? (
                      <CircularProgress size={20} />
                    ) : (
                      <DeleteIcon fontSize="small" />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EscalacoesTable;
