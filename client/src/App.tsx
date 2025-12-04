import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import ThemeToggleFloating from "./components/ThemeToggleFloating";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useState } from "react";
import Jogadores from "./components/Jogadores";
import Partidas from "./components/Partidas";
import Times from "./components/Times";
import Escalacoes from "./components/Escalacoes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "dark" && {
        background: {
          default: "#0a0a0a",
          paper: "#121212",
        },
        primary: {
          main: "#1976d2",
        },
        success: {
          main: "#1ab454",
        },
      }),
    },
  });

  const toggleColorMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ThemeToggleFloating toggleColorMode={toggleColorMode} mode={mode} />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/jogadores" element={<Jogadores />} />
            <Route path="/partidas" element={<Partidas />} />
            <Route path="/times" element={<Times />} />
            <Route path="/escalacoes" element={<Escalacoes />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
