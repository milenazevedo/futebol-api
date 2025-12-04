import React from "react";
import { Box, Avatar, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LogoutOutlined as LogoutIcon } from "@mui/icons-material";

const UserHeader: React.FC = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/");
  };

  if (!usuario) return null;

  const initials = usuario.nome
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box sx={{ textAlign: "right" }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {usuario.nome}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {usuario.email}
        </Typography>
      </Box>
      <Avatar
        onClick={handleMenuOpen}
        sx={{
          cursor: "pointer",
          bgcolor: "primary.main",
          fontWeight: 600,
          "&:hover": {
            opacity: 0.8,
          },
        }}
      >
        {initials}
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleLogout} sx={{ display: "flex", gap: 1 }}>
          <LogoutIcon fontSize="small" />
          Sair
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserHeader;
