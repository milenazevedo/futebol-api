import { Box, Button, Paper, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader";

const AVATAR_SIZE = 72;

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box position="relative" minHeight="100vh" width="100vw">
      <UserHeader />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper elevation={2} sx={{ p: 3, width: 320, maxWidth: 1200 }}>
          <Box textAlign="center" mb={2}>
            <Box display="flex" justifyContent="center" mb={1}>
              <Avatar
                src="https://cdn-icons-png.flaticon.com/512/7858/7858230.png"
                alt="Clínica Médica"
                sx={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  bgcolor: "transparent",
                }}
                slotProps={{ img: { loading: "lazy" } }}
              />
            </Box>
            <Typography variant="h5" component="h1" fontWeight={600} mb={2}>
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
    </Box>
  );
};

export default Home;
