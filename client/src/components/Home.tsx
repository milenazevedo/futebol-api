import { Box, Button, Paper, Typography, Avatar, AppBar, Toolbar, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader";

const AVATAR_SIZE = 72;

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      {/* Navbar */}
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700, flexGrow: 1 }}>
            The Heroes
          </Typography>
          <UserHeader />
        </Toolbar>
      </AppBar>

      {/* Conteúdo Principal */}
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        py={4}
      >
        <Paper elevation={2} sx={{ p: 3, width: 320, maxWidth: 1200 }}>
          <Box textAlign="center" mb={2}>
            <Box display="flex" justifyContent="center" mb={1}>
              <Avatar
                src="https://cdn-icons-png.flaticon.com/512/7858/7858230.png"
                alt="The Heroes"
                sx={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  bgcolor: "transparent",
                }}
                slotProps={{ img: { loading: "lazy" } }}
              />
            </Box>
            <Typography variant="h5" component="h2" fontWeight={600} mb={2}>
              Meu Time
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
              type="button"
              onClick={() => navigate("/jogadores")}
            >
              Jogadores
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mb: 2 }}
              type="button"
              onClick={() => navigate("/partidas")}
            >
              Partidas
            </Button>
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ mb: 2 }}
              type="button"
              onClick={() => navigate("/times")}
            >
              Times
            </Button>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              type="button"
              onClick={() => navigate("/escalacoes")}
            >
              Escalações
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Rodapé */}
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
  );
};

export default Home;

