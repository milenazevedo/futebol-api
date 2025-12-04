import React from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
} from "@mui/material";
import {
  SportsBasketball as PlayersIcon,
  Stadium as StadiumIcon,
  EmojiEvents as TrophyIcon,
  Assignment as AssignmentIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import UserHeader from "./UserHeader";

const drawerWidth = 240;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { text: "Início", icon: <HomeIcon />, path: "/home" },
  { text: "Jogadores", icon: <PlayersIcon />, path: "/jogadores" },
  { text: "Partidas", icon: <StadiumIcon />, path: "/partidas" },
  { text: "Times", icon: <TrophyIcon />, path: "/times" },
  { text: "Escalações", icon: <AssignmentIcon />, path: "/escalacoes" },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#121212",
            color: "white",
            borderRight: "1px solid rgba(26, 180, 84, 0.1)",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
            The Heroes
          </Typography>
        </Toolbar>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "rgba(26, 180, 84, 0.15)",
                    borderLeft: "3px solid #1ab454",
                    paddingLeft: "19px",
                    "&:hover": {
                      backgroundColor: "rgba(26, 180, 84, 0.25)",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "rgba(26, 180, 84, 0.08)",
                  },
                  color: "white",
                  transition: "all 0.2s ease",
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Top bar */}
        <AppBar
          position="static"
          color="default"
          elevation={1}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <UserHeader />
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 2.5,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="lg">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} The Heroes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sistema de Gerenciamento de Times de Futebol
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
