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
  Box,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Time } from "../types/time";

interface TimesTableProps {
  times: Time[];
  deletingId: number | null;
  onDelete: (id: number) => void;
  onEdit: (time: Time) => void;
}

const TimesTable: React.FC<TimesTableProps> = ({
  times,
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
              Nome
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 600 }}>
              Data de Fundação
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 600 }}>
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {times.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                Nenhum time encontrado
              </TableCell>
            </TableRow>
          ) : (
            times.map((time) => (
              <TableRow key={time.id} hover>
                <TableCell align="center">{time.nome}</TableCell>
                <TableCell align="center">
                  {new Date(time.fundacao).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => onEdit(time)}
                    disabled={deletingId === time.id}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete(time.id)}
                    disabled={deletingId === time.id}
                  >
                    {deletingId === time.id ? (
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

export default TimesTable;
